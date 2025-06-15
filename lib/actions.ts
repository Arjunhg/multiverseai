'use server';
import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Stripe from "stripe";

const genAI = new GoogleGenerativeAI((process.env.GOOGLE_GEMINI_API_KEY!));
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash"
})

interface CheckoutSessionResponse {
    url?: string;
    error?: string;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-10-28.acacia",
});

export async function genContent(prompt: string) {
    try {
        const result = await model.generateContent(prompt);
        return {
            status: 'success',
            content: result.response.text()
        };
    } catch (error) {
        console.error(error);
        return {
            status: 'error',
            content: 'Something went wrong'
        };
    }
}

export const saveQuery = async ({
    template,
    content,
    query,
}: {
    template: any;
    content: string;
    query: string;
}) => {
    const session = await auth();
    if (!session || !session.user || !session.user.email) {
        return {
            status: "error",
            message: "Unauthorized access",
        };
    }

    try {
        const newQuery = await prisma.query.create({
            data: {
                template,
                email: session.user.email,
                contents: content,
                query,
            },
        });

        if (newQuery) {
            return {
                status: "success",
                data: newQuery,
            };
        } else {
            return {
                status: "error",
                message: "Failed to save query",
            };
        }
    } catch (error) {
        console.error("Error saving query:", error);
        return {
            status: "error",
            message: "Internal server error",
        };
    }
};

export const getQueries = async () => {
    const session = await auth();
    if (!session || !session.user || !session.user.email) {
        return {
            status: "error",
            message: "Unauthorized access",
        };
    }

    try {
        const queries = await prisma.query.findMany({
            where: {
                email: session.user.email,
            },
        });

        return {
            status: "success",
            data: queries,
        };
    } catch (error) {
        console.error("Error fetching queries:", error);
        return {
            status: "error",
            message: "Internal server error",
        };
    }
};

export const countUsage = async () => {
    const session = await auth();
    if (!session || !session.user || !session.user.email) {
        return {
            status: "error",
            message: "Unauthorized access",
        };
    }

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    try {
        const records = await prisma.query.findMany({
            where: {
                email: session.user.email,
                createdAt: {
                    gte: new Date(currentYear, currentMonth - 1, 1),
                    lt: new Date(currentYear, currentMonth, 0, 23, 59, 59),
                },
            },
            select: {
                contents: true,
            },
        });

        return {
            status: "success",
            data: records,
        };
    } catch (error) {
        console.error(`Error counting usage:`, error);
        return {
            status: "error",
            message: "Internal server error",
        };
    }
};

export const createCheckoutSession = async (): Promise<CheckoutSessionResponse > => {

    const session = await auth();
		if (!session?.user?.email) {
			return {
				error: "User not found",
			};
		}
		try {
			const existingTransaction = await prisma.transaction.findFirst({
				where: {
					email: session.user.email,
				},
			});
			if (existingTransaction) {
				const subscription = await stripe.subscriptions.list({
					customer: existingTransaction.customerId,
					status: "all",
					limit: 1,
				});
				const currentSubscription = subscription.data.find(
					(sub) => sub.status === "active"
				);
				if (currentSubscription) {
					return {
						error: "You already have an active subscription",
					};
				}
			}
            const checkoutSession = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: [
                    {
                        price: process.env.STRIPE_PRICE_ID,
                        quantity: 1,
                    },
                ],
                customer_email: session.user.email,
                mode: "subscription",
                success_url: `${process.env.WEB_URL}/dashboard`,
                cancel_url: `${process.env.WEB_URL}`,
            });
			return {
				url: checkoutSession.url!,
			};
		} catch (error) {
			console.log(error);
			return {
				error: "Something went wrong while creating checkout session",
			};
		}
}

export const checkSubscriptionStatus = async () => {
	const session = await auth();
	try {
		const transaction = await prisma.transaction.findFirst({
			where: {
				email: session?.user?.email!,
				status: "complete",
			},
		});
		if (transaction && transaction.subscriptionId) {
			const subsData = await stripe.subscriptions.retrieve(
				transaction.subscriptionId
			);
			if (subsData.status === "active") {
				return {
					status: "active",
				};
			} else {
				return {
					status: "inactive",
				};
			}
		}
	} catch (error) {
		return {
			status: "error",
			message: "Something went wrong",
		};
	}
};

export const createCustomerPortal = async () => {
	const session = await auth();

	if (session?.user?.email) {
		try {
			const transaction = await prisma.transaction.findFirst({
				where: {
					email: session.user.email,
				},
			});
			if (transaction) {
				const portal = await stripe.billingPortal.sessions.create({
					customer: transaction.customerId,
					return_url: `${process.env.WEB_URL}/dashboard`,
				});
				return {
					url: portal.url ?? `${process.env.WEB_URL}/dashboard`,
				};
			}
		} catch (error) {
			console.log(error);
			return {
				status: "error",
				message: "Failed to create customer portal",
			};
		}
	}
};

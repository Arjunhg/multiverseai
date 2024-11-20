import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-10-28.acacia",
});

export async function POST(req: NextRequest) {
    // Trim any whitespace from the webhook secret
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!.trim();
    const sig = req.headers.get("stripe-signature");
    
    // Get raw body as buffer
    const body = await req.text();

    try {
        const event = stripe.webhooks.constructEvent(
            body,
            sig!,
            webhookSecret
        );

        if (event.type === "checkout.session.completed") {
            const session = event.data.object as Stripe.Checkout.Session;

            const transaction = await prisma.transaction.create({
                data: {
                    amount: session.amount_total ? session.amount_total / 100 : 0,
                    customerId: session.customer as string ?? '',
                    email: session.customer_email ?? '',
                    invoiceId: session.invoice as string ?? '',
                    mode: session.mode ?? 'unknown',
                    paymentStatus: session.payment_status ?? 'unknown',
                    sessionId: session.id,
                    status: session.status ?? 'unknown',
                    subscriptionId: session.subscription as string ?? '',
                },
            });

            console.log('Transaction created:', transaction);
            return NextResponse.json("Checkout session completed", { status: 201 });
        }

        return NextResponse.json("Unhandled event type", { status: 200 });
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json("Something went wrong", { status: 500 });
    }
}
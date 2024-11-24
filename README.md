## YouTube Link

https://youtu.be/6gQd65IDabk?si=w4QxbSpo7s7NB_Ef

## Project Overview

Here’s a screenshot of the application:

![Project Screenshot](Dash.png)


This project demonstrates the integration of multiple functionalities within a single application. Built with **Next.js**, it seamlessly combines various features and leverages external APIs, such as **GEMINI AI**, to provide robust solutions like text-to-text generation.

### Key Features

1. **User Authentication**:  
   Users can sign up or log in using their GitHub credentials.

2. **Dashboard Access**:  
   A centralized dashboard where users can explore and utilize services, such as:  
   - **Blog Creation**  
   - **Script Generation**  
   - **Code Generation**

3. **Service Functionality**:  
   Each service includes input fields tailored to specific content types, generating outputs based on user-provided input.

4. **Credits System**:  
   Users are allocated **10,000 credits** by default. Upon reaching this limit, they are prompted to upgrade their plan to continue using the services.

---

## Getting Started

Follow these steps to set up and run the project locally:

### Prerequisites

Ensure you have the following before starting:
- **Node.js** (v14 or later) and npm installed.
- Access to the required external APIs (GEMINI, GitHub, Google, Stripe).
- A PostgreSQL database instance.

### Configuration

Populate the `.env` file in the root directory with the following keys:

   ```bash
   GOOGLE_GEMINI_API_KEY="Your GEMINI API Key from the GEMINI AI Console"
   AUTH_SECRET="Your authentication secret"

   AUTH_GITHUB_ID="Your GitHub Client ID from GitHub Developer Console"
   AUTH_GITHUB_SECRET="Your GitHub Client Secret"

   AUTH_GOOGLE_ID="Your Google Client ID from Google Console"
   AUTH_GOOGLE_SECRET="Your Google Client Secret"

   DATABASE_URL="Your PostgreSQL connection string"

   STRIPE_PUBLISHABLE_KEY="Your Stripe Publishable Key from Stripe Dashboard"
   STRIPE_WEBHOOK_SECRET="Your Stripe Webhook Secret"

   WEB_URL="Your deployed or local client URL"
   ```

### Installation and Running the Development Server

1. **Install dependencies**:  
   ```bash
   npm install
   ```

2. **Run the development server**:  
   ```bash
   npm run dev
   ```
   This command starts the development server. You can access the application at `http://localhost:3000` in your browser.

### Live Demo

https://multiverseai.vercel.app/
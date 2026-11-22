# SalonBook ? Client

SalonBook is a salon appointment platform. Customers browse services, request a time, and pay after an administrator confirms their appointment. Customer and admin dashboards use real data from the Express API.

## Links

- Client repository: https://github.com/devsumonali/salon_book_client
- Server repository: https://github.com/devsumonali/salon_book_server
- Live website: deployment URL has not been added yet.

## Features

- Active services, six featured services, and categories loaded from MongoDB.
- Search by service name, category checkboxes, and price sorting. Search and category selection work independently and appear in the URL.
- Better Auth email/password and Google authentication. Public registration always creates a customer.
- Protected service details, predefined appointment slots, and duplicate booking prevention.
- Customer overview, personal appointments, pending cancellation, Stripe Checkout, and payment history.
- Admin overview, service image upload and CRUD, appointment confirmation/cancellation, customer blocking, and read-only transactions.
- Editable name, image, and phone for both roles.
- Signed JWTs for Express requests, server-side role checks, revoked-session and blocked-account checks.
- Responsive layouts, loading and error states, confirmation dialogs, and toast feedback.

## Technology

Next.js 16 App Router, React, TypeScript, Tailwind CSS, Better Auth, MongoDB, React Hot Toast, ImgBB, and an Express/Stripe backend.

## Local setup

Use Node.js 22 or newer. Clone both repositories, install their dependencies, and use the **same MongoDB database** for both applications.

    npm install

Copy .env.example to .env.local and fill in the settings locally. Required variable names:

    MONGODB_URI
    BETTER_AUTH_SECRET
    BETTER_AUTH_URL
    NEXT_PUBLIC_BASE_API_URL
    GOOGLE_CLIENT_ID
    GOOGLE_CLIENT_SECRET
    IMGBB_API_KEY
    IMAGE_UPLOAD_URL

Use http://localhost:3000 for BETTER_AUTH_URL, http://localhost:8000 for NEXT_PUBLIC_BASE_API_URL, and ImgBB's image upload endpoint for IMAGE_UPLOAD_URL. Generate a long random Better Auth secret. The old GOOGLE_CLIENT_SCREET_KEY name remains supported for existing local settings; prefer GOOGLE_CLIENT_SECRET for new setups.

Configure the Google OAuth callback as http://localhost:3000/api/auth/callback/google. Add the equivalent HTTPS callback when deploying.

Start the backend using its README, then run the client:

    npm run dev

Open http://localhost:3000. For production:

    npm run build
    npm start

## Where the code lives

    src/app/(root)/                          Public pages, service details and checkout
    src/app/(dashboard)/dashboard/admin/    Admin pages and role guard
    src/app/(dashboard)/dashboard/customer/ Customer pages and role guard
    src/app/(dashboard)/_components/admin/  All admin-specific UI components
    src/app/(dashboard)/_components/        Shared dashboard and customer components
    src/lib/api/                            Typed data-fetching functions
    src/lib/actions/                        Server actions for changes
    src/lib/auth.ts                         Better Auth and JWT configuration
    src/lib/auth-session.ts                 Session guards and server-side JWT access
    src/types/                              API response types
    src/app/api/upload/route.ts             ImgBB upload proxy; API key stays private

Follow the same flow when adding a feature: **page ? API fetch function ? Express route**. For changes submitted from a client component, call a function in src/lib/actions/; it obtains the JWT on the server and calls the protected API. The Express backend verifies the signature, current session, role, and blocked status.

Both /service/[id] and the assignment route /services/[id] work. Service cards use /services/[id]. Browse services is /service.

## Payment and administrator setup

Request an appointment as a customer. Confirm it through the admin dashboard. The customer can then click **Pay Now**. Only a signed Stripe webhook updates the database to Paid and creates a transaction; visiting the success page does not change payment state. See the server README for webhook setup and test commands.

Register an ordinary account, then run the private make-admin script from the server repository to assign its admin role. Sign in again afterward. Do not put evaluation passwords or environment secrets in this README.

## Verification

    npx next typegen
    npx tsc --noEmit --incremental false
    npm run build

The server repository contains automated integration checks for both roles, services, appointments, Stripe test Checkout, signed webhook handling, profile permissions, account blocking, and dashboard rendering.

## Deployment checklist

Deploy Next.js with its server runtime and deploy Express separately. Set the deployed client origin in BETTER_AUTH_URL, server CLIENT_URL, and server AUTH_URL; set the deployed backend origin in NEXT_PUBLIC_BASE_API_URL. Both applications must use the same MongoDB database. Redeploy the client after changing a public environment variable.

Configure the production Google callback and Stripe webhook endpoint. Verify sign-in, refreshing private routes, all dashboard roles, image upload, and a complete Stripe test-card payment on the deployed URLs. Add the real live website link above before submission. Keep .env files private; .env.example contains no secrets.

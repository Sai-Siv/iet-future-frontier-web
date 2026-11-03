# IET 360° Website

Website and registration API for IET 360° (4 & 5 December 2026, VIT-AP University), organized by IET Hyderabad Local Network.

- **Frontend:** React, TypeScript, Vite and Tailwind, deployed on Vercel
- **Backend:** Express with an MVC structure, deployed on Render
- **Services:** Firestore (data), Cloudinary (uploaded files), Resend (confirmation emails)

## Project structure

```
├── src/                     # Frontend
│   ├── components/          # Shared and page-section components (ui/ holds shadcn primitives)
│   ├── config/              # API base URL
│   ├── data/                # Static content, such as the award questions
│   ├── pages/               # One component per route
│   └── styles/              # Global CSS
├── public/                  # Static assets
├── firestore.rules          # Denies all direct database access
├── vercel.json              # Frontend routing and security headers
└── backend/
    ├── server.js            # Entry point: starts the HTTP server
    ├── tests/               # API tests (no real external services are called)
    └── src/
        ├── app.js           # Express app and middleware order
        ├── config/          # Environment, CORS, Firebase, Cloudinary
        ├── routes/          # URL to middleware and controller mapping
        ├── middlewares/     # Rate limiting, uploads, sanitizing, validation, errors
        ├── validators/      # Field rules for each registration form
        ├── controllers/     # Request handling for each event
        ├── models/          # Record format and Firestore access
        ├── views/           # JSON responses and the confirmation email
        ├── services/        # Cloudinary uploads and email sending
        └── utils/           # Small shared helpers
```

A request flows through `routes` → `middlewares` and `validators` → `controllers` → `models` and `services` → `views`.

## Setup

```bash
# Frontend
cp .env.example .env
npm install
npm run dev              # http://localhost:8080

# Backend
cd backend
cp .env.example .env     # then fill in the values
npm install
npm run dev              # http://localhost:5000
npm test
```

The backend refuses to start if a required environment variable is missing. See [backend/.env.example](backend/.env.example) for the full list.

## API

| Method | Path | Body |
|--------|------|------|
| POST | `/api/appastral/register` | Multipart form |
| POST | `/api/awards/register` | Multipart form |
| POST | `/api/innothon/register` | JSON, with a base64 screenshot |
| POST | `/api/patn/register` | Closed: always returns 403 |
| POST | `/api/protoplan/register` | Multipart form |
| GET | `/health` | None |

Responses have the shape `{ "success": boolean, "message": string, "data"?: object }`.

There are deliberately no endpoints for reading registrations. Organizers view them in the Firebase Console.

## Security

- **Database:** only the backend can access Firestore, through the Admin SDK. `firestore.rules` denies everything else.
- **Input:** every form is validated on the server, unsafe keys are dropped, and answer sizes are limited.
- **Uploads:** only PDF, JPG, JPEG and PNG, up to 10 MB per file. Payment screenshots must be images. File contents are checked against the declared type.
- **Abuse protection:** rate limits per IP address, an origin allowlist for CORS, and Helmet security headers.
- **Errors and logs:** unexpected errors return a generic message, and registrant data is not logged.

Never commit `.env` files or Firebase service account keys. Uploaded files are served from public Cloudinary URLs with random names.

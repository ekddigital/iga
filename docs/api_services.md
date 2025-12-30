# API & Paid Services Inventory

This file consolidates the APIs and third-party services referenced across the project docs (`checklist.md`, `requirement0.md`, `requirements.md`, `technical-spec.md`) so decisions and cost notes are in one place.

## Project-chosen / Formal Tech-spec Services

These services are explicitly listed in the project's technical specification and requirements documents and should be considered the primary integrations for MVP and near-term phases.

- Payments: **Stripe**

  - Purpose: payment intents, checkout, webhooks, subscriptions. (Technical spec lists Stripe for payments.)
  - Cost: per-transaction fees; no heavy monthly cost for standard use.
  - Notes: Implement `/api/pay` and `/api/pay/webhook` endpoints as in the technical spec.

- Email: **Resend** (specified in technical spec)

  - Purpose: transactional emails (booking confirmations, inquiry notifications).
  - Cost: free or low-cost starter tier; scales with volume.
  - Notes: keep templates in admin and wire up server-side helpers (`lib/email.ts`).

- File Storage: **Cloudflare R2**

  - Purpose: store uploaded documents and images (technical spec and checklist reference R2). Preferable for cost and S3-compatible API.
  - Cost: pay for storage and egress; free tier options limited.
  - Notes: implement server-side upload route (`/api/upload`) using signed uploads or server proxy.

- Auth: **NextAuth.js**

  - Purpose: session management and admin auth (specified in checklist/tech spec).
  - Cost: open source; provider app credentials (Google, GitHub) required.

- DB / ORM: **MySQL** + **Prisma**

  - Purpose: structured data storage for users, bookings, ops, posts, uploads (Prisma schema in technical spec).

- Rich Text Editor: **Tiptap**

  - Purpose: blog editor and post content storage (technical spec).

- Hosting: **Vercel**
  - Purpose: host Next.js app (technical spec). Integrates with environment variables and webhooks.

## Additional Recommended Integrations (from checklist & requirements)

- Calendar / Booking

  - Google Calendar API — sync booked consultations with calendars; recommended for users with Google accounts.
  - Calendly — hosted scheduling UI and easier team scheduling; paid for team features.
  - Microsoft Graph (Outlook Calendar) — if Outlook/Office365 users need sync.

- Document / Media Handling

  - For video: prefer hosting on YouTube/Vimeo and embedding (cost-effective as discussed in requirement0).
  - For images/documents: Cloudflare R2 + optional CDN or Cloudinary for optimization if image-heavy.

- Email alternatives / deliverability

  - Amazon SES — lower-cost option at scale; consider if Resend limits are reached.
  - SendGrid / Mailgun — alternatives with robust deliverability tools.

- SMS / Notifications

  - Twilio — transactional SMS (booking confirmations, 2FA). Pay-per-message.

- Analytics & Monitoring

  - Google Analytics / GA4 — site analytics (requirements mention analytics).
  - Sentry — error monitoring (recommended for production).

- CAPTCHA & Bot Protection

  - Google reCAPTCHA — protect forms (contact, booking, uploads).

- OCR / Document Processing (optional)
  - If later required to parse uploaded documents: AWS Textract / Google Cloud Vision / Azure Form Recognizer.

## API Endpoints (as defined in technical spec)

Keep these server routes in sync with chosen providers and webhooks:

- `/api/ops` (+`/:id`) — opportunities CRUD
- `/api/bookings` (+`/:id`) — create bookings, update status, list (webhook to create calendar event, send email)
- `/api/inquiries` (+`/:id`) — contact/partnership inquiries
- `/api/posts` (+`/:id`) — blog CRUD
- `/api/upload` — upload files to R2 (signed URLs or server proxy)
- `/api/pay` — create Stripe payment intent
- `/api/pay/webhook` — Stripe webhook handler

## Costs & Prioritization Guidance

- MVP: focus on Stripe + Resend + Cloudflare R2 + NextAuth + Prisma/MySQL + Vercel. Use free/low tiers where possible.
- Booking calendar: start with Calendly (fast) or build lightweight booking form that creates a Google Calendar event (lower recurring cost, more dev work).
- Document upload: use R2 with size/type limits to control costs and abuse.
- Video: avoid paid video hosting — embed YouTube/Vimeo links instead.

## Security & Compliance Notes

- Ensure uploads are scanned (file type/size) and stored privately by default. Provide signed download URLs.
- Store secrets in environment variables (Vercel env, R2 keys, Stripe keys, Resend key).
- Add CAPTCHA to public forms and rate-limit upload endpoints.

---

## Estimated Pricing (as of Dec 2025) — Yearly

| Service / API              | Free Tier                              | Paid Pricing (Approx. Yearly)                         | Notes                                                   |
| -------------------------- | -------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------- |
| **Stripe**                 | No annual fee                          | 2.9% + $0.30 per successful card charge               | Standard rate; lower for high volume. International +1% |
| **Resend** (Email)         | 3,000 emails/month free                | ~$200/yr for 50k emails/mo tier                       | Good for transactional mail; easy API                   |
| **Cloudflare R2**          | 10 GB storage, 10M reads free          | ~$0.18/GB/yr storage; $0.36/million Class A ops       | No egress fees; S3-compatible                           |
| **Vercel** (Hosting)       | Hobby: free (personal, non-commercial) | Pro: ~$240/user/yr; Team: ~$300/user/yr               | Includes preview deploys, analytics, edge functions     |
| **MySQL** (PlanetScale)    | 5 GB, 1B row reads free                | Scaler: ~$348/yr; Pro scales with usage               | Serverless MySQL; Prisma-compatible                     |
| **MySQL** (Railway)        | $5 free credit/mo                      | ~$60–240/yr for small DBs                             | Easy deploy; usage-based                                |
| **NextAuth.js**            | Free (open source)                     | —                                                     | Needs OAuth provider apps (Google, GitHub — free)       |
| **Tiptap** (Editor)        | Free (open source core)                | Tiptap Cloud (collab): ~$348/yr                       | Core is free; paid for real-time collab                 |
| **Google Calendar API**    | Free (within quota)                    | Billing kicks in at very high volume                  | Use for booking sync                                    |
| **Calendly**               | Free: 1 event type                     | Essentials: ~$96/user/yr; Professional: ~$144/user/yr | Faster to integrate; paid for team/branding             |
| **Google Analytics (GA4)** | Free                                   | GA360: enterprise pricing                             | Free tier sufficient for most sites                     |
| **Sentry**                 | 5k errors/mo free                      | Team: ~$312/yr for 50k; Business: ~$960/yr            | Error monitoring; highly recommended                    |
| **Twilio** (SMS)           | —                                      | ~$0.0079/SMS (US); varies by country                  | Pay-per-message; good global coverage                   |
| **Google reCAPTCHA**       | Free (v2/v3)                           | Enterprise: $1/1k assessments after 1M free           | Free tier covers most use cases                         |
| **Cloudinary** (optional)  | 25 credits/mo (~25 GB)                 | Plus: ~$1,068/yr for 225 credits                      | Use if heavy image optimization needed                  |
| **AWS Textract** (OCR)     | 1k pages/mo free (first 3 mo)          | $1.50 per 1k pages (forms); $15/1k for tables         | Only if document parsing is required                    |
| **SendGrid** (alt email)   | 100 emails/day free                    | Essentials: ~$240/yr for 50k                          | Alternative to Resend                                   |
| **Amazon SES** (alt email) | 62k emails/mo free (from EC2)          | $0.10 per 1k emails                                   | Very cheap at scale                                     |

> **Tip:** Start with free tiers during MVP; upgrade as traffic and usage grow. Keep an eye on Stripe transaction volume — it's the main variable cost early on.

---

## Action Items / Questions (what I still need from you)

- Confirm target regions (for local payment gateway options).
- Confirm number of admin users and roles (affects Auth and billing for team features).
- Decide: hosted scheduling (Calendly) or in-house booking with Google Calendar sync.
- Decide a target consultation fee or price range so we can wire pricing and Checkout flow.

---

Update this file as vendor choices firm up; it's the single source-of-truth for paid APIs and integration notes.

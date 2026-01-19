# Inspire Global Access — Technical Specification

## 1. Tech Stack

| Layer        | Technology              |
| ------------ | ----------------------- |
| Framework    | Next.js 16 (App Router) |
| Language     | TypeScript              |
| Styling      | Tailwind CSS            |
| Database     | MySQL                   |
| ORM          | Prisma                  |
| Auth         | NextAuth.js             |
| Payments     | Stripe                  |
| Email        | Resend                  |
| File Storage | Cloudflare R2           |
| Rich Text    | Tiptap                  |
| Hosting      | Vercel                  |

---

## 2. Project Structure

```
src/
├── app/
│   ├── (public)/                    # Public pages (no auth)
│   │   ├── page.tsx                 # Home
│   │   ├── about/page.tsx
│   │   ├── services/
│   │   │   ├── page.tsx             # Services overview
│   │   │   ├── education/page.tsx
│   │   │   ├── employment/page.tsx
│   │   │   ├── travel/page.tsx
│   │   │   └── trade/page.tsx
│   │   ├── how/page.tsx             # How it works
│   │   ├── ops/page.tsx             # Opportunities
│   │   ├── book/page.tsx            # Booking
│   │   ├── partners/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── privacy/page.tsx
│   │   └── terms/page.tsx
│   │
│   ├── (admin)/                     # Admin dashboard (auth required)
│   │   ├── layout.tsx
│   │   ├── dash/page.tsx            # Dashboard home
│   │   ├── ops/                     # Manage opportunities
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── bookings/page.tsx
│   │   ├── inquiries/page.tsx
│   │   ├── posts/                   # Blog management
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/page.tsx
│   │   └── users/page.tsx
│   │
│   ├── api/                         # RESTful API
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── ops/
│   │   │   ├── route.ts             # GET (list), POST (create)
│   │   │   └── [id]/route.ts        # GET, PUT, DELETE
│   │   ├── bookings/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── inquiries/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── posts/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── upload/route.ts
│   │   └── pay/
│   │       ├── route.ts             # Create payment intent
│   │       └── webhook/route.ts     # Stripe webhook
│   │
│   ├── layout.tsx                   # Root layout
│   └── globals.css
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Nav.tsx
│   │   └── AdminNav.tsx
│   ├── ui/
│   │   ├── Btn.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Modal.tsx
│   │   ├── Badge.tsx
│   │   └── Loading.tsx
│   ├── forms/
│   │   ├── ContactForm.tsx
│   │   ├── BookingForm.tsx
│   │   ├── PartnerForm.tsx
│   │   └── OpForm.tsx
│   ├── blog/
│   │   ├── Editor.tsx               # Rich text editor (Tiptap)
│   │   ├── EditorToolbar.tsx        # Editor toolbar
│   │   ├── PostForm.tsx             # Blog post form
│   │   └── PostPreview.tsx          # Post preview
│   ├── cards/
│   │   ├── ServiceCard.tsx
│   │   ├── OpCard.tsx
│   │   ├── PostCard.tsx
│   │   └── StepCard.tsx
│   └── shared/
│       ├── Hero.tsx
│       ├── CTA.tsx
│       ├── Disclaimer.tsx
│       └── TrustBadge.tsx
│
├── lib/
│   ├── db.ts                        # Prisma client
│   ├── auth.ts                      # NextAuth config
│   ├── stripe.ts                    # Stripe client
│   ├── email.ts                     # Email helpers
│   ├── upload.ts                    # File upload helpers
│   └── utils.ts                     # General utilities
│
├── types/
│   └── index.ts                     # Shared TypeScript types
│
├── hooks/
│   ├── useForm.ts
│   └── useAuth.ts
│
└── constants/
    ├── nav.ts                       # Navigation items
    ├── services.ts                  # Service definitions
    └── config.ts                    # App config
```

---

## 3. Database Schema (Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

// ============ USERS ============

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  password  String
  role      Role     @default(ADMIN)
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  posts    Post[]
  @@map("users")
}

enum Role {
  ADMIN
  EDITOR
}

// ============ OPPORTUNITIES ============

model Op {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  category    OpCat
  location    String
  partner     String
  desc        String   @db.Text
  reqs        String   @db.Text        // JSON array as string
  deadline    DateTime?
  isActive    Boolean  @default(true)  @map("is_active")
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  @@map("ops")
}

enum OpCat {
  EDUCATION
  EMPLOYMENT
  TRAVEL
  TRADE
}

// ============ BOOKINGS ============

model Booking {
  id        String      @id @default(cuid())
  name      String
  email     String
  phone     String
  country   String
  type      BookingType
  date      DateTime
  message   String?     @db.Text
  status    BookingStatus @default(PENDING)
  paymentId String?     @map("payment_id")
  paidAt    DateTime?   @map("paid_at")
  createdAt DateTime    @default(now()) @map("created_at")
  updatedAt DateTime    @updatedAt @map("updated_at")

  @@map("bookings")
}

enum BookingType {
  EDUCATION
  EMPLOYMENT
  TRAVEL
  TRADE
  PARTNERSHIP
}

enum BookingStatus {
  PENDING
  CONFIRMED
  CANCELLED
  COMPLETED
}

// ============ INQUIRIES ============

model Inquiry {
  id        String      @id @default(cuid())
  name      String
  email     String
  phone     String?
  country   String
  subject   String?
  message   String      @db.Text
  type      InquiryType @default(GENERAL)
  isRead    Boolean     @default(false) @map("is_read")
  createdAt DateTime    @default(now()) @map("created_at")

  @@map("inquiries")
}

enum InquiryType {
  GENERAL
  PARTNERSHIP
}

// ============ BLOG ============

model Post {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  excerpt     String?  @db.Text
  content     String   @db.LongText      // Tiptap JSON or HTML
  image       String?                     // Featured image URL
  metaTitle   String?  @map("meta_title") // SEO title
  metaDesc    String?  @db.Text @map("meta_desc") // SEO description
  isPublished Boolean  @default(false) @map("is_published")
  publishedAt DateTime? @map("published_at")
  authorId    String   @map("author_id")
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  author    User     @relation(fields: [authorId], references: [id])
  tags      PostTag[]

  @@map("posts")
}

model Tag {
  id    String    @id @default(cuid())
  name  String    @unique
  slug  String    @unique
  posts PostTag[]

  @@map("tags")
}

model PostTag {
  postId String @map("post_id")
  tagId  String @map("tag_id")

  post Post @relation(fields: [postId], references: [id], onDelete: Cascade)
  tag  Tag  @relation(fields: [tagId], references: [id], onDelete: Cascade)

  @@id([postId, tagId])
  @@map("post_tags")
}

// ============ UPLOADS ============

model Upload {
  id        String   @id @default(cuid())
  name      String
  url       String
  type      String
  size      Int
  createdAt DateTime @default(now()) @map("created_at")

  @@map("uploads")
}
```

---

## 4. API Endpoints

### Naming Convention

- Short, lowercase paths
- RESTful verbs via HTTP methods
- Plural nouns for collections

### Endpoints

| Method            | Path                 | Description            |
| ----------------- | -------------------- | ---------------------- |
| **Opportunities** |                      |                        |
| GET               | `/api/ops`           | List all opportunities |
| GET               | `/api/ops/:id`       | Get single opportunity |
| POST              | `/api/ops`           | Create opportunity     |
| PUT               | `/api/ops/:id`       | Update opportunity     |
| DELETE            | `/api/ops/:id`       | Delete opportunity     |
| **Bookings**      |                      |                        |
| GET               | `/api/bookings`      | List bookings          |
| GET               | `/api/bookings/:id`  | Get booking            |
| POST              | `/api/bookings`      | Create booking         |
| PUT               | `/api/bookings/:id`  | Update booking status  |
| DELETE            | `/api/bookings/:id`  | Delete booking         |
| **Inquiries**     |                      |                        |
| GET               | `/api/inquiries`     | List inquiries         |
| GET               | `/api/inquiries/:id` | Get inquiry            |
| POST              | `/api/inquiries`     | Submit inquiry         |
| PUT               | `/api/inquiries/:id` | Mark as read           |
| DELETE            | `/api/inquiries/:id` | Delete inquiry         |
| **Blog**          |                      |                        |
| GET               | `/api/posts`         | List posts             |
| GET               | `/api/posts/:id`     | Get post               |
| POST              | `/api/posts`         | Create post            |
| PUT               | `/api/posts/:id`     | Update post            |
| DELETE            | `/api/posts/:id`     | Delete post            |
| **Payments**      |                      |                        |
| POST              | `/api/pay`           | Create payment intent  |
| POST              | `/api/pay/webhook`   | Stripe webhook         |
| **Uploads**       |                      |                        |
| POST              | `/api/upload`        | Upload file            |

---

## 5. Route Groups

| Group      | Purpose                 | Auth Required |
| ---------- | ----------------------- | ------------- |
| `(public)` | All public-facing pages | No            |
| `(admin)`  | Admin dashboard         | Yes           |

---

## 6. Environment Variables

```env
# Database
DATABASE_URL="mysql://user:password@host:3306/iga_db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Email (Resend)
RESEND_API_KEY="re_..."

# File Storage (Cloudflare R2)
R2_ACCOUNT_ID="..."
R2_ACCESS_KEY_ID="..."
R2_SECRET_ACCESS_KEY="..."
R2_BUCKET_NAME="iga-uploads"
R2_PUBLIC_URL="https://..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 7. Security Checklist

- [ ] SSL/TLS enabled
- [ ] Environment variables secured
- [ ] API routes protected (admin only)
- [ ] Input validation (Zod)
- [ ] CSRF protection
- [ ] Rate limiting
- [ ] Secure file upload (type/size validation)
- [ ] SQL injection prevention (Prisma handles)
- [ ] XSS prevention (React handles)

---

## 8. Performance

- [ ] Image optimization (Next.js Image)
- [ ] Dynamic imports for heavy components
- [ ] Database indexing (slug, email, createdAt)
- [ ] API response caching
- [ ] Static generation for public pages
- [ ] CDN for uploads

---

## 9. Naming Conventions

| Type          | Convention      | Example             |
| ------------- | --------------- | ------------------- |
| Files/Folders | kebab-case      | `booking-form.tsx`  |
| Components    | PascalCase      | `BookingForm`       |
| Functions     | camelCase       | `createBooking`     |
| API routes    | lowercase       | `/api/ops`          |
| DB tables     | snake_case      | `post_tags`         |
| DB columns    | snake_case      | `created_at`        |
| Env vars      | SCREAMING_SNAKE | `DATABASE_URL`      |
| Types         | PascalCase      | `BookingStatus`     |
| Short aliases | 3-4 chars       | `ops`, `btn`, `nav` |

---

## 10. Short Naming Reference

| Full Name      | Short  |
| -------------- | ------ |
| Opportunities  | ops    |
| Button         | btn    |
| Navigation     | nav    |
| Description    | desc   |
| Requirements   | reqs   |
| Category       | cat    |
| Configuration  | config |
| Utilities      | utils  |
| Authentication | auth   |
| Administration | admin  |
| Dashboard      | dash   |

---

_Document Version: 1.0_  
_Last Updated: December 29, 2025_

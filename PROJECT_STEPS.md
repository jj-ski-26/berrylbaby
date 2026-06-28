# BerrylBaby — Project Plan

## Overview

A full-stack reservation system for Berryl Baby group sessions (yoga, Pilates, babymassage, etc.), combined with a redesigned public-facing website. Built with Next.js, deployed on Railway, styled in the warm earthy palette of berrylbaby.nl.

---

## Brand & Design Reference

**Colors (from berrylbaby.nl CSS)**
- Primary / accent: `#9b6745` (warm terracotta-brown) — headings, links, buttons
- Background: `#ffffff` (clean white)
- Body text: `#666666` (soft gray)
- Highlight pink: `#e29393` / strong pink `rgb(196,75,75)`
- Soft green: `#c2e2bf` / strong green `rgb(110,178,103)`
- Soft blue: `#86afbf`
- Soft purple: `#bfa1c6`

**Typography**
- Headings: Vidaloka (Google Fonts, serif) — warm and personal
- Body: system sans-serif

**Tone**: warm, personal, feminine, holistic. Professional but intimate. Dutch-language content.

---

## Tech Stack

Matches the Fakebook project exactly, so code and patterns transfer directly.

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 16 (App Router) | Same version as Fakebook |
| Language | TypeScript | Type safety |
| Styling | Tailwind CSS v4 | Same version as Fakebook |
| ORM | Prisma | Type-safe DB access |
| Database | SQLite locally (better-sqlite3) → PostgreSQL on Railway | Same local setup as Fakebook; Railway needs Postgres |
| Auth | Custom cookie-based (`bcryptjs` + `httpOnly` cookie) | Same pattern as Fakebook — no NextAuth needed |
| File uploads | Local `public/uploads/` via `fs.writeFile` | Same as Fakebook — no external service |
| Email | Resend | Transactional emails (new, not in Fakebook) |
| Image gen | Replicate API | Same account & token as Fakebook |
| Deployment | Railway | GitHub integration, auto-deploys (same as Fakebook) |
| Version control | GitHub | CI/CD trigger for Railway |

---

## Database Schema

```prisma
model User {
  id            String        @id @default(cuid())
  name          String
  email         String        @unique
  passwordHash  String
  avatarUrl     String?
  role          Role          @default(USER)
  createdAt     DateTime      @default(now())
  reservations  Reservation[]
  messages      Message[]
  instructorFor Session[]     @relation("Instructor")
}

enum Role {
  USER
  ADMIN
}

model Session {
  id             String        @id @default(cuid())
  title          String
  description    String?
  date           DateTime
  startTime      String        // e.g. "19:30"
  endTime        String        // e.g. "20:30"
  location       String
  maxParticipants Int
  instructorId   String?
  instructor     User?         @relation("Instructor", fields: [instructorId], references: [id])
  createdAt      DateTime      @default(now())
  reservations   Reservation[]
  messages       Message[]
}

model Reservation {
  id        String   @id @default(cuid())
  userId    String
  sessionId String
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
  session   Session  @relation(fields: [sessionId], references: [id])

  @@unique([userId, sessionId])
}

model Message {
  id        String   @id @default(cuid())
  content   String
  userId    String
  sessionId String
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
  session   Session  @relation(fields: [sessionId], references: [id])
}
```

---

## Phase 1 — Project Setup

- [ ] Create GitHub repo `berrylbaby-app`
- [ ] Initialize Next.js 16 project with TypeScript + Tailwind v4 (match Fakebook's `package.json` versions exactly)
- [ ] Configure Tailwind with BerrylBaby color palette and Vidaloka font
- [ ] Set up Railway project: provision PostgreSQL database
- [ ] Connect GitHub repo to Railway (auto-deploy on push to `main`)
- [ ] Set up environment variables in `.env.local`:
  - `DATABASE_URL` — SQLite locally (`file:./dev.db`), PostgreSQL URL on Railway
  - `RESEND_API_KEY`
  - `REPLICATE_API_TOKEN`
  - `COOKIE_SECRET` — random string for signing session cookies
- [ ] Initialize Prisma with SQLite provider locally, run first migration
- [ ] Add `nixpacks.toml` and `railway.json` for Railway deployment (copy from Fakebook)

---

## Phase 2 — Authentication

Same pattern as Fakebook: no NextAuth, just `bcryptjs` + `httpOnly` cookies.

- [ ] Registration page (`/registreer`): naam, e-mailadres, wachtwoord (min. 6 tekens)
- [ ] Login page (`/inloggen`): e-mailadres + wachtwoord
- [ ] Password hashing with `bcryptjs`
- [ ] On login: set `httpOnly` cookie `userId` (1-year expiry), same `COOKIE_OPTS` as Fakebook
- [ ] `lib/auth.ts`: helper to read `userId` from cookies and fetch user from DB
- [ ] Middleware (`middleware.ts`): redirect unauthenticated users to `/inloggen`
- [ ] Role-based access: `USER` vs `ADMIN` — check `user.role` server-side before rendering admin UI
- [ ] Admin can promote a user to admin role via a user management page

---

## Phase 3 — Profile & Avatar

- [ ] Profile page: view and edit name, email, avatar
- [ ] Avatar upload: copy `components/ui/AvatarCrop.tsx` from Fakebook verbatim — circular crop with drag, pinch-to-zoom, canvas export, no library needed
- [ ] Upload API: copy the file-write pattern from Fakebook's `app/api/onboarding/route.ts` — save to `public/uploads/` with `fs.writeFile`, store URL in User record
- [ ] Store `avatarUrl` in User record after upload
- [ ] Default avatar: generated initials fallback (e.g. "BV" for Berryl Victorian)
- [ ] Avatar displayed as circular thumbnail everywhere (week view, session detail, messages)

---

## Phase 4 — Admin: Session Management

- [ ] Admin-only session creation form:
  - Title, description
  - Date picker
  - Start time / end time
  - Location (text field or dropdown of known locations: Almelo, Wierden, online)
  - Max participants
  - Instructor (select from users)
- [ ] Edit and delete sessions
- [ ] View all upcoming sessions in a list
- [ ] Assign admin role to users

---

## Phase 5 — Main View: Week Calendar

This is the homepage for logged-in users.

- [ ] Week view component: Mon → Sun columns
- [ ] Fetch all sessions for the current week
- [ ] Each session card shows:
  - Session title
  - Time (e.g. 19:30 – 20:30)
  - Location
  - Capacity indicator: `🟢 4/10` or `🔴 10/10 VOL`
  - Quick "Reserveer" button (if not already reserved and space available)
- [ ] Navigation: previous week / next week arrows
- [ ] Both users and admins see the same week view
- [ ] Admin sees an additional "edit" icon on each session card

---

## Phase 6 — Session Detail View

Accessible by clicking any session card.

- [ ] Session header: title, date, time, location, instructor name + avatar
- [ ] Participant grid: circular avatars of everyone who reserved
- [ ] Remaining spots shown (e.g. "3 plaatsen beschikbaar")
- [ ] Reserve / Cancel reservation button for logged-in user
- [ ] Message thread (see Phase 7)
- [ ] Admin: edit session, remove participants

---

## Phase 7 — Messaging & Email Notifications

- [ ] Message input at the bottom of the session detail page
- [ ] Messages show: avatar, name, message text, timestamp
- [ ] Sending a message:
  1. Saves to `Message` table
  2. Triggers email notification to **all participants** of that session (via Resend API)
  3. Email includes: sender name, message preview, link to session
- [ ] Unread indicator on session cards in the week view (optional, v2)
- [ ] Email template: styled with BerrylBaby colors, warm tone, Dutch language

**Resend setup**:
```
npm install resend
```
```typescript
// lib/email.ts
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendMessageNotification({ to, senderName, message, sessionTitle, sessionUrl }) {
  await resend.emails.send({
    from: 'BerrylBaby <noreply@berrylbaby.nl>',
    to,
    subject: `Nieuw bericht bij ${sessionTitle}`,
    html: `...` // styled email HTML
  })
}
```

---

## Phase 8 — Website Redesign (Public Pages)

Rebuild the public website within the same Next.js app (`/` route group, no auth required). Same colors and warmth as the current site, but more professional layout with more imagery.

### Pages to rebuild

| Page | Current URL | Content |
|---|---|---|
| Home | `/` | Hero, intro Berryl, classes overview, testimonials |
| Yoga & Pilates | `/yoga` | Class descriptions, schedule teaser |
| Zwangerschapsyoga | `/zwangerschapsyoga` | Pregnancy yoga, partner workshop |
| Dragen | `/dragen` | Babywearing consultation |
| Consult | `/consult` | Pricing, booking info |
| Babymassage | `/babymassage` | Baby massage workshops |
| Fit & in Balans | `/fit-in-balans` | Postpartum yoga/Pilates |
| Contact | `/contact` | Contact form, phone, map |

### Design improvements

- [ ] Full-width hero images on each page (sourced from Unsplash/Pexels: pregnancy yoga, babywearing, massage — free to use commercially)
- [ ] Section layout: alternating image-left/text-right blocks
- [ ] Testimonial carousel (hardcoded initially, pulled from CMS later)
- [ ] Pricing cards for each service
- [ ] Navigation: sticky top bar, mobile hamburger menu
- [ ] Footer: contact details, social links, logo
- [ ] "Meld je aan" CTA buttons linking to the reservation system

### Image sources (free, commercial license)
- Unsplash: `unsplash.com/s/photos/pregnancy-yoga`
- Pexels: `pexels.com/search/baby+yoga`
- Search terms: `pregnancy yoga`, `babywearing`, `baby massage`, `postpartum yoga`, `yoga twente`

### Replicate / AI images
- Use Replicate's `stable-diffusion` or `flux` model to generate any missing bespoke imagery
- Example: warm interior yoga studio, abstract mother-child connection imagery
- API key already available in env vars

---

## Phase 9 — Deployment & Go-Live

- [ ] Verify Railway auto-deploys work on push to `main`
- [ ] Set custom domain: `app.berrylbaby.nl` (or `reserveer.berrylbaby.nl`) in Railway settings
- [ ] Add domain in DNS (point CNAME to Railway's provided hostname)
- [ ] Configure HTTPS (Railway handles this automatically)
- [ ] Set all production environment variables in Railway dashboard
- [ ] Run Prisma migration on production DB (`npx prisma migrate deploy`)
- [ ] Seed initial admin user (Berryl's account)
- [ ] Test full flow: register → reserve session → send message → receive email
- [ ] Test on mobile (Tailwind responsive classes)

---

## Phase 10 — Post-Launch Enhancements (v2)

- [ ] iCal / Google Calendar export for reserved sessions
- [ ] Waitlist when session is full
- [ ] Recurring sessions (repeat weekly)
- [ ] Push notifications (web push API)
- [ ] Admin dashboard with stats (total reservations this month, popular sessions)
- [ ] Online payment integration (Mollie — popular in NL) for paid sessions
- [ ] Multi-language: NL + EN toggle
- [ ] CMS integration (Contentlayer or Sanity) for website content management

---

## Open Questions Before Starting

All questions resolved:

1. ~~Upload service~~ — local `public/uploads/` + `fs.writeFile`; `AvatarCrop.tsx` copied from Fakebook
2. ~~Language~~ — all Dutch
3. ~~Domain~~ — add subdomain after testing
4. ~~Existing users~~ — all self-register
5. ~~Database~~ — SQLite locally (`file:./dev.db`), PostgreSQL on Railway via `DATABASE_URL` env var; Prisma handles both with the same schema

---

## Development Order (recommended)

```
Week 1: Phase 1 + 2 (setup, auth)
Week 2: Phase 3 + 4 (profile, session management)
Week 3: Phase 5 + 6 (week view, session detail)
Week 4: Phase 7 (messaging + email)
Week 5: Phase 8 (website redesign)
Week 6: Phase 9 + testing (deployment + QA)
```

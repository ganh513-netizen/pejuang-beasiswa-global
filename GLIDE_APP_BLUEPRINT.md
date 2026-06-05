# Glide App Blueprint — Pejuang Beasiswa Global Mentoring Platform

## Overview
Cross-platform mobile app built entirely on **Glide Apps** using **Glide Native Internal Tables**.  
Target audience: Indonesian students seeking UK scholarships + Indonesian mentors based in the UK.

---

## PART 1 — GLIDE INTERNAL TABLE SCHEMA

### Table 1: `Users`
| Column Name | Type | Notes |
|---|---|---|
| Row ID | Row ID (auto) | Primary key |
| Full Name | Text | From sign-in |
| Email | Email | Glide Auth email |
| WhatsApp Number | Phone | Used for booking contact |
| Role | Choice | Options: `Student`, `Mentor` |
| Subscription Status | Choice | Options: `Free User`, `Active Subscriber` |
| Subscription Expiry Date | Date/Time | Set on payment confirmation |
| Profile Picture | Image | Optional upload |
| Created At | Date/Time (auto) | Auto-filled on row creation |

> **Visibility rule:** `Subscription Status` drives all access gates app-wide.

---

### Table 2: `Mentors`
| Column Name | Type | Notes |
|---|---|---|
| Row ID | Row ID (auto) | Primary key |
| Mentor ID | Text | Custom ID e.g. `MNT-001` |
| Full Name | Text | |
| UK University / Company | Text | e.g. University of Oxford, McKinsey London |
| Field of Study | Text | e.g. Public Policy, Engineering |
| Areas of Expertise | Text (Multi-value or Tags) | e.g. IELTS Academic, LPDP Essay Review, Chevening Interview Simulation, CV Review, SOP Writing |
| Rate per Hour (IDR) | Number | e.g. 200000 |
| Availability Status | Choice | Options: `Available`, `Fully Booked`, `On Leave` |
| Short Bio | Text (long) | 2–3 sentence intro |
| Profile Picture | Image | |
| LinkedIn URL | URL | Optional |
| Total Sessions | Number | Computed or manually updated |

---

### Table 3: `Bookings`
| Column Name | Type | Notes |
|---|---|---|
| Row ID | Row ID (auto) | Primary key |
| Booking ID | Text | e.g. `BKG-20260001` — use Template column |
| Student (Relation) | Relation → Users | Links to the student who booked |
| Student Name | Lookup | From Users.Full Name |
| WhatsApp Number | Lookup | From Users.WhatsApp Number |
| Selected Mentor (Relation) | Relation → Mentors | |
| Mentor Name | Lookup | From Mentors.Full Name |
| Session Date & Time | Date/Time | Student input |
| Session Duration (hours) | Number | Default: 1 |
| Estimated Cost (IDR) | Math column | `Session Duration × 200000` |
| Special Goals / Notes | Text (long) | Student input |
| Payment Status | Choice | Options: `Pending`, `Confirmed`, `Completed`, `Cancelled` |
| Payment Reference | Text | Student pastes Midtrans/Xendit ref number |
| Escrow Released | Boolean | Admin toggles true when session completed |
| Created At | Date/Time (auto) | |

---

### Table 4: `EssayVault`
| Column Name | Type | Notes |
|---|---|---|
| Row ID | Row ID (auto) | |
| Title | Text | e.g. "LPDP Essay — Rencana Studi 2024" |
| Scholarship Type | Choice | LPDP, Chevening, DAAD, AAS, etc. |
| Author Alias | Text | Anonymized, e.g. "Alumni Oxford 2023" |
| University Admitted | Text | |
| Essay Content | Text (long) | Full essay text |
| File Attachment | File | PDF optional |
| Tags | Text | |
| Visibility | Choice | `Premium Only` (default) |

---

### Table 5: `Webinars`
| Column Name | Type | Notes |
|---|---|---|
| Row ID | Row ID (auto) | |
| Title | Text | |
| Speaker | Relation → Mentors | Optional |
| Date & Time | Date/Time | |
| Zoom / Meet Link | URL | |
| Description | Text (long) | |
| Recording Link | URL | Post-event |
| Visibility | Choice | `Premium Only` |

---

## PART 2 — APP SCREENS & NAVIGATION

### Bottom Tab Navigation
```
[ Home ]  [ Mentors ]  [ My Bookings ]  [ Resources ]  [ Profile ]
```

---

### Screen 1: Home / Dashboard
**Layout:** Custom collection with hero banner + info cards.

**Sections:**
1. **Welcome Banner** — "Selamat datang, [User Name]!" + subscription badge chip (Free / Active)
2. **Premium Membership Card** — IDR 20.000/bulan
   - Benefits list:
     - ✓ UK Mentor Directory Access
     - ✓ Vault of Successful Essays
     - ✓ Monthly Live Webinars
   - Button: **"Subscribe Now"** → opens Action: Open URL → `[Your Midtrans/Xendit payment link]`
   - Visibility condition: `Users.Subscription Status = Free User`
3. **Active Subscriber Welcome** — shown when `Subscription Status = Active Subscriber`
   - Next webinar card
   - Quick stats: sessions completed, essays saved
4. **Upcoming Webinars** — inline list (max 2 items) → links to Webinars screen

---

### Screen 2: Mentor Directory
**Visibility / Access Gate:**
- Screen-level condition: `Logged-in User → Users.Subscription Status = Active Subscriber`
- If Free User: show a locked overlay component with "Upgrade to Premium" CTA button

**Layout:** Card collection (2-column grid)
- Each card shows: Profile Picture, Full Name, UK University, Areas of Expertise (tags), Rate, Availability badge

**Filters (Glide Filter Bar):**
- Filter 1: UK University / Company
- Filter 2: Areas of Expertise (multi-select)
- Filter 3: Availability Status

**Detail Screen (Mentor Profile):**
- Full profile: photo, bio, university, field, expertise tags, rate, LinkedIn
- Availability badge (color: green/red/grey)
- **"Book a 1-on-1 Session"** button → navigates to Booking Form with mentor pre-filled

---

### Screen 3: Book a Session (Form)
**Access Gate:** `Subscription Status = Active Subscriber`

**Form fields:**
- Student Name — auto-filled from `Users.Full Name` (read-only)
- WhatsApp Number — auto-filled from `Users.WhatsApp Number` (editable)
- Selected Mentor — pre-filled if coming from Mentor Profile; otherwise picker
- Session Date & Time — Date/Time picker
- Session Duration — Number (default 1)
- Estimated Cost — computed display label: "Estimasi biaya: IDR [amount]"
- Special Goals / Notes — long text area

**Info Banner inside form:**
> "Semua sesi 1-on-1 rata-rata IDR 200.000/jam. Setelah submit, Anda akan menerima link pembayaran via WhatsApp. Platform kami menggunakan **100% Escrow Safety Guarantee** — dana Anda aman dan hanya dicairkan ke mentor setelah sesi selesai."

**Submit action:**
1. Add Row to `Bookings` table
2. Set `Payment Status = Pending`
3. Show confirmation notification: "Booking berhasil! Tim kami akan menghubungi Anda segera via WhatsApp."

---

### Screen 4: My Bookings
**Source:** `Bookings` table filtered by `Student = Logged-in User`

**Layout:** Inline list
- Shows: Mentor Name, Session Date, Status badge (color-coded), Estimated Cost

**Detail View:**
- All booking fields
- Payment Reference input (student can paste ref after paying)
- Status timeline indicator

---

### Screen 5: Resources
Two tabs inside:

**Tab A — Essay Vault**
- Access Gate: `Subscription Status = Active Subscriber`
- Source: `EssayVault` table
- Filters: Scholarship Type
- Card layout: Title, Scholarship Type, University, Author Alias
- Detail: full essay text + file download button

**Tab B — Webinars**
- Access Gate: `Subscription Status = Active Subscriber`
- Source: `Webinars` table
- Cards: Title, Speaker, Date/Time
- Detail: description + Zoom link + recording (if available)

---

### Screen 6: Profile
- Avatar, Full Name, Email, WhatsApp (editable)
- Subscription status badge + expiry date
- "Upgrade to Premium" button (if Free User)
- "Sign Out" button

---

## PART 3 — ACCESS CONTROL LOGIC

### Glide Visibility Conditions Summary
| Component | Show When |
|---|---|
| "Subscribe Now" button | `usersRow.Subscription Status = Free User` |
| Mentor Directory screen | `usersRow.Subscription Status = Active Subscriber` |
| Booking form | `usersRow.Subscription Status = Active Subscriber` |
| Essay Vault tab | `usersRow.Subscription Status = Active Subscriber` |
| Webinars tab | `usersRow.Subscription Status = Active Subscriber` |
| Locked overlay | `usersRow.Subscription Status = Free User` |

### Row Ownership
- Enable **Row Owners** on `Users` table: set `Email` column as row owner.
- Enable Row Owners on `Bookings`: set `Student` relation's email as row owner so students only see their own bookings.

---

## PART 4 — PAYMENT INTEGRATION NOTES

### Subscription (IDR 20.000/month)
- Use Midtrans Snap or Xendit Invoice Link (static payment link is simplest for Glide).
- On payment confirmation: manually or via Zapier/Make webhook → update `Users.Subscription Status = Active Subscriber` + set `Subscription Expiry Date = today + 30 days`.

### Session Booking (IDR 200.000/hour avg)
- After booking submission (Status = Pending), admin sends unique payment link to student via WhatsApp.
- Student pastes Payment Reference into the booking detail form.
- Admin verifies and sets `Payment Status = Confirmed`.
- After session completed: admin sets `Payment Status = Completed` + `Escrow Released = true` → mentor gets paid.

---

## PART 5 — COMPUTED / TEMPLATE COLUMNS

### In `Bookings` table:
- **Booking ID** (Template column): `BKG-` + `Row ID` (padded)
- **Estimated Cost** (Math column): `Session Duration × 200000`
- **Mentor Name** (Lookup): via `Selected Mentor` relation → `Mentors.Full Name`
- **Student Name** (Lookup): via `Student` relation → `Users.Full Name`

### In `Users` table:
- **Is Subscriber** (If-Then-Else or Boolean): `Subscription Status = Active Subscriber` → `true`

---

## PART 6 — GLIDE SETUP CHECKLIST

- [ ] Create Glide App from blank (Internal Tables mode)
- [ ] Create all 5 tables above with exact columns
- [ ] Enable Glide Auth (Email sign-in)
- [ ] Set Row Owners on Users and Bookings tables
- [ ] Build 6 screens with layouts above
- [ ] Add visibility conditions per Part 3
- [ ] Add payment URL to "Subscribe Now" button
- [ ] Configure Booking form with auto-fill and computed columns
- [ ] Add Filter components to Mentor Directory
- [ ] Test with Free User vs Active Subscriber accounts
- [ ] (Optional) Set up Make/Zapier webhook to auto-update subscription status on payment

---

## PART 7 — BRANDING SUGGESTIONS

- **App Name:** PejuangBeasiswa Global
- **Primary Color:** Deep navy `#1A2F5E` (trust + academic)
- **Accent Color:** Gold `#F4B942` (achievement + premium)
- **Font:** Glide default (clean sans-serif)
- **Logo concept:** Graduation cap + UK-Indonesia flag element

---

*Blueprint version 1.0 — June 2026*

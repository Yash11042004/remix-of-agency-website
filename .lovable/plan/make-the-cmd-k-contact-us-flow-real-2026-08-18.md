## Make the Cmd+K "Contact us" flow real

Today the contact form waits one second and shows a success toast — nothing is stored or sent. This wires it to a real backend.

### 1. Enable Lovable Cloud
Provisions the database and serverless functions for the project.

### 2. Store submissions
Create a `contact_submissions` table with name, email, message, created_at. Row Level Security allows inserts from the public site only; reading is restricted (no public read of leads).

### 3. Submit through an edge function
A `submit-contact` function validates the payload server-side (zod: name 1-100, valid email up to 255, message 1-2000), inserts the row, and returns a clear error on invalid input. Contact form calls it via `supabase.functions.invoke`.

### 4. Harden the form
- Client-side zod validation with inline field errors before submit.
- Real loading state, error toast when the request fails (currently it always shows success).
- Success toast only after the backend confirms.

### 5. Verify end-to-end
Drive the running preview with Playwright headless:
- Open with Cmd+K and with the sticky button, pick "Contact us".
- Submit empty/invalid input → assert validation errors, no request sent.
- Submit valid input → assert success toast and menu close.
- Confirm the row landed in the database.
- Check console and network for errors; screenshot each step.

### Out of scope
The calculator form's email step stays simulated unless you want it wired too.

### Files touched
- new: `supabase/functions/submit-contact/index.ts`, one database migration
- edit: `src/components/forms/ContactForm.tsx`

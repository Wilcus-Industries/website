"use server";

import { sql } from "@vercel/postgres";

export type WaitlistState = {
    status: "idle" | "success" | "error";
    message: string;
    errors?: Partial<Record<"name" | "email" | "useCase", string>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const str = (v: FormDataEntryValue | null) => (typeof v === "string" ? v.trim() : "");

// Create the table once per server instance. On failure, reset so the next
// request retries instead of caching a rejected promise.
let schemaReady: Promise<unknown> | null = null;
function ensureSchema() {
    if (!schemaReady) {
        schemaReady = sql`
            CREATE TABLE IF NOT EXISTS waitlist (
                id            bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                name          text NOT NULL,
                email         text NOT NULL,
                organization  text,
                use_case      text NOT NULL,
                created_at    timestamptz NOT NULL DEFAULT now()
            )
        `.catch((e) => {
            schemaReady = null;
            throw e;
        });
    }
    return schemaReady;
}

/**
 * Waitlist sign-up for The Collective. Validates server-side, then inserts one row
 * into the Postgres `waitlist` table. Requires the POSTGRES_URL env var (set
 * automatically when a Vercel Postgres/Neon store is connected to the project; pull
 * it locally with `vercel env pull .env.local`).
 */
export async function joinWaitlist(
    _prev: WaitlistState,
    formData: FormData,
): Promise<WaitlistState> {
    const name = str(formData.get("name"));
    const email = str(formData.get("email"));
    const organization = str(formData.get("organization"));
    const useCase = str(formData.get("useCase"));

    const errors: WaitlistState["errors"] = {};
    if (!name) errors.name = "Name is required.";
    else if (name.length > 120) errors.name = "Name is too long.";

    if (!email) errors.email = "Email is required.";
    else if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email.";

    if (!useCase) errors.useCase = "Tell us what you'd use it for.";
    else if (useCase.length > 2000) errors.useCase = "Keep it under 2000 characters.";

    if (organization.length > 160) {
        return { status: "error", message: "Organization name is too long.", errors };
    }

    if (Object.keys(errors).length > 0) {
        return { status: "error", message: "Please fix the highlighted fields.", errors };
    }

    try {
        await ensureSchema();
        // Tagged-template values are sent as bound parameters - injection-safe.
        await sql`
            INSERT INTO waitlist (name, email, organization, use_case)
            VALUES (${name}, ${email}, ${organization || null}, ${useCase})
        `;
    } catch {
        return {
            status: "error",
            message: "Something went wrong saving your request. Please try again.",
        };
    }

    return {
        status: "success",
        message: "You're on the list. We'll be in touch.",
    };
}

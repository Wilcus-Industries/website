"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { joinWaitlist, type WaitlistState } from "@/app/actions";

const initialState: WaitlistState = { status: "idle", message: "" };
const ERROR_ORDER = ["name", "email", "useCase"] as const;

function Field({
    label,
    name,
    error,
    children,
}: {
    label: string;
    name: string;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <label htmlFor={name} className={"flex flex-col gap-1"}>
            <span className={"font-mono text-[0.65rem] tracking-widest uppercase"}>
                {label}
            </span>
            {children}
            {error ? (
                <span id={`${name}-error`} className={"font-mono text-xs tracking-wide opacity-80"}>
                    {`// ${error}`}
                </span>
            ) : null}
        </label>
    );
}

const inputClass =
    "bg-transparent border-b-[0.5px] border-foreground/40 focus:border-foreground " +
    "outline-none focus-visible:ring-2 focus-visible:ring-foreground " +
    "text-sm py-1 transition-colors placeholder:opacity-30";

// Programmatically tie a validation message to its control so screen readers
// announce it when the field receives focus.
const errorAria = (name: string, error?: string) => ({
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${name}-error` : undefined,
});

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type={"submit"}
            disabled={pending}
            className={`mt-1 bg-foreground text-background border-[0.5px] border-foreground
                        font-mono text-sm tracking-widest uppercase py-3
                        hover:bg-background hover:text-foreground transition-colors
                        outline-none focus-visible:ring-2 focus-visible:ring-foreground
                        disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer`}
        >
            {pending ? "SENDING…" : "JOIN THE WAITLIST"}
        </button>
    );
}

export default function WaitlistForm() {
    const [state, formAction, isPending] = useActionState(joinWaitlist, initialState);
    const successRef = useRef<HTMLDivElement>(null);

    // Move focus on resolution: to the confirmation on success (the form unmounts,
    // so focus would otherwise fall to <body>), or to the first invalid field on error.
    useEffect(() => {
        if (state.status === "success") {
            successRef.current?.focus();
        } else if (state.status === "error") {
            const firstInvalid = ERROR_ORDER.find((k) => state.errors?.[k]);
            if (firstInvalid) document.getElementById(firstInvalid)?.focus();
        }
    }, [state]);

    if (state.status === "success") {
        return (
            <div
                ref={successRef}
                role={"status"}
                aria-live={"polite"}
                tabIndex={-1}
                className={"flex flex-col gap-2 py-4 outline-none"}
            >
                <span className={"font-mono text-[0.65rem] tracking-widest uppercase opacity-60"}>
                    {"// confirmed"}
                </span>
                <p className={"text-base"}>{state.message}</p>
            </div>
        );
    }

    return (
        <form action={formAction} aria-busy={isPending} noValidate className={"flex flex-col gap-3"}>
            <Field label={"Name"} name={"name"} error={state.errors?.name}>
                <input
                    id={"name"}
                    name={"name"}
                    type={"text"}
                    required
                    autoComplete={"name"}
                    placeholder={"Ada Lovelace"}
                    className={inputClass}
                    {...errorAria("name", state.errors?.name)}
                />
            </Field>

            <Field label={"Email"} name={"email"} error={state.errors?.email}>
                <input
                    id={"email"}
                    name={"email"}
                    type={"email"}
                    required
                    autoComplete={"email"}
                    placeholder={"ada@example.com"}
                    className={inputClass}
                    {...errorAria("email", state.errors?.email)}
                />
            </Field>

            <Field label={"Organization (optional)"} name={"organization"}>
                <input
                    id={"organization"}
                    name={"organization"}
                    type={"text"}
                    autoComplete={"organization"}
                    placeholder={"Analytical Engines Ltd."}
                    className={inputClass}
                />
            </Field>

            <Field
                label={"What would you use The Collective for?"}
                name={"useCase"}
                error={state.errors?.useCase}
            >
                <textarea
                    id={"useCase"}
                    name={"useCase"}
                    required
                    rows={3}
                    placeholder={"Ship a backend, automate a workflow, prototype an idea…"}
                    className={`${inputClass} resize-none leading-snug`}
                    {...errorAria("useCase", state.errors?.useCase)}
                />
            </Field>

            {/* Persistently mounted live region - assistive tech only announces
                changes to a region that already exists in the DOM. */}
            <p
                role={"status"}
                aria-live={"polite"}
                className={"font-mono text-xs tracking-wide opacity-80 min-h-[1rem]"}
            >
                {state.status === "error" && state.message ? `// ${state.message}` : ""}
            </p>

            <span aria-live={"polite"} className={"sr-only"}>
                {isPending ? "Submitting your request." : ""}
            </span>

            <SubmitButton />
        </form>
    );
}

'use client';

import { Check, LoaderCircle, Send, TriangleAlert } from 'lucide-react';
import { type FormEvent, type ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';
import { buttonClasses } from '../ui/Button';

type Status =
  | { state: 'idle' }
  | { state: 'submitting' }
  | { state: 'sent' }
  | { state: 'mailto' }
  | { state: 'error'; message: string };

type Field = 'name' | 'email' | 'phone' | 'subject' | 'message';
type Errors = Partial<Record<Field, string>>;

const endpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Accepts local and international formats: +91 98765 43210, (020) 1234-5678, 9876543210.
const PHONE_PATTERN = /^\+?[\d\s().-]+$/;

function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, '').length;
  return PHONE_PATTERN.test(value) && digits >= 7 && digits <= 15;
}

function validate(values: Record<Field, string>): Errors {
  const errors: Errors = {};
  if (!values.name) errors.name = 'Please tell me your name.';
  if (!values.email) errors.email = 'Please add an email so I can reply.';
  else if (!EMAIL_PATTERN.test(values.email)) errors.email = 'That email address doesn’t look right.';
  if (!values.phone) errors.phone = 'Please add a mobile number.';
  else if (!isValidPhone(values.phone)) errors.phone = 'That number doesn’t look right. Include the country code if outside India.';
  if (!values.subject) errors.subject = 'A short subject helps me prioritise.';
  return errors;
}

const inputClasses =
  'block w-full rounded-xl border border-line-strong bg-canvas px-4 py-3 text-[0.9375rem] text-ink placeholder:text-ink-subtle/80 transition-[border-color,box-shadow] duration-200 focus:border-ink/50 focus:outline-none focus:ring-4 focus:ring-ink/5 aria-[invalid=true]:border-accent';

function FieldShell({
  id,
  label,
  optional = false,
  error,
  children,
  className,
}: {
  id: Field;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
        {optional ? <span className="ml-1.5 font-normal text-ink-subtle">(optional)</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-accent">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>({ state: 'idle' });
  const [errors, setErrors] = useState<Errors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      phone: String(data.get('phone') ?? '').trim(),
      subject: String(data.get('subject') ?? '').trim(),
      message: String(data.get('message') ?? '').trim(),
    };

    const nextErrors = validate(values);
    setErrors(nextErrors);
    const firstInvalid = (Object.keys(nextErrors) as Field[])[0];
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`#${firstInvalid}`)?.focus();
      return;
    }

    // No backend configured: hand the drafted message to the visitor's mail client.
    if (!endpoint) {
      const signature = `— ${values.name}\n${values.email}\n${values.phone}`;
      const body = values.message ? `${values.message}\n\n${signature}` : signature;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`;
      setStatus({ state: 'mailto' });
      return;
    }

    setStatus({ state: 'submitting' });
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
      form.reset();
      setStatus({ state: 'sent' });
    } catch {
      setStatus({
        state: 'error',
        message: `Something went wrong while sending. Please email me directly at ${email}.`,
      });
    }
  }

  const fieldProps = (id: Field) => ({
    id,
    name: id,
    'aria-invalid': errors[id] ? true : undefined,
    'aria-describedby': errors[id] ? `${id}-error` : undefined,
    onChange: () => errors[id] && setErrors((prev) => ({ ...prev, [id]: undefined })),
  });

  const submitting = status.state === 'submitting';

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <FieldShell id="name" label="Name" error={errors.name}>
        <input {...fieldProps('name')} type="text" autoComplete="name" placeholder="Your name" className={inputClasses} />
      </FieldShell>
      <FieldShell id="email" label="Email" error={errors.email}>
        <input
          {...fieldProps('email')}
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@company.com"
          className={inputClasses}
        />
      </FieldShell>
      <FieldShell id="phone" label="Mobile number" error={errors.phone}>
        <input
          {...fieldProps('phone')}
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="+91 98765 43210"
          className={inputClasses}
        />
      </FieldShell>
      <FieldShell id="subject" label="Subject" error={errors.subject}>
        <input
          {...fieldProps('subject')}
          type="text"
          placeholder="Role, freelance project, collaboration…"
          className={inputClasses}
        />
      </FieldShell>
      <FieldShell id="message" label="Message" optional error={errors.message} className="sm:col-span-2">
        <textarea
          {...fieldProps('message')}
          rows={5}
          placeholder="A few lines about what you’re building and how I can help."
          className={cn(inputClasses, 'resize-y')}
        />
      </FieldShell>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p role="status" aria-live="polite" className="text-sm text-ink-muted sm:order-1">
          {status.state === 'sent' ? (
            <span className="inline-flex items-center gap-1.5 text-positive">
              <Check className="size-4" aria-hidden="true" /> Thanks — your message is on its way. I’ll reply soon.
            </span>
          ) : status.state === 'mailto' ? (
            <>Your email app should open with the message drafted. If it didn’t, write to {email}.</>
          ) : status.state === 'error' ? (
            <span className="inline-flex items-start gap-1.5 text-accent">
              <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" /> {status.message}
            </span>
          ) : endpoint ? null : (
            <>Opens your email app with the message ready to send.</>
          )}
        </p>
        <button
          type="submit"
          disabled={submitting}
          className={cn(buttonClasses({ variant: 'primary' }), 'sm:order-2 sm:shrink-0')}
        >
          {submitting ? (
            <>
              Sending
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
            </>
          ) : (
            <>
              Send message
              <Send className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

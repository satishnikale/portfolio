import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md';

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-canvas hover:bg-ink/85 shadow-[0_1px_0_rgb(255_255_255/0.08)_inset]',
  secondary: 'border border-line-strong bg-surface text-ink hover:border-ink/40 hover:bg-surface-muted',
  ghost: 'text-ink-muted hover:text-ink hover:bg-surface-muted',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[0.9375rem]',
};

export function buttonClasses({ variant = 'primary', size = 'md' }: { variant?: Variant; size?: Size } = {}) {
  return cn(base, variants[variant], sizes[size]);
}

interface ButtonLinkProps extends ComponentPropsWithoutRef<'a'> {
  variant?: Variant;
  size?: Size;
}

export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <a className={cn(buttonClasses({ variant, size }), className)} {...props} />;
}

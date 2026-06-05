import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import { cn } from '../../lib/cn';

type PanelProps = PropsWithChildren<ComponentPropsWithoutRef<'section'>>;

export function Panel({ children, className, ...rest }: PanelProps) {
  return (
    <section
      className={cn('rounded-lg border border-border bg-white/[0.06] p-5 backdrop-blur-xl', className)}
      {...rest}
    >
      {children}
    </section>
  );
}

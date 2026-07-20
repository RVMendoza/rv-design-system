import { icons, type LucideIcon, type LucideProps } from 'lucide-react';
import { resolveIconName, type IconName } from './IconNames';

export interface IconProps extends Omit<LucideProps, 'ref'> {
  /** A Lucide icon name in canonical kebab case or exported PascalCase. */
  name: string;
  /** Accessible name when the icon conveys meaning. Omit for decorative icons. */
  label?: string;
  /** Safe icon used when `name` is unavailable. */
  fallback?: IconName;
}

/** A Lucide icon rendered through RVDS with a safe fallback and no client-side JavaScript. */
export function Icon({ name, label, fallback = 'Sparkles', ...props }: IconProps) {
  const IconComponent = icons[resolveIconName(name, fallback)] as LucideIcon;
  return (
    <IconComponent
      {...(label ? { 'aria-label': label, role: 'img' } : { 'aria-hidden': true })}
      focusable="false"
      {...props}
    />
  );
}

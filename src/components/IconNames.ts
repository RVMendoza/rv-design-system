import { icons } from 'lucide-react';

export type IconName = keyof typeof icons;

function pascalCaseIconName(value: string) {
  return value
    .trim()
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join('');
}

export function resolveIconName(name: string, fallback: IconName = 'Sparkles'): IconName {
  const candidate = pascalCaseIconName(name);
  return candidate in icons ? (candidate as IconName) : fallback;
}

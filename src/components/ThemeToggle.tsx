import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const OPTIONS = [
  { value: 'dark', label: 'Dark mode', Icon: Moon },
  { value: 'light', label: 'Light mode', Icon: Sun },
  { value: 'system', label: 'Follow system', Icon: Monitor },
] as const;

export default function ThemeToggle() {
  const { theme, setTheme, effective } = useTheme();

  const isActive = (value: 'dark' | 'light' | 'system') =>
    value === 'system' ? theme === 'system' : effective === value;

  return (
    <div
      className="flex items-center gap-0.5 rounded-lg border p-1 shadow-sm"
      role="group"
      aria-label="Color theme"
      style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
    >
      {OPTIONS.map(({ value, label, Icon }) => {
        const active = isActive(value);
        return (
          <button
            key={value}
            onClick={() => setTheme(value)}
            aria-label={label}
            aria-pressed={active}
            title={label}
            className="rounded-lg p-2 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
            style={{
              backgroundColor: active ? 'var(--color-surface-alt)' : 'transparent',
              color: active ? '#10b981' : 'var(--color-text-muted)',
            }}
          >
            <Icon className="h-3.5 w-3.5" />
          </button>
        );
      })}
    </div>
  );
}

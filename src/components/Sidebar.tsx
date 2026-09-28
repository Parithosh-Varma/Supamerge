import { X } from 'lucide-react';
import type { ActiveTab } from '../types';
import {
  SidebarNavigationSectionDividers,
  navItemsWithDividers,
  getActiveUrl,
} from './sidebar-nav';
import logoSrc from '../assets/logo.png';

interface SidebarProps {
  sidebarOpen: boolean;
  onClose: () => void;
  activeTab: ActiveTab;
  clusterLogs: string[];
  onNavigate: (href: string) => void;
}

export default function Sidebar({ sidebarOpen, onClose, activeTab, clusterLogs, onNavigate }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-30 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        aria-label="Cluster navigation"
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ backgroundColor: 'var(--color-sidebar-bg)', borderColor: 'var(--color-border)' }}
      >
        {/* Brand */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b px-4" style={{ borderColor: 'var(--color-border)' }}>
          <button
            onClick={() => onNavigate('/dashboard')}
            className="flex items-center gap-2 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
            aria-label="Go to dashboard"
          >
            <img src={logoSrc} alt="" className="h-8 w-8 rounded-lg" />
            <span className="text-sm font-bold tracking-tight" style={{ color: 'var(--color-logo-text)' }}>
              SupaMerge
            </span>
          </button>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 md:hidden"
            style={{ color: 'var(--color-text-muted)' }}
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto p-4">
          <SidebarNavigationSectionDividers
            activeUrl={getActiveUrl(activeTab)}
            items={navItemsWithDividers}
            onNavigate={onNavigate}
          />
        </div>

        {/* Cluster activity */}
        <div className="shrink-0 border-t p-4" style={{ borderColor: 'var(--color-border)' }}>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
            Cluster activity
          </p>
          <div
            className="h-28 overflow-y-auto rounded-lg border p-2 font-mono text-[10px] leading-relaxed"
            style={{
              borderColor: 'var(--color-border)',
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text-muted)',
            }}
            role="log"
            aria-label="Cluster activity log"
          >
            {clusterLogs.length === 0 ? (
              <span>No activity yet.</span>
            ) : (
              clusterLogs.slice(0, 12).map((log, i) => <p key={i}>{log}</p>)
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

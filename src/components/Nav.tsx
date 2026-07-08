'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

const tabs = [
  { href: '/', label: 'Home' },
  { href: '/#journey', label: 'Journey' },
  { href: '/garage', label: 'Garage' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;

export default function Nav() {
  const pathname = usePathname();

  function isCurrent(href: string) {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return false;
    return pathname.startsWith(href);
  }

  return (
    <header className="site">
      <div className="wrap">
        <nav className="nav" aria-label="Site">
          <Link href="/" className="brand"><span className="dot" />Manav Gurnani</Link>
          {tabs.map((t) => (
            <Link key={t.label} href={t.href} className="tab" aria-current={isCurrent(t.href) ? 'page' : undefined}>
              {t.label}
            </Link>
          ))}
          <span className="right">
            <ThemeToggle />
            <a className="btn primary" href="/resume.pdf">Résumé ↓</a>
          </span>
        </nav>
      </div>
    </header>
  );
}

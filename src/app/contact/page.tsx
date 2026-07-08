import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — Manav Gurnani',
  description: 'Recruiting, collaborating, or talking cars — inbox is open.',
};

const cards = [
  { k: 'Email', v: 'manavgurnani21@gmail.com', href: 'mailto:manavgurnani21@gmail.com' },
  { k: 'GitHub', v: 'github.com/manavgurnani21', href: 'https://github.com/manavgurnani21' },
  { k: 'LinkedIn', v: 'linkedin.com/in/manav-gurnani', href: 'https://linkedin.com/in/manav-gurnani' },
  { k: 'Résumé', v: 'PDF download', href: '/resume.pdf' },
];

export default function ContactPage() {
  return (
    <div className="contact">
      <p className="eyebrow">Contact</p>
      <h1 className="page">Flag me <span className="gtext">down.</span></h1>
      <p className="sect-sub" style={{ margin: '10px auto 0' }}>
        Recruiting, collaborating, or just want to talk cars — my inbox is open.
      </p>
      <div className="cards">
        {cards.map((c) => (
          <a key={c.k} className="ccard" href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
            <span className="k">{c.k}</span>{c.v}
          </a>
        ))}
      </div>
    </div>
  );
}

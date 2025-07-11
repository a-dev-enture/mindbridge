import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/addiction-tracker', label: 'Addiction Tracker' },
  { href: '/mood-songs', label: 'Mood Songs' },
];

export default function NavBar() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#fff',
      borderBottom: '1px solid #eee',
      padding: '1rem 0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {navLinks.map(link => (
        <Link key={link.href} href={link.href} legacyBehavior>
          <a style={{
            margin: '0 1.2rem',
            color: '#1da47d',
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: '1.08rem',
            transition: 'color 0.2s',
          }}>
            {link.label}
          </a>
        </Link>
      ))}
    </nav>
  );
}


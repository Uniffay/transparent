import type { Metadata } from 'next';
import { Nunito, Pacifico } from 'next/font/google';
import './globals.css';

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
});

const pacifico = Pacifico({
  variable: '--font-pacifico',
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'TransParent',
  description: 'Pouvez-vous deviner ? Probablement pas.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${nunito.variable} ${pacifico.variable} h-full`}>
      <body className="min-h-full font-nunito">{children}</body>
    </html>
  );
}

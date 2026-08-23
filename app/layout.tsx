import './globals.css';

export const metadata = {
  title: 'OnAir - TV Manager',
  description: 'Simulation de gestion de chaîne TV',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}

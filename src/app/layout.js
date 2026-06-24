import './globals.css';

export const metadata = {
  title: 'Mohit Sahija | Intelligence Terminal',
  description: 'Real-time global market data and corporate lead generation hub.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="cyber-grid min-h-screen antialiased">{children}</body>
    </html>
  );
}
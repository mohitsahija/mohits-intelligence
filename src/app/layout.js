import './globals.css';

export const metadata = {
  title: 'Mohit Sahija | Intelligence Terminal',
  description: 'Real-time global market data, AI-powered analysis, and corporate intelligence hub.',
  keywords: 'intelligence, market data, AI analysis, news, B2B leads',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)',  color: '#080B12' },
    { media: '(prefers-color-scheme: light)', color: '#F8F9FB' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}

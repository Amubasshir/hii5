// app/layout.jsx (or src/app/layout.jsx)

import { CurrentUserProvider } from '@/contexts/CurrentUserContext';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>{/* Head elements like fonts, viewport, etc. */}</head>

      <body className="bg-[#0B0A13] text-white" suppressHydrationWarning={true}>
        <CurrentUserProvider>
          {children}
          <Toaster />
        </CurrentUserProvider>
      </body>
    </html>
  );
}

import './globals.css';

export const metadata = {
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

import { CurrentUserProvider } from '@/contexts/CurrentUserContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CurrentUserProvider>{children}</CurrentUserProvider>
      </body>
    </html>
  );
}

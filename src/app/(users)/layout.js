import Footer from '@/components/Footer';
import Navbar from '@/components/NavBar';
import { CurrentUserProvider } from '@/contexts/CurrentUserContext';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Hii5 | Smart Review Collector',
  description:
    'Send happy customers to Google/Yelp and collect unhappy feedback privately. Boost your online reputation with Hii5, the smart review collection tool for businesses.',
  keywords: [
    'review tool',
    'customer feedback',
    'Google reviews',
    'Yelp reviews',
    'business reviews',
    'feedback SaaS',
    'Hii5',
  ],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CurrentUserProvider>
          <Toaster />
          <Navbar></Navbar>
          {children}
          <Footer></Footer>
        </CurrentUserProvider>
      </body>
    </html>
  );
}

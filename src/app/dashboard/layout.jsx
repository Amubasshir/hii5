// app/layout.jsx (or src/app/layout.jsx)

import { CurrentUserProvider } from "@/contexts/CurrentUserContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>{/* Head elements like fonts, viewport, etc. */}</head>
      {/* ✅ THE FIX: Add suppressHydrationWarning to the <body> element.
        This tells React to ignore the difference between the server-rendered
        and client-hydrated attributes on this specific tag.
      */}
      <body className="bg-[#0B0A13] text-white" suppressHydrationWarning={true}>
      
      <CurrentUserProvider>
        {children}
      </CurrentUserProvider>
        
      </body>
    </html>
  );
}

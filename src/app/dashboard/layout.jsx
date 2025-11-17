// app/layout.jsx (or wherever your root layout is)
import React from 'react';

import '../globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Dashboard</title>
      </head>
      <body className="bg-[#0B0A13] text-white">{children}</body>
    </html>
  );
}

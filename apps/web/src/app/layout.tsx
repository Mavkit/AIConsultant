import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "EL Råger | Digital retailrådgiver",
  description:
    "AI-assistert virksomhets- og løsningsarkitektur for retail fra Value Retail Consulting.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="no">
      <body>{children}</body>
    </html>
  );
}

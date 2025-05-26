import { PropsWithChildren } from "react";
import "./inter.css";
import "./styles.css";

export const metadata = {
  title: 'Journo',
  description: 'Dein AI-Tool für themenbezogene Lokalmeldungen 😎',
};

export default function RootLayout({
  children,
}: PropsWithChildren) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import { PropsWithChildren } from "react";
import "./inter.css";
import "./styles.css";

export const metadata = {
  title: 'JournoAI',
  description: 'Dein Tool für themenbezogene Lokalmeldungen 😎',
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

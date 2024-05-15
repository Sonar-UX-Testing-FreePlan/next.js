import "./globals.css";
import localFont from "next/font/local";

const geistSans = localFont({ src: "./fonts/GeistVF.woff" });
const geistMono = localFont({ src: "./fonts/GeistMonoVF.woff" });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} ${geistMono.className}`}>
        {children}
      </body>
    </html>
  );
}

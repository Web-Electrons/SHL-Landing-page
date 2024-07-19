import { Inter } from "next/font/google";
import './globals.scss'
export const metadata = {
  title: "ShipLink",
  description: "Worldwide best package forwarding service",
}
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {

  return (
    <html lang="en" className="!scrool-smooth">
      <body className={inter.className} >
        {children}
      </body>
    </html>
  );
}
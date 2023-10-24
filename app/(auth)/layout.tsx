import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "../globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Threads",
  description: "Threads app practice",
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.className} bg-dark-1 flex justify-center items-center min-h-screen`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

export default RootLayout;

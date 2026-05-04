import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SummerShop — Chase the Sun",
  description: "Your one-stop destination for all things summer.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider
          appearance={{
            variables: { colorPrimary: "hsl(16 100% 66%)" },
            elements: {
              formButtonPrimary: "bg-orange-500 hover:bg-orange-600 text-white",
              footerActionLink: "text-orange-500 hover:text-orange-600",
            },
          }}
        >
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster position="top-right" toastOptions={{ style: { borderRadius: "12px", background: "#1e293b", color: "#fff" } }} />
        </ClerkProvider>
      </body>
    </html>
  );
}

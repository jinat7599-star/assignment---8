import Link from "next/link";
import { Sun } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Sun className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-400">
                SummerShop
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              Your one-stop destination for all things summer. From beach days to backyard barbecues, we&apos;ve got you covered.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>hello@summershop.com</li>
              <li>1-800-SUN-SAND</li>
              <li>123 Boardwalk Ave, Malibu CA</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-10 pt-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} SummerShop. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

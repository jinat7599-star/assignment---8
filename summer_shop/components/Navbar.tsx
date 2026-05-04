"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, useClerk, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, Sun } from "lucide-react";

export function Navbar() {
  const { signOut } = useClerk();
  const { user } = useUser();
  const router = useRouter();

  const handleLogout = () => signOut(() => router.push("/"));

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Sun className="h-6 w-6 text-primary group-hover:rotate-90 transition-transform duration-500" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-400">
            SummerShop
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
          <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">Products</Link>
          <div className="flex items-center gap-3 ml-4 border-l pl-4 border-border">
            <SignedOut>
              <Link href="/sign-in" className="text-sm font-medium hover:text-primary transition-colors">Sign In</Link>
              <Button size="sm" asChild>
                <Link href="/sign-up">Register</Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <Link href="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Avatar className="h-8 w-8 border border-border">
                  <AvatarImage src={user?.imageUrl} alt={user?.fullName ?? "User"} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {user?.firstName?.charAt(0) ?? "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{user?.firstName ?? "Profile"}</span>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>Logout</Button>
            </SignedIn>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon"><Menu className="h-5 w-5" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem asChild><Link href="/" className="w-full">Home</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/products" className="w-full">Products</Link></DropdownMenuItem>
              <DropdownMenuSeparator />
              <SignedOut>
                <DropdownMenuItem asChild><Link href="/sign-in" className="w-full">Sign In</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/sign-up" className="w-full font-medium text-primary">Register</Link></DropdownMenuItem>
              </SignedOut>
              <SignedIn>
                <DropdownMenuItem asChild><Link href="/profile" className="w-full">My Profile</Link></DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">Logout</DropdownMenuItem>
              </SignedIn>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}

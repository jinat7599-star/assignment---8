import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="text-8xl mb-4">🏖️</div>
      <h1 className="text-4xl font-extrabold mb-3">404 — Lost at Sea</h1>
      <p className="text-muted-foreground text-lg mb-8 max-w-sm">Looks like this page drifted away. Head back to shore!</p>
      <Button className="rounded-full bg-orange-500 hover:bg-orange-600" asChild>
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}

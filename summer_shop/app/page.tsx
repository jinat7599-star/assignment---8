import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard, type Product } from "@/components/ProductCard";
import productsData from "@/data/products.json";
import { Sun, Waves, ShoppingBag, Star } from "lucide-react";

const categories = [
  { name: "Water Sports", icon: "🏄", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { name: "Skincare", icon: "🧴", color: "bg-pink-50 text-pink-700 border-pink-200" },
  { name: "Outdoors", icon: "🏕️", color: "bg-green-50 text-green-700 border-green-200" },
  { name: "Pool & Beach", icon: "🏖️", color: "bg-cyan-50 text-cyan-700 border-cyan-200" },
  { name: "Accessories", icon: "🕶️", color: "bg-purple-50 text-purple-700 border-purple-200" },
  { name: "Apparel", icon: "👙", color: "bg-orange-50 text-orange-700 border-orange-200" },
  { name: "Home & Decor", icon: "🏠", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { name: "Bags", icon: "👜", color: "bg-rose-50 text-rose-700 border-rose-200" },
];

const featured = (productsData as Product[]).filter(p => p.badge === "Best Seller" || p.badge === "Top Rated").slice(0, 4);

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="min-h-[80vh] flex items-center bg-gradient-to-br from-orange-50 via-amber-50 to-sky-50 relative overflow-hidden">
        <div className="absolute top-10 right-20 w-64 h-64 rounded-full bg-orange-400/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-amber-400/20 blur-3xl animate-pulse" />
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center py-16">
          <div className="space-y-6">
            <Badge className="bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-100 px-4 py-1.5 text-sm">
              <Sun className="w-3.5 h-3.5 mr-1" /> Summer Sale 50% OFF
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
              Chase the{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-400">
                Sun.
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              Curated essentials for your best summer yet. Beach, pool, or backyard — we&apos;ve got you covered.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 shadow-lg" asChild>
                <Link href="/products">Shop the Collection →</Link>
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-2">
              <div className="text-center"><div className="text-2xl font-bold text-orange-500">32+</div><div className="text-xs text-muted-foreground">Products</div></div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center"><div className="text-2xl font-bold text-orange-500">8</div><div className="text-xs text-muted-foreground">Categories</div></div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center"><div className="text-2xl font-bold text-orange-500">50%</div><div className="text-xs text-muted-foreground">Off Everything</div></div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative w-72 h-72">
              <div className="w-72 h-72 rounded-full bg-gradient-to-br from-orange-400 to-amber-300 animate-float shadow-2xl shadow-orange-200" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-300/50 to-transparent" />
              <Waves className="absolute bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 text-white/40" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map(cat => (
              <Link key={cat.name} href={`/products?category=${encodeURIComponent(cat.name)}`}
                className={`flex flex-col items-center gap-2 p-5 rounded-2xl border-2 ${cat.color} hover:scale-105 transition-transform text-center cursor-pointer`}>
                <span className="text-3xl">{cat.icon}</span>
                <span className="font-semibold text-sm">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold">Best Sellers</h2>
              <p className="text-muted-foreground mt-1">Our most loved summer essentials</p>
            </div>
            <Button variant="outline" asChild className="rounded-full">
              <Link href="/products">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-amber-400 text-white text-center">
        <div className="container mx-auto px-4">
          <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="text-4xl font-extrabold mb-4">Ready for Summer?</h2>
          <p className="text-white/80 mb-8 text-lg max-w-md mx-auto">Sign up and unlock exclusive deals on all your summer favourites.</p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="outline" className="rounded-full border-white text-white hover:bg-white hover:text-orange-600 bg-transparent" asChild>
              <Link href="/sign-up">Create Account</Link>
            </Button>
            <Button size="lg" className="rounded-full bg-white text-orange-600 hover:bg-white/90" asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

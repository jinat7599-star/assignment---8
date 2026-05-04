"use client";
import { useState, useMemo } from "react";
import { ProductCard, type Product } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import productsData from "@/data/products.json";
import { Search, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const CATEGORIES = ["All", "Water Sports", "Skincare", "Outdoors", "Pool & Beach", "Accessories", "Apparel", "Home & Decor", "Bags"];

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get("category") ?? "All";
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(initialCat);

  const filtered = useMemo(() => {
    return (productsData as Product[]).filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold mb-2">All Products</h1>
        <p className="text-muted-foreground">Discover our complete summer collection</p>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-10 rounded-full"
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map(cat => (
          <Button
            key={cat}
            variant={activeCategory === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full ${activeCategory === cat ? "bg-orange-500 hover:bg-orange-600 border-orange-500" : ""}`}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-6">{filtered.length} products found</p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 text-muted-foreground">
          <p className="text-xl font-semibold mb-2">No products found</p>
          <p className="text-sm">Try a different search or category</p>
          <Button onClick={() => { setSearch(""); setActiveCategory("All"); }} className="mt-4 rounded-full bg-orange-500 hover:bg-orange-600">
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-10 text-center text-muted-foreground">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}

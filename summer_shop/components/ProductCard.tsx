"use client";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  stock: number;
  description: string;
  image: string;
  category: string;
  badge?: string;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="block h-full group">
      <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1 flex flex-col">
        <div className="relative aspect-square overflow-hidden bg-muted/30">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {product.badge && (
            <Badge className="absolute top-3 left-3 bg-orange-500 text-white border-0 text-xs">
              {product.badge}
            </Badge>
          )}
          <Badge className="absolute top-3 right-3 bg-white/90 text-black border-0 text-xs backdrop-blur-sm">
            {product.category}
          </Badge>
        </div>
        <CardContent className="p-4 flex-1 flex flex-col">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">{product.brand}</p>
          <h3 className="font-semibold text-base leading-tight mb-2 line-clamp-2 flex-1">{product.name}</h3>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-muted-foreground line-through ml-2">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <Button
            size="icon"
            className="rounded-full h-9 w-9 bg-orange-500 hover:bg-orange-600"
            onClick={(e) => { e.preventDefault(); toast.success("Added to cart!"); }}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

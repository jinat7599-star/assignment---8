import { notFound } from "next/navigation";
import Link from "next/link";
import productsData from "@/data/products.json";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, ArrowLeft, ShoppingCart, Package, Shield, Truck } from "lucide-react";
import type { Product } from "@/components/ProductCard";
import { AddToCartButton } from "./AddToCartButton";

interface Props { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return (productsData as Product[]).map(p => ({ id: p.id }));
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = (productsData as Product[]).find(p => p.id === id);
  if (!product) notFound();

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const related = (productsData as Product[]).filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-10">
      <Link href="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 group">
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* Image */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted/30 shadow-lg">
          <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
          {product.badge && (
            <Badge className="absolute top-4 left-4 bg-orange-500 text-white border-0 text-sm px-3 py-1">
              {product.badge}
            </Badge>
          )}
          {discount > 0 && (
            <Badge className="absolute top-4 right-4 bg-red-500 text-white border-0 text-sm px-3 py-1">
              -{discount}%
            </Badge>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <Badge variant="outline" className="w-fit mb-3 text-orange-600 border-orange-200">{product.category}</Badge>
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-2">{product.brand}</p>
          <h1 className="text-3xl font-extrabold mb-4 leading-tight">{product.name}</h1>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-muted"}`} />
              ))}
            </div>
            <span className="font-semibold">{product.rating}</span>
            <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-extrabold text-orange-500">${product.price.toFixed(2)}</span>
            {product.originalPrice > product.price && (
              <span className="text-xl text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
            )}
            {discount > 0 && <Badge className="bg-green-100 text-green-700 border-0">Save {discount}%</Badge>}
          </div>

          <Separator className="mb-6" />
          <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

          <div className="flex items-center gap-2 mb-8">
            <Package className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-600 font-medium">{product.stock > 10 ? "In Stock" : `Only ${product.stock} left`}</span>
          </div>

          <AddToCartButton productName={product.name} />

          <div className="grid grid-cols-3 gap-4 mt-8 text-center">
            {[{ icon: Truck, label: "Free Shipping", sub: "On orders $50+" }, { icon: Shield, label: "2-Year Warranty", sub: "Full coverage" }, { icon: Package, label: "Easy Returns", sub: "30-day policy" }].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center gap-1 p-3 rounded-xl bg-muted/50">
                <Icon className="h-5 w-5 text-orange-500" />
                <span className="text-xs font-semibold">{label}</span>
                <span className="text-xs text-muted-foreground">{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

export function AddToCartButton({ productName }: { productName: string }) {
  return (
    <Button
      size="lg"
      className="w-full rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-base shadow-lg shadow-orange-200"
      onClick={() => toast.success(`${productName} added to cart!`)}
    >
      <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
    </Button>
  );
}

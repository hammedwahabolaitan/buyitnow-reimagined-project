
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ProductCardProps {
  title: string;
  price: number;
  image: string;
  rating: number;
  id?: number;
  brand?: string;
}

export const ProductCard = ({ title, price, image, rating, brand }: ProductCardProps) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`${title} added to cart!`);
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative">
        <AspectRatio ratio={1 / 1}>
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full"
          />
        </AspectRatio>
        {/* Sale badge could go here if needed */}
      </div>
      <CardContent className="p-4">
        {brand && (
          <p className="text-xs text-gray-500 mb-1">{brand}</p>
        )}
        <h3 className="font-medium text-gray-900 line-clamp-2 min-h-[2.5rem]">{title}</h3>
        <div className="mt-1 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${
                i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-xs text-gray-500">({rating})</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-lg font-bold text-primary">₦{price.toLocaleString()}</p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleAddToCart}
            className="text-xs"
          >
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};


import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ProductCardProps {
  title: string;
  price: number;
  image: string;
  rating: number;
  id?: number;
}

export const ProductCard = ({ title, price, image, rating }: ProductCardProps) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`${title} added to cart!`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-square relative overflow-hidden rounded-t-lg">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full hover:scale-105 transition-transform"
        />
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 truncate">{title}</h3>
        <div className="mt-1 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-lg font-bold text-primary">₦{price.toLocaleString()}</p>
          <Button variant="ghost" size="sm" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

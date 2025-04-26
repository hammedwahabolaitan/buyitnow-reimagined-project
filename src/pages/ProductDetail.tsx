
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

// Mock product data - in a real app, this would come from an API
const productsData = [
  {
    id: "1",
    title: "Wireless Earbuds",
    price: 29999,
    image: "/photo-1434494878577-86c23bcb06b9",
    rating: 4,
    description: "Experience crystal-clear audio with these wireless earbuds. Perfect for workouts, commuting, or relaxing at home. Features noise cancellation and long battery life.",
    specs: [
      "Bluetooth 5.0",
      "8 hours battery life",
      "Active Noise Cancellation",
      "IPX5 water resistance",
      "Touch controls",
    ],
    colors: ["Black", "White", "Blue"],
  },
  {
    id: "2",
    title: "Smart Watch",
    price: 45999,
    image: "/photo-1434494878577-86c23bcb06b9",
    rating: 5,
    description: "Track your fitness goals, receive notifications, and more with this sleek smart watch. Features heart rate monitoring, sleep tracking, and GPS.",
    specs: [
      "1.4\" AMOLED display",
      "5 days battery life",
      "Heart rate monitoring",
      "Sleep tracking",
      "GPS",
      "Water resistant up to 50m",
    ],
    colors: ["Black", "Silver", "Rose Gold"],
  },
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  
  // Find the product with matching ID
  const product = productsData.find((p) => p.id === id);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <a href="/products">Browse Products</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="rounded-lg overflow-hidden bg-gray-100">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-full object-cover aspect-square"
            />
          </div>
          
          {/* Product Details */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < product.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-gray-600">({product.rating} stars)</span>
            </div>
            
            <div className="text-3xl font-bold text-primary">
              ₦{product.price.toLocaleString()}
            </div>
            
            <p className="text-gray-600">{product.description}</p>
            
            {/* Color Selection */}
            {product.colors && (
              <div>
                <h3 className="text-lg font-medium mb-2">Color</h3>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`px-4 py-2 border rounded-md ${
                        selectedColor === color 
                          ? "border-primary" 
                          : "border-gray-300"
                      }`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity */}
            <div>
              <h3 className="text-lg font-medium mb-2">Quantity</h3>
              <div className="flex items-center">
                <button 
                  className="bg-gray-200 px-3 py-1 rounded-l"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input 
                  type="number" 
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-16 text-center border-y border-gray-200 py-1"
                />
                <button 
                  className="bg-gray-200 px-3 py-1 rounded-r"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Button className="flex-1">Add to Cart</Button>
              <Button variant="secondary" className="flex-1">Buy Now</Button>
            </div>
            
            {/* Specifications */}
            {product.specs && (
              <div className="pt-4">
                <h3 className="text-lg font-medium mb-2">Specifications</h3>
                <ul className="list-disc list-inside space-y-1">
                  {product.specs.map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;

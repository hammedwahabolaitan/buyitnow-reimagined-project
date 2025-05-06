
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Star, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { toast } from "sonner";

// Enhanced product data with multiple images
const productsData = [
  {
    id: "1",
    title: "Premium Wireless Earbuds",
    price: 29999,
    images: [
      "/photo-1607016284318-d1384f4e0113",
      "/photo-1546435770-a3e736c45595", 
      "/photo-1606036525923-1de049f3c41f"
    ],
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
    brand: "SoundTech",
    inStock: true,
    whatsappNumber: "2347012345678",
  },
  {
    id: "2",
    title: "Ultra Smart Watch Pro",
    price: 45999,
    images: [
      "/photo-1579586337278-3befd40fd17a",
      "/photo-1523275335684-37898b6baf30",
      "/photo-1546868871-7041f2a55e12"
    ],
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
    brand: "TechWear",
    inStock: true,
    whatsappNumber: "2347012345678",
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

  const handleAddToCart = () => {
    toast.success(`Added ${quantity} ${product.title} to cart!`);
  };

  const handleBuyNow = () => {
    toast.info(`Proceeding to checkout for ${product.title}`);
  };

  const handleWhatsAppClick = () => {
    // Create WhatsApp message with product details
    const message = `Hello! I'm interested in purchasing: ${product.title} (ID: ${product.id})`;
    const whatsappUrl = `https://wa.me/${product.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Enhanced Product Image Gallery */}
          <div className="space-y-4">
            <Card className="overflow-hidden border-0 shadow-md">
              <CardContent className="p-0">
                <Carousel className="w-full">
                  <CarouselContent>
                    {product.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="aspect-square w-full relative">
                          <img 
                            src={image} 
                            alt={`${product.title} - Image ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
              </CardContent>
            </Card>
            <div className="hidden md:grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div 
                  key={index} 
                  className="aspect-square rounded-md overflow-hidden cursor-pointer border-2 hover:border-primary"
                >
                  <img 
                    src={image} 
                    alt={`${product.title} - Thumbnail ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Enhanced Product Details */}
          <div className="space-y-6">
            <div>
              <div className="text-sm text-gray-500 mb-2">{product.brand}</div>
              <h1 className="text-3xl font-bold">{product.title}</h1>
              <div className="flex items-center gap-1 mt-2">
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
            </div>
            
            <div className="text-3xl font-bold text-primary">
              ₦{product.price.toLocaleString()}
            </div>
            
            <p className="text-gray-600">{product.description}</p>
            
            <div className="flex items-center gap-2">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </div>
            </div>
            
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
                          ? "border-primary bg-primary/10" 
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
            
            {/* Action Buttons */}
            <div className="flex flex-col gap-4 pt-4">
              <div className="flex gap-3">
                <Button 
                  className="flex-1" 
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                <Button 
                  variant="secondary" 
                  className="flex-1"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </Button>
              </div>
              
              {/* WhatsApp Contact Button */}
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2 border-green-500 text-green-600 hover:bg-green-50"
                onClick={handleWhatsAppClick}
              >
                <MessageSquare className="h-5 w-5" />
                Contact Seller via WhatsApp
              </Button>
            </div>
            
            {/* Specifications */}
            {product.specs && (
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-lg font-medium mb-2">Specifications</h3>
                <ul className="grid grid-cols-1 gap-y-1">
                  {product.specs.map((spec, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span>{spec}</span>
                    </li>
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

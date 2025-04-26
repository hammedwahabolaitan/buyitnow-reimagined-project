
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ProductCard } from "@/components/ProductCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const products = [
  {
    id: 1,
    title: "Wireless Earbuds",
    price: 29999,
    image: "/photo-1434494878577-86c23bcb06b9",
    rating: 4,
  },
  {
    id: 2,
    title: "Smart Watch",
    price: 45999,
    image: "/photo-1434494878577-86c23bcb06b9",
    rating: 5,
  },
  {
    id: 3,
    title: "Laptop Stand",
    price: 12999,
    image: "/photo-1460925895917-afdab827c52f",
    rating: 4,
  },
  {
    id: 4,
    title: "Wireless Mouse",
    price: 8999,
    image: "/photo-1527864550417-7fd91fc51a46",
    rating: 3,
  },
  {
    id: 5,
    title: "Bluetooth Speaker",
    price: 19999,
    image: "/photo-1618160702438-9b02ab6515c9",
    rating: 4,
  },
  {
    id: 6,
    title: "Mechanical Keyboard",
    price: 35999,
    image: "/photo-1718079848831-190e13e9d695",
    rating: 5,
  },
  {
    id: 7,
    title: "USB Hub",
    price: 7999,
    image: "/photo-1498050108023-c5249f4df085",
    rating: 3,
  },
  {
    id: 8,
    title: "Gaming Headset",
    price: 24999,
    image: "/photo-1593121925328-10b3cb78de96",
    rating: 4,
  },
];

const categories = [
  "Electronics",
  "Mobile Phones",
  "Computers",
  "Accessories",
  "Wearables",
  "Audio",
];

const Products = () => {
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes("Electronics");
    return matchesSearch && matchesPrice && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">All Products</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Search</h3>
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div className="flex items-center space-x-2" key={category}>
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => handleCategoryChange(category)}
                    />
                    <Label htmlFor={`category-${category}`}>{category}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Price Range</h3>
              <div className="space-y-4">
                <Slider
                  defaultValue={[0, 50000]}
                  max={50000}
                  step={1000}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value)}
                  className="my-4"
                />
                <div className="flex justify-between">
                  <span>₦{priceRange[0].toLocaleString()}</span>
                  <span>₦{priceRange[1].toLocaleString()}</span>
                </div>
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => setPriceRange([0, 50000])}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-10">
                <p className="text-lg text-gray-500">No products found matching your criteria.</p>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setPriceRange([0, 50000]);
                    setSelectedCategories([]);
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;

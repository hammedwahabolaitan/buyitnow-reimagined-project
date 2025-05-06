
import { ProductCard } from "./ProductCard";
import { Link } from "react-router-dom";

// Enhanced products with brand information
const products = [
  {
    id: 1,
    title: "Premium Wireless Earbuds",
    price: 29999,
    image: "/photo-1607016284318-d1384f4e0113",
    rating: 4,
    brand: "SoundTech"
  },
  {
    id: 2,
    title: "Ultra Smart Watch Pro",
    price: 45999,
    image: "/photo-1579586337278-3befd40fd17a",
    rating: 5,
    brand: "TechWear"
  },
  {
    id: 3,
    title: "Adjustable Laptop Stand",
    price: 12999,
    image: "/photo-1460925895917-afdab827c52f",
    rating: 4,
    brand: "WorkPro"
  },
  {
    id: 4,
    title: "Ergonomic Wireless Mouse",
    price: 8999,
    image: "/photo-1527864550417-7fd91fc51a46",
    rating: 3,
    brand: "TechMouse"
  },
];

export const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
          <Link to="/products" className="text-primary font-medium hover:underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="no-underline text-inherit">
              <ProductCard {...product} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

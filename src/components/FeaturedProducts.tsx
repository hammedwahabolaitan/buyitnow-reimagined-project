
import { ProductCard } from "./ProductCard";

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
];

export const FeaturedProducts = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

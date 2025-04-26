
import { Button } from "@/components/ui/button";

const categories = [
  { name: "Electronics", image: "/photo-1498050108023-c5249f4df085" },
  { name: "Fashion", image: "/photo-1581091226825-a6a2a5aee158" },
  { name: "Home & Garden", image: "/photo-1721322800607-8c38375eef04" },
  { name: "Health & Beauty", image: "/photo-1582562124811-c09040d0a901" },
];

export const Categories = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className="relative rounded-lg overflow-hidden group"
            >
              <div className="aspect-square">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Button variant="secondary" className="text-white">
                  {category.name}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

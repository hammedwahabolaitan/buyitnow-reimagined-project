
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <div className="relative bg-gray-900 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/photo-1486312338219-ce68d2c6f44d"
          alt="Hero Background"
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      <div className="relative container mx-auto px-4 py-24">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Shop Smart, Shop Easy
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Discover amazing deals on thousands of products with fast delivery and
            secure payments.
          </p>
          <Button className="bg-primary hover:bg-primary/90">Shop Now</Button>
        </div>
      </div>
    </div>
  );
};

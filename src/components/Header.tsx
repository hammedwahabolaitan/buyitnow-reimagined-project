
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingBag, User, Menu, X, Search } from "lucide-react";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-primary">BuyItNow</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-primary">
              Products
            </Link>
            <Link to="/cart" className="text-gray-700 hover:text-primary">
              Cart
            </Link>
          </nav>

          {/* Search, Cart, and User Icons */}
          <div className="hidden md:flex items-center space-x-4">
            {isSearchOpen ? (
              <div className="relative flex items-center">
                <Input
                  className="w-64 pr-8"
                  placeholder="Search products..."
                  autoFocus
                />
                <button
                  className="absolute right-2"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            ) : (
              <button onClick={() => setIsSearchOpen(true)}>
                <Search className="h-5 w-5 text-gray-700" />
              </button>
            )}

            <Link to="/cart" className="relative">
              <ShoppingBag className="h-5 w-5 text-gray-700" />
              <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                2
              </span>
            </Link>

            <Link to="/login">
              <User className="h-5 w-5 text-gray-700" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingBag className="h-5 w-5 text-gray-700" />
              <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                2
              </span>
            </Link>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <div className="relative">
              <Input placeholder="Search products..." />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="h-4 w-4 text-gray-500" />
              </button>
            </div>
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-gray-700 hover:text-primary py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-700 hover:text-primary py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/cart"
                className="text-gray-700 hover:text-primary py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cart
              </Link>
            </nav>
            <div className="pt-2 border-t">
              <Button asChild className="w-full">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  Sign In / Register
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

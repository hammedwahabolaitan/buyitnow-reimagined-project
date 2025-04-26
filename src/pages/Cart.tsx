
import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Minus, Plus, Trash2 } from "lucide-react";

// Mock cart data
const initialCartItems = [
  {
    id: 1,
    title: "Wireless Earbuds",
    price: 29999,
    image: "/photo-1434494878577-86c23bcb06b9",
    quantity: 1,
  },
  {
    id: 2,
    title: "Smart Watch",
    price: 45999,
    image: "/photo-1434494878577-86c23bcb06b9",
    quantity: 1,
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast.success("Item removed from cart");
  };
  
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  
  const shippingCost = 1500; // ₦1,500
  const total = subtotal + shippingCost;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Cart Items */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="divide-y">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-4 flex gap-4">
                      <div className="w-24 h-24 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-primary font-bold mt-1">
                          ₦{item.price.toLocaleString()}
                        </p>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border rounded">
                            <button
                              className="px-2 py-1"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-1 border-l border-r">
                              {item.quantity}
                            </span>
                            <button
                              className="px-2 py-1"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <button
                            className="text-red-500 flex items-center gap-1"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="text-sm">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                    <span>₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>₦{shippingCost.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-primary">₦{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full mt-6">Proceed to Checkout</Button>
                
                <div className="mt-4 text-center">
                  <Link 
                    to="/products"
                    className="text-primary text-sm hover:underline"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;


import { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

// Mock product data for editing
const productData = [
  {
    id: "1",
    title: "Wireless Earbuds",
    description: "Experience crystal-clear audio with these wireless earbuds.",
    price: 29999,
    stock: 24,
    category: "Electronics",
    featured: true,
    images: ["/photo-1434494878577-86c23bcb06b9"],
  },
];

const ProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = id !== "new";
  
  // If editing, find the product with matching ID
  const existingProduct = isEditing 
    ? productData.find(p => p.id === id) 
    : null;
  
  const [formData, setFormData] = useState({
    title: existingProduct?.title || "",
    description: existingProduct?.description || "",
    price: existingProduct?.price ? existingProduct.price / 100 : "",
    stock: existingProduct?.stock || "",
    category: existingProduct?.category || "",
    featured: existingProduct?.featured || false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, featured: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to the backend
    console.log("Submitting product:", {
      ...formData,
      price: Number(formData.price) * 100, // Convert to cents
      stock: Number(formData.stock),
    });
    
    // Redirect or show success message
    alert(`Product ${isEditing ? 'updated' : 'created'} successfully!`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">{isEditing ? 'Edit' : 'Add'} Product</h1>
          <p className="text-gray-600">
            {isEditing ? 'Update product details' : 'Create a new product'}
          </p>
        </div>
      </div>
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Product Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter product title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                rows={4}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (₦)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                required
              >
                <option value="" disabled>Select a category</option>
                <option value="Electronics">Electronics</option>
                <option value="Mobile Phones">Mobile Phones</option>
                <option value="Computers">Computers</option>
                <option value="Accessories">Accessories</option>
                <option value="Wearables">Wearables</option>
                <option value="Audio">Audio</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="featured" 
                checked={formData.featured}
                onCheckedChange={handleCheckboxChange}
              />
              <label
                htmlFor="featured"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Featured Product
              </label>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Product Image</Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
              />
              {isEditing && existingProduct?.images && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-2">Current Image:</p>
                  <img 
                    src={existingProduct.images[0]} 
                    alt={existingProduct.title}
                    className="w-32 h-32 object-cover rounded border"
                  />
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" type="button" asChild>
                <a href="/admin/dashboard">Cancel</a>
              </Button>
              <Button type="submit">
                {isEditing ? 'Update' : 'Create'} Product
              </Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductForm;

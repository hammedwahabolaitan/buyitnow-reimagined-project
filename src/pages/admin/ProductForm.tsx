
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductFormFields } from "@/components/admin/ProductFormFields";
import { toast } from "sonner";

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
    
    if (!formData.title.trim()) {
      toast.error("Product title is required");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Product description is required");
      return;
    }

    if (!formData.category) {
      toast.error("Please select a category");
      return;
    }

    console.log("Submitting product:", {
      ...formData,
      price: Number(formData.price) * 100,
      stock: Number(formData.stock),
    });
    
    toast.success(`Product ${isEditing ? 'updated' : 'created'} successfully!`);
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
            <ProductFormFields
              formData={formData}
              handleChange={handleChange}
              handleCheckboxChange={handleCheckboxChange}
            />
            
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

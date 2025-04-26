
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";

// Mock product data
const productData = [
  {
    id: "1",
    title: "Wireless Earbuds",
    price: 29999,
    stock: 24,
    category: "Electronics",
  },
  {
    id: "2",
    title: "Smart Watch",
    price: 45999,
    stock: 15,
    category: "Wearables",
  },
  {
    id: "3",
    title: "Laptop Stand",
    price: 12999,
    stock: 32,
    category: "Accessories",
  },
  {
    id: "4",
    title: "Wireless Mouse",
    price: 8999,
    stock: 41,
    category: "Computers",
  },
  {
    id: "5",
    title: "Bluetooth Speaker",
    price: 19999,
    stock: 19,
    category: "Audio",
  },
];

// Mock order data
const orderData = [
  {
    id: "ORD-1234",
    customer: "John Doe",
    date: "2025-04-24",
    status: "Delivered",
    total: 29999,
  },
  {
    id: "ORD-1235",
    customer: "Jane Smith",
    date: "2025-04-25",
    status: "Processing",
    total: 45999,
  },
  {
    id: "ORD-1236",
    customer: "Robert Johnson",
    date: "2025-04-25",
    status: "Shipped",
    total: 12999,
  },
  {
    id: "ORD-1237",
    customer: "Sarah Williams",
    date: "2025-04-26",
    status: "Processing",
    total: 37998,
  },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your products and orders</p>
        </div>
      </div>
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Admin Navigation */}
        <div className="mb-8 border-b">
          <div className="flex space-x-4">
            <button
              className={`pb-2 px-1 ${
                activeTab === "overview"
                  ? "border-b-2 border-primary font-medium"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`pb-2 px-1 ${
                activeTab === "products"
                  ? "border-b-2 border-primary font-medium"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("products")}
            >
              Products
            </button>
            <button
              className={`pb-2 px-1 ${
                activeTab === "orders"
                  ? "border-b-2 border-primary font-medium"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("orders")}
            >
              Orders
            </button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-1">Total Products</h3>
                <p className="text-3xl font-bold">{productData.length}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-1">Total Orders</h3>
                <p className="text-3xl font-bold">{orderData.length}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-1">Revenue</h3>
                <p className="text-3xl font-bold">₦{orderData.reduce((sum, order) => sum + order.total, 0).toLocaleString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Recent Orders</h3>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/admin/orders">View All</Link>
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderData.slice(0, 3).map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Shipped"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Low Stock Products</h3>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/admin/products">View All</Link>
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {productData
                      .sort((a, b) => a.stock - b.stock)
                      .slice(0, 3)
                      .map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>{product.title}</TableCell>
                          <TableCell>₦{product.price.toLocaleString()}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                product.stock < 20
                                  ? "bg-red-100 text-red-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {product.stock}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div>
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold">Products</h2>
              <Button asChild>
                <Link to="/admin/products/new">Add New Product</Link>
              </Button>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productData.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>{product.title}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>₦{product.price.toLocaleString()}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            product.stock < 20
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {product.stock}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm" className="text-red-500">Delete</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div>
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold">Orders</h2>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderData.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>₦{order.total.toLocaleString()}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Shipped"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="outline" size="sm">Update</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;

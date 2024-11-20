'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from '@/app/components/cart/CartProvider'
import { Product } from '@/types'

const products: Product[] = [
  {
    id: 1,
    title: "The Art of Design",
    description: "A comprehensive guide to modern design principles",
    price: 6.00,
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9vayUyMGNvdmVyfGVufDB8fDB8fHww"
  },
  {
    id: 2,
    title: "Digital Revolution",
    description: "Exploring the impact of technology on society",
    price: 9.00,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9vayUyMGNvdmVyfGVufDB8fDB8fHww"
  },
  {
    id: 3,
    title: "Future of AI",
    description: "Understanding artificial intelligence and its possibilities",
    price: 7.50,
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJvb2slMjBjb3ZlcnxlbnwwfHwwfHx8MA%3D%3D"
  }
]

export default function ShopComponent() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { state: { items: cartItems, totalItems, totalPrice }, dispatch } = useCart()

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-700 to-indigo-800 text-white">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-purple-900/50 border-b border-purple-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-yellow-300"
          >
            ModernShop
          </motion.h1>
          <Button
            variant="outline"
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="relative bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-500"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            My Cart
            {totalItems > 0 && (
              <Badge variant="secondary" className="ml-2 bg-yellow-400 text-purple-900">
                {totalItems}
              </Badge>
            )}
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <AnimatePresence>
          {isCartOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <Card className="bg-indigo-900 border-indigo-700">
                <CardHeader>
                  <CardTitle className="text-yellow-300">Your Shopping Cart</CardTitle>
                </CardHeader>
                <CardContent>
                  {cartItems.length === 0 ? (
                    <p className="text-indigo-300">Your cart is empty</p>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map(item => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="flex justify-between items-center"
                        >
                          <div className="flex-grow">
                            <h3 className="font-medium text-yellow-300">{item.title}</h3>
                            <p className="text-sm text-indigo-300">
                              ${item.price.toFixed(2)} x {item.quantity}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-indigo-700 hover:bg-indigo-600 text-white border-indigo-500"
                              onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, change: -1 } })}
                            >
                              <Minus className="w-4 h-4" />
                              <span className="sr-only">Decrease quantity</span>
                            </Button>
                            <span className="text-yellow-300 w-8 text-center">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-indigo-700 hover:bg-indigo-600 text-white border-indigo-500"
                              onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, change: 1 } })}
                            >
                              <Plus className="w-4 h-4" />
                              <span className="sr-only">Increase quantity</span>
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span className="sr-only">Remove item</span>
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                      <div className="pt-4 border-t border-indigo-700">
                        <p className="text-lg font-bold text-yellow-300">
                          Total: ${totalPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <h2 className="text-2xl font-bold mb-6 text-yellow-300">Featured Products</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full bg-indigo-900 border-indigo-700 overflow-hidden group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="relative h-48"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-lg font-bold">{product.title}</p>
                  </div>
                </motion.div>
                <CardHeader>
                  <CardTitle className="text-yellow-300">{product.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-indigo-300">{product.description}</p>
                  <p className="text-xl font-bold mt-2 text-yellow-300">${product.price.toFixed(2)}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                    onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })}
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}
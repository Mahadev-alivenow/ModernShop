import dynamic from 'next/dynamic'
import { CartProvider } from './components/cart/CartProvider'

const ShopComponent = dynamic(() => import('@/components/shop/ShopComponent'), {
  ssr: false,
})

export default function Home() {
  return (
    <CartProvider>
      <ShopComponent />
    </CartProvider>
  )
}
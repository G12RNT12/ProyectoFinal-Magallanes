import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }){
  const [cart, setCart] = useState([]) 

  const addToCart = (product, qty=1) => {
    setCart(prev => {
      const exists = prev.find(p => p.id === product.id)
      if (exists){
        return prev.map(p => p.id === product.id ? {...p, quantity: p.quantity + qty} : p)
      }
      return [...prev, {...product, quantity: qty}]
    })
  }

  const updateQuantity = (id, qty) => {
    setCart(prev => prev.map(p => p.id === id ? {...p, quantity: Math.max(1, qty)} : p))
  }

  const removeItem = (id) => setCart(prev => prev.filter(p => p.id !== id))
  const clearCart = () => setCart([])

  const totals = useMemo(() => {
    const totalItems = cart.reduce((a,b)=> a + (b.quantity||0), 0)
    const totalPrice = cart.reduce((a,b)=> a + (b.quantity||0) * (b.price||0), 0)
    return { totalItems, totalPrice }
  }, [cart])

  const value = { cart, addToCart, updateQuantity, removeItem, clearCart, ...totals }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(){
  const ctx = useContext(CartContext)
  if(!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>')
  return ctx
}

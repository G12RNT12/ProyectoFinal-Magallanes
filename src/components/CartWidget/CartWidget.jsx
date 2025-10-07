import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

export default function CartWidget(){
  const { totalItems } = useCart()
  return (
    <Link to="/cart" className="cart" title="Carrito">
      <span style={{ fontSize: '1.6rem' }}>🛒</span>
      {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
    </Link>
  )
}

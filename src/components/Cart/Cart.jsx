import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

export default function Cart(){
  const { cart, totalPrice, updateQuantity, removeItem, clearCart } = useCart()
  const navigate = useNavigate()

  if(cart.length === 0){
    return (
      <div className="empty">
        <h3>Tu carrito está vacío</h3>
        <Link to="/" className="btn" style={{marginTop:12}}>Ir al catálogo</Link>
      </div>
    )
  }

  return (
    <div>
      <h1 className="page-title">🛍️ Tu Carrito</h1>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map(p => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td>${p.price}</td>
              <td>
                <input className="qty" type="number" min="1" value={p.quantity}
                  onChange={e => updateQuantity(p.id, Math.max(1, Number(e.target.value)||1))}/>
              </td>
              <td>${(p.price * p.quantity).toFixed(2)}</td>
              <td><button className="btn" onClick={()=>removeItem(p.id)} style={{background:'#ef4444'}}>Eliminar</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:16}}>
        <div style={{fontSize:20, fontWeight:800}}>Total: ${totalPrice.toFixed(2)}</div>
        <div style={{display:'flex', gap:10}}>
          <button className="btn" style={{background:'#64748b'}} onClick={clearCart}>Vaciar</button>
          <button className="btn" onClick={()=>navigate('/checkout')}>Finalizar compra</button>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useCart } from '../../context/CartContext'
import { createOrder } from '../../services/firebase'
import { Link } from 'react-router-dom'

export default function CheckoutForm(){
  const { cart, totalPrice, clearCart } = useCart()
  const [form, setForm] = useState({ name:'', email:'', phone:'' })
  const [loading, setLoading] = useState(false)
  const [orderId, setOrderId] = useState(null)
  const [error, setError] = useState(null)

  const handleChange = (e) => setForm(prev => ({...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError(null)
    try{
      const order = {
        buyer: form,
        items: cart.map(({id, title, price, quantity}) => ({ id, title, price, quantity })),
        total: totalPrice
      }
      const id = await createOrder(order)
      setOrderId(id)
      clearCart()
    }catch(err){
      console.error('Error al crear la orden:', err)
      setError(err?.message || 'Error al crear la orden')
    }finally{
      setLoading(false)
    }
  }

  if(orderId){
    return (
      <div className="empty">
        <h2>✅ ¡Compra confirmada!</h2>
        <p>Tu ID de orden es:</p>
        <div className="badge" style={{fontSize:16, padding:'8px 14px', marginTop:8}}>{orderId}</div>
        <Link to="/" className="btn" style={{marginTop:16}}>Volver al inicio</Link>
      </div>
    )
  }

  if(cart.length === 0){
    return (
      <div className="empty">
        <h3>No hay productos en el carrito.</h3>
        <Link className="btn" to="/">Ir al catálogo</Link>
      </div>
    )
  }

  return (
    <div style={{display:'grid', gridTemplateColumns:'1fr 420px', gap:24}}>
      <div>
        <h1 className="page-title">Finalizar Compra</h1>
        <form onSubmit={handleSubmit} style={{display:'grid', gap:12, maxWidth:520}}>
          <input required name="name" placeholder="Nombre y apellido" value={form.name} onChange={handleChange} className="qty" style={{width:'100%'}}/>
          <input required type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="qty" style={{width:'100%'}}/>
          <input required name="phone" placeholder="Teléfono" value={form.phone} onChange={handleChange} className="qty" style={{width:'100%'}}/>
          <button className="btn" disabled={loading}>{loading ? 'Confirmando...' : 'Confirmar compra'}</button>
          {error && <div className="muted" style={{color:'#ef4444'}}>{error}</div>}
        </form>
      </div>
      <aside className="card">
        <h3>Resumen</h3>
        <ul style={{listStyle:'none', padding:0, margin:0}}>
          {cart.map(p => (
            <li key={p.id} style={{display:'flex', justifyContent:'space-between', padding:'6px 0'}}>
              <span>{p.title} × {p.quantity}</span>
              <b>${(p.price * p.quantity).toFixed(2)}</b>
            </li>
          ))}
        </ul>
        <hr style={{margin:'10px 0'}}/>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <span>Total</span><b>${totalPrice.toFixed(2)}</b>
        </div>
      </aside>
    </div>
  )
}

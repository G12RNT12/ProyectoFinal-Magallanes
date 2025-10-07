import { useState } from 'react'
import { useCart } from '../../context/CartContext'

export default function ItemDetail({ product }){
  const { addToCart } = useCart()
  const [qty, setQty] = useState(1)

  const onAdd = () => addToCart(product, qty)

  return (
    <div className="detail">
      <div className="card">
        <img src={product.image} alt={product.title} style={{height:380}} />
      </div>
      <div>
        <h1 className="page-title">{product.title}</h1>
        <div className="badge" style={{marginBottom:10}}>{product.category}</div>
        <p className="muted" style={{lineHeight:1.6}}>{product.description || 'Sin descripción disponible.'}</p>
        <div className="price" style={{fontSize:26}}>${product.price}</div>
        <div style={{display:'flex', gap:10, marginTop:14, alignItems:'center'}}>
          <input className="qty" type="number" min="1" value={qty}
            onChange={e => setQty(Math.max(1, Number(e.target.value)||1))} />
          <button className="btn" onClick={onAdd}>Añadir al carrito</button>
        </div>
      </div>
    </div>
  )
}

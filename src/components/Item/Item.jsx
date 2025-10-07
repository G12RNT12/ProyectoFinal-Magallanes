import { Link } from 'react-router-dom'

export default function Item({ product }){
  return (
    <div className="card">
      <img src={product.image} alt={product.title} />
      <h3 style={{margin:'8px 0 4px'}}>{product.title}</h3>
      <div className="muted">{product.category}</div>
      <div className="price">${product.price}</div>
      <Link className="btn" style={{display:'inline-block', marginTop:10}} to={`/item/${product.id}`}>
        Ver detalle →
      </Link>
    </div>
  )
}

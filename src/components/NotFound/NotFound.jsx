import { Link } from 'react-router-dom'

export default function NotFound(){
  return (
    <div className="empty">
      <h2>Página no encontrada 😧</h2>
      <Link to="/" className="btn" style={{marginTop:12}}>Volver al inicio</Link>
    </div>
  )
}

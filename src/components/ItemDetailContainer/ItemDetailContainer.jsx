import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductById } from '../../services/firebase'
import ItemDetail from '../ItemDetail/ItemDetail'

export default function ItemDetailContainer(){
  const { itemId } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try{
        if(!itemId){ throw new Error('ID del producto no definido') }
        const prod = await getProductById(itemId)
        setProduct(prod)
      }catch(err){
        console.error('❌ Error al obtener producto:', err)
        setError(err?.message || 'Error al obtener producto')
      }finally{
        setLoading(false)
      }
    }
    fetchProduct()
  }, [itemId])

  if(loading) return <div className="empty"><h3>⏳ Cargando producto...</h3></div>
  if(error) return (
    <div className="empty">
      <h3>⚠️ No se encontró el producto o el ID no existe en Firestore.</h3>
      <p>Verifica si el ID del producto coincide con los documentos en Firebase.</p>
      <Link to="/" className="btn" style={{marginTop:12}}>Volver al catálogo</Link>
    </div>
  )
  if(!product) return null

  return <ItemDetail product={product} />
}

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ItemList from '../ItemList/ItemList'
import { getProducts, getProductsByCategory } from '../../services/firebase'

export default function ItemListContainer(){
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { categoryId } = useParams()

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try{
        const data = categoryId ? await getProductsByCategory(categoryId) : await getProducts()
        setProducts(data)
      }catch(err){
        console.error('❌ Error al cargar productos:', err)
      }finally{
        setLoading(false)
      }
    }
    load()
  }, [categoryId])

  if(loading) return <div className="empty"><h3>⏳ Cargando productos...</h3></div>
  if(products.length === 0) return <div className="empty"><h3>😕 No se encontraron productos.</h3></div>

  return <ItemList products={products} />
}

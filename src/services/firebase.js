import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, getDocs, getDoc, doc,
  query, where, addDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDEMvqizNfag4kNKTTYpDHTtFgk5bTyqy0",
  authDomain: "base-de-datos-02-c5c52.firebaseapp.com",
  projectId: "base-de-datos-02-c5c52",
  storageBucket: "base-de-datos-02-c5c52.firebasestorage.app",
  messagingSenderId: "472591777211",
  appId: "1:472591777211:web:79fe1502ee85da5990d89e"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const mapSnap = (snap) => snap.docs.map(d => ({ id: d.id, ...d.data() }))

export const getProducts = async () => {
  const snap = await getDocs(collection(db, 'productos'))
  return mapSnap(snap)
}

export const getProductsByCategory = async (category) => {
  const q = query(collection(db, 'productos'), where('category', '==', category))
  const snap = await getDocs(q)
  return mapSnap(snap)
}

export const getProductById = async (id) => {
  if(!id){ throw new Error('ID inválido') }
  try {
    const ref = doc(db, 'productos', String(id))
    const snap = await getDoc(ref)
    if (snap.exists()) return { id: snap.id, ...snap.data() }
  } catch {}
  const candidates = [id]
  const n = Number(id); if(!Number.isNaN(n)) candidates.push(n)
  for (const v of candidates){
    const q = query(collection(db, 'productos'), where('id', '==', v))
    const snap = await getDocs(q)
    if(!snap.empty) {
      const d = snap.docs[0]
      return { id: d.id, ...d.data() }
    }
  }
  throw new Error('Producto no encontrado')
}

export const createOrder = async (order) => {
  const safeItems = (order.items||[]).map(it => ({
    id: it.id ?? null,
    title: it.title ?? '',
    price: Number(it.price ?? 0),
    quantity: Number(it.quantity ?? 0)
  }))
  const payload = {
    buyer: {
      name: order.buyer?.name ?? '',
      email: order.buyer?.email ?? '',
      phone: order.buyer?.phone ?? ''
    },
    items: safeItems,
    total: Number(order.total ?? 0),
    createdAt: new Date().toISOString()
  }
  const ref = await addDoc(collection(db, 'orders'), payload)
  return ref.id
}

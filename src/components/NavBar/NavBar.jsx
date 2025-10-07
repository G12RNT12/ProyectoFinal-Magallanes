import { NavLink, Link } from 'react-router-dom'
import CartWidget from '../CartWidget/CartWidget'

export default function NavBar(){
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="brand">TechNova Store</Link>
        <nav className="menu">
          <NavLink to="/category/smartphones">Smartphones</NavLink>
          <NavLink to="/category/laptops">Laptops</NavLink>
          <NavLink to="/category/accesorios">Accesorios</NavLink>
          <CartWidget />
        </nav>
      </div>
    </header>
  )
}

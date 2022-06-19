import "./navbar.css"
import {Link} from 'react-router-dom';
import { useContext } from 'react';
import StoreContext from "../context/storeContext";

function Navbar() {
 let cart = useContext(StoreContext).cart;

  const getNumItems = () => {
    let total = 0;
    for (let i=0; i< cart.length; i++) {
      total += cart[i].quantity;
    };
    return total;
  };

  return (
  <nav className="navbar navbar-expand-lg navbar-light">
    <div className="container-fluid">
  <Link className="navbar-brand" to="/">Ben's Fruit Store</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link" to="/">Home <span className="sr-only"></span></Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to="/catalog">Catalog <span className="sr-only"></span></Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to="/about">About <span className="sr-only"></span></Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to="/admin">Admin <span className="sr-only"></span></Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to="/todo">Shopping List <span className="sr-only"></span></Link>
      </li>
    </ul>
    <form className="btn btn-outline-light">
    <Link className="nav-link" to="/cart">
      {getNumItems()} Cart
    </Link>
    </form>
    </div>
  </div>
</nav>
  
    );
}

export default Navbar;
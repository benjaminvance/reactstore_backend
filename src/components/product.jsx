import "./product.css"
import QuantityPicker from "./quantityPicker";
import { useState, useContext } from "react";
import StoreContext from "../context/storeContext";

const Product = (props) => {
    let [quantity, setQuantity] = useState(1);
    let addProdToCart = useContext(StoreContext).addProdToCart;

    let onQuantityChange = (value) => {
        setQuantity(value);
    };

    const getTotal = () => {
        let total = props.data.price * quantity;
        return total.toFixed(2);
    };

    const addProduct = () => {
        console.log("Adding products to cart...", props.data.title);
        let prodForCart = {...props.data, quantity: quantity};
        addProdToCart(prodForCart);
        
    };

    return(
        <div className="product">
            <img className="productImg" src={"/img/"+props.data.image}></img>
            <h2>{props.data.title}:</h2>
            
            <div className="prices">
            <label>Price: ${props.data.price.toFixed(2)}</label>
            <label>Total: ${getTotal()}</label>
            </div>
           
            <div className="controls">
            <QuantityPicker onChange={onQuantityChange}></QuantityPicker>
            <button className="btn btn-primary btn-sm" onClick={addProduct}>Add</button>
            </div>
        </div>
    );
};

export default Product;
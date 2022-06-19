import "./catalog.css";
import Product from "./product";
import DataService from "../services/dataService";
import {useState, useEffect} from "react";


const Catalog = () => {
    let [products, setProducts] = useState([]);

    const loadCatalog = () => {
        let service = new DataService();
        let data = service.getCatalog();
        setProducts(data);
    };

    useEffect(() => {
        loadCatalog();
    });


    return(
            <div className="catalog">
            <h2>Selection of Fruit</h2>
            <h3>We have {products.length} products!</h3>

            {
                products.map( (prod) => (<Product key ={prod._id} data={prod}></Product>) )
            }

            {/* <Product title="test" price="13.5"></Product>
            <Product title="test1" price="14.5"></Product>
            <Product title="test2" price="15.5"></Product>
            <Product title="test3" price="16.5"></Product>
            <Product title="test4" price="17.5"></Product>
            <Product title="test5" price="18.5"></Product> */}
        </div>
    );
}

export default Catalog;
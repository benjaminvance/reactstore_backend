import StoreContext from "./storeContext";
import { useState } from "react";
import Cart from './../components/cart';

const GlobalStoreProvider = (props) => {
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState({ name: "admin", id: 42});

    const addProdToCart = (prod) =>{
        console.log("Global add prod...");




        let copy = [...cart];
        let found = false;
        for(let i=0; i< copy.length, i++;) {
            let item = copy[i];

            if (item._id === prod._id)
            {
               found = true;
                // item.quantity = item.quantity + prod.quantity;
                item.quantity += prod.quantity;
            }
        }

        if (!found) {
            copy.push(prod);
        }

        // copy.push(prod);
        setCart(copy);
    };

    const removeProdFromCart = (_id) => {
        console.log("Global remove prod...");

        let copy = [...cart];

        for(let i=0; i < copy.length; i++){
            if (copy[i]._id === _id){
                copy.splice(i, 1);
            };

        };
        setCart(copy);
    };

    return(
        <div>
            <StoreContext.Provider value={{
                cart: cart,
                user: user,
                addProdToCart: addProdToCart,
                removeProdFromCart: removeProdFromCart,

            }}>
                {props.children}
            </StoreContext.Provider>

        </div>
    );

};

export default GlobalStoreProvider;
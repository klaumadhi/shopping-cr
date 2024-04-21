import { createContext, useContext, useReducer } from "react" 
import { cartReducer } from "../reducer/cartReducer"

// Initial state for the cart
const initialState ={
    cartList: [], // Empty array to store cart items
    total: 0 // Initial total cost set to 0
}

// Creating a context object for the cart
const CartContext = createContext(initialState)

// CartProvider component responsible for providing the cart context
export const CartProvider = ({children}) => {
    
    const [state,dispatch] = useReducer(cartReducer, initialState)

    const addToCart =(products) => {
       const updatedCartList  =  state.cartList.concat(products)

       updateTotal(updatedCartList)
       
       dispatch({
        type: "ADD_TO_CART",
        payload: {
            abc: updatedCartList
        }
       })
    }

    const removeFromCart = (product) => {
        const updatedCartList = state.cartList.filter(current => current.id !== product.id)

        updateTotal(updatedCartList)

        dispatch({
            type: "REMOVE_FROM_CART",
            payload: {
                products: updatedCartList
            }
        })
    }

    const updateTotal = (products) => {
        let total = 0;
        products.forEach(product => total = total+ product.price)

        dispatch({
            type : "UPDATE_TOTAL",
                payload : {
                    total
                }
        })
    }

    // Value object to be provided as the context value
    const value = {
        total : state.total,
        cartList: state.cartList,
        addToCart,
        removeFromCart

    }

    // Returning JSX to render
    return (
        <CartContext.Provider value={value}> {/* Providing the value to the context */}
            {children} {/* Rendering child components */}
        </CartContext.Provider>
    );
}

// Custom hook to access the cart context
export const useCart = () => {
    const context = useContext(CartContext) // Accessing the cart context
    return context 
}

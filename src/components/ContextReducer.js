import React, { useReducer, useContext, createContext } from 'react';

// Creating separate contexts for state and dispatch
const CartStateContext = createContext();
const CartDispatchContext = createContext();

// Reducer function to manage cart actions
const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    qty: action.qty,
                    size: action.size,
                    price: action.price,
                    img: action.img
                }
            ];
        case "REMOVE":
            return state.filter((item, index) => index !== action.index);
        case "DROP":
            let empmess = []
            return empmess

        default:
            console.log("Error in Reducer");
            return state; 
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
};

// Custom hooks for accessing cart state and dispatch
export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);

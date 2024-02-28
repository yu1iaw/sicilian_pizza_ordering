import { createContext, useContext, useState } from "react";
import { randomUUID } from 'expo-crypto';
import { useRouter } from "expo-router";

import { useInsertOrder } from "../services/queries/orders";
import { useAuth } from "./authContext";
import { useInsertOrderItems } from "../services/queries/orderItems";
import { notifyAdminsOfNewOrder} from "../lib/notifications";



const CartContext = createContext();

export const CartProvider = ({children}) => {
    const router = useRouter();
    const [items, setItems] = useState([]);
    const { mutate: insertOrder } = useInsertOrder();
    const { mutate: insertOrderItems } = useInsertOrderItems();
    const { session } = useAuth();
    const total = items.reduce((acc, current) => acc + current.product.price[current.size] * current.quantity, 0);


    const addItem = (product, size) => {
        const existingProduct = items.find(item => item.product_id === product.id && item.size === size);
        if (existingProduct) return updateQuantity(existingProduct.id, 1);

        const newCartItem = {
            id: randomUUID(),
            product,
            product_id: product.id,
            size,
            quantity: 1
        }
        setItems(prevState => [newCartItem, ...prevState]);
    }


    const updateQuantity = (itemId, amount) => {
        const updatedItems = items.map(item => {
            if (item.id === itemId) {
                const quantity = item.quantity + amount;

                if (quantity < -1 && amount === -1) {
                    return item;
                } else {
                    return { ...item, quantity }
                }
            }

            return item;
        })
        .filter(item => item.quantity > -1);

        setItems(updatedItems)
    }


    const checkout = () => {
        insertOrder({
            userId: session,
            total
        }, {
            onSuccess: (data, variables, context) => {
                addOrderItems(data);
            }
        })
    }

    const addOrderItems = (newOrder) => {
        if (!newOrder) return;

        insertOrderItems({
            orderId: newOrder.id,
            items
        }, {
            onSuccess: () => {
                setItems([]);
                router.push(`/(user)/orders/${newOrder.id}`);
                notifyAdminsOfNewOrder(newOrder);
            }
        })
    }


    return (
        <CartContext.Provider value={{items, addItem, updateQuantity, checkout, total}}>
            {children}
        </CartContext.Provider>
    )
}



export const useCart = () => {
    const value = useContext(CartContext);
    if (!value) throw new Error('Some context error occurred');

    return value;
}
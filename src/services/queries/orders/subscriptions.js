import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { supabase } from "../../../lib/supabase";



export const useOrdersListener = () => {
    const queryClient = useQueryClient();

	useEffect(() => {
		const orders = supabase
			.channel("custom-orders-channel")
			.on("postgres_changes", { event: "INSERT", schema: "public", table: "dev_orders" }, (payload) => {
				queryClient.invalidateQueries(['orders']);
			})
			.subscribe();

        return () => {
            orders.unsubscribe();
        }
	}, []);
};



export const useUpdateOrderListener = (orderId) => {
    const queryClient = useQueryClient();

    useEffect(() => {
        const order = supabase
            .channel('custom-order-channel')
            .on("postgres_changes", { event: 'UPDATE', schema: 'public', table: 'dev_orders', filter: `id=eq.${orderId}`}, payload => {
                queryClient.invalidateQueries(['orders', orderId]);
            })
            .subscribe()

        return () => {
            order.unsubscribe();
        }
    }, [])

}

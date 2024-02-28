import { useMutation } from "@tanstack/react-query";

import { supabase } from "../../../lib/supabase";



export const useInsertOrderItems = () => {
	return useMutation({
		mutationFn: async ({ orderId, items }) => {
			const { error } = await supabase
                .from("dev_order_items")
                .insert(
                    items.map((item) => ({
                        order_id: orderId,
                        product_id: item.product_id,
                        quantity: item.quantity,
                        size: item.size,
                    }))
			    );
            if (error) throw error;
		},
        onError: (e) => {
            console.log(e);
        }
	});
};

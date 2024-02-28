import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { supabase } from "../../../lib/supabase";



export const useOrdersList = (userId) => {
    return useQuery({
        queryKey: ['orders', userId],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('dev_orders')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (error) throw new Error(error.message);
            return data;
        }
    })
}


export const useAdminOrdersList = ({archived = false}) => {
    const options = archived ? ['DELIVERED'] : ['NEW', 'COOKING', 'DELIVERING'];

    return useQuery({
        queryKey: ['orders', {archived}],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('dev_orders')
                .select('*')
                .in('status', options)
                .order('created_at', { ascending: false });

            if (error) throw new Error(error.message);
            return data;
        }
    })
}


export const useOrderById = (orderId) => {
    return useQuery({
        queryKey: ['orders', orderId],
        queryFn: async () => {
            const { data, error } = await supabase
                // .from('dev_order_items')
                // .select('id, order_id, size, quantity, product:dev_products(*), order:dev_orders(created_at, status)')
                // .eq('order_id', orderId)
                .from('dev_orders')
                .select('*, order_items:dev_order_items(*, product:dev_products(*))')
                .eq('id', orderId)
                .single()

            if (error) throw new Error(error.message);
            return data;
        }
    })
}


export const useInsertOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data) => {
            const { data: newOrder, error } = await supabase
                .from('dev_orders')
                .insert({
                    user_id: data.userId,
                    total: data.total
                })
                .select()
                .single()

            if (error) throw error;
            return newOrder;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['orders']);
        },
        onError: (e) => {
            console.log(e);
        }
    })
}

export const useUpdateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({orderId, status}) => {
            const { data: updatedOrder, error } = await supabase
                .from('dev_orders')
                .update(status)
                .eq('id', orderId)
                .select()
                .single()

            if (error) throw error;
            return updatedOrder;
        },
        onSuccess: (data, {orderId}) => {
            queryClient.invalidateQueries(['orders', orderId]);
            queryClient.setQueryData(['orders', { archived: false }], orders => {
                return orders.map(order => (order.id == orderId ? data : order))
            })
        },
        onError: (e) => {
            console.log(e);
        }
    })
}


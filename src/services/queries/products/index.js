import { Alert } from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { supabase } from "../../../lib/supabase";



export const useProductsList = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('dev_products')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw new Error(error.message);
            return data;
        }
    })
}


export const useProductById = (id) => {
    return useQuery({
        queryKey: ['products', id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('dev_products')
                .select('*')
                .eq('id', id)
                .maybeSingle()

            if (error) throw new Error(error.message);
            return data;
        }
    })
}


export const useInsertProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data) => {
            const { error } = await supabase
                .from('dev_products')
                .insert(data)

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
        },
        onError: (e) => {
            console.log(e);
            Alert.alert('Oops', 'You are above me but not today');
        }
    })
}


export const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({id, ...rest}) => {
            const { data: updatedProduct, error } = await supabase
                .from('dev_products')
                .update(rest)
                .eq('id', id)
                .select()
                .single()
            
            if (error) throw error;
            return updatedProduct;
        },
        onSuccess: (_, {id}) => {
            queryClient.invalidateQueries(['products'])
            queryClient.invalidateQueries(['products', id])
        },
        onError: (e) => {
            console.log(e);
            Alert.alert('Oops', 'You are above me but not today');
        }
    })
}


export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
            const { error } = await supabase
                .from('dev_products')
                .delete()
                .eq('id', id)

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
        },
        onError: (e) => {
            console.log(e);
            Alert.alert('Oops', 'You are above me but not today');
        }
    })
}
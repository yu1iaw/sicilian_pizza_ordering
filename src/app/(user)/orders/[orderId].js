import { Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import tw from 'twrnc';

import { OrderItem } from "../../../components/OrderItemListItem";
import { OrderListItem } from "../../../components/OrderListItem";
import { useOrderById } from "../../../services/queries/orders";
import { useUpdateOrderListener } from "../../../services/queries/orders/subscriptions";
import Colors from "../../../constants/Colors";



export default OrderDetails = () => {
    const { orderId: orderIdString } = useLocalSearchParams();
    const orderId = parseFloat(typeof orderIdString === "string" ? orderIdString : orderIdString[0]);
    const { data: order, error, isLoading } = useOrderById(orderId);
    
    useUpdateOrderListener(orderId);


    if (isLoading) {
        return (
            <View style={tw`flex-1 items-center justify-center`}>
                <ActivityIndicator size="large" color={Colors.light.tint}/>
            </View>
        )
    }

    if (error) {
        return <Text>Failed to fetch order details</Text>
    }


    const orderItemData = {
        id: orderId,
        created_at: order.created_at,
        status: order.status
    };


    return (
        <View style={tw`flex-1 px-3`}>
            <Stack.Screen
                options={{
                    title: `Order #${orderId}`
                }}
            />
            <FlatList 
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={<OrderListItem order={orderItemData} />}
                ListHeaderComponentStyle={tw`my-3`}
                data={order.order_items}
                keyExtractor={order => order.id}
                renderItem={({item}) => {
                    return <OrderItem order={item} />
                }}
                contentContainerStyle={tw`gap-y-3 pt-3 pb-6`}
            />
        </View>
    )
}
import { Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native";
import tw from "twrnc";

import orders, { OrderStatusList } from "../../../../assets/data/orders";
import { OrderItem } from "../../../components/OrderItemListItem";
import { OrderListItem } from "../../../components/OrderListItem";
import Colors from "../../../constants/Colors";
import { updateOrderStatusNotification } from "../../../lib/notifications";
import { useOrderById, useUpdateOrder } from "../../../services/queries/orders";



export default OrderDetails = () => {
	const { orderId: orderIdString } = useLocalSearchParams();
	const orderId = parseFloat(typeof orderIdString === "string" ? orderIdString : orderIdString[0]);
	const { data: order, error, isLoading } = useOrderById(orderId);
	const { mutate: updateOrder } = useUpdateOrder();


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


	const updateStatus = async (status) => {
		updateOrder({
			orderId,
			status: { status }
		})

		await updateOrderStatusNotification({...order, status});
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
					title: `Order #${orderId}`,
				}}
			/>
			<FlatList
                showsVerticalScrollIndicator={false}
				ListHeaderComponent={<OrderListItem order={orderItemData} />}
				ListHeaderComponentStyle={tw`mt-6 mb-3`}
				data={order.order_items}
				keyExtractor={(order) => order.id}
				renderItem={({ item }) => <OrderItem order={item} />}
				contentContainerStyle={tw`gap-y-3`}
                ListFooterComponentStyle={tw`mt-3 mb-6`}
				ListFooterComponent={() => (
					<>
						<Text style={tw`text-base font-bold`}>Status</Text>
						<View style={tw`flex-row justify-evenly`}>
							{OrderStatusList.map((status) => (
								<Pressable
									key={status}
									onPress={() => updateStatus(status)}
									style={tw.style(`px-1 py-2 my-3 border border-[${Colors.light.tint}] rounded-md`, { backgroundColor: order.status === status ? Colors.light.tint : "transparent" })}>
									<Text style={{color: order.status === status ? "white" : Colors.light.tint}}>
										{status}
									</Text>
								</Pressable>
							))}
						</View>
					</>
				)}
			/>
		</View>
	);
};




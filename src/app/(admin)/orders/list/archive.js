import { ActivityIndicator, FlatList, Text, View } from "react-native";
import tw from 'twrnc';

import { OrderListItem } from "../../../../components/OrderListItem";
import { useAdminOrdersList } from "../../../../services/queries/orders";
import Colors from "../../../../constants/Colors";



export default OrdersScreen = () => {
    const { data: orders, error, isLoading } = useAdminOrdersList({archived: true});

    if (isLoading) {
        return (
            <View style={tw`flex-1 items-center justify-center`}>
                <ActivityIndicator size="large" color={Colors.light.tint}/>
            </View>
        )
    }

    if (error) {
        return <Text>Failed to fetch archive orders</Text>
    }


    return (
        <FlatList
            data={orders}
            keyExtractor={order => order.id}
            renderItem={({item, index}) => <OrderListItem order={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`gap-y-3 p-3`}
        />
    )
}
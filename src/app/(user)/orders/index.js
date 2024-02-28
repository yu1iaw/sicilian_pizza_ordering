import { ActivityIndicator, FlatList, Text, View } from "react-native";
import tw from 'twrnc';

import orders from '../../../../assets/data/orders';
import { ListEmptyItem } from '../../../components/ListEmptyItem';
import { OrderListItem } from "../../../components/OrderListItem";
import Colors from "../../../constants/Colors";
import { useAuth } from "../../../context/authContext";
import { useOrdersList } from "../../../services/queries/orders";



export default OrdersScreen = () => {
    const { session } = useAuth();
    const { data: orders, error, isLoading } = useOrdersList(session);

    
    if (isLoading) {
        return (
            <View style={tw`flex-1 items-center justify-center`}>
                <ActivityIndicator size="large" color={Colors.light.tint} />
            </View>
        )
    }

    if (error) {
        return <Text>Failed to fetch orders</Text>
    }

    return (
        <FlatList
            data={orders}
            keyExtractor={order => order.id}
            renderItem={({item, index}) => <OrderListItem order={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`gap-y-3 p-3`}
            ListEmptyComponent={<ListEmptyItem title="There are no orders yet" />}
        />
    )
}
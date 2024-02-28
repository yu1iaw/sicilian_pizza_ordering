import { FlatList, Platform, Text, View } from "react-native";
import tw from 'twrnc';
import { StatusBar } from "expo-status-bar";

import { CartListItem } from "../components/CartListItem";
import { Button } from "../components/Button";
import { useCart } from "../context/cartContext";
import { ListEmptyItem } from "../components/ListEmptyItem";



export default Cart = () => {
    const { items, total, checkout } = useCart();

    return (
        <View style={tw`flex-1 p-5`}>
            <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
            <FlatList 
                data={items}
                keyExtractor={item => item.id}
                renderItem={({item}) => <CartListItem cartItem={item} />}
                contentContainerStyle={tw`gap-2 pb-3`}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<ListEmptyItem title="Cart is empty yet" />}
            />

            {items.length > 0 && (
                <View style={tw`pt-2`}>
                    <Text style={tw`text-xl font-bold`}>Total: ${total.toFixed(2)}</Text>
                    <Button onPress={checkout} text="Checkout" />
                </View>
            )}
        </View>
    )
}
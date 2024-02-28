import { Text, View } from "react-native";
import tw from 'twrnc';
import { FontAwesome } from '@expo/vector-icons';

import { useCart } from "../context/cartContext";
import Colors from "../constants/Colors";
import { defaultPizzaImage } from "../../assets/data/products";
import { RemoteImage } from "./RemoteImage";



export const CartListItem = ({cartItem}) => {
    const { updateQuantity } = useCart();

	return (
		<View style={tw`bg-white flex-row items-center p-3 gap-x-4 rounded shadow-sm`}>
			<RemoteImage path={cartItem.product.image} fallback={cartItem.product.image ?? defaultPizzaImage} resizeMode="contain" style={tw.style(`w-[75px] self-center`, { aspectRatio: 1 })} />
			<View style={tw`flex-1`}>
				<Text style={tw`text-base font-semibold mb-2`}>{cartItem.product.name}</Text>
				<View style={tw`flex-row gap-x-2`}>
					<Text style={tw`text-[${Colors.light.tint}] font-bold`}>${cartItem.product.price[cartItem.size].toFixed(2)}</Text>
					<Text>Size: {cartItem.size}</Text>
				</View>
			</View>
			<View style={tw`flex-row items-center`}>
				<FontAwesome 
                    onPress={() => updateQuantity(cartItem.id, -1)} 
                    name="minus" 
                    size={14}
                    color="gray" 
                    style={tw`p-[5px]`} 
                />
                <View style={tw`w-[25px] items-center`}>
				    <Text style={tw`text-lg font-medium`}>{cartItem.quantity}</Text>
                </View>
				<FontAwesome 
                    onPress={() => updateQuantity(cartItem.id, 1)} 
                    name="plus" 
                    size={14}
                    color="gray" 
                    style={tw`p-[5px]`} 
                />
			</View>
		</View>
	);
};

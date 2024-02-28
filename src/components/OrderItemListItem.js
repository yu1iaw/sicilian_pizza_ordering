import { memo } from "react";
import { Pressable, Text, View } from "react-native";
import tw from "twrnc";

import { defaultPizzaImage } from "../../assets/data/products";
import Colors from "../constants/Colors";
import { RemoteImage } from "./RemoteImage";



export const OrderItem = memo(({ order }) => {
	return (
		<Pressable style={tw`flex-row bg-white items-center p-3 gap-x-4 rounded shadow-sm`}>
			<RemoteImage 
				path={order.product.image} 
				fallback={order.product.image ?? defaultPizzaImage } 
				resizeMode="contain" 
				style={tw.style(`w-[75px]`, { aspectRatio: 1 })} 
			/>
			<View style={tw`flex-1`}>
				<Text style={tw.style(`text-lg font-semibold`)}>{order.product.name}</Text>
				<View style={tw`flex-row gap-x-2 items-center`}>
					<Text style={tw`text-[${Colors.light.tint}] text-base font-bold`}>${order.product.price[order.size].toFixed(2)}</Text>
					<Text>Size: {order.size}</Text>
				</View>
			</View>
			<Text style={tw`font-semibold text-base`}>{order.quantity}</Text>
		</Pressable>
	);
});

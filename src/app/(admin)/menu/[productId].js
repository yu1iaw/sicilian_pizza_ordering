import { Link, Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import tw from 'twrnc';
import { FontAwesome } from '@expo/vector-icons';

import { defaultPizzaImage } from "../../../../assets/data/products";
import Colors from "../../../constants/Colors";
import { useProductById } from "../../../services/queries/products";
import { RemoteImage } from "../../../components/RemoteImage";

const sizes = ['S', 'M', 'L', 'XL'];



export default ProductDetailsScreen = () => {
    const [selectedSize, setSelectedSize] = useState(sizes[1]);
    const { productId: productIdString } = useLocalSearchParams();
    const productId = parseFloat(typeof productIdString === "string" ? productIdString : productIdString[0]);
    const { data: product, error, isLoading } = useProductById(productId);


    if (isLoading) {
        return (
            <View style={tw`flex-1 items-center justify-center`}>
                <ActivityIndicator size="large" color={Colors.light.tint} />
            </View>
        )
    }

    if (error) {
        return <Text>Failed to fetch a product</Text>
    }

    return (
        <View style={tw`flex-1 p-3 bg-white gap-y-2 pb-5`}>
            <Stack.Screen
				options={{
					title: "Product Details",
					headerRight: ({tintColor}) => (
						<Link href={`/(admin)/menu/create?productId=${productId}`} asChild>
							<Pressable>
								{({ pressed }) => (
									<FontAwesome name="pencil" size={25} color={tintColor} style={tw.style("mr-4", { opacity: pressed ? 0.5 : 1 })} />
								)}
							</Pressable>
						</Link>
					),
				}}
			/>
     
            <RemoteImage 
                path={product.image} 
                fallback={product.image ?? defaultPizzaImage} 
                style={tw.style(`w-full rounded-full`, { aspectRatio: 1 })} 
                resizeMode="contain" 
            />
            <Text style={tw`font-bold text-xl`}>{product.name}</Text>
            <Text style={tw`font-bold text-base`}>Price: ${product.price[selectedSize].toFixed(2)}</Text>
        </View>
    )
}
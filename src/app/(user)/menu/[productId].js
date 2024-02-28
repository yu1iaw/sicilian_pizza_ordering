import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import tw from 'twrnc';
import { defaultPizzaImage } from "../../../../assets/data/products";

import { Button } from "../../../components/Button";
import { RemoteImage } from "../../../components/RemoteImage";
import Colors from "../../../constants/Colors";
import { useCart } from "../../../context/cartContext";
import { useProductById } from "../../../services/queries/products";

const sizes = ['S', 'M', 'L', 'XL'];



export default ProductDetailsScreen = () => {
    const [selectedSize, setSelectedSize] = useState('M');
    const { productId: productIdString } = useLocalSearchParams();
    const productId = parseFloat(typeof productIdString === "string" ? productIdString : productIdString[0]);

    const { addItem } = useCart();
    const { data: product, error, isLoading } = useProductById(productId);
    const router = useRouter();


    const addToCart = () => {
        if (!product) return;

        addItem(product, selectedSize);
        router.push('/cart');
    }


    if (isLoading) {
        return (
            <View style={tw`flex-1 items-center justify-center`}>
                <ActivityIndicator size="large" color={Colors.light.tint}/>
            </View>
        )
    }

    if (error) {
        return <Text>Failed to fetch a product</Text>
    }


    return (
        <View style={tw`flex-1 px-3 bg-white`}>
            <Stack.Screen options={{title: product.name}} />
            <ScrollView
                style={tw`flex-1`}
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={tw`gap-y-2 pt-3 pb-5`}
            >
                <RemoteImage 
                    path={product.image} 
                    fallback={product.image ?? defaultPizzaImage} 
                    style={tw.style(`w-full rounded-full`, { aspectRatio: 1 })} 
                    resizeMode="contain" 
                />
                <Text style={tw`text-base`}>Select size:</Text>
                <View style={tw`flex-row justify-around my-3`}>
                    {sizes.map(size => (
                        <Pressable onPress={() => setSelectedSize(size)} key={size} style={tw.style('w-[50px] justify-center items-center rounded-full', selectedSize === size ? 'bg-gray-200' : 'bg-white', { aspectRatio: 1 })}>
                            <Text style={tw.style('font-semibold text-xl', selectedSize === size ? 'text-black' : 'text-gray-500')}>{size}</Text>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
            <Text style={tw`font-bold text-lg`}>Price: ${product.price[selectedSize].toFixed(2)}</Text>
            <Button text="Add to Cart" onPress={addToCart} />
        </View>
    )
}
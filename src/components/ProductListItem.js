import { View, Text, Pressable } from 'react-native';
import { Link, useSegments } from 'expo-router';
import tw from 'twrnc';

import Colors from '../constants/Colors';
import { defaultPizzaImage } from '../../assets/data/products';
import { RemoteImage } from './RemoteImage';



export const ProductListItem = ({product}) => {
    const segments = useSegments();

    return (
        <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
            <Pressable style={tw`flex-1 max-w-[50%] bg-white p-3 rounded-xl shadow-sm`}>
                <View style={tw`flex-auto`}>
                    <RemoteImage path={product.image} fallback={product.image ?? defaultPizzaImage} resizeMode="contain" style={tw.style(`w-full mb-2 rounded-full`, {aspectRatio: 1})} />
                    <Text style={tw.style(`text-lg font-semibold`)}>{product.name}</Text>
                </View>
                <Text style={tw.style(`text-lg text-[${Colors.light.tint}]`)}>${product.price['M'].toFixed(2)}</Text>
            </Pressable>
        </Link>
    )
}
import { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Alert, Text, TextInput, ScrollView } from "react-native";
import tw from 'twrnc';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { randomUUID } from "expo-crypto";
import { decode } from 'base64-arraybuffer';

import { defaultPizzaImage } from "../../../../assets/data/products";
import { Button } from "../../../components/Button";
import { useDeleteProduct, useInsertProduct, useProductById, useUpdateProduct } from "../../../services/queries/products";
import { supabase } from "../../../lib/supabase";
import { RemoteImage } from "../../../components/RemoteImage";
import Colors from "../../../constants/Colors";

const costs = [1.5, 2, 4, 4.5, 5];


export default CreateProductScreen = () => {
    const { productId: productIdString } = useLocalSearchParams();
    const productId = parseFloat(typeof productIdString === "string" ? productIdString : productIdString?.[0]);
    const {data: product} = useProductById(productId);

    const [name, setName] = useState(product ? product.name : '');
    const [price, setPrice] = useState(product ? `${product.price['M']}` : '');
    const [error, setError] = useState('');
    const [image, setImage] = useState(product ? product.image : null);
    const isUpdating = !!productId;
    const { mutate: insertProduct } = useInsertProduct();
    const { mutate: updateProduct } = useUpdateProduct();
    const { mutate: deleteProduct } = useDeleteProduct();
    const router = useRouter();


    const validateInput = () => {
        setError('');

        if (!name) {
            setError('Name is required!');
            return false;
        }
        if (!price) {
            setError('Price is required');
            return false;
        }
        if (isNaN(parseFloat(price))) {
            setError('Price is not a number!');
            return false;
        }
        return true;
    }


    const onSubmit = () => {
        if (isUpdating) {
            onUpdate();
        } else {
            onCreate();
        }
    }


    const onCreate = async () => {
        if (!validateInput()) return;

        const imagePath = await uploadImage();

        insertProduct({
            name, 
            image: imagePath ?? image, 
            price: {
                "S": +price - costs[Math.round(Math.random())],
                "M": +price,
                "L": +price + costs[Math.round(Math.random())],
                "XL": +price + costs[Math.round(Math.random() * (4 - 2) + 2)]
            }
        }, {
            onSuccess: () => {
                setImage(null);
                setName('');
                setPrice('');
                router.back();
            }
        })
    }


    const onUpdate = async () => {
        if (!validateInput()) return;

        const imagePath = await uploadImage();

        updateProduct({
            id: productId,
            name, 
            image: imagePath ?? image, 
            price: {
                "S": +price - 2,
                "M": +price,
                "L": +price + 2,
                "XL": +price + 4
            }
        }, {
            onSuccess: () => {
                setImage(null);
                setName('');
                setPrice('');
                router.back();
            }
        })
    }


    const onDelete = () => {
        deleteProduct(productId, {
            onSuccess: () => {
                setImage(null);
                setName('');
                setPrice('');
                router.replace('/(admin)')
            }
        });
    }

    const confirmDelete = () => {
        Alert.alert("Confirm", "Are you sure you want to delete this product?", [
            { text: "Cancel" },
            { text: "Delete", style: "destructive", onPress: onDelete }
        ])
    }


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }


    const uploadImage = async () => {
        if (!image?.startsWith('file://')) return;
      
        const base64 = await FileSystem.readAsStringAsync(image, { encoding: 'base64' });
        const filePath = `${randomUUID()}.png`;
        const contentType = 'image/png';
        const { data, error } = await supabase.storage
            .from('product-images')
            .upload(filePath, decode(base64), { contentType });

        if (error) {
            console.log(error);
        }
      
        if (data) {
            return data.path;
        }
    };


    return (
        <ScrollView
            style={tw`flex-1`}
            contentContainerStyle={tw`p-4 pt-10`}
            showsVerticalScrollIndicator={false}
        >
            <Stack.Screen
				options={{
					title: `${isUpdating ? 'Update' : 'Create'} Product`
				}}
			/>
            <RemoteImage path={image} fallback={image ?? defaultPizzaImage} style={tw.style(`w-[50%] self-center rounded-full -mt-8`, { aspectRatio: 1 })} />
            <Text onPress={pickImage} style={tw`text-[${Colors.light.tint}] font-bold self-center my-3`}>Select Image</Text>
            <Text style={tw`text-gray-400 font-bold`}>Product name</Text>
            <TextInput 
                value={name}
                onChangeText={setName}              
                placeholder="Name"
                style={tw`bg-white rounded p-3 mt-2 mb-5`}
            />
            <Text style={tw`text-gray-400 font-bold`}>Product price ($)</Text>
            <TextInput 
                value={price}
                onChangeText={setPrice}
                placeholder="9.99"
                style={tw`bg-white rounded p-3 mt-2 mb-5`}
                keyboardType="numeric"
            />
            <Text style={tw`text-red-500 -mt-5`}>{error}</Text>
            <Button onPress={onSubmit} text={isUpdating ? 'Update' : 'Create'} />
            { isUpdating && <Text style={tw`text-center text-[${Colors.light.tint}] text-base font-semibold`} onPress={confirmDelete}>Delete</Text> }
        </ScrollView>
    )
}
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import tw from 'twrnc';

import { ProductListItem } from '../../../components/ProductListItem';
import Colors from '../../../constants/Colors';
import { useProductsList } from '../../../services/queries/products';



export default MenuScreen = () => {
    const { data: products, error, isLoading } = useProductsList();

    if (isLoading) {
        return (
            <View style={tw`flex-1 items-center justify-center`}>
                <ActivityIndicator size="large" color={Colors.light.tint} />
            </View>
        )
    }

    if (error) {
        return <Text>Failed to fetch products</Text>
    }

    return (
        <FlatList 
            showsVerticalScrollIndicator={false}
            data={products}
            keyExtractor={item => item.id}
            renderItem={({item}) => <ProductListItem product={item} />}
            numColumns={2}
            columnWrapperStyle={tw`gap-x-3`}
            contentContainerStyle={tw`gap-y-3 p-3`}
        />
    
    )
}
import { Dimensions, Text, View } from "react-native";
import tw from 'twrnc';


const height = Dimensions.get("window").height;



export const ListEmptyItem = ({title}) => {
    return (
        <View style={tw`h-[${height - 110}px] items-center justify-center`}>
            <Text style={tw`text-xl text-gray-500 mb-14 font-semibold`}>{title}</Text>
        </View>
    )
}
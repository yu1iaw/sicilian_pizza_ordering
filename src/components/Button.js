import { Pressable, Text } from "react-native";
import tw from 'twrnc';

import Colors from "../constants/Colors";



export const Button = ({text, ref, disabledStyle, ...pressableProps}) => {
    return (
        <Pressable 
            ref={ref} 
            {...pressableProps}
            style={tw`${disabledStyle ? 'bg-gray-400' : `bg-[${Colors.light.tint}]`} p-4 my-3 items-center rounded-full shadow`}
        >
            <Text style={tw`text-white text-base font-semibold`}>{text}</Text>
        </Pressable>
    )
}
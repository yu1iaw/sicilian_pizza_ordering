import { memo } from "react";
import { Pressable, Text, View } from "react-native";
import tw from 'twrnc';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link, useSegments } from "expo-router";


dayjs.extend(relativeTime);

export const OrderListItem = memo(({order}) => {
    const segments = useSegments();

    return (
        <Link href={`/${segments[0]}/orders/${order.id}`} asChild>
            <Pressable style={tw`flex-row bg-white justify-between items-center p-3 rounded shadow-sm`}>
                <View>
                    <Text style={tw`font-bold text-lg`}>Order #{order.id}</Text>
                    <Text style={tw`text-gray-500 text-base`}>{dayjs(order.created_at).fromNow()}</Text>
                </View>
                <Text style={tw`font-semibold text-base`}>{order.status}</Text>
            </Pressable>
        </Link>
    )
})
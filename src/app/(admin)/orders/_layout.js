import { Stack } from "expo-router";

import Colors from "../../../constants/Colors";



export default OrdersLayout = () => {
	return (
        <Stack screenOptions={{headerTitleAlign: "center", headerTintColor: "#fff", headerStyle: { backgroundColor: Colors.light.tint }}}>
            {/* <Stack.Screen name="[orderId]" /> */}
            <Stack.Screen name="list" options={{headerShown: false}} />
        </Stack>
    );
};

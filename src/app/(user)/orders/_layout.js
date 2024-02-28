import { Stack } from "expo-router";

export default OrdersLayout = () => {
	return (
        <Stack screenOptions={{headerTitleAlign: "center", headerStyle: { backgroundColor: '#FFE4C4' }}}>
            <Stack.Screen name="index" options={{title: "Orders"}} />
        </Stack>
    );
};

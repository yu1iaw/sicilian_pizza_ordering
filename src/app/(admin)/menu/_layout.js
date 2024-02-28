import { Pressable } from "react-native";
import { Link, Stack } from "expo-router";
import tw from "twrnc";
import { FontAwesome } from "@expo/vector-icons";

import Colors from "../../../constants/Colors";



export default MenuLayout = () => {
	return (
		<Stack
			screenOptions={{
				headerTitleAlign: "center",
				headerStyle: { backgroundColor: Colors["light"].tint },
				headerTintColor: "#fff"
			}}>
			<Stack.Screen
				name="index"
				options={{
					title: "Menu",
					headerRight: ({tintColor}) => (
						<Link href="/(admin)/menu/create" asChild>
							<Pressable>
								{({ pressed }) => (
									<FontAwesome name="plus-square-o" size={25} color={tintColor} style={tw.style("mr-4", { opacity: pressed ? 0.5 : 1 })} />
								)}
							</Pressable>
						</Link>
					),
				}}
			/>
		</Stack>
	);
};

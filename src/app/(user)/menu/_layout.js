import { Pressable } from "react-native";
import { Link, Stack } from "expo-router";
import tw from "twrnc";
import { FontAwesome } from '@expo/vector-icons';

import Colors from "../../../constants/Colors";



export default MenuLayout = () => {
	return (
		<Stack
			screenOptions={{
				headerTitleAlign: "center",
				headerStyle: { backgroundColor: '#FFE4C4' },
				headerRight: () => (
					<Link href="/cart" asChild>
						<Pressable>
							{({ pressed }) => (
								<FontAwesome
									name="shopping-cart"
									size={25}
									color={Colors["light"].tint}
									style={tw.style("mr-4", { opacity: pressed ? 0.5 : 1 })}
								/>
							)}
						</Pressable>
					</Link>
				),
			}}>
			<Stack.Screen name="index" options={{ title: "Menu" }} />
		</Stack>
	);
};

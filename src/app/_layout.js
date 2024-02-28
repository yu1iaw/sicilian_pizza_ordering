import { useEffect } from "react";
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { CartProvider } from "../context/cartContext";
import { AuthProvider } from "../context/authContext";
import { QueryProvider } from "../context/queryProvider";
import { NotificationsProvider } from "../context/notificationsProvider";


export {
	ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
	initialRouteName: "(user)",
};

SplashScreen.preventAutoHideAsync();



export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
		...FontAwesome.font,
	});


	useEffect(() => {
		if (error) throw error;
	}, [error]);


	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);


	if (!loaded) {
		return null;
	}

	return <RootLayoutNav />;
}


const RootLayoutNav = () => {
    const colorScheme = useColorScheme();

    return (
		<AuthProvider>
			<QueryProvider>
				<NotificationsProvider>
					<CartProvider>
						<Stack>
							<Stack.Screen name="index" options={{headerShown: false}}/>
							<Stack.Screen name="(admin)" options={{ headerShown: false }} />
							<Stack.Screen name="(user)" options={{ headerShown: false }} />
							<Stack.Screen name="(auth)" options={{ headerShown: false }} />
							<Stack.Screen 
								name="cart" 
								options={{ 
									headerTitleAlign: "center", 
									headerTitle: "Cart", 
									headerStyle: { backgroundColor: '#FFE4C4' },
									presentation: "modal", 
								}} 
							/>
						</Stack>
					</CartProvider>
				</NotificationsProvider>
			</QueryProvider>
		</AuthProvider>
    )
}

import { Link, Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import tw from "twrnc";

import { Button } from '../components/Button';
import Colors from "../constants/Colors";
import { useAuth } from "../context/authContext";



export default RootIndex = () => {
    const { session, loading, isAdmin } = useAuth();


    if (loading) {
        return (
            <View style={tw`flex-1 items-center justify-center`}>
                <ActivityIndicator size="large" color={Colors.light.tint} />
            </View>
        )
    }

    if (!session) {
        return <Redirect href={'/signIn'} />
    }

    if (!isAdmin) {
        return <Redirect href={'/(user)'} />
    }


	return (
		<View style={tw`flex-1 justify-center p-4`}>
			<Link href={'/(user)'} asChild>
                <Button text="User" />
            </Link>
            <Link href={'/(admin)'} asChild>
                <Button text="Admin" />
            </Link>
		</View>
	);
};

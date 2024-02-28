import { Link } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, TextInput, View } from "react-native";
import tw from "twrnc";

import { Button } from "../../components/Button";
import Colors from "../../constants/Colors";
import { supabase } from "../../lib/supabase";



export default SignInScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);


	const signInWithEmail = async () => {
		setLoading(true);
		const { error } =  await supabase.auth.signInWithPassword({ email, password });

		if (error) Alert.alert('Error', error.message);
		setLoading(false);
	}


	return (
		<View style={tw`flex-1 p-4 gap-y-4 justify-center`}>
			<ScrollView style={tw`flex-initial`} showsVerticalScrollIndicator={false}>
				<View>
					<Text style={tw`text-gray-400 font-bold`}>Email</Text>
					<TextInput 
						value={email}
						onChangeText={setEmail}
						placeholder="example@email.com" 
						keyboardType="email-address" 
						autoCapitalize="none" 
						style={tw`bg-white rounded p-3 mt-2 mb-5`} 
					/>
				</View>
				<View>
					<Text style={tw`text-gray-400 font-bold`}>Password</Text>
					<TextInput 
						value={password}
						onChangeText={setPassword}
						secureTextEntry 
						style={tw`bg-white rounded p-3 mt-2 mb-5`} 
					/>
				</View>
				<Button onPress={signInWithEmail} disabled={loading} disabledStyle={loading} text={loading ? "Signing in..." : "Sign In"} />
				<Link href={"/signUp"} asChild>
					<Text style={tw`text-center text-[${Colors.light.tint}] text-base font-semibold`}>Create account</Text>
				</Link>
			</ScrollView>
		</View>
	);
};

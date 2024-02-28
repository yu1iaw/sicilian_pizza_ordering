import { Redirect, Stack } from "expo-router";

import { useAuth } from "../../context/authContext";



export default AuthLayout = () => {
    const { session } = useAuth();

    if (session) {
        return <Redirect href={'/'} />
    }

    return (
        <Stack screenOptions={{headerTitleAlign: "center"}}>
            <Stack.Screen name="signIn" options={{title: "Sign In"}} />
            <Stack.Screen name="signUp" options={{title: "Sign Up"}} />
        </Stack>
    )
}
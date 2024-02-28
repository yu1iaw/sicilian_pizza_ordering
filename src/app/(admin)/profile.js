import { View } from "react-native";
import tw from 'twrnc';

import { Button } from "../../components/Button";
import { useAuth } from "../../context/authContext";
import { supabase } from "../../lib/supabase";
import { updateUserPushToken } from "../../utils/helpers";



export default UserProfile = () => {
    const { session } = useAuth();

    const signOut = async () => {
        await updateUserPushToken(null, session);
        await supabase.auth.signOut();
    }

    return (
        <View style={tw`flex-1 bg-white justify-center p-4`}>
            <Button text="Sign Out" onPress={signOut} />
        </View>
    )
}
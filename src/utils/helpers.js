import { supabase } from "../lib/supabase";



export const updateUserPushToken = async (token, session) => {
    if (typeof token == "undefined" || !session) return;
    
    const { data, error } = await supabase
        .from('profiles')
        .update({push_tokens: token})
        .eq('id', session)
      
    if (error) {
        console.log(error);
    }
}
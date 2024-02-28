import { createContext, useContext, useEffect, useState } from "react";

import { supabase } from "../lib/supabase";



const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [session, setSession] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        const subscription = supabase.auth.onAuthStateChange((event, session) => {
            setSession(session && session.user.id);
           
            if (event === "SIGNED_OUT") {
                setProfile(null);
            }
            if (event === "SIGNED_IN") {
                setLoading(true);
            }
      
            if (session) {
                return setTimeout(async () => {
                    await fetchUserProfileInfo(session.user.id);
                    setLoading(false);
                }, 0)
            } 

            setLoading(false);
        });
        
        return () => {
            subscription.unsubscribe()
        }
    }, [])


    const fetchUserProfileInfo = async (userId) => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .maybeSingle()

        if (error) {
            console.log(error);
        }

        setProfile(data || null);
    }


    return (
        <AuthContext.Provider value={{session, loading, profile, isAdmin: profile?.group === 'ADMIN'}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const value = useContext(AuthContext);

    if (!value) throw new Error('Some auth context error occurred');

    return value;
}


import { useColorScheme } from "react-native";
import { Redirect, Tabs } from "expo-router";
import tw from 'twrnc';
import { FontAwesome } from '@expo/vector-icons';

import Colors from "../../constants/Colors";
import { useAuth } from "../../context/authContext";

const TabBarIcon = (props) => {
    return <FontAwesome size={20} style={tw`-mb-[3px]`} {...props}  />
}



export default TabLayout = () => {
    const colorScheme = useColorScheme();
    const { session } = useAuth();

    if (!session) {
        return <Redirect href={'/'} />
    }

    return (
        <Tabs 
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                tabBarInactiveTintColor: '#B0C4DE',
                tabBarStyle: { backgroundColor: '#FFE4C4' },
                headerTitleAlign: "center",
                headerShadowVisible: false
            }}>
            <Tabs.Screen name="index" options={{href: null}} />
            <Tabs.Screen 
                name="menu"
                options={{
                    headerShown: false,
                    title: "Menu",
                    tabBarIcon: ({color}) => <TabBarIcon name="cutlery" color={color} />,
                }}
            />
            <Tabs.Screen 
                name="orders"
                options={{
                    headerShown: false,
                    title: "Orders",
                    tabBarIcon: ({color}) => <TabBarIcon name="list" color={color} />
                }}
            />
            <Tabs.Screen 
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({color}) => <TabBarIcon name="user" color={color} />
                }}
            />
        </Tabs>
    )
}
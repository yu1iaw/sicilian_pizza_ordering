import { withLayoutContext } from 'expo-router';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';

import Colors from '../../../../constants/Colors';

export const TopTabs = withLayoutContext(
  createMaterialTopTabNavigator().Navigator
);



export default function OrdersTabs() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.tint }} edges={['top']}>
      <TopTabs screenOptions={{
        tabBarActiveTintColor: "#fff", 
        tabBarStyle: { backgroundColor: Colors.light.tint },
        tabBarIndicatorStyle: {backgroundColor: "white"},
        tabBarPressColor: "#B0C4DE",
      }}>
        <TopTabs.Screen name="index" options={{ title: 'Active' }} />
        <TopTabs.Screen name="archive" options={{ title: 'Archive' }} />
      </TopTabs>
    </SafeAreaView>
  );
}
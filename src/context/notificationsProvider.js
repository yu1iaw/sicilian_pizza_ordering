import { useEffect, useRef } from "react";
import { Alert } from "react-native";
import * as Notifications from 'expo-notifications';
import { useRouter, useSegments } from 'expo-router';

import { registerForPushNotificationsAsync } from "../lib/notifications";
import { useAuth } from '../context/authContext';
import { updateUserPushToken } from "../utils/helpers";




export const NotificationsProvider = ({children}) => {
    const { session } = useAuth();
    const responseListener = useRef(null);
    const notificationListener = useRef(null);


    useEffect(() => {
        if (!session) return;
        
        registerForPushNotificationsAsync().then(token => updateUserPushToken(token, session));
       

		notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
			Alert.alert('FYI:', notification.request.content.title)
		});

		responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
			const { data: {orderId} } = response.notification.request.content;

		});

		return () => {
			Notifications.removeNotificationSubscription(notificationListener.current);
			Notifications.removeNotificationSubscription(responseListener.current);
		};
    }, [session])




    return <>{children}</>
}
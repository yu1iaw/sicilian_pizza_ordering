import { Alert, Platform } from "react-native";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { supabase } from "./supabase";



export async function registerForPushNotificationsAsync() {
    let token;

	if (Platform.OS === "android") {
		await Notifications.setNotificationChannelAsync("default", {
			name: "default",
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: "#FF231F7C",
		});
	}

	if (Device.isDevice) {
		const { status: existingStatus } = await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== "granted") {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== "granted") {
			Alert.alert("Error", "Failed to get push token for push notification!");
			return;
		}
        token = (await Notifications.getExpoPushTokenAsync()).data;

	} else {
		console.log("Must use physical device for Push Notifications");
	}

    return token;
}


const sendNotification = async (token, order) => {
    await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            to: token,
            title: order.orderId ? `Your order #${order.orderId} is ${order.status}` : `${order.status} order #${order.id}`,
            body: ':)',
            data: { orderId: order.orderId ?? order.id }
        })
    })
}


const recievePushToken = async (order) => {
    const { data: push_tokens, error } = await supabase
        .from('profiles')
        .select('push_tokens')
        .eq('id', order.user_id)
        .single()

    if (error) {
        console.log(error);
    }

    if (push_tokens) {
        return {
            ...push_tokens,
            order: {
                orderId: order.id,
                status: order.status
            }
        }
    } 
}

const receiveAdminPushTokens = async () => {
    const { data: push_tokens, error } = await supabase
        .from('profiles')
        .select('push_tokens')
        .eq('group', 'ADMIN')

    if (error) {
        console.log(error)
    }
    if (push_tokens) {
        return push_tokens.map(obj => String(Object.values(obj)));
    }
}


export const updateOrderStatusNotification = async (orderData) => {
    const { push_tokens, order } = await recievePushToken(orderData);

    sendNotification(push_tokens, order);
}


export const notifyAdminsOfNewOrder = async (orderData) => {
    const push_tokens = await receiveAdminPushTokens();

    sendNotification(push_tokens, orderData);
}
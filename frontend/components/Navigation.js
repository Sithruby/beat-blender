import * as React from 'react';
import { Button, View, Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import Home from './Home';
import Genreclassify from './Genreclassify';
import Playlist from './Playlist';
//import Login from './Login';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function NotificationsScreen() {
	const navigation = useNavigation();
	Alert.alert('Alert Title', 'Do you want to SignOut', [
		{
			text: 'Cancel',
			onPress: () => navigation.navigate('Home'),
			style: 'cancel',
		},
		{ text: 'SignOut', onPress: () => navigation.navigate('Login') },
	]);
}
const Tab = createBottomTabNavigator();
function TabScreen() {
	return (
		<Tab.Navigator>
			<Tab.Screen name='home' component={Home} options={{ headerShown: false }} />
			<Tab.Screen name='classify' component={Genreclassify} />
			<Tab.Screen name='Play' component={Playlist} />
		</Tab.Navigator>
	);
}

const Drawer = createDrawerNavigator();

export default function Navigation() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Drawer.Navigator initialRouteName='Home'>
				<Drawer.Screen name='Home' component={TabScreen} />
				<Drawer.Screen name='SignOut' component={NotificationsScreen} />
			</Drawer.Navigator>
		</GestureHandlerRootView>
	);
}

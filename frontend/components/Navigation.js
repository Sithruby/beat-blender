import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Genreclassify from './Genreclassify';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function NotificationsScreen({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Button onPress={() => navigation.goBack()} title='Go back home' />
		</View>
	);
}
const Tab = createBottomTabNavigator();
function TabScreen() {
	return (
		<Tab.Navigator>
			<Tab.Screen name='home' component={Home} options={{ headerShown: false }} />
			<Tab.Screen name='classify' component={Genreclassify} />
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
				<Drawer.Screen name='Classify' component={Genreclassify} />
			</Drawer.Navigator>
		</GestureHandlerRootView>
	);
}

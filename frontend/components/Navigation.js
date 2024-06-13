import * as React from 'react';
import { Button, View } from 'react-native';
import { auth, db } from '../firebase.config';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home';

function NotificationsScreen({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Button onPress={() => navigation.goBack()} title='Go back home' />
		</View>
	);
}

const Drawer = createDrawerNavigator();

export default function Navigation() {
	return (
		<Drawer.Navigator initialRouteName='Home'>
			<Drawer.Screen name='Home' component={Home} />
			<Drawer.Screen name='Notifications' component={NotificationsScreen} />
		</Drawer.Navigator>
	);
}

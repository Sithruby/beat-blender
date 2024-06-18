import * as React from 'react';
import { Button, View, Alert, StyleSheet, Image, Text } from 'react-native';
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
		<Tab.Navigator
			screenOptions={{
				tabBarShowLabel: false,
				tabBarStyle: {
					position: 'absolute',
					bottom: 25,
					left: 20,
					right: 20,
					elevation: 0,
					backgroundColor: '#BF05F2',
					borderRadius: 15,
					height: 70,
				},
			}}>
			<Tab.Screen
				name='Home'
				component={Home}
				options={{
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<View>
							<Image
								source={require('../assets/home.png')}
								resizeMode='contain'
								style={{
									width: 25,
									height: 25,
									tintColor: focused ? '#060126' : '#FFFFFF',
								}}
							/>
							<Text style={{ color: focused ? '#060126' : '#FFFFFF', fontSize: 12 }}>Home</Text>
						</View>
					),
				}}
			/>
			<Tab.Screen
				name='classify'
				component={Genreclassify}
				options={{
					headerShown: false,
					unmountOnBlur: true,
					tabBarIcon: ({ focused }) => (
						<View>
							<Image
								source={require('../assets/classify.png')}
								resizeMode='contain'
								style={{
									width: 25,
									height: 25,
									tintColor: focused ? '#060126' : '#FFFFFF',
								}}
							/>
							<Text style={{ color: focused ? '#060126' : '#FFFFFF', fontSize: 12 }}>Classify</Text>
						</View>
					),
				}}
			/>
			<Tab.Screen
				name='Play'
				component={Playlist}
				options={{
					headerShown: false,
					unmountOnBlur: true,
					tabBarIcon: ({ focused }) => (
						<View>
							<Image
								source={require('../assets/playlist.png')}
								resizeMode='contain'
								style={{
									width: 25,
									height: 25,
									tintColor: focused ? '#060126' : '#FFFFFF',
								}}
							/>
							<Text style={{ color: focused ? '#060126' : '#FFFFFF', fontSize: 12 }}>Playlist</Text>
						</View>
					),
				}}
			/>
		</Tab.Navigator>
	);
}

const Drawer = createDrawerNavigator();

export default function Navigation() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Drawer.Navigator initialRouteName='Tab'>
				<Drawer.Screen name='Tab' component={TabScreen} />
				<Drawer.Screen name='SignOut' component={NotificationsScreen} options={{ headerShown: false }} />
			</Drawer.Navigator>
		</GestureHandlerRootView>
	);
}

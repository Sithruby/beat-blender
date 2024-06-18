import 'react-native-gesture-handler';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { auth } from './firebase.config';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './components/WelcomeScreen';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home';
import Navigation from './components/Navigation';
import Genreclassify from './components/Genreclassify';
import RenderSong from './components/RenderSong';
import Playlist from './components/Playlist';

const Stack = createNativeStackNavigator();

export default function App() {
	const [currentUser, setCurrentUser] = useState('');
	useEffect(() => {
		const unsub = auth.onAuthStateChanged(() => {
			setCurrentUser(auth.currentUser);
			console.log(currentUser);
		});
		return () => unsub();
	}, []);
	return (
		<NavigationContainer>
			<StatusBar barStyle={'light-content'} />
			<Stack.Navigator initialRouteName='WelcomeScreen' screenOptions={{ headerShown: false }}>
				<Stack.Screen name='WelcomeScreen' options={{ HeaderShown: false }} component={WelcomeScreen} />
				<Stack.Screen name='Login' options={{ HeaderShown: false }} component={Login} />
				<Stack.Screen name='SignUp' options={{ HeaderShown: false }} component={SignUp} />
				{/* <Stack.Screen name='Home' options={{ HeaderShown: false }} component={Home} /> */}
				<Stack.Screen name='Navigation' options={{ HeaderShown: false }} component={Navigation} />
				{/* <Stack.Screen name='Home' options={{ HeaderShown: false }} component={Home} currentUser={currentUser} />
				<Stack.Screen name='Genre' options={{ HeaderShown: false }} component={Genreclassify} />
				<Stack.Screen name='Playlist' options={{ headerShown: false }} component={Playlist} /> */}
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

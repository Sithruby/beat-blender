import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Pressable, StyleSheet, Button, Alert, Dimensions } from 'react-native';
import { auth, db } from '../firebase.config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function Home() {
	const navigation = useNavigation();
	const [name, setName] = useState('');
	const [fontsLoaded, fontError] = useFonts({
		'Inter-SemiBold': require('../assets/Inter-SemiBold.ttf'),
		'Inter-Regular': require('../assets/Inter-Regular.ttf'),
	});
	useEffect(() => {
		const fetchUserName = async () => {
			try {
				const currentUser = auth.currentUser;
				if (currentUser) {
					console.log(currentUser);

					const q = query(collection(db, 'users'), where('userID', '==', currentUser.uid));
					const querySnapshot = await getDocs(q);

					querySnapshot.forEach((doc) => {
						console.log(doc.data().userID, ' => ', doc.data());
						setName(doc.data().username);
					});
				}
			} catch (error) {
				console.error('Error fetching user data: ', error);
			}
		};

		fetchUserName();
	}, []);

	const handleLogOut = async () => {
		await signOut(auth);
		navigation.navigate('Login');
	};
	if (!fontsLoaded && !fontError) {
		return null;
	}
	return (
		<SafeAreaView style={styles.container1}>
			<View>
				<Text style={styles.textH}>Hello, {name}</Text>
			</View>
			<View>
				<Text style={styles.text}>Beat Blender analyzes a given audio file to predict its genre and generates a corresponding playlist.</Text>
			</View>
			<View>
				<Pressable onPress={handleLogOut}>
					<Text style={styles.textH}>Sign Out</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},

	container1: {
		flex: 1,
		color: 'rgb(240, 237, 242)',
		backgroundColor: 'rgba(0,0,0,1)',
	},
	textH: {
		color: 'rgb(240, 237, 242)',
		fontFamily: 'Inter-SemiBold',

		fontSize: 20,

		padding: 10,
	},
	text: {
		color: 'rgb(240, 237, 242)',
		fontFamily: 'Inter-SemiBold',
		fontSize: 15,
		padding: 10,

		bottom: 10,
	},
});

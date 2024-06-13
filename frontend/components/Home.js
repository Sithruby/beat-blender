import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Pressable, StyleSheet, Button, Alert, Dimensions } from 'react-native';
import { auth, db } from '../firebase.config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function Home() {
	const Tab = createBottomTabNavigator();
	const navigation = useNavigation();
	const [name, setName] = useState('');

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

	return (
		<SafeAreaView style={styles.container1}>
			<View>
				<Text style={styles.text}>Hello, {name}</Text>

				<Pressable onPress={handleLogOut}>
					<Text style={styles.text}>Sign Out</Text>
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
	button: {
		backgroundColor: 'rgba(123, 31, 162,0.7)',
		padding: 10,
		borderRadius: 5,
		borderColor: 'rgb(0,0,0)',
		borderWidth: 1,
		paddingHorizontal: 30,
	},
	buttonText: {
		fontFamily: 'Inter-Black',
		color: '#fff',
		fontSize: 15,
		fontWeight: 'bold',
	},

	container1: {
		flex: 1,
		color: 'rgb(240, 237, 242)',
		backgroundColor: 'rgba(0,0,0,1)',
	},
	textH: {
		color: 'rgb(240, 237, 242)',
		fontFamily: 'Inter-Black',
		fontWeight: 'bold',
		fontSize: 20,
		textAlign: 'center',
		padding: 10,
	},
	text: {
		color: 'rgb(240, 237, 242)',
		fontFamily: 'Inter-Black',
		fontSize: 20,

		padding: 10,
	},
});

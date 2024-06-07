import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth, db } from '../firebase.config';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';
export default function Home() {
	const navigation = useNavigation();
	const [name, setName] = useState('');

	const [file, setFile] = useState(null);
	const audiopicker = async () => {
		try {
			const docRes = await DocumentPicker.getDocumentAsync({
				type: 'audio/*',
			});

			if (docRes.type === 'cancel') {
				Alert.alert('Cancelled');
				return;
			}

			const file = docRes;
			console.log('Picked file:', file);

			const data = {
				uri: file.uri,
				type: file.mimeType,
				name: file.name,
			};
			console.log(data.name);
			console.log('Sending data to backend:', data);

			await axios
				.post('http://localhost:812/analyze', data)
				.then((response) => {
					console.log('Response from backend:', response.data);
				})
				.catch((error) => {
					console.error('Error sending data:', error);
					Alert.alert('Error', 'Failed to send data to backend');
				});
		} catch (err) {
			console.error('Unknown error:', err);
			Alert.alert('Unknown Error: ' + JSON.stringify(err));
		}

		// try {

		// 	const docRes = await DocumentPicker.getDocumentAsync({
		// 		type: 'audio/*',
		// 	});

		// 	const formData = new FormData();
		// 	const assets = docRes.assets;
		// 	if (!assets) return;

		// 	const file = assets[0];

		// 	const audioFile = {
		// 		name: file.name.split('.')[0],
		// 		uri: file.uri,
		// 		type: file.mimeType,
		// 		size: file.size,
		// 	};

		// 	formData.append(audioFile, {
		// 		uri: file.uri,
		// 		name: 'your-audio-file.mp3',
		// 		type: 'audio/mpeg',
		// 	});

		// 	const { data } = await axios.post('http://localhost:812/analyze', file.uri);

		// 	console.log(data);
		// } catch (error) {
		// 	console.log('Error while selecting file: ', error);
		// }
	};
	// useEffect(() => {
	// 	const fetchUserName = async () => {
	// 		try {
	// 			const currentUser = auth.currentUser;
	// 			if (currentUser) {
	// 				console.log(currentUser);

	// 				const q = query(collection(db, 'users'), where('userID', '==', currentUser.uid));
	// 				const querySnapshot = await getDocs(q);

	// 				querySnapshot.forEach((doc) => {
	// 					// doc.data() is never undefined for query doc snapshots
	// 					console.log(doc.data().userID, ' => ', doc.data());
	// 					setName(doc.data().username);
	// 				});
	// 			}
	// 		} catch (error) {
	// 			console.error('Error fetching user data: ', error);
	// 		}
	// 	};

	// 	fetchUserName();
	// }, []);

	// const handleLogOut = async () => {
	// 	await signOut(auth);
	// 	navigation.navigate('Login');
	// };

	return (
		<SafeAreaView>
			{/* <View>
				<Text>Hello, {name}</Text>

				<TouchableOpacity onPress={handleLogOut}>
					<Text>Sign Out</Text>
				</TouchableOpacity>
			</View> */}
			<View style={styles.container}>
				<Button title='Pick something' onPress={audiopicker} />
			</View>
		</SafeAreaView>
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

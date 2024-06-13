import { View, Text, SafeAreaView, Pressable, StyleSheet, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth, db } from '../firebase.config';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './Login';
export default function Home() {
	const Tab = createBottomTabNavigator();
	const navigation = useNavigation();
	const [name, setName] = useState('');
	const [Songname, setSongName] = useState('');
	const [chartdata, setChartdata] = useState(null);
	const [genre, setGenre] = useState('');
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
				uri: file.assets[0].uri,
				type: file.assets[0].mimeType,
				name: file.assets[0].name,
			};
			console.log(data.name);
			console.log('Sending data to backend:', data);

			setSongName(data.name);
			await axios
				.post('http://localhost:812/analyze', data)
				.then((response) => {
					console.log('Response from backend:', response.data);
					const rawData = response.data;

					const colors = ['hsl(273, 98%, 60%)', 'hsl(273, 98%, 35%)', 'hsl(273, 98%, 20%)', 'hsl(273, 98%, 75%)', 'hsl(273, 98%, 100%)'];

					const pieChartData = Object.entries(rawData).map(([key, value], index) => ({
						name: key,
						score: value,
						color: colors[index % colors.length],
						legendFontColor: '#7F7F7F',
						legendFontSize: 15,
					}));
					setChartdata(pieChartData);
					let max = 0;
					let index = 0;
					for (let i = 0; i < 5; i++) {
						if (pieChartData[i].score > max) {
							max = pieChartData[i].score;
							index = i;
						}
					}
					setGenre(pieChartData[index].name);
				})
				.catch((error) => {
					console.error('Error sending data:', error);
					Alert.alert('Error', 'Failed to send data to backend');
				});
		} catch (err) {
			console.error('Unknown error:', err);
			Alert.alert('Unknown Error: ' + JSON.stringify(err));
		}
	};
	useEffect(() => {
		const fetchUserName = async () => {
			try {
				const currentUser = auth.currentUser;
				if (currentUser) {
					console.log(currentUser);

					const q = query(collection(db, 'users'), where('userID', '==', currentUser.uid));
					const querySnapshot = await getDocs(q);

					querySnapshot.forEach((doc) => {
						// doc.data() is never undefined for query doc snapshots
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
	const chartConfig = {
		color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
		strokeWidth: 2, // optional, default 3
		barPercentage: 0.5,
	};

	return (
		<SafeAreaView style={styles.container1}>
			{
				<View>
					<Text style={styles.text}>Hello, {name}</Text>

					<Pressable onPress={handleLogOut}>
						<Text style={styles.text}>Sign Out</Text>
					</Pressable>
				</View>
			}
			<View style={styles.container}>
				<Button title='Insert File' onPress={audiopicker} />
			</View>
			<View>
				<Text style={styles.text}>Song Details:</Text>
				<Text style={styles.text}> Name:{Songname}</Text>
			</View>
			{chartdata && <PieChart data={chartdata} accessor='score' width={Dimensions.get('window').width} height={220} strokeWidth={16} radius={32} chartConfig={chartConfig} hideLegend={false} />}
			<View>
				<Text style={styles.text}>Genre:{genre}</Text>
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
		backgroundColor: 'rgba(0,0,0,0.9)',
	},
	text: {
		color: 'rgb(240, 237, 242)',
	},
});

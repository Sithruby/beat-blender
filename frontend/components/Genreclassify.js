import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Pressable, StyleSheet, Alert, Dimensions } from 'react-native';
import axios from 'axios';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';
import { PieChart } from 'react-native-chart-kit';
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from 'expo-font';
import MusicPlayer from './MusicPlayer';

import Login from './Login';

export default function Genreclassify() {
	const Tab = createBottomTabNavigator();

	const [fontsLoaded, fontError] = useFonts({
		'Inter-SemiBold': require('../assets/Inter-SemiBold.ttf'),
	});
	const [audio_file, setAudioFile] = useState('');
	const [Songname, setSongName] = useState('');
	const [chartdata, setChartdata] = useState(null);
	const [genre, setGenre] = useState('');

	const audiopicker = async () => {
		try {
			const docRes = await DocumentPicker.getDocumentAsync({
				type: 'audio/*',
				copyToCacheDirectory: true,
			});

			if (docRes.type === 'cancel') {
				Alert.alert('Cancelled');
				return;
			}

			const file = docRes;
			console.log('Picked file:', file);

			if (!file.assets[0].uri) {
				throw new Error('File URI is null');
			}
			let fileInfo;
			let ip;
			const fileUri = file.assets[0].uri;
			if (Platform.OS === 'web') {
				fileInfo = fileUri;
				ip = 'http://localhost:812/analyze';
				setAudioFile(fileInfo);
			} else if (Platform.OS === 'android' || Platform.OS === 'ios') {
				fileInfo = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });
				ip = 'http://10.0.2.2:812/analyze';
				setAudioFile(fileInfo);
			}

			//console.log('File info:', fileInfo);

			const data = {
				uri: fileInfo,
				name: file.assets[0].name,
				type: file.assets[0].mimeType,
			};

			console.log(data.name);
			//console.log('Sending data to backend:', data);

			setSongName(file.assets[0].name);

			await axios

				.post(ip, data)
				.then((response) => {
					//console.log('Response from backend:', response.data);
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
					for (let i = 0; i < pieChartData.length; i++) {
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

	const chartConfig = {
		color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
		strokeWidth: 2,
		barPercentage: 0.5,
	};

	if (!fontsLoaded && !fontError) {
		return null;
	}

	return (
		<SafeAreaView style={styles.container1}>
			<View style={styles.container}>
				<Pressable style={styles.button} onPress={audiopicker}>
					<Text style={styles.buttonText}>Insert File</Text>
				</Pressable>
			</View>
			<View>
				<MusicPlayer audio_file={audio_file} />
			</View>

			<View>
				<Text style={styles.textH}> {Songname}</Text>
			</View>
			{chartdata && <PieChart data={chartdata} accessor='score' width={Dimensions.get('window').width} height={220} strokeWidth={16} radius={32} chartConfig={chartConfig} hideLegend={false} />}
			<View>
				<Text style={styles.genreText}> {genre}</Text>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 10,
	},
	button: {
		backgroundColor: 'rgba(123, 31, 162,0.7)',
		padding: 10,
		borderRadius: 5,
		borderColor: 'rgb(0,0,0)',
		borderWidth: 1,
		paddingHorizontal: 30,
		cursor: 'pointer',
	},
	buttonText: {
		fontFamily: 'Inter-SemiBold',
		color: '#fff',
		fontSize: 15,
		fontWeight: 'bold',
	},

	container1: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		color: 'rgb(240, 237, 242)',
		backgroundColor: 'rgba(0,0,0,1)',
	},
	textH: {
		color: 'rgb(240, 237, 242)',
		fontFamily: 'Inter-SemiBold',
		fontWeight: 'bold',
		fontSize: 20,
		textAlign: 'center',
		padding: 10,
		marginBottom: 10,
	},
	genreText: {
		color: 'rgb(240, 237, 242)',
		fontFamily: 'inter-semiBold',
		fontWeight: 'bold',
		fontSize: 20,
		textAlign: 'center',

		marginBottom: 10,
		marginTop: 10,
		textTransform: 'uppercase',
	},
	text: {
		color: 'rgb(240, 237, 242)',
		fontFamily: 'inter-semiBold',
		fontSize: 20,

		padding: 10,
	},
});

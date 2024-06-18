import { Text, View, Platform, Pressable } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
import MusicPlayer from './MusicPlayer';

export default function RenderSong({ Songname, audioFile }) {
	async function playMusic() {
		const soundObject = new Audio.Sound();
		console.log('Being hit');

		try {
			await soundObject.loadAsync({ uri: audioFile });
			await soundObject.playAsync();
		} catch (error) {
			alert('Error' + error.message);
		}
	}

	async function stopMusic() {
		console.log('Not Being hit');
		const soundObject = new Audio.Sound();

		try {
			await soundObject.loadAsync({ uri: audioFile });
			await soundObject.stopAsync();
		} catch (error) {
			alert('Error' + error.message);
		}
	}

	return (
		<View style={{ marginVertical: 4 }}>
			<Pressable onPress={playMusic}>
				<Text>Play</Text>
			</Pressable>
			{/* <Pressable onPress={stopMusic}>
				<Text>pause</Text>
			</Pressable> */}

			<Text
				style={{
					color: '#fff',
				}}>
				{Songname}
			</Text>
		</View>
	);
}

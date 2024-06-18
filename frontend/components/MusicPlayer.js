import { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Button, StyleSheet, Alert, Dimensions, Pressable } from 'react-native';
import { Audio } from 'expo-av';

export default function MusicPlayer({ audio_file }) {
	const [sound, setSound] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);

	async function toggleSound() {
		if (sound) {
			if (isPlaying) {
				await sound.pauseAsync();
				setIsPlaying(false);
			} else {
				await sound.playAsync();
				setIsPlaying(true);
			}
		} else {
			console.log(audio_file);
			console.log('Loading Sound');
			const { sound } = await Audio.Sound.createAsync({ uri: audio_file });
			setSound(sound);

			console.log('Playing Sound');
			await sound.playAsync();
			setIsPlaying(true);
		}
	}

	useEffect(() => {
		return sound
			? async () => {
					console.log('Unloading Sound');
					await sound.unloadAsync();
			  }
			: undefined;
	}, [sound]);

	return (
		<Pressable style={styles.button} onPress={toggleSound}>
			<Text style={styles.buttonText}>{isPlaying ? 'Pause Song' : 'Play Song'}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#BF05F2',
		padding: 10,
		borderRadius: 5,
		borderColor: 'rgb(0,0,0)',
		borderWidth: 1,
		paddingHorizontal: 30,
		cursor: 'pointer',
		margin: 30,
	},
	buttonText: {
		fontFamily: 'Inter-SemiBold',
		color: '#fff',
		fontSize: 15,
		fontWeight: 'bold',
	},
});

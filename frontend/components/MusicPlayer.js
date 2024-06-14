import { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Button, StyleSheet, Alert, Dimensions } from 'react-native';
import { Audio } from 'expo-av';

export default function MusicPlayer({ audio_file }) {
	const [sound, setSound] = useState();

	async function playSound() {
		console.log(audio_file);
		console.log('Loading Sound');
		const { sound } = await Audio.Sound.createAsync({ uri: audio_file });
		setSound(sound);

		console.log('Playing Sound');
		await sound.playAsync();
	}

	useEffect(() => {
		return sound
			? () => {
					console.log('Unloading Sound');
					sound.unloadAsync();
			  }
			: undefined;
	}, [sound]);

	return (
		<View style={styles.container}>
			<Button title='Play Sound' onPress={playSound} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		backgroundColor: 'transparent',
		padding: 10,
	},
});

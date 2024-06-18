import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
const logoImg = require('../assets/music.jpg');

export default function WelcomeScreen() {
	const navigation = useNavigation();
	const [fontsLoaded, fontError] = useFonts({
		'Inter-SemiBold': require('../assets/Inter-SemiBold.ttf'),
		'Inter-Regular': require('../assets/Inter-Regular.ttf'),
	});
	if (!fontsLoaded && !fontError) {
		return null;
	}
	return (
		<SafeAreaView style={styles.container}>
			<LinearGradient colors={['rgb(165,55,253)', 'transparent']} style={styles.background} />
			<View>
				<View style={styles.align}>
					<Image style={styles.logo} source={logoImg} />
				</View>
				<Text style={styles.text1}>The Best Music Collections</Text>

				<View>
					<Pressable style={styles.button} onPress={() => navigation.navigate('SignUp')}>
						<Text style={styles.buttonText}>Let's Get Started</Text>
					</Pressable>
				</View>
			</View>
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	background: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: 300,
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		color: '#ccc',
		backgroundColor: 'rgba(0,0,0,0.9)',
	},
	align: {
		alignItems: 'center',
		margin: '20px',
	},
	text1: {
		fontFamily: 'Inter-SemiBold',
		color: '#fff',

		fontSize: 27,
	},

	button: {
		width: '50%',
		padding: 10,
		borderRadius: 40,
		borderWidth: 1,
		alignItems: 'center',
		marginLeft: '25%',
		backgroundColor: 'rgb(123, 31, 162)',
		borderColor: 'rgb(0,0,0)',
	},
	buttonText: {
		fontFamily: 'Inter-Regular',
		color: '#fff',
	},
	logo: {
		height: 300,
		width: 300,
	},
});

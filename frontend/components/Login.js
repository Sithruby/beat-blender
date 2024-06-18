import * as React from 'react';
import { useState } from 'react';
import { TextInput, View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../firebase.config';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useFonts } from 'expo-font';
const logoImg = require('../assets/4.png');

export default function Login() {
	const navigation = useNavigation();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [fontsLoaded, fontError] = useFonts({
		'Inter-SemiBold': require('../assets/Inter-SemiBold.ttf'),
		'Inter-Regular': require('../assets/Inter-Regular.ttf'),
	});
	if (!fontsLoaded && !fontError) {
		return null;
	}
	loginUser = async (email, password) => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
			// console.log(email);
			alert('login success');
			setEmail('');
			setPassword('');
			navigation.navigate('Navigation');
		} catch (error) {
			if (error.code === 'auth/invalid-credential') {
				alert('Invalid email or password');
			}
		}
	};
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.logoContainer}>
				<Image style={styles.logo} source={logoImg} />
			</View>

			<LinearGradient colors={['rgb(165,55,253)', 'transparent']} style={styles.background} />
			<Text style={styles.headerText}>Log In</Text>
			<TextInput style={styles.input} value={email} placeholder='email' autoCapitalize='none' onChangeText={(email) => setEmail(email)} placeholderTextColor='#fff' />

			<TextInput
				style={styles.input}
				placeholder='Password'
				value={password}
				autoCorrect={false}
				autoCapitalize='none'
				secureTextEntry={true}
				onChangeText={(password) => setPassword(password)}
				placeholderTextColor='#fff'
			/>
			<Pressable style={styles.button} onPress={() => loginUser(email, password)}>
				<Text style={styles.buttonText}>Login</Text>
			</Pressable>

			<Pressable onPress={() => navigation.navigate('SignUp')}>
				<Text style={styles.buttonText}>Don't have an account?Register</Text>
			</Pressable>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,0.9)',
	},
	logoContainer: {
		padding: 20,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
	},
	logo: {
		height: 90,
		width: 90,
		borderRadius: 70,
	},
	background: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: 300,
	},
	button: {
		backgroundColor: 'rgb(123, 31, 162)',
		padding: 10,
		borderRadius: 15,
		borderColor: 'rgb(0,0,0)',
		borderWidth: 1,
		paddingHorizontal: 30,
	},
	buttonText: {
		fontFamily: 'Inter-Regular',
		color: '#fff',
	},
	text: {
		backgroundColor: 'transparent',
		fontSize: 15,
		color: '#fff',
	},
	headerText: {
		color: '#fff',
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	input: {
		borderRadius: 15,
		width: 250,
		padding: 10,
		marginBottom: 10,
		paddingHorizontal: 10,
		paddingRight: 30,
		backgroundColor: 'rgba(255,255,255,0.2)',
		color: '#ccc',
	},
});

import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import { auth } from '../firebase.config';
import { db } from '../firebase.config';
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useFonts } from 'expo-font';
const logoImg = require('../assets/4.png');

export default function SignUp({ props }) {
	const navigation = useNavigation();
	const [username, setUsername] = useState('');
	const [nameVerify, setNameVerify] = useState(false);
	const [email, setEmail] = useState('');
	const [emailVerify, setEmailVerify] = useState(false);
	const [password, setPassword] = useState('');
	const [pwVerify, setPwVerify] = useState(false);

	const registerUser = async (username, email, password) => {
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			const userID = auth.currentUser.uid;

			await addDoc(collection(db, 'users'), { username, email, userID });

			alert('User registered successfully');
			setUsername('');
			setEmail('');
			setPassword('');
			setNameVerify(false);
			setEmailVerify(false);
			setPwVerify(false);
			//naviagating to login page after creating account
			navigation.navigate('Login');
		} catch (error) {
			alert(error.message);
		}
	};

	const handleName = (nameVar) => {
		setUsername(nameVar);
		if (nameVar.length > 5) {
			setNameVerify(true);
		} else {
			setNameVerify(false);
		}
	};
	const handlePw = (pwVar) => {
		setPassword(pwVar);
		if (pwVar.length > 6) {
			setPwVerify(true);
		} else {
			setPwVerify(false);
		}
	};
	const handleEmail = (emailVar) => {
		setEmail(emailVar);
		if (/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(emailVar)) {
			setEmailVerify(true);
		} else {
			setEmailVerify(false);
		}
	};

	const handleUsernameChange = (text) => {
		setUsername(text);
		handleName(text);
	};
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
			<View style={styles.logoContainer}>
				<Image style={styles.logo} source={logoImg} />
			</View>
			<Text style={styles.headerText}>Sign Up</Text>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder='Username'
					value={username}
					onChangeText={(text) => {
						console.log('Username:', text); // Debug: Log username changes
						handleUsernameChange(text);
					}}
					autoCapitalize='none'
					placeholderTextColor='#fff'
				/>
				{username.length > 0 && <Feather name={nameVerify ? 'check-circle' : 'x-circle'} color={nameVerify ? 'green' : 'rgb(139, 0, 0)'} size={20} style={styles.icon} />}
			</View>
			{username.length < 5 ? null : !nameVerify && <Text style={{ marginLeft: 20, color: 'rgb(149, 0, 0)', paddingBottom: 12 }}>Name should be more than 5 character</Text>}
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder='Email'
					value={email}
					onChangeText={(text) => {
						console.log('Email:', text);
						setEmail(text);
						handleEmail(text);
					}}
					autoCapitalize='none'
					placeholderTextColor='#fff'
				/>
				{email.length > 0 && <Feather name={emailVerify ? 'check-circle' : 'x-circle'} color={emailVerify ? 'green' : 'rgb(139, 0, 0)'} size={20} style={styles.icon} />}
			</View>
			{email.length < 1 ? null : !emailVerify && <Text style={{ color: 'rgb(149, 0, 0)', paddingBottom: 12 }}>Invalid email address</Text>}
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder='Password'
					value={password}
					onChangeText={(text) => {
						console.log('Password:', text);
						setPassword(text);
						handlePw(text);
					}}
					placeholderTextColor='#fff'
					secureTextEntry={true}
				/>
				{password.length > 0 && <Feather name={pwVerify ? 'check-circle' : 'x-circle'} color={pwVerify ? 'green' : 'rgb(139, 0, 0)'} size={20} style={styles.icon} />}
			</View>
			{password.length < 6 ? null : !pwVerify && <Text style={{ marginLeft: 20, color: 'rgb(149, 0, 0)', paddingBottom: 12 }}>Password should be more than 6 character</Text>}

			<Pressable style={styles.button} onPress={() => registerUser(username, email, password)}>
				<Text style={styles.buttonText}>Sign Up</Text>
			</Pressable>
			<Pressable onPress={() => navigation.navigate('Login')}>
				<Text style={styles.buttonText}>Already have an account? Login</Text>
			</Pressable>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		color: '#ccc',
		backgroundColor: 'rgba(0,0,0,0.9)',
	},
	logoContainer: {
		padding: 20,
		justifyContent: 'top',
		alignItems: 'left',
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
		position: 'relative',
	},
	input: {
		width: 250,
		height: 40,
		color: '#ccc',
		borderRadius: 15,
		paddingHorizontal: 10,
		paddingRight: 30,
		marginBottom: 10,
		backgroundColor: 'rgba(255,255,255,0.2)',
	},
	icon: {
		position: 'absolute',
		right: 10,
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
		fontSize: 28,
		fontWeight: 'bold',
		marginBottom: 20,
	},
});

import React from 'react';
import { View, Text, SafeAreaView, Pressable, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const GenreSelectionPage = () => {
	const navigation = useNavigation();

	// Define genres and their associated songs
	const genres = [
		{
			id: 1,
			name: 'Rock',
			icon: require('../assets/rock_icon.png'),
			songs: [
				{ id: 1, title: 'Song 1', artist: 'Artist 1' },
				{ id: 2, title: 'Song 2', artist: 'Artist 2' },
			],
		},
		{
			id: 2,
			name: 'Hip Hop',
			icon: require('../assets/hiphop_icon.png'),
			songs: [
				{ id: 3, title: 'Song 3', artist: 'Artist 3' },
				{ id: 4, title: 'Song 4', artist: 'Artist 4' },
			],
		},
		// Add more genres as needed
		{
			id: 3,
			name: '90s',
			icon: require('../assets/90s_icon.png'),
			songs: [
				{ id: 5, title: 'Song 5', artist: 'Artist 5' },
				{ id: 6, title: 'Song 6', artist: 'Artist 6' },
			],
		},
		{
			id: 4,
			name: 'Rap',
			icon: require('../assets/rap_icon.png'),
			songs: [
				{ id: 7, title: 'Song 7', artist: 'Artist 7' },
				{ id: 8, title: 'Song 8', artist: 'Artist 8' },
			],
		},
		{
			id: 5,
			name: 'Jazz',
			icon: require('../assets/jazz_icon.png'),
			songs: [
				{ id: 9, title: 'Song 9', artist: 'Artist 9' },
				{ id: 10, title: 'Song 10', artist: 'Artist 10' },
			],
		},
		{
			id: 6,
			name: 'Classical',
			icon: require('../assets/classical_icon.png'),
			songs: [
				{ id: 11, title: 'Song 11', artist: 'Artist 11' },
				{ id: 12, title: 'Song 12', artist: 'Artist 12' },
			],
		},
	];

	const handleGenrePress = (genre) => {
		navigation.navigate('SongLists', { songs: genre.songs }); // Pass genre songs to SongLists page
	};

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Select Genre</Text>
			<LinearGradient colors={['rgb(165,55,253)', 'black']} style={styles.background} />
			<View style={styles.genreGrid}>
				{genres.map((genre) => (
					<Pressable key={genre.id} style={styles.genreButton} onPress={() => handleGenrePress(genre)}>
						<Image source={genre.icon} style={styles.genreIcon} />
						<Text style={styles.genreText}>{genre.name}</Text>
					</Pressable>
				))}
			</View>
			<View style={styles.navigation}>
				<Pressable style={styles.navButton}>
					<Image source={require('../assets/home_icon.png')} style={styles.navIcon} />
				</Pressable>
				<Pressable style={styles.navButton}>
					<Image source={require('../assets/folder_icon.png')} style={styles.navIcon} />
				</Pressable>
				<Pressable style={styles.navButton}>
					<Image source={require('../assets/search_icon.png')} style={styles.navIcon} />
				</Pressable>
				<Pressable style={styles.navButton1}>
					<Image source={require('../assets/more_icon.png')} style={styles.navIcon1} />
				</Pressable>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'rgb(180,55,253)',
		paddingHorizontal: 20,
	},
	title: {
		fontSize: 33,
		color: 'black',
		fontWeight: 'bold',
		marginTop: 50,
		marginBottom: 40,
		textAlign: 'left',
	},
	genreGrid: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
	},
	genreButton: {
		width: '48%',
		aspectRatio: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.2)',
		borderRadius: 10,
		marginBottom: 20,
	},
	genreIcon: {
		marginTop: 20,
		width: 60,
		height: 60,
		marginBottom: 4,
	},
	genreText: {
		fontSize: 18,
		textAlign: 'center',
	},
	navigation: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderTopWidth: 1,
		borderTopColor: '#e0e0e',
		flexDirection: 'row',
		borderRadius: 25, // Added border radius
		overflow: 'hidden',
		backgroundColor: 'rgba(255,255,255,1.2)',
	},
	navButton: {
		alignItems: 'center',
		backgroundColor: 'transparent',
	},
	navIcon: {
		width: 30,
		height: 30,
	},
	navIcon1: {
		width: 40,
		height: 30,
	},
	background: {
		...StyleSheet.absoluteFillObject,
	},
});

export default GenreSelectionPage;

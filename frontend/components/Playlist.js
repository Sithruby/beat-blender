import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { getDocs, collection } from 'firebase/firestore';
import { db, auth } from '../firebase.config';
import RenderSong from './RenderSong';

export default function Playlist() {
	const genres = [
		{ name: 'blues', image: require('../assets/blues.jpg') },
		{ name: 'classical', image: require('../assets/classical.jpg') },
		{ name: 'country', image: require('../assets/country.jpeg') },
		{ name: 'disco', image: require('../assets/disco.png') },
		{ name: 'hiphop', image: require('../assets/hiphop.png') },
		{ name: 'jazz', image: require('../assets/jazz.png') },
		{ name: 'metal', image: require('../assets/metal.png') },
		{ name: 'pop', image: require('../assets/pop.png') },
		{ name: 'reggae', image: require('../assets/reggae.png') },
		{ name: 'rock', image: require('../assets/rock.png') },
	];

	const [songs, setSongs] = useState({});
	const [currentUser, setCurrentUser] = useState('');
	const [selectedGenre, setSelectedGenre] = useState(null);

	useEffect(() => {
		if (auth.currentUser) {
			setCurrentUser(auth.currentUser.uid);
		}
	}, []);

	useEffect(() => {
		const fetchSongs = async () => {
			try {
				const songsByGenre = {};
				for (const genre of genres) {
					const querySnapshot = await getDocs(collection(db, 'playlists', currentUser, genre.name));
					const genreSongs = [];
					querySnapshot.forEach((doc) => {
						genreSongs.push(doc.data());
					});
					songsByGenre[genre.name] = genreSongs;
				}
				setSongs(songsByGenre);
			} catch (error) {
				console.log(error);
			}
		};

		if (currentUser) {
			fetchSongs();
		}
	}, [currentUser]);

	return (
		<View style={styles.container}>
			<View style={styles.genresContainer}>
				{genres.map((genre) => (
					<TouchableOpacity key={genre.name} style={[styles.genreBox, selectedGenre === genre.name && styles.selectedGenreBox]} onPress={() => setSelectedGenre(genre.name)}>
						<Image source={genre.image} style={styles.genreImage} />
						<Text style={styles.genreText}>{genre.name}</Text>
					</TouchableOpacity>
				))}
			</View>
			{selectedGenre && (
				<View style={styles.songsContainer}>
					<Text style={styles.genreHeader}>{selectedGenre}:</Text>
					{songs[selectedGenre] && songs[selectedGenre].map((audioFile, index) => <RenderSong Songname={audioFile.Songname} audioFile={audioFile.audio_file} key={index} />)}
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: 'rgb(0,0,0)',
	},
	header: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
		color: '#fff',
	},
	genresContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
	genreBox: {
		width: '30%',
		padding: 10,
		marginBottom: 10,
		backgroundColor: '#e0e0e0',
		borderRadius: 5,
		alignItems: 'center',
	},
	selectedGenreBox: {
		backgroundColor: '#BF05F2',
	},
	genreImage: {
		width: 50,
		height: 50,
		marginBottom: 5,
	},
	genreText: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	songsContainer: {
		marginTop: 20,
	},
	genreHeader: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 10,
		color: '#fff',
	},
});

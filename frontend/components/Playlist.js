import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { getDocs, collection } from 'firebase/firestore';
import { db, auth } from '../firebase.config';
import RenderSong from './RenderSong';

export default function Playlist() {
	const genres = ['blues', 'classical', 'country', 'disco', 'hiphop', 'jazz', 'metal', 'pop', 'reggae', 'rock'];
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
					const querySnapshot = await getDocs(collection(db, 'playlists', currentUser, genre));
					const genreSongs = [];
					querySnapshot.forEach((doc) => {
						genreSongs.push(doc.data());
					});
					songsByGenre[genre] = genreSongs;
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
			<Text style={styles.header}>Playlists:</Text>
			<View style={styles.genresContainer}>
				{genres.map((genre) => (
					<TouchableOpacity key={genre} style={styles.genreBox} onPress={() => setSelectedGenre(genre)}>
						<Text style={styles.genreText}>{genre}</Text>
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
		width: '40%',
		padding: 10,
		marginBottom: 10,
		backgroundColor: '#e0e0e0',
		borderRadius: 5,
		alignItems: 'center',
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

// React Imports
import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	View,
	SafeAreaView,
	ScrollView
} from 'react-native';

// Expo imports
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';

// Third Party Imports
import Image from 'react-native-remote-svg';

// Local Imports
import {
	StyledText
} from 'react-native-panda-ui';
import {
	useThemeContext,
	themeSelector
} from '../contexts/ThemeContext';
import Colors from '../constants/Colors';
import LoadingIndicator from '../components/LoadingIndicator';
import PandaDetail from '../components/PandaDetail';
import ThemeSelect from '../components/ThemeSelect';
import { getCharacters } from '../utils/apiHandler';

const PandaHomeScreen = () => {

	const [userSession] = useThemeContext();
	const theme = themeSelector(userSession);
	// state hooks
	// useState utilizes the current state and a function that updates it
	const [characterData, setCharacterData] 	= useState([]);
	const [qualitiesData, setQualitiesData] 	= useState([]);
	const [loading, setLoading] 				= useState(false);

	useEffect(() => {
		setLoading(true);
		getCharacters().then((response) => {
			if (response) {
				setCharacterData(response.data.characters);
			} else {
				// toast.showError(response?.res_msg);
			}
		})
		.catch(() => {
			// toast.showError('There was an error getting characters.');
		})
		.finally(() => setLoading(false));
	}, []);

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			marginTop: StatusBar.height,
			backgroundColor: Colors[theme].backgroundColor
		}
	});

	return (
		<SafeAreaView style={styles.container}>
			<View style={{ flex: 1, marginHorizontal: 10, marginTop: 30, alignItems: 'center' }}>
				<Image
					source={require('../assets/panda-ui-logo.png')}
					style={{ height: 150, resizeMode: 'contain' }}
				/>
				<ThemeSelect
					characterData={characterData}
					setLoading={setLoading}
					setQualitiesData={setQualitiesData}
				/>
			</View>
			<View style={{ flex: 1, marginHorizontal: 10, marginTop: 300, alignItems: 'center' }} />

			<ScrollView>
				<View>
					{
						loading ?
							(
								<LoadingIndicator
									activityIndicatorColor={Colors[theme].activityIndicatorColor}
									backgroundColor={Colors[theme].cardColor}
									height={250}
								/>
							) : (
								<PandaDetail
									qualitiesData={qualitiesData}
								/>
							)
					}
				</View>
			</ScrollView>
			<StyledText.Body3 style={{ textAlign: 'right' }} textColor={Colors[theme].textColor}>{`v${Constants.manifest.version}`}</StyledText.Body3>
		</SafeAreaView>
	);
};

export default PandaHomeScreen;

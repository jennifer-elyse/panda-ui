// React Imports
import React, { useState, useEffect } from 'react';
import {
	View,
	SafeAreaView,
	StyleSheet,
	ScrollView
} from 'react-native';

// Expo imports
import { StatusBar } from 'expo-status-bar';

// Panda Imports
import {
	Card,
	TabGroup
} from 'react-native-panda-ui';

// Local Imports
import {
	useThemeContext,
	themeSelector
} from '../contexts/ThemeContext';
import Colors from '../constants/Colors';
import LoadingIndicator from '../components/LoadingIndicator';
import PandaDetail from '../components/PandaDetail';
import ThemeSelect from '../components/ThemeSelect';
import window from '../constants/Layout';
import { getCharacters, getCharacterQualities } from '../utils/apiHandler';


export default function SettingsScreen() {
	const [userSession, dispatch] = useThemeContext();
	const theme = themeSelector(userSession);
	const [loading, setLoading] 				= useState(false);

	const [characterData, setCharacterData] 	= useState([]);
	const [qualitiesData, setQualitiesData] 	= useState([]);
	const [character, setCharacter]				= useState({ id: '0', animal: '' });
	const [tab, setTab] 						= useState('1');

	const updateTheme = async () => {
		setLoading(true);
		if (character.id > 0) {
			const response = await getCharacterQualities(character.id);
			dispatch({ type: 'SET_THEME', payload: { theme: response.theme } });
		} else {
			dispatch({ type: 'SET_THEME', payload: { theme: 'default' } });
		}
		setLoading(false);
	};

	const setCharacterQualities = async (value) => {
		setLoading(true);
		const response = await getCharacterQualities(value);
		setQualitiesData(response);
		setLoading(false);
	};

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			marginTop: StatusBar.height,
			backgroundColor: Colors[theme].backgroundColor
		}
	});

	useEffect(() => {
		(async () => {
			setLoading(true);
			let response = await getCharacters();
			setCharacterData(response.data.characters);
			setCharacterQualities(tab);
			setLoading(false);
		})();
	}, []);


	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<View style={{ alignItems: 'center' }}>
					<View style={{ margin: 10, marginTop: 8, alignItems: 'center', height: '20%' } }>
						<ThemeSelect
							character={character}
							setCharacter={setCharacter}
							characterData={characterData}
							onPress={updateTheme}
						/>
					</View>
					<View style={{ width: '104%', height: '100%' }}>
						<Card
							elevation={5}
							borderTopLeftRadius={50}
							borderTopRightRadius={50}
							borderBottomLeftRadius={0}
							borderBottomRightRadius={0}
							backgroundColor={Colors[theme].cardColor}
							style={{ flex: 1, alignItems: 'center' }}
						>
							<React.Fragment>
								<TabGroup
									onValueChange={ async (value) => {
										setTab(value);
										setCharacterQualities(value);
									}}
									style={{ height: 50, marginBottom: 10 }}
									size="small"
									selectedValue={tab}
									width="90%"
									height={50}
									textColor={Colors[theme].buttonColor}
									color={Colors[theme].borderColor}
									options={[{ label: 'AKIRA', value: '1' }, { label: 'YUKI', value: '2' }, { label: 'KENZO', value: '3' }, { label: 'TSUKI', value: '4' }, { label: 'KUMI', value: '5' }]}
								/>
								<View style={{ flex: 1, marginTop: 50 }}>
									{
										loading ?
											(
												<LoadingIndicator
													activityIndicatorColor={Colors[theme].tintColor}
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
							</React.Fragment>
						</Card>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

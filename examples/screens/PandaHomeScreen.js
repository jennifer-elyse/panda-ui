// React Imports
import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	View,
	SafeAreaView,
	ScrollView
} from 'react-native';

// Local Imports
import {
	useThemeContext,
	themeSelector,
	characterSelector
} from '../contexts/ThemeContext';
import Colors from '../constants/Colors';
import LoadingIndicator from '../components/LoadingIndicator';
import PandaDetail from '../components/PandaDetail';
import { getCharacterQualities } from '../utils/apiHandler';

const PandaHomeScreen = () => {

	const [userSession] = useThemeContext();
	const theme = themeSelector(userSession);
	const character = characterSelector(userSession);
	// state hooks
	// useState utilizes the current state and a function that updates it
	const [qualitiesData, setQualitiesData] 	= useState([]);
	const [loading, setLoading] 				= useState(false);

	useEffect(() => {
		(async () => {
			setLoading(true);
			const response = character.id  > 0 && await getCharacterQualities(character.id);
			setQualitiesData && setQualitiesData(response);
			setLoading(false);
		})();
	}, [character]);

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'flex-start',
			backgroundColor: Colors[theme].backgroundColor
		}
	});

	return (
		<SafeAreaView style={styles.container}>
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
								<>
									<View style={{ height: 30 }} />
									<PandaDetail
										qualitiesData={qualitiesData}
									/>
								</>
							)
					}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default PandaHomeScreen;

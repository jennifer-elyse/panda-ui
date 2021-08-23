// React Imports
import React, { useState, useEffect } from 'react';
import {
	View,
	SafeAreaView,
	StyleSheet,
	ScrollView,
	Platform
} from 'react-native';

// Expo imports
import { StatusBar } from 'expo-status-bar';

// Panda Imports
import {
	Card,
	CheckBoxGroup,
	CounterInput,
	RadioGroup,
	ToggleButton
} from 'react-native-panda-ui';

// Local Imports
import {
	useThemeContext,
	themeSelector,
	baseThemeSelector,
	invertedSelector
} from '../contexts/ThemeContext';
import Colors from '../constants/Colors';
import LoadingIndicator from '../components/LoadingIndicator';
import { H1 } from '../components/StyledText';
import ThemeSelect from '../components/ThemeSelect';
import { getCharacters, getCharacterQualities } from '../utils/apiHandler';

const colorOptions =
	[{
		label: 'Rose Gold',
		value: '1'
	}, {
		label: 'Red',
		value: '2'
	}, {
		label: 'Grey',
		value: '3'
	}, {
		label: 'Midnight',
		value: '4'
	}];

const lovesOptions =
	[{
		label: 'Judgy People',
		value: '1',
		mutuallyExclusive: 'N'
	}, {
		label: 'Books',
		value: '2',
		mutuallyExclusive: 'N'
	}, {
		label: 'Good Conversation',
		value: '3',
		mutuallyExclusive: 'N'
	}, {
		label: 'Bling',
		value: '4',
		mutuallyExclusive: 'N'
	}];


export default function SettingsScreen() {
	const [userSession, dispatch] = useThemeContext();
	const theme = themeSelector(userSession);
	const baseTheme = baseThemeSelector(userSession);
	const inverted = invertedSelector(userSession);
	const [selectedColor, setSelectedColor] 	= useState('');
	const [selectedLoves, setSelectedLoves] 	= useState([]);
	const [loading, setLoading] 				= useState(false);

	const [characterCount, setCharacterCount] 	= useState(0);
	const [characterData, setCharacterData] 	= useState([]);
	const [character, setCharacter]				= useState({ id: '0', animal: '' });

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
			setLoading(false);
		})();
	}, []);

	function handleCountChange(newCount) {
		setCharacterCount(newCount ? newCount : 1);
	}

	if (loading) {
		return (
			<LoadingIndicator
				activityIndicatorColor={Colors[theme].tintColor}
				backgroundColor={Colors[theme].backgroundColor}
			/>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<View style={{ alignItems: 'center', justifyContent: 'center' }}>
					<View style={{ flex: 1, margin: 10, marginTop: 8, alignItems: 'center', justifyContent: 'center' }}>
						<ThemeSelect
							character={character}
							setCharacter={setCharacter}
							characterData={characterData}
							onPress={updateTheme}
						/>
					</View>
					<Card borderRadius={50} style={{ elevation: 5, width: '90%', padding: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors[theme].backCardColor }} >
						<Card borderRadius={40} style={{ elevation: 5, width: '100%', padding: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors[theme].cardColor }} >
							<View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
								<ToggleButton
									onValueChange={(value) => {
										dispatch({ type: 'SET_THEME', payload: { inverted: value } });
									}}
									size="standard"
									selectedValue={inverted}
									height={50}
									border={1}
									borderRadius={30}
									color={Colors[theme].buttonColor}
									textColor={Colors[theme].buttonTextColor}
									options={[{ label: 'Heads', value: false, svg: require('../assets/trashpanda.svg') }, { label: 'Tails', value: true, svg: require('../assets/trashcan.svg') }]}
								/>
							</View>
						</Card>
					</Card>
					<View style={{ flexDirection: 'row', marginHorizontal: 20, marginVertical: 15 }}>
						<H1 textColor={Colors[theme].textColor}>Which is Tsuki's color?</H1>
					</View>
					<Card borderRadius={50} style={{ elevation: 5, width: 230, padding: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors[theme].backCardColor }} >
						<Card borderRadius={40} style={{ elevation: 5, width: '100%', padding: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors[theme].cardColor }} >
							<RadioGroup
								containerStyle={{ width: '100%', paddingVertical: Platform.OS !== 'ios' ? 20 : 15, paddingHorizontal: Platform.OS !== 'ios' ? 15 : 12, borderWidth: 1, borderStyle: 'solid', borderColor: Colors[theme].tintColor, borderRadius: 30 }}
								options={colorOptions}
								value={selectedColor}
								onChange={setSelectedColor}
								backgroundColor={Colors[theme].buttonColor}
								textColor={Colors[theme].buttonTextColor}
								checkedColor={Colors[theme].buttonTextColor}
								checkBoxContainerStyle={{ borderRadius: 30 }}
							/>
						</Card>
					</Card>
					<View style={{ flexDirection: 'row', marginHorizontal: 20, marginVertical: 15 }}>
						<H1 textColor={Colors[theme].textColor}>Which are Kenzo's loves?</H1>
					</View>
					<Card borderRadius={50} style={{ elevation: 5, width: 290, height: 300, padding: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors[theme].backCardColor }} >
						<Card borderRadius={40} style={{ elevation: 5, width: '100%', height: '100%', padding: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors[theme].cardColor }} >
							<CheckBoxGroup
								containerStyle={{ width: '100%', height: '100%', paddingVertical: Platform.OS !== 'ios' ? 20 : 15, paddingHorizontal: Platform.OS !== 'ios' ? 15 : 12, borderWidth: 1, borderStyle: 'solid', borderColor: Colors[theme].tintColor, borderRadius: 30 }}
								options={lovesOptions}
								value={selectedLoves}
								onChange={setSelectedLoves}
								backgroundColor={Colors[theme].buttonColor}
								textColor={Colors[theme].buttonTextColor}
								checkedColor={Colors[theme].buttonTextColor}
								checkBoxContainerStyle={{ borderRadius: 30 }}
							/>
						</Card>
					</Card>
					<View style={{ height: 150, width: '85%', marginTop: 20, marginBottom: 35 }}>
						<Card
							elevation={5}
							borderRadius={50}
							backgroundColor={Colors[theme].backCardColor}
							style={{ padding: 10 }}
						>
							<Card
								elevation={8}
								borderRadius={40}
								backgroundColor={Colors[theme].cardColor}
								style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}
							>
								<View style={{ height: 100, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
									<CounterInput
										value={characterCount}
										onChange={handleCountChange}
										cardColor={Colors[theme].cardColor}
										backCardColor={Colors[theme].backCardColor}
										buttonTextColor={Colors[theme].tintColor}
										textColor={Colors[theme].textColor}
									/>
								</View>
							</Card>
						</Card>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

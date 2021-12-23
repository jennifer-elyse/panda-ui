// React Imports
import React, { useState, useEffect } from 'react';
import {
	View,
	SafeAreaView,
	StyleSheet
} from 'react-native';

// Expo imports
import { StatusBar } from 'expo-status-bar';

// Panda Imports
import {
	Drawer,
	ButtonGroup,
	StyledText
} from 'react-native-panda-ui';

// Local Imports
import {
	useThemeContext,
	themeSelector
} from '../contexts/ThemeContext';
import Colors from '../constants/Colors';
import ThemeSelect from '../components/ThemeSelect';
import { getCharacters } from '../utils/apiHandler';

const BUTTON_LABELS = [
	{ label: 'Vanilla Icecream', value: 'vanilla_icecream' },
	{ label: 'Strawberry Popsicle', value: 'strawberry_popsicle' },
]

const SIDE_BAR = () => {
	return (
		<View style={{
			height: 500,
			width: 300,
			backgroundColor: 'pink'
		}}>
			<StyledText.H1>Side Bar</StyledText.H1>
			<StyledText.Body2>Sidebar options</StyledText.Body2>
		</View>
	);
};

const DataScreen = () => {
	const [userSession] = useThemeContext();
	const theme = themeSelector(userSession);
	const [characterData, setCharacterData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [buttonIndex, setButtonIndex] = useState(0);

	useEffect(() => {
		(async () => {
			setLoading(true);
			let response = await getCharacters();
			setCharacterData(response.data.characters);
			setLoading(false);
		})();
	}, []);

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			marginTop: StatusBar.height,
			backgroundColor: Colors[theme].backgroundColor,
			alignItems: 'flex-start'
		}
	});

	return (
		<SafeAreaView style={styles.container}>
			<ThemeSelect
				characterData={characterData}
				setLoading={setLoading}
			/>
			<Drawer
				SideBar={SIDE_BAR}
			>
				<View style={{
					width: '95%',
					marginTop: 30,
					marginBottom: 15,
					alignItems: 'center',
				}}>
					<ButtonGroup
						buttonLabels={BUTTON_LABELS}
						selectedIndex={buttonIndex}
						selectIndex={setButtonIndex}
					/>
				</View>
			</Drawer>
		</SafeAreaView>
	);
};

export default DataScreen;

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
	{ label: 'KFC Fried Chicken', value: 'kfc_fried_chicken' },
	{ label: 'In-n-Out Animal Style', value: 'in_and_out' },
]

const SIDE_BAR = () => {
	return (
		<View style={{
			height: 500,
			width: 230,
			backgroundColor: 'pink'
		}}>
			<StyledText.H1>Side Bar</StyledText.H1>
			<StyledText.Body2>A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</StyledText.Body2>
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
			width: '100%',
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
				width={230}
				squeeze
				screenWidth={800}
				SideBar={SIDE_BAR}
			>
				<View style={{
					backgroundColor: 'lightblue',
					width: '100%',
					height: 300,
					marginTop: 30,
					marginBottom: 15,
					alignItems: 'center',
				}}>
					<ButtonGroup
						buttonLabels={BUTTON_LABELS}
						selectedIndex={buttonIndex}
						selectIndex={setButtonIndex}
					/>
					<View style={{marginVertical: 5, backgroundColor: 'salmon', width: '100%'}}>
					<StyledText.H1>A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 |</StyledText.H1>
					</View>
				</View>
			</Drawer>
		</SafeAreaView>
	);
};

export default DataScreen;

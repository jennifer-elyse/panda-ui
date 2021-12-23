import React, { useState } from 'react';
import {
	View,
	StyleSheet,
	SafeAreaView
} from 'react-native';

// Expo imports
import { StatusBar } from 'expo-status-bar';

// Panda Imports
import {
	Card,
	StyledText
} from 'react-native-panda-ui';

import {
	useThemeContext,
	themeSelector
} from '../contexts/ThemeContext';
import Colors from '../constants/Colors';


export default function HelpScreen() {
	const [userSession] = useThemeContext();
	const theme = themeSelector(userSession);

	const [rating, setRating] = useState(0);

	return (
		<SafeAreaView style={{ flex: 1, marginTop: StatusBar.height, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors[theme].backgroundColor }}>
			<View style={[styles.header, { paddingTop: 6 }]}>
				<StyledText.H1 textColor={Colors[theme].tintColor}>Panda UI</StyledText.H1>
			</View>
			<View style={{ height: 170, width: '90%', marginTop: 20 }}>
				<Card
					elevation={5}
					borderRadius={50}
					backgroundColor={Colors[theme].backCardColor}
					style={{ alignItems: 'center', justifyContent: 'center' }}
				>
					<Card
						elevation={8}
						borderRadius={40}
						backgroundColor={Colors[theme].cardColor}
						style={{ alignItems: 'center', height: '85%', width: '95%' }}
					>
						<View style={{ height: 100, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
						</View>
					</Card>
				</Card>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 2,
		width: '100%'
	},
	details: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 25,
		paddingVertical: 2,
		width: '100%'
	}
});

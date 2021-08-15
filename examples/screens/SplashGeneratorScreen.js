import React from 'react';
import {
	View,
	Image
} from 'react-native';

import Colors from '../constants/Colors';
import { useThemeContext, themeSelector } from '../contexts/ThemeContext';

export default function SplashGeneratorScreen() {
	const [userSession] = useThemeContext();
	const theme = themeSelector(userSession);

	const container = {
		width: '100%',
		height: '100%',
		backgroundColor: Colors[theme].background
	};
	const iconContainer = {
		width: '100%',
		height: '90%',
		alignItems: 'center',
		justifyContent: 'center'
	};
	const footerStyle = {
		width: '100%',
		height: '10%',
		alignItems: 'center',
		justifyContent: 'center'
	};

	return (
		<View style={container}>
			<View style={iconContainer}>
				<Image
					source={require('../assets/panda-ui-logo.png')}
					style={{ height: 210, width: 210, resizeMode: 'contain' }}
				/>
			</View>
			<View style={footerStyle}>
				<Image
					source={require('../assets/panda-ui-footer.png')}
					style={{ height: '100%', width: '100%', resizeMode: 'contain', marginBottom: 20 }}
				/>
			</View>
		</View>
	);
}

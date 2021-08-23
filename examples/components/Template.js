import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import StyledText from '../components/StyledText';
import Colors from '../constants/Colors';
import {
	useThemeContext,
	themeSelector
} from '../contexts/ThemeContext';

// Do as much work outside of the `Template` component as possible

const Template = (props) => {
	const navigation = useNavigation();
	const [userSession] = useThemeContext();
	const theme = themeSelector(userSession);

	useEffect(() => {

	}, []);

	return (
		<View style={styles.container}>
			<StyledText>
				Hello Panda!
			</StyledText>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
export default Template;

import React, { useState } from 'react';
import { View, StyleSheet, LayoutAnimation, UIManager, Platform, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import Button from './Button';

// get screen height
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const DEFAULT_WIDTH = 200;

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
	UIManager.setLayoutAnimationEnabledExperimental(true);
}

function DrawerComponent(props) {
	const { children, width, SideBar, buttonBackgroundColor, buttonColor, buttonLabel, buttonPosition } = props;
	const [menuToggle, setMenuToggle] = useState(false);

	const CURRENT_WIDTH = width || DEFAULT_WIDTH;

	const toggleMenu = () => {
		LayoutAnimation.configureNext(
			LayoutAnimation.create(200, LayoutAnimation.Types.linear, LayoutAnimation.Properties.opacity)
		);
		setMenuToggle(prev => !prev);
	};

	const renderButton = () => {
		return (
			<View style={[styles.buttonContainer, { top: buttonPosition || SCREEN_HEIGHT / 3 }]}>
				<Button
					label={buttonLabel || '>'}
					onPress={toggleMenu}
					textColor={buttonBackgroundColor || 'salmon'}
					color={buttonColor || 'black'}
				/>
			</View>
		);
	};

	// caculate width in percentage
	const SIDEBAR_WIDTH_PERCENTAGE = `${(1 - (CURRENT_WIDTH / SCREEN_WIDTH)) * 100}%`;
	const SIDEBAR_WIDTH_SCALE = 1 - CURRENT_WIDTH / SCREEN_WIDTH;

	// console.log(`SIDEBAR_WIDTH_SCALE ${SIDEBAR_WIDTH_SCALE}`);

	return (
		<View style={styles.container}>
			{menuToggle && <SideBar visible={menuToggle} />}
			<View style={{width: menuToggle ? SIDEBAR_WIDTH_PERCENTAGE : '100%'}}>
				{children}
				{renderButton()}
			</View>
		</View>
	);
}

// <View style={{width: menuToggle ? SIDEBAR_WIDTH_PERCENTAGE : '100%'}}>
// <View style={{width: '100%', transform: [{ scaleX: menuToggle ? SIDEBAR_WIDTH_SCALE : 1 }]}}>

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'flex-start'
	},
	buttonContainer: {
		position: 'absolute',
		left: 0
	}
});

DrawerComponent.propTypes = {
	children: PropTypes.element.isRequired,
	SideBar: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.func
	]).isRequired,
	buttonBackgroundColor: PropTypes.string,
	buttonColor: PropTypes.string,
	buttonLabel: PropTypes.string,
	buttonPosition: PropTypes.number,
};

export default DrawerComponent;

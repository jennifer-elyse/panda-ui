import React, { useState } from 'react';
import { View, StyleSheet, LayoutAnimation, UIManager, Platform, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import Button from './Button';

// get screen height
const SCREEN_HEIGHT = Dimensions.get('window').height;

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
	UIManager.setLayoutAnimationEnabledExperimental(true);
}

function DrawerComponent(props) {
	const { children, SideBar, buttonBackgroundColor, buttonColor, buttonLabel, buttonPosition } = props;
	const [menuToggle, setMenuToggle] = useState(false);

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

	return (
		<View style={styles.container}>
			{menuToggle && <SideBar visible={menuToggle} />}
			<View>
				{children}
				{renderButton()}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row'
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

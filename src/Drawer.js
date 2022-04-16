import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { withAnchorPoint } from 'react-native-anchor-point';
import Button from './Button';
import PropTypes from 'prop-types';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const DEFAULT_WIDTH = 200;

function DrawerComponent(props) {
	const { children, width, SideBar, buttonBackgroundColor, buttonColor, buttonLabel, buttonPosition } = props;
	const [menuToggle, setMenuToggle] = useState(false);

	const SIDEBAR_WIDTH = width || DEFAULT_WIDTH;
	const MAIN_WIDTH = SCREEN_WIDTH - (width || DEFAULT_WIDTH);

	const SIDEBAR_WIDTH_SCALE = 1 - SIDEBAR_WIDTH / SCREEN_WIDTH + 0.011;

	const scaleValue = useRef(new Animated.Value(1)).current;

	const getTransform = () => {
		let transform = {
			transform: [{ scaleX: scaleValue }]
		};
		return withAnchorPoint(transform, { x: 1, y: 0.5 }, { width: MAIN_WIDTH, height: SCREEN_HEIGHT });
	};

	const toggleMenu = () => {
		Animated.timing(scaleValue, {
			toValue: menuToggle ? 1 : SIDEBAR_WIDTH_SCALE,
			useNativeDriver: true,
			duration: 100
		}).start();
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
			{menuToggle && (
				<View style={{ width: SIDEBAR_WIDTH, position: 'absolute' }}>
					<SideBar visible={menuToggle} />
				</View>
			)}
			<Animated.View style={[getTransform()]}>
				{children}
				{renderButton()}
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		width: '100%'
	},
	buttonContainer: {
		position: 'absolute',
		left: 0
	}
});

DrawerComponent.propTypes = {
	children: PropTypes.element.isRequired,
	SideBar: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
	buttonBackgroundColor: PropTypes.string,
	buttonColor: PropTypes.string,
	buttonLabel: PropTypes.string,
	buttonPosition: PropTypes.number,
	width: PropTypes.number
};

export default DrawerComponent;

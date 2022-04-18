import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { withAnchorPoint } from 'react-native-anchor-point';
import Button from './Button';
import PropTypes from 'prop-types';

const DEVICE_SCREEN_HEIGHT = Dimensions.get('window').height;
const DEVICE_SCREEN_WIDTH = Dimensions.get('window').width;
const DEFAULT_SIDEBAR_WIDTH = 200;

function DrawerComponent(props) {
	const { children, squeeze, screenWidth, width, SideBar, buttonBackgroundColor, buttonColor, buttonLabel, buttonPosition } = props;
	const [menuToggle, setMenuToggle] = useState(false);

	const SIDEBAR_WIDTH = width || DEFAULT_SIDEBAR_WIDTH;
	const SCREEN_WIDTH = screenWidth || DEVICE_SCREEN_WIDTH;
	const MAIN_WIDTH = screenWidth || SCREEN_WIDTH - (width || DEFAULT_SIDEBAR_WIDTH);

	const SIDEBAR_WIDTH_SCALE = 1 - SIDEBAR_WIDTH / SCREEN_WIDTH;

	const scaleValue = useRef(new Animated.Value(1)).current;
	const translateValue = useRef(new Animated.Value(0)).current;

	const getTransform = () => {
		if (squeeze) {
			let transform = {
				transform: [{ scaleX: scaleValue }]
			};
			return withAnchorPoint(transform, { x: 1, y: 0.5 }, { width: MAIN_WIDTH, height: DEVICE_SCREEN_HEIGHT });
		} else {
			return {
				transform: [{translateX: translateValue}]
			};
		}
	};

	const toggleMenu = () => {
		if (squeeze) {
			Animated.timing(scaleValue, {
				toValue: menuToggle ? 1 : SIDEBAR_WIDTH_SCALE,
				useNativeDriver: true,
				duration: 100
			}).start();
		} else {
			Animated.timing(translateValue, {
				toValue: menuToggle ? 0 : SIDEBAR_WIDTH,
				useNativeDriver: true,
				duration: 100
			}).start();
		}
		setMenuToggle(prev => !prev);
	};

	const renderButton = () => {
		return (
			<View style={[styles.buttonContainer, { top: buttonPosition || DEVICE_SCREEN_HEIGHT / 3 }]}>
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
		<View style={[styles.container, {width: SCREEN_WIDTH}]}>
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
		flexDirection: 'row'
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
	width: PropTypes.number,
	screenWidth: PropTypes.number,
	squeeze: PropTypes.bool
};

export default DrawerComponent;

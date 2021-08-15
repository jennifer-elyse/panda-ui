import React from 'react';
import PropTypes from 'prop-types';
import {
	StyleSheet,
	View,
	TouchableOpacity
} from 'react-native';

const Card = (props) => {
	const {
		borderRadius=0,
		borderTopLeftRadius=borderRadius,
		borderTopRightRadius=borderRadius,
		borderBottomLeftRadius=borderRadius,
		borderBottomRightRadius=borderRadius,
		width,
		height,
		elevation=2,
		onPress,
		backgroundColor='#efefef',
		style,
		// enableBlur,
		children
	} = props;

	const componentStyle = [
		{
			borderRadius,
			borderTopLeftRadius,
			borderTopRightRadius,
			borderBottomLeftRadius,
			borderBottomRightRadius,
			elevation,
			width: width,
			height: height,
			overflow: 'visible',
			backgroundColor: backgroundColor,
			// backgroundColor: enableBlur ? `rgba(${backgroundColor}, 0.85)` : backgroundColor,
			...style
		},
		styles.containerShadow
	];

	// const convertHexToRgba = () => {

	// }

	return (
		onPress ?
			(
				<TouchableOpacity
					{...props}
					onPress={() => onPress()}
					style={componentStyle}
				>
					{children}
				</TouchableOpacity>
			)
			:
			(
				<View
					{...props}
					style={componentStyle}
				>
					{children}
				</View>
			)
	);
};

const styles = StyleSheet.create({
	containerShadow: {
		shadowColor: '#333',
		shadowOpacity: 0.25,
		shadowRadius: 12,
		shadowOffset: { height: 5, width: 0 }
	}
});

Card.propTypes = {
	onPress: PropTypes.func,
	borderRadius: PropTypes.number,
	borderTopLeftRadius: PropTypes.number,
	borderTopRightRadius: PropTypes.number,
	borderBottomLeftRadius: PropTypes.number,
	borderBottomRightRadius: PropTypes.number,
	width: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	height: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	backgroundColor: PropTypes.string,
	elevation: PropTypes.number,
	style: PropTypes.object,
	children: PropTypes.element.isRequired
};

export default Card;

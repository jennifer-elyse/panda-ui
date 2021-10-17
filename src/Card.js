import React from 'react';
import PropTypes from 'prop-types';
import {
	View,
	TouchableOpacity
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

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
		backgroundColor='transparent',
		cardGradient,
		style,
		// enableBlur,
		children
	} = props;

	const containerStyle = {
		borderRadius,
		borderTopLeftRadius,
		borderTopRightRadius,
		borderBottomLeftRadius,
		borderBottomRightRadius,
		elevation,
		width: width,
		height: height,
		overflow: cardGradient && cardGradient.length > 1 ?  'hidden' : 'visible',
		backgroundColor: backgroundColor,
		shadowColor: '#333',
		shadowOpacity: 0.25,
		shadowRadius: 12,
		shadowOffset: { height: 5, width: 0 }
		// backgroundColor: enableBlur ? `rgba(${backgroundColor}, 0.85)` : backgroundColor,
	};

	const componentStyle = {
		borderRadius,
		borderTopLeftRadius,
		borderTopRightRadius,
		borderBottomLeftRadius,
		borderBottomRightRadius,
		elevation,
		width: width,
		height: height,
		overflow: 'visible',
		shadowColor: '#333',
		shadowOpacity: 0.25,
		shadowRadius: 12,
		shadowOffset: { height: 5, width: 0 },
		...style
	};

	// const convertHexToRgba = () => {

	// }

	const hasGradient = cardGradient && cardGradient.length > 1;

	const contents = hasGradient ? (
		<LinearGradient
			colors={cardGradient}
			start={[0, 0]}
			end={[1, 1]}
			width="100%"
			height="100%"
			style={componentStyle}
		>
			{children}
		</LinearGradient>
	) : (
		children
	);

	// key={String(hasGradient) causes the parent to unmount and remount
	// which is necessary because there appears to be an issue with  the
	// React reconciler swapping out the LinearGradient component with
	// other elements. This has to be an issue with the LinearGradient
	// component, maybe this will be fixed in the future and the "magic"
	// key prop can be removed

	return (
		onPress ? (
			<TouchableOpacity
				{...props}
				onPress={() => onPress()}
				style={hasGradient ? containerStyle : componentStyle}
				key={String(hasGradient)}
			>
				{contents}
			</TouchableOpacity>
		) : (
			<View
				{...props}
				style={hasGradient ? containerStyle : componentStyle}
				key={String(hasGradient)}
			>
				{contents}
			</View>
		)
	);
};

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
	cardGradient: PropTypes.array,
	elevation: PropTypes.number,
	style: PropTypes.object,
	children: PropTypes.element.isRequired
};

export default Card;

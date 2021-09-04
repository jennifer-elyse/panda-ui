import React from 'react';
import PropTypes from 'prop-types';
import {
	StyleSheet,
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
		overflow: cardGradient ?  'hidden' : 'visible',
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

	return (
		onPress ?
			(
				cardGradient ?
					(<TouchableOpacity
						{...props}
						onPress={() => onPress()}
						style={containerStyle}
					>
						<LinearGradient
							colors={cardGradient}
							start={[0, 0]}
							end={[1, 10]}
							width="100%"
							height="100%"
							style={componentStyle}
						>
							{children}
						</LinearGradient>
					</TouchableOpacity>
					)
					:
					(<TouchableOpacity
						{...props}
						onPress={() => onPress()}
						style={componentStyle}
					>
						{children}
					</TouchableOpacity>
					)
			)
			:
			(
				cardGradient ?
					(
						<View
							{...props}
							style={containerStyle}
						>
							<LinearGradient
								colors={cardGradient}
								start={[0, 0]}
								end={[1, 10]}
								width="100%"
								height="100%"
								style={componentStyle}
							>
								{children}
							</LinearGradient>
						</View>
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
	elevation: PropTypes.number,
	style: PropTypes.object,
	children: PropTypes.element.isRequired
};

export default Card;

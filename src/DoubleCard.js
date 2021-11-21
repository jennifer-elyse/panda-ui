import React from 'react';
import {
	View
} from 'react-native';
import PropTypes from 'prop-types';

// Panda Imports
import Card from './Card';

const DoubleCard = (props) => {
	const {
		borderRadius=50,
		width='100%',
		height='auto',
		backCardElevation=5,
		cardElevation=8,
		onPress,
		style,
		backCardColor,
		backCardGradient,
		cardColor,
		cardGradient,
		padding=10,
		// enableBlur,
		children
	} = props;

	return (
		<Card
			elevation={backCardElevation}
			borderRadius={borderRadius}
			backgroundColor={backCardColor}
			style={{ padding: padding, alignItems: 'center', justifyContent: 'center' }}
			width={width}
			height={height}
			cardGradient={backCardGradient && backCardGradient.length > 1 ? backCardGradient : []}
		>
			<Card
				elevation={cardElevation}
				borderRadius={Math.max(0, borderRadius - padding)}
				backgroundColor={cardColor}
				style={{ padding: padding }}
				width="100%"
				height="auto"
				onPress={onPress}
				cardGradient={cardGradient && cardGradient.length > 1 ? cardGradient : []}
			>
				<View
					style={{ ...style }}
				>
					{children}
				</View>
			</Card>
		</Card>
	);
};

Card.propTypes = {
	onPress: PropTypes.func,
	borderRadius: PropTypes.number,
	width: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	height: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	cardColor: PropTypes.string,
	backCardColor: PropTypes.string,
	backCardGradient: PropTypes.array,
	padding: PropTypes.number,
	cardElevation: PropTypes.number,
	cardGradient: PropTypes.array,
	backCardElevation: PropTypes.number,
	style: PropTypes.object,
	children: PropTypes.element.isRequired
};

export default DoubleCard;

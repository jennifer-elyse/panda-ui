import React from 'react';
import {
	View
} from 'react-native';

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
				borderRadius={borderRadius - padding}
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

export default DoubleCard;

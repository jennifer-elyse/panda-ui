import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Panda Imports
import {
	Card
} from 'react-native-panda-ui';

const DoubleCard = (props) => {
	const {
		borderRadius=50,
		borderTopLeftRadius=borderRadius,
		borderTopRightRadius=borderRadius,
		borderBottomLeftRadius=borderRadius,
		borderBottomRightRadius=borderRadius,
		width='100%',
		height='100%',
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
			style={{ padding }}
			width={width}
			height={height}
			cardGradient={backCardGradient}
		>
			<Card
				elevation={cardElevation}
				borderRadius={borderRadius - padding}
				backgroundColor={cardColor}
				{...props}
				style={{ ...style, padding }}
				onPress={onPress}
				cardGradient={cardGradient}
			>
				{children}
			</Card>
		</Card>
	);
};

export default DoubleCard;

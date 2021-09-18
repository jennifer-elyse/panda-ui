import React from 'react';
import { StyleSheet, View } from 'react-native';

import PropTypes from 'prop-types';
import chroma from 'chroma-js';

import { Body3 } from './StyledText';
import Button from './Button';


const Chip = (props) => {
	const {
		allowInteraction=true,
		backgroundColor='#fff7f6',
		borderColor='#772d4f',
		containerBorderRadius=50,
		buttonBorderRadius=containerBorderRadius,
		chipBorderRadius=containerBorderRadius,
		chipColor='#772d4f',
		chipTextColor=chroma.contrast(backgroundColor, '#fff') > 5
			? '#fff' : '#000',
		containerStyle,
		deleteIconColor,
		disabled=false,
		disabledColor='lightgrey',
		height,
		icon,
		onPress,
		onPressDelete,
		size='small',
		svg,
		textStyle,
		value
	} = props;

	const styles = StyleSheet.create({
		container: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			padding: 5,
			...containerStyle,
			borderRadius: containerBorderRadius,
			borderColor,
			backgroundColor,
			borderWidth: 1,
			height
		},
		text: {
			padding: 5,
			...textStyle
		}
	});

	return (
		<View style={styles.container}
			key={value}>
			<Button
				icon={icon}
				svg={svg}
				style={{ padding: 15, marginRight: 5, marginLeft: 5 }}
				height={ height > 0 ? height - 10 : size === 'small' ? 20 : size === 'standard' ? 25 : 35 }
				width={ height > 0 ? height - 10 : size === 'small' ? 20 : size === 'standard' ? 25 : 35 }
				solid={false}
				allowInteraction={false}
				size={size}
				disabled={disabled}
				border={false}
				color={chipColor}
				onPress={() => onPress()}
				borderRadius={chipBorderRadius}
				borderColor={borderColor}
				borderWidth={1}
				gradient={[]}
			/>
			<Body3 textColor={chipTextColor} style={styles.text}>
				{value}
			</Body3>
			{ allowInteraction &&
				<Button
					icon="times"
					style={{ marginLeft: 10 }}
					height={ height > 0 ? height - 10 : size === 'small' ? 20 : size === 'standard' ? 25 : 35 }
					width={ height > 0 ? height - 10 : size === 'small' ? 20 : size === 'standard' ? 25 : 35 }
					solid={true}
					allowInteraction={allowInteraction}
					size={size}
					disabled={disabled}
					border={false}
					color={disabled ? disabledColor : deleteIconColor}
					onPress={() => onPressDelete()}
					borderRadius={buttonBorderRadius}
					gradient={[]}
				/>
			}
		</View>
	);
};

Chip.propTypes = {
	allowInteraction: PropTypes.bool,
	backgroundColor: PropTypes.string,
	borderColor: PropTypes.string,
	buttonBorderRadius: PropTypes.number,
	chipBorderRadius: PropTypes.number,
	chipColor: PropTypes.string,
	chipTextColor: PropTypes.string,
	containerBorderRadius: PropTypes.number,
	containerStyle: PropTypes.object,
	deleteIconColor: PropTypes.string,
	disabled: PropTypes.bool,
	disabledColor: PropTypes.string,
	height: PropTypes.number,
	onPress: PropTypes.func,
	onPressDelete: PropTypes.func,
	icon: PropTypes.string,
	size: PropTypes.string,
	svg: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	textStyle: PropTypes.object,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]).isRequired
};

export default Chip;

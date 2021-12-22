import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import Button from './Button';

const ToggleButton = (props) => {
	const {
		options,
		selectedValue,
		onValueChange,
		style,
		// props passed through to <Button>
		disabled,
		disabledColor='lightgrey',
		size,
		height,
		color,
		activeTextColor,
		inactiveTextColor,
		borderRadius=0,
		border=0,
		gradient,
		textElement
	} = props;

	const displayColor = disabled ? disabledColor : color;

	const componentStyle = {
		...style,
		flexDirection: 'row',
		width: 'auto'
	};

	const buttonLeftStyle = {
		flexGrow: 1,
		borderWidth: border,
		borderStyle: 'solid',
		borderTopLeftRadius: borderRadius,
		borderBottomLeftRadius: borderRadius,
		borderColor: displayColor
	};

	const buttonRightStyle = {
		flexGrow: 1,
		borderWidth: border,
		borderLeftWidth: 0,
		borderStyle: 'solid',
		borderTopRightRadius: borderRadius,
		borderBottomRightRadius: borderRadius,
		borderColor: displayColor
	};

	const buttonMiddleStyle = {
		flexGrow: 1,
		borderWidth: border,
		borderStyle: 'solid',
		borderLeftWidth: 0,
		borderRadius: 0,
		borderColor: displayColor
	};

	return (
		<View style={componentStyle}>
			{options.map((option, i) => {
				const selected = option.value === selectedValue;
				return (
					<Button
						icon={option.icon}
						label={option.label}
						svg={option.svg}
						transparent={!selected}
						allowInteraction={!selected}
						width="0%"
						size={size}
						height={height}
						disabled={disabled}
						border={false}
						color={color}
						textColor={!selected ? inactiveTextColor : activeTextColor}
						style={i === 0
							? buttonLeftStyle
							: i === options.length - 1 ? buttonRightStyle : buttonMiddleStyle
						}
						onPress={() => onValueChange(option.value)}
						key={option.value}
						gradient={gradient}
						textElement={textElement}
					/>
				);
			})}
		</View>
	);
};

export default ToggleButton;

ToggleButton.propTypes = {
	options: PropTypes.arrayOf(PropTypes.shape({
		value: PropTypes.any.isRequired,
		label: PropTypes.string,
		icon: PropTypes.string
	})).isRequired,
	height: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	selectedColor: PropTypes.string,
	disabledColor: PropTypes.string,
	selectedValue: PropTypes.any.isRequired,
	onValueChange: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	size: PropTypes.oneOf(['small', 'standard', 'large']),
	color: PropTypes.string,
	inactiveTextColor: PropTypes.string,
	activeTextColor: PropTypes.string,
	style: PropTypes.object,
	borderRadius: PropTypes.number,
	border: PropTypes.number,
	gradient: PropTypes.array,
	textElement: PropTypes.object
};

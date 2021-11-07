import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';

import Button from './Button';



const TabGroup = (props) => {
	const {
		options,
		width,
		selectedValue,
		onValueChange,
		style,
		// props passed through to <Button>
		buttonStyle,
		disabled,
		disabledColor='lightgrey',
		size,
		height,
		color,
		textColor
	} = props;

	const displayColor = disabled ? disabledColor : color;

	const componentStyle = {
		...style,
		flexDirection: 'row',
		paddingHorizontal: 2.5,
		width: width
	};

	const selectedStyle = {
		borderBottomWidth: 1,
		borderBottomColor: displayColor
	};

	const buttonLeftStyle = {
		...buttonStyle,
		paddingHorizontal: 2.5,
		flexGrow: 1
	};
	const buttonNotLeftStyle = {
		...buttonLeftStyle,
		borderLeftWidth: 0
	};

	const buttonSelectedLeftStyle = {
		...buttonLeftStyle,
		...selectedStyle,
		flexGrow: 1
	};
	const buttonSelectedNotLeftStyle = {
		...buttonNotLeftStyle,
		...selectedStyle,
		flexGrow: 1
	};


	return (
		<View
			style={componentStyle}
		>
			<ScrollView
				horizontal={true}
				contentContainerStyle={{ flexGrow: 1, height: height, padding: 0, alignItems: 'space-between' }}
			>
				{options.map((option, i) => {
					const selected = option.value === selectedValue;
					return (
						<Button
							icon={option.icon}
							label={option.label}
							transparent={true}
							allowInteraction={!selected}
							size={size}
							height={height}
							disabled={disabled}
							border={false}
							color={color}
							textColor={textColor}
							style={i === 0
								? selected ? buttonSelectedLeftStyle : buttonLeftStyle
								: selected ? buttonSelectedNotLeftStyle : buttonNotLeftStyle}
							onPress={() => onValueChange(option.value)}
							key={option.value}
							gradient={[]}
						/>
					);
				})}
			</ScrollView>
		</View>
	);
};

export default TabGroup;

TabGroup.propTypes = {
	options: PropTypes.arrayOf(PropTypes.shape({
		value: PropTypes.any.isRequired,
		label: PropTypes.string,
		icon: PropTypes.string
	})).isRequired,
	width: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]).isRequired,
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
	textColor: PropTypes.string,
	style: PropTypes.object,
	buttonStyle: PropTypes.object,
	theme: PropTypes.string
};

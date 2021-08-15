import React from 'react';
import { CheckBox as RNECheckBox } from 'react-native-elements';
import PropTypes from 'prop-types';


const CheckBox = (props) => {
	const {
		containerStyle,
		textStyle,
		disabled,
		backgroundColor = 'darkgrey',
		disabledColor = 'lightgrey',
		textColor = '#000000',
		checkedColor = '#772d4f',
		backgroundBorderRadius = 50,
		checked,
		...otherProps
	} = props;

	const mergedContainerStyle = {
		backgroundColor: backgroundColor,
		borderWidth: 0,
		minHeight: 40,
		borderRadius: backgroundBorderRadius,
		...containerStyle
	};
	const mergedTextStyle = {
		color: disabled ? disabledColor : textColor,
		...textStyle
	};
	return (
		<RNECheckBox
			containerStyle={mergedContainerStyle}
			uncheckedColor={disabled ? disabledColor : textColor}
			checkedColor={checkedColor}
			textStyle={mergedTextStyle}
			checked={checked}
			{...otherProps}
		/>
	);
};

CheckBox.propTypes = {
	containerStyle: PropTypes.object,
	textStyle: PropTypes.string,
	disabled: PropTypes.bool,
	backgroundColor: PropTypes.string,
	disabledColor: PropTypes.string,
	textColor: PropTypes.string,
	checkedColor: PropTypes.string,
	checked: PropTypes.bool,
	backgroundBorderRadius: PropTypes.number
};

export default CheckBox;

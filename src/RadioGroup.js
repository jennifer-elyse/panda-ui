import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import invariant from './utils/invariant';
// Import sibling common components directly to avoid circular dependencies.
import CheckBox from './CheckBox';

const RadioGroup = ({ options, value, onChange, disabled, style,
	backgroundColor, disabledColor, textColor, checkedColor,
	checkBoxContainerStyle, containerStyle, checkBoxBackgroundBorderRadius }) => {

	invariant(Array.isArray(options), `RadioGroup expected an array for the 'options' prop, but instead got type "${typeof options}"`);

	return (
		<View style={containerStyle}>
			{options.map((option) => {
				const checked = value === option.value;
				return (
					<CheckBox
						key={option.value}
						title={option.label}
						containerStyle={checkBoxContainerStyle, { minHeight: 45 }}
						onPress={() => {
							if (!disabled && !checked) {
								onChange(option.value);
							}
						}}
						disabled={disabled}
						checked={checked}
						checkedIcon={'dot-circle-o'}
						uncheckedIcon={'circle-o'}
						backgroundColor={backgroundColor}
						disabledColor={disabledColor}
						textColor={textColor}
						checkedColor={checkedColor}
						backgroundBorderRadius={checkBoxBackgroundBorderRadius}
					/>
				);
			})}
		</View>
	);
};

RadioGroup.propTypes = {
	options: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired
	})).isRequired,
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	style: PropTypes.object,
	backgroundColor: PropTypes.string,
	disabledColor: PropTypes.string,
	textColor: PropTypes.string,
	checkedColor: PropTypes.string,
	checkBoxContainerStyle: PropTypes.object,
	containerStyle: PropTypes.object,
	checkBoxBackgroundBorderRadius: PropTypes.number
};

export default RadioGroup;

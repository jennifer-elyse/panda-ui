import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import invariant from './utils/invariant';
// Import sibling common components directly to avoid circular dependencies.
import CheckBox from './CheckBox';

const CheckBoxGroup = ({ options, value, onChange, disabled, style,
	backgroundColor, disabledColor, textColor, checkedColor,
	checkBoxContainerStyle, containerStyle, checkBoxBackgroundBorderRadius }) => {

	invariant(Array.isArray(options), `CheckBoxGroup expected an array for the 'options' prop, but instead got type "${typeof options}"`);

	let disableRest = false;
	value = value || [];

	return (
		<View style={containerStyle}>
			{options.map((option) => {
				const checked = value.includes(option.value);
				const mutuallyExclusive = option.mutuallyExclusive === 'Y' ? true : false;
				disableRest = disableRest || (checked && mutuallyExclusive);
				return (
					<CheckBox
						key={option.value}
						title={option.label}
						containerStyle={checkBoxContainerStyle, { minHeight: 45 }}
						onPress={() => {
							if ((!mutuallyExclusive && disableRest) || checked) {
								onChange(value.filter(v => v !== option.value));
							} else {
								onChange([...value, option.value]);
							}
						}}
						disabled={disableRest}
						checked={(mutuallyExclusive || !disableRest) && checked}
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

CheckBoxGroup.propTypes = {
	options: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired
	})).isRequired,
	value: PropTypes.arrayOf(PropTypes.any),
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

export default CheckBoxGroup;

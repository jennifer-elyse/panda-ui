import React from 'react';
import {
	StyleSheet,
	View
} from 'react-native';
import PropTypes from 'prop-types';

import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome5';
import chroma from 'chroma-js';
import { StyledText } from 'react-native-panda-ui';

const StyledSelect = (props) => {
	const {
		items,
		label,
		value,
		meta,
		onValueChange,
		enabled=true,
		selectedValue,
		width,
		input,
		rest,
		separatorColor,
		validationErrorColor='#9c1717',
		backgroundColor='#fff'
	} = props;

	const RNPickerWrapper = {
		fontFamily: 'DMSans-Regular',
		borderBottomWidth: separatorColor ? 1 : 0,
		borderBottomColor: separatorColor,
		overflow: 'hidden',
		width: width,
		justifyContent: 'center',
		alignItems: 'flex-start'
	};
	const RNPickerWrapperFailedValidation = {
		...RNPickerWrapper,
		borderBottomColor: validationErrorColor
	};

	const placeholderColor =
		chroma.contrast(backgroundColor, '#fff') > 5
			? '#fff' : '#000';

	const pickerSelectStyles = StyleSheet.create({
		inputIOS: {
			paddingHorizontal: 5,
			maxWidth: 250,
			height: 20,
			marginLeft: 10,
			marginBottom: 10,
			color: placeholderColor,
			paddingRight: 15 // to ensure the text is never behind the icon
		},
		inputAndroid: {
			paddingHorizontal: 10,
			maxWidth: 250,
			height: 20,
			// marginLeft: -10,
			marginBottom: 12,
			color: placeholderColor,
			paddingRight: 15, // to ensure the text is never behind the icon
			transform: [
				{ scaleX: 0.8 },
				{ scaleY: 0.8 }]
		}
	});

	return (
		<View style={ meta && meta.error && meta.touched ? RNPickerWrapperFailedValidation : RNPickerWrapper }>
			<StyledText.default style={{ color: placeholderColor, fontSize: 12, marginBottom: -5, marginLeft: 3 }}>{label}</StyledText.default>
			<RNPickerSelect
				{...input}
				{...rest}
				enabled={enabled}
				items={items && items.map((item, i) => {
					return {
						label: item.label,
						value: item.value,
						key: i
					};})
				}
				placeholder={{
					label: 'Select',
					value: null
				}}
				placeholderTextColor={placeholderColor}
				selectedValue={selectedValue}
				value={value}
				onValueChange={onValueChange}
				style={{
					placeholder: {
						color: placeholderColor
					},
					...pickerSelectStyles
				}}
				Icon={() => {
					return <View><Icon name="caret-down" size={16} color={placeholderColor} style={{ paddingRight: 15, top: 4 }} /></View>;
				}}
			/>
		</View>
	);
};
export default StyledSelect;

StyledSelect.propTypes = {
	items: PropTypes.array,
	label: PropTypes.string,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	meta: PropTypes.any,
	onValueChange: PropTypes.func.isRequired,
	enabled: PropTypes.bool,
	selectedValue: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	width: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	input: PropTypes.any,
	rest: PropTypes.any,
	separatorColor: PropTypes.string,
	validationErrorColor: PropTypes.string,
	backgroundColor: PropTypes.string.isRequired
};

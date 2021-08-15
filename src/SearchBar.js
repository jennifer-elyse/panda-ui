import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	Platform,
	StyleSheet
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import Button from './Button';

const SearchBar = ({ columns, data, onSubmit, backgroundColor='#efefef',
	borderColor='#772d4f', borderRadius=50, borderWidth=1, buttonColor='#772d4f',
	buttonTextColor='#772d4f', containerStyle, pickerBorderColor='#772d4f',
	pickerText='#772d4f'
	 }) => {

	const [searchType, setSearchType] = useState('');
	const [showSearchValues, setShowSearchValues] = useState(false);
	const [showButton, setShowButton] = useState(false);
	const [value, setValue] = useState('');

	const searchItems = useMemo(() => {
		let result = [];
		let values = [];
		if (data && columns && searchType) {
			values = data.map(item => {
				return item[searchType];
			});
		}

		// remove duplicates
		values = [...new Set(values)];
		// filter out falsy values.
		result = values.filter(Boolean);
		result = result.map(item => {
			return  { label: String(item), value: String(item) };
		});

		return result;
	}, [data, columns, searchType]);


	const handleSubmit = () => {
		return onSubmit(value, searchType);
	};


	const styles = StyleSheet.create({
		hiddenStyle: {
			display: 'none'
		},
		displayStyle: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: borderRadius
		},
		displayButtonStyle: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			marginRight: 10,
			marginTop: Platform.OS === 'ios' ? 0 : 10
		}
	});

	const pickerSelectStyles = StyleSheet.create({
		inputIOS: {
			color: pickerText,
			backgroundColor: backgroundColor,
			paddingRight: 30 // to ensure the text is never behind the icon
		},
		inputAndroid: {
			paddingHorizontal: 10,
			paddingVertical: 8,
			borderWidth: 0.5,
			borderColor: pickerBorderColor,
			borderRadius: borderRadius,
			color: pickerText,
			paddingRight: 30 // to ensure the text is never behind the icon
		}
	});

	return (
		<View
			style={{
				paddingHorizontal: borderRadius > 5 ? 20 : 5,
				paddingVertical: borderRadius > 5 ? 20 : 10,
				width: '100%',
				minWidth: '90%',
				borderWidth: borderWidth,
				borderStyle: 'solid',
				borderColor: borderColor,
				borderRadius: borderRadius,
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			<View style={{ flexDirection: 'row', containerStyle, alignItems: 'center', justifyContent: 'center' }}>
				<View style={{ marginRight: 4 }}>
					<RNPickerSelect
						placeholder={{
							label: 'Search by...',
							color: pickerText,
							value: '',
							fontWeight: 'bold'
						}}
						onValueChange={(itemValue, itemIndex) => {
							setSearchType(itemValue);
							setShowSearchValues(true);
						}}
						items={columns}
						value={searchType}
						style={{
							...pickerSelectStyles,
							placeholder: {
								color: pickerText,
								fontSize: 14,
								fontWeight: 'bold'
							}
						}}
					/>
				</View>
				<View style={showSearchValues ? styles.displayStyle : styles.hiddenStyle}>
					<RNPickerSelect
						placeholder={{
							label: 'Select value...',
							value: '',
							color: pickerText
						}}
						onValueChange={(itemValue, itemIndex) => {
							setShowButton(true);
							setValue(itemValue);
						}}
						items={searchItems}
						style={{
							...pickerSelectStyles,
							placeholder: {
								color: pickerText,
								fontSize: 14,
								fontWeight: 'bold'
							}
						}}
					/>
				</View>
				<View style={showButton ? styles.displayButtonStyle : styles.hiddenStyle}>
					<Button
						onPress={() => handleSubmit()}
						label="GO"
						style={{ paddingHorizontal: 10 }}
						solid={false}
						borderWidth={1}
						color={buttonColor}
						textColor={buttonTextColor}
						borderRadius={borderRadius}
					/>
				</View>
			</View>
		</View>
	);
};

SearchBar.propTypes = {
	columns: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.any.isRequired,
		// Node can be string, React element, or anything renderable.
		value: PropTypes.node.isRequired
	})),
	data: PropTypes.array,
	onSubmit: PropTypes.func.isRequired,
	backgroundColor: PropTypes.string,
	pickerText: PropTypes.string,
	buttonTextColor: PropTypes.string,
	borderColor: PropTypes.string,
	borderWidth: PropTypes.number,
	borderRadius: PropTypes.number,
	containerStyle: PropTypes.object
};

export default SearchBar;

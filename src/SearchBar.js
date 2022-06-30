import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	Platform,
	StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import RNPickerSelect from 'react-native-picker-select';

import Button from './Button';

const SearchBar = ({ columns, data, onSubmit, backgroundColor='#efefef',
	borderColor='#772d4f', borderRadius=50, borderWidth=1, buttonColor='#772d4f',
	buttonTextColor='#772d4f', containerStyle, pickerTextColor='#772d4f',
	gradient, caretSize=12, caretColor=backgroundColor }) => {

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
			color: pickerTextColor,
			backgroundColor: backgroundColor,
			paddingRight: 30 // to ensure the text is never behind the icon
		},
		inputAndroid: {
			color: pickerTextColor,
			backgroundColor: backgroundColor,
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
							color: pickerTextColor,
							value: '',
							fontWeight: 'bold'
						}}
						useNativeAndroidPickerStyle={false}
						onValueChange={(itemValue, itemIndex) => {
							setSearchType(itemValue);
							setShowSearchValues(true);
						}}
						items={columns}
						value={searchType}
						style={{
							...pickerSelectStyles,
							placeholder: {
								color: pickerTextColor,
								fontSize: 14,
								fontWeight: 'bold'
							}
						}}
						Icon = {() => {
							return (
								<Icon name="check-circle" size={caretSize}  color={caretColor} />
							);
						}}
					/>
				</View>
				<View style={showSearchValues ? styles.displayStyle : styles.hiddenStyle}>
					<RNPickerSelect
						placeholder={{
							label: 'Select value...',
							value: '',
							color: pickerTextColor
						}}
						useNativeAndroidPickerStyle={false}
						onValueChange={(itemValue, itemIndex) => {
							setShowButton(true);
							setValue(itemValue);
						}}
						items={searchItems}
						style={{
							...pickerSelectStyles,
							placeholder: {
								color: pickerTextColor,
								fontSize: 14,
								fontWeight: 'bold'
							}
						}}
						Icon = {() => {
							return (
								<Icon name="check-circle" size={caretSize}  color={caretColor} />
							);
						}}
					/>
				</View>
				<View style={showButton ? styles.displayButtonStyle : styles.hiddenStyle}>
					<Button
						onPress={() => handleSubmit()}
						label="SEARCH"
						style={{ paddingHorizontal: 10 }}
						transparent={true}
						borderWidth={1}
						color={buttonColor}
						textColor={buttonTextColor}
						borderRadius={borderRadius}
						gradient={gradient}
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
	pickerTextColor: PropTypes.string,
	buttonColor: PropTypes.string,
	buttonTextColor: PropTypes.string,
	borderColor: PropTypes.string,
	borderWidth: PropTypes.number,
	borderRadius: PropTypes.number,
	caretSize: PropTypes.number,
	caretColor: PropTypes.string,
	containerStyle: PropTypes.object,
	gradient: PropTypes.array
};

export default SearchBar;

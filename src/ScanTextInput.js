import React, { useState, useRef, useEffect } from 'react';
import {
	View,
	StyleSheet,
	Keyboard,
	Platform,
	Text,
	TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';

import TextInput from './TextInput';


const ScanTextInput = (props) => {
	const {
		style,
		onSubmit,
		isFocused,
		autoFocus=true,
		showBarCodeIcon=false,
		validate=false,
		overrideValue,
		clearOnSubmit=true,
		borderRadius=4,
		placeholderTextColor='lightgrey',
		textElement,
		width,
		...inputProps
	} = props;

	const [value, setValue] = useState('');
	const [showKeyboard, setShowKeyboard] = useState(true);
	const [validated, setValidated] = useState(!validate);

	let _textInput = useRef(null);
	const inputStyle = {
		width: '100%',
		height: 50,
		borderWidth: 1,
		...style,
		borderRadius: borderRadius
	};

	const handleSubmit = () => {
		clearOnSubmit && validated && setValue('');
		return validated && onSubmit(value);
	};

	const setFocus = () => {
		_textInput.current.focus();
		setShowKeyboard(true);
	};

	const setBlur = () => {
		Keyboard.dismiss();
		setShowKeyboard(false);
	};

	useEffect(() => {
		if (overrideValue) {
			setValue(overrideValue);
		}
	}, [overrideValue]);

	useEffect(() => {
		if (isFocused && autoFocus) {
			setFocus(true);
		}
	}, [isFocused, setFocus, autoFocus]);


	const styles = StyleSheet.create({
		container: {
			width: width ? width : '100%',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			flexWrap: 'nowrap',
			marginLeft: 20,
			marginRight: 20,
			minHeight: 10
		},
		keyboardIcon: {
			padding: 12,
			marginLeft: 8
		}
	});

	return (
		<View style={styles.container}>
			{textElement}
			<TextInput
				style={inputStyle}
				disableFullscreenUI
				returnKeyType="go"
				{...inputProps}
				setValidated={setValidated}
				onFocus={() => setShowKeyboard(true)}
				onBlur={() => setShowKeyboard(false)}
				blurOnSubmit={false}
				placeholderTextColor={placeholderTextColor}
				ref={_textInput}
				value={value}
				onChangeText={text => setValue(text)}
				keyboardType={showKeyboard ? inputProps.keyboardType : undefined}
				autoFocus={showKeyboard}
				showSoftInputOnFocus={showKeyboard}
				onSubmitEditing={handleSubmit}
				onKeyPress={event => {
					if (event.nativeEvent.key === 'Enter' && validated) {
						handleSubmit();
					}
				}}
			/>
			{
				showBarCodeIcon && <Icon
					name="barcode"
					size={20}
					color={'grey'}
					style={{ position: 'absolute', right: 50 }}
				/>
			}{
				Platform.OS === 'ios' &&
				<TouchableOpacity onPress={showKeyboard ? setBlur : setFocus} style={styles.keyboardIcon}>
					<Icon name="keyboard" size={20} color={showKeyboard ? 'green' : 'grey'} />
				</TouchableOpacity>
			}
		</View>
	);
};

export default ScanTextInput;


ScanTextInput.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	style: PropTypes.object,
	overrideValue: PropTypes.any,
	clearOnSubmit: PropTypes.bool,
	borderRadius: PropTypes.number,
	placeholderTextColor: PropTypes.string,
	inputProps: PropTypes.object,
	textElement: PropTypes.object,
	isFocused: PropTypes.bool,
	autoFocus: PropTypes.bool,
	showBarCodeIcon: PropTypes.bool,
	validate: PropTypes.bool
};

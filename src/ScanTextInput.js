import React, { useState, useRef, useEffect } from 'react';
import {
	Text,
	View,
	TextInput,
	StyleSheet,
	Keyboard,
	Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';

const ScanTextInput = (props) => {
	const {
		style,
		onSubmit,
		overrideValue,
		clearOnSubmit=true,
		borderRadius=4,
		inputTextLineColor='#2eb1bf',
		inputColor='#ffffff',
		placeholderTextColor='lightgrey',
		...inputProps
	} = props;
	const [value, setValue] = useState('');
	const [showKeyboard, setShowKeyboard] = useState(true);
	let _textInput = useRef();
	const inputStyle = {
		width: '100%',
		...style,
		height: 50,
		paddingLeft: 10,
		borderBottomWidth: 1,
		borderRadius: borderRadius,
		borderBottomColor: inputTextLineColor,
		backgroundColor: inputColor
	};

	const handleSubmit = () => {
		clearOnSubmit && setValue('');
		return onSubmit(value);
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


	return (
		<View style={styles.container}>
			<TextInput
				style={inputStyle}
				disableFullscreenUI
				returnKeyType="go"
				{...inputProps}
				// onFocus={() => setShowKeyboard(true)}
				// onBlur={() => setShowKeyboard(false)}
				blurOnSubmit={false}
				placeholderTextColor={placeholderTextColor}
				ref={_textInput}
				value={value}
				onChangeText={text => setValue(text)}
				keyboardType={showKeyboard ? inputProps.keyboardType : undefined}
				// autoFocus={showKeyboard}
				// showSoftInputOnFocus={showKeyboard}
				onSubmitEditing={handleSubmit}
				onKeyPress={event => {
					if (event.nativeEvent.key === 'Enter') {
						handleSubmit();
					}
				}}
			/>
			<Icon
				name="barcode"
				size={20}
				color={'grey'}
				style={{ position: 'absolute', right: 50 }}
			/>
			{
				Platform.OS === 'ios' &&
				<Text onPress={showKeyboard ? setBlur : setFocus} style={styles.keyboardIcon}>
					<Icon name="keyboard" size={20} color={showKeyboard ? 'green' : 'grey'} />
				</Text>
			}
		</View>
	);
};

export default ScanTextInput;


const styles = StyleSheet.create({
	container: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		flexWrap: 'nowrap',
		marginLeft: 20,
		marginRight: 20
	},
	keyboardIcon: {
		padding: 12,
		marginLeft: 8
	}
});

ScanTextInput.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	style: PropTypes.object,
	overrideValue: PropTypes.any,
	clearOnSubmit: PropTypes.bool,
	borderRadius: PropTypes.number,
	inputTextLineColor: PropTypes.string.isRequired,
	inputColor: PropTypes.string.isRequired,
	placeholderTextColor: PropTypes.string.isRequired,
	inputProps: PropTypes.object
};

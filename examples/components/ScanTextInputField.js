import React, { useState } from 'react';
import {
	StyleSheet,
	View
} from 'react-native';

import { ScanTextInput } from 'react-native-panda-ui';

import StyledText from '../components/StyledText';
import Colors from '../constants/Colors';
import {
	useThemeContext,
	themeSelector
} from '../contexts/ThemeContext';


export default function ScanTextInputField(props) {
	const [themeContext] = useThemeContext();
	const theme = themeSelector(themeContext);
	const [value, setValue] 	= useState('');

	const {
		label,
		isRequired=true,
		flexGrow,
		width,
		placeholder,
		showRequired=true,
		onSubmit,
		style,
		// come from react-final-form
		input,
		meta
	} = props;

	const inputStyle = {
		height: '100%',
		marginBottom: 5,
		paddingLeft: -5,
		paddingRight: 44,
		marginLeft: 10,
		borderColor: Colors[theme].inputTextLineColor,
		borderStyle: 'solid',
		borderBottomWidth: 1,
		...style
	};
	const failedValidation = {
		height: 35,
		marginBottom: 5,
		paddingLeft: -5,
		paddingRight: 44,
		marginLeft: 10,
		backgroundColor: Colors[theme].backgroundColor,
		borderColor: Colors[theme].reportIncident,
		borderStyle: 'solid',
		borderBottomWidth: 1
	};
	const inputFor = {
		textAlign: 'left',
		color: Colors[theme].plainTextColor,
		marginLeft: 7
	};
	const inputForFailed = {
		textAlign: 'left',
		paddingHorizontal: 5,
		color: Colors[theme].reportIncident,
		marginLeft: 7
	};
	const row = {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingVertical: 5,
		width: width,
		flexGrow: 1
	};

	return (
		<View style={row}>
			<View style={[styles.column, { flexGrow: flexGrow, flexShrink: 0 }]}>
				{ label &&
					<StyledText style={meta.error && meta.touched ? inputForFailed : inputFor}>
						{label} { isRequired && showRequired ? '*' : null }
					</StyledText>
				}
				<ScanTextInput
					style={meta.error && meta.touched ? failedValidation : inputStyle}
					value={input.value}
					onChangeText={text => {
						input.onChange(text);
						setValue(text);
					}}
					overrideValue={meta.initial}
					placeholder={placeholder}
					onSubmit={(value) => onSubmit(value)}
				/>
				{ meta.error && meta.touched &&
					<StyledText style={meta.error && meta.touched ? inputForFailed : inputFor}>
						{meta.error}
					</StyledText>
				}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	column: {
		width: '100%',
		maxHeight: 50,
		paddingVertical: 5
	}
});

import React, { useState } from 'react';
import {
	TextInput as OGTextInput,
	View,
	StyleSheet
} from 'react-native';

import StyledText from './StyledText';

/* compile the pattern string into a regex */
// const emoRegex = new RegExp(emojiPattern, 'g');
const nonAsciiRegex = /[^\u0000-\u007f]+/g;

const TextInput = (props, ref) => {
	const {
		// initialValue,
		onChangeText,
		style,
		setValidated,
		required=false,
		backgroundColor,
		borderColor,
		errorBorderColor,
		...inputProps
	} = props;
	const [nonAsciiCharacters, setNonAsciiCharacters] = useState(undefined);
	const [valid, setValid] = useState(true);

	const inputStyle = {
		height: 35,
		marginBottom: 5,
		marginLeft: 2,
		width: '100%',
		backgroundColor: backgroundColor,
		borderColor: borderColor,
		borderStyle: 'solid',
		borderBottomWidth: 1,
		...style
		// marginLeft: -90
	};
	const failedValidation = {
		height: 35,
		marginBottom: 5,
		marginLeft: 2,
		width: '100%',
		backgroundColor: backgroundColor,
		borderColor: errorBorderColor,
		borderStyle: 'solid',
		borderBottomWidth: 1
	};
	const inputForFailed = {
		height: 35,
		textAlign: 'left',
		paddingHorizontal: 5,
		marginLeft: 2,
		width: '100%',
		color: errorBorderColor,
		paddingLeft: -5,
		marginBottom: 15,
		paddingRight: 44
	};
	// useEffect(() => {
	// 	(async () => {
	// 		const nonAsciiCharacters = value.match(nonAsciiRegex);
	// 		setNonAsciiCharacters(nonAsciiCharacters);
	// 		setValid((required && !!value) || (setValidated && setValidated(!nonAsciiCharacters)));
	// 	})();
	// }, []);

	return (
		<View style={[styles.column, { width: '100%' }]}>
			<OGTextInput
				{...inputProps}
				ref={ref}
				onChangeText={text => {
					const nonAsciiCharacters = text.match(nonAsciiRegex);
					setNonAsciiCharacters(nonAsciiCharacters);
					// text = text.replace(nonAsciiRegex, '');
					setValid((required && !!text) || (setValidated && setValidated(!nonAsciiCharacters)));
					// console.log(text);
					onChangeText(text);
				}}
				style={((!valid && required) || nonAsciiCharacters) ? failedValidation : inputStyle}
			/>
			{ ((!valid && required) || nonAsciiCharacters) &&
				<View style={[styles.column, { marginBottom: 10 }]}>
					<StyledText style={inputForFailed}>
						{(!valid && required) ? 'Required' : nonAsciiCharacters + ' characters are not supported'}
					</StyledText>
				</View>
			}
		</View>
	);
};

export default React.forwardRef(TextInput);

const styles = StyleSheet.create({
	column: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'flex-start',
		maxHeight: 50,
		paddingVertical: 5
	}
});

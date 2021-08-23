import React from 'react';
import { StyleSheet, View } from 'react-native';

import StyledText from '../components/StyledText';

// Panda Imports
import {
	Button
} from 'react-native-panda-ui';


const Chip = () => {
	const styles = StyleSheet.create({
		container: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center'
		}
	});

	const props = {
		value,
		setValue,
		borderColor,
		backGroundColor,
		textColor,
		buttonTextColor,
		buttonBorderRadius,
		chipBorderRadius,
		onPress,
		onPressDelete,
		disabled,
		disabledColor
	};

	return (
		<View style={styles.container}>
			<View style={{ flexDirection: 'row' }}>
				<Button
					icon={option.icon}
					label={option.label}
					svg={option.svg}
					solid={selected}
					allowInteraction={!selected}
					width="0%"
					size={size}
					height={height}
					disabled={disabled}
					border={false}
					color={color}
					textColor={textColor}
					onPress={() => onValueChange(option.value)}
					key={option.value}
				/>
				<StyledText>

				</StyledText>
				<Button
					icon={option.icon}
					label={option.label}
					svg={option.svg}
					solid={selected}
					allowInteraction={!selected}
					width="0%"
					size={size}
					height={height}
					disabled={disabled}
					border={false}
					color={color}
					onPress={() => onValueChange(option.value)}
					key={option.value}
				/>
			</View>
		</View>
	);
};
export default Chip;

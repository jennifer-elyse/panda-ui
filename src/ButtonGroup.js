import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

function ButtonGroup(props) {
	const { buttonGroupSelectedBackgroundColor, buttonGroupSeparatorColor, buttonGroupBackgroundColor, buttonLabels, selectedIndex, selectIndex } = props;
	const lastIndex = buttonLabels.length - 1;

	const renderButtons = () => {
		return buttonLabels.map((labelValue, index) => {
			let buttonSeparator = {
				borderRightWidth: 1,
				borderRightColor: 'transparent'
			};
			if (lastIndex !== index && (index < selectedIndex - 1 || index > selectedIndex)) {
				buttonSeparator = {
					borderRightWidth: 1,
					borderRightColor: buttonGroupSeparatorColor
				};
			}

			return (
				<TouchableOpacity
					key={labelValue.value}
					style={[
						styles.buttonContainer,
						buttonSeparator,
						(index === 0 || selectedIndex === index) && styles.buttonRadiusLeft,
						(lastIndex === index || selectedIndex === index) && styles.buttonRadiusRight,
						selectedIndex === index && { height: 26, backgroundColor: buttonGroupSelectedBackgroundColor }
					]}
					onPress={() => selectIndex(index)}
				>
					<Text style={styles.buttonText}>{labelValue.label}</Text>
				</TouchableOpacity>
			);
		});
	};

	return (
		<View
			style={[
				styles.container,
				styles.buttonRadiusLeft,
				styles.buttonRadiusRight,
				{ backgroundColor: buttonGroupBackgroundColor }
			]}
		>
			{renderButtons()}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 30,
		paddingHorizontal: 2
	},
	buttonContainer: {
		paddingHorizontal: 15,
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonRadiusLeft: {
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7
  },
	buttonRadiusRight: {
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7
  }
});

export default ButtonGroup;

import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

function ButtonGroup(props) {
	const {
		buttonGroupSelectedBackgroundColor,
		buttonGroupSeparatorColor,
		buttonGroupBackgroundColor,
		buttonLabels,
		selectedIndex,
		selectIndex,
		labelColor,
		labelSize
	} = props;

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
					borderRightColor: buttonGroupSeparatorColor || 'grey'
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
						selectedIndex === index && { height: 26, backgroundColor: buttonGroupSelectedBackgroundColor || 'pink' }
					]}
					onPress={() => onSelect(index)}
				>
					<Text style={{
						fontSize: labelSize || 14,
						color: labelColor || 'black'
					}}>{labelValue.label}</Text>
				</TouchableOpacity>
			);
		});
	};

	const onSelect = index => {
		selectIndex(index);
	}

	return (
		<View
			style={[
				styles.container,
				styles.buttonRadiusLeft,
				styles.buttonRadiusRight,
				{ backgroundColor: buttonGroupBackgroundColor || 'salmon' }
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

ButtonGroup.propTypes = {
	selectIndex: PropTypes.func,
	selectedIndex: PropTypes.number,
	buttonBackgroundColor: PropTypes.string,
	buttonGroupBackgroundColor: PropTypes.string,
	buttonGroupSelectedBackgroundColor: PropTypes.string,
	buttonLabels: PropTypes.array,
	labelColor: PropTypes.string,
	labelSize: PropTypes.number,
};

export default ButtonGroup;

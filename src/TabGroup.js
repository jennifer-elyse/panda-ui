import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';

import Button from './Button';



const TabGroup = (props) => {
	const {
		options,
		width,
		selectedValue,
		onValueChange,
		style,
		// props passed through to <Button>
		buttonStyle,
		disabled,
		disabledColor='lightgrey',
		size,
		height,
		color,
		chevronColor='#000',
		activeTextColor,
		inactiveTextColor=activeTextColor,
		scrollButtons=false,
		backgroundColor
	} = props;

	const displayColor = disabled ? disabledColor : color;
	const [showLeftChevron, setShowLeftChevron] = useState(false);
	const [showRightChevron, setShowRightChevron] = useState(true);

	const componentStyle = {
		paddingHorizontal: 2.5,
		backgroundColor,
		...style,
		// flexGrow: 1,
		flexDirection: 'row',
		width: width || '100%',
		height: height || '100%'
	};

	const selectedStyle = {
		...componentStyle,
		marginBottom: 0,
		borderBottomWidth: 1,
		borderBottomColor: displayColor
	};

	const buttonLeftStyle = {
		paddingHorizontal: 2.5,
		...buttonStyle,
		flexGrow: 1
	};
	const buttonNotLeftStyle = {
		...buttonLeftStyle,
		borderLeftWidth: 0
	};

	const buttonSelectedLeftStyle = {
		...buttonLeftStyle,
		...selectedStyle,
		flexGrow: 1
	};
	const buttonSelectedNotLeftStyle = {
		...buttonNotLeftStyle,
		...selectedStyle,
		flexGrow: 1
	};

	const handleScroll = (event) => {
		const positionX = event.nativeEvent.contentOffset.x;
		// const positionY = event.nativeEvent.contentOffset.y;
		const width = event.nativeEvent.contentSize.width - event.nativeEvent.contentOffset.x;
		// console.log(positionX, width);
		if (positionX > 20) {
			// show left chevron
			setShowLeftChevron(true);
		} else {
			setShowLeftChevron(false);
		}

		if (positionX < width + 200) {
			// show right chevron
			setShowRightChevron(true);
		} else {
			setShowRightChevron(false);
		}
		// console.log('event', event.nativeEvent.contentSize.width);
	};


	return (
		<View
			style={componentStyle}
		>

			{scrollButtons && showLeftChevron &&
				<Button
					icon="chevron-left"
					size="small"
					height={height}
					width={30}
					solid={false}
					style={{ marginLeft: 2, justifyContent: 'center' }}
					disabledColor={chevronColor}
					disabled
					border={false}
					color={chevronColor}
					onPress={() => ({}) }
					key="left-arrow"
				/>
			}
			<ScrollView
				// onScrollEndDrag={handleScroll}
				onScroll={handleScroll}
				horizontal={true}
				fadingEdgeLength={150}
				indicatorStyle="black"
				contentContainerStyle={{ flexGrow: 1, height: height || '100%', padding: 0, alignItems: 'space-between' }}
			>
				{options.map((option, i) => {
					const selected = option.value === selectedValue;
					return (
						<Button
							icon={option.icon}
							label={option.label}
							transparent={true}
							solid={false}
							allowInteraction={!selected}
							size={size}
							height={height}
							disabled={disabled}
							border={false}
							color={selected ? color : inactiveTextColor}
							textColor={activeTextColor}
							style={i === 0
								? selected ? buttonSelectedLeftStyle : buttonLeftStyle
								: selected ? buttonSelectedNotLeftStyle : buttonNotLeftStyle}
							onPress={() => onValueChange(option.value)}
							key={option.value}
							gradient={[]}
						/>
					);
				})}
			</ScrollView>

			{scrollButtons && showRightChevron &&
				<Button
					icon="chevron-right"
					size="small"
					height={height}
					width={30}
					solid={false}
					style={{ marginRight: 2, justifyContent: 'center' }}
					disabledColor={chevronColor}
					disabled
					border={false}
					color={chevronColor}
					onPress={() => ({}) }
					key="right-arrow"
				/>
			}
		</View>
	);
};

export default TabGroup;

TabGroup.propTypes = {
	options: PropTypes.arrayOf(PropTypes.shape({
		value: PropTypes.any.isRequired,
		label: PropTypes.string,
		icon: PropTypes.string
	})).isRequired,
	width: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	height: PropTypes.number,
	selectedColor: PropTypes.string,
	selectedValue: PropTypes.string,
	disabledColor: PropTypes.string,
	// selectedValue: PropTypes.any.isRequired,
	onValueChange: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	scrollButtons: PropTypes.bool,
	size: PropTypes.oneOf(['small', 'standard', 'large']),
	color: PropTypes.string,
	activeTextColor: PropTypes.string,
	backgroundColor: PropTypes.string,
	chevronColor: PropTypes.string,
	style: PropTypes.object,
	buttonStyle: PropTypes.object,
	theme: PropTypes.string
};

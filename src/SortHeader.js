import React from 'react';
import PropTypes from 'prop-types';
import {
	View,
	TouchableOpacity,
	Text
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const SortHeader = (props) => {
	const {
		columns,
		sortConfig,
		onSortChange,
		borderRadius = 50,
		noSort = false,
		height,
		// TODO: not yet implemented
		// solid = false,
		// center = false,
		// ignoreFirstColumnInSort = true,
		sortIndicatorColor = '#4a1830',
		tintColor = '#772d4f',
		selectedColor = '#a34e76',
		borderColor = '#772d4f',
		textColor = '#fff',
		textActiveColor = '#fff',
		TextComponent=Text,
		cellContainerStyle,
		headerContainerStyle
	} = props;

	const commonTextStyle = {
		flexGrow: 1,
		width: 0,
		fontWeight: 'bold',
		maxHeight: 45,
		color: textColor
	};

	const commonViewStyle = {
		flexGrow: 1,
		width: 0,
		padding: 10,
		height: height,
		backgroundColor: tintColor,
		justifyContent: 'center',
		alignItems: 'center'
	};

	const activeTextStyle = {
		...commonTextStyle,
		color: textActiveColor || textColor
	};

	const activeViewStyle = {
		...commonViewStyle,
		backgroundColor: selectedColor
	};

	const middleBorderStyle = {
		borderRightWidth: 0.5,
		borderStyle: 'solid',
		borderColor: borderColor
	};

	const leftBorderStyle = {
		borderLeftWidth: 0.5,
		borderLeftStyle: 'solid',
		borderColor: borderColor,
		borderTopLeftRadius: borderRadius
	};

	const rightBorderStyle = {
		borderRightWidth: 0.5,
		borderRightStyle: 'solid',
		borderColor: borderColor,
		borderTopRightRadius: borderRadius
	};


	/**
	 * Getter for text styles.
	 *
	 * @param  {boolean} active
	 * @param  {boolean} showBorder
	 * @param  {number}  flexGrow
	 *
	 * @return {object} Object to apply to a `style` prop.
	 */
	function getTextStyle(active, showBorder, flexGrow) {
		const baseStyle = active ? activeTextStyle : commonTextStyle;

		return {
			...baseStyle,
			flexGrow,
			flexDirection: 'row',
			textAlign: 'center'
		};
	}


	/**
	 * Getter for view styles.
	 *
	 * @param  {boolean} active
	 * @param  {boolean} showBorder
	 * @param  {number}  flexGrow
	 *
	 * @return {object} Object to apply to a `style` prop.
	 */
	function getViewStyle(active, flexGrow, i, length) {
		const baseStyle = active ? activeViewStyle : commonViewStyle;
		const leftBorderStyleObj =  i === 0  ? leftBorderStyle : undefined;
		const rightBorderStyleObj =  i === length -1 ? rightBorderStyle : undefined;
		const middleBorderStyleObj =  i > 0 && i < length - 1 ? middleBorderStyle : undefined;

		return {
			...baseStyle,
			...leftBorderStyleObj,
			...rightBorderStyleObj,
			...middleBorderStyleObj,
			flexGrow,
			flexDirection: 'row',
			alignItems: 'center',
			...cellContainerStyle
		};
	}

	const rootStyleUnrounded = {
		flexDirection: 'row',
		backgroundColor: textColor,
		borderWidth: 0.5,
		borderStyle: 'solid',
		borderColor: tintColor
	};

	const rootStyleRounded = {
		flexDirection: 'row',
		backgroundColor: textColor,
		borderWidth: 0.5,
		borderStyle: 'solid',
		borderColor: tintColor,
		borderTopLeftRadius: borderRadius,
		borderTopRightRadius: borderRadius
		// borderBottomRightRadius: 5,
		// borderBottomLeftRadius: 5
	};

	const rootStyle = borderRadius ? rootStyleRounded : rootStyleUnrounded;

	return (
		<View style={[rootStyle, headerContainerStyle]}>
			{columns.map((column, i) => {
				let isSorted = sortConfig.key === column.key;
				isSorted = noSort ? false : isSorted;
				return (
					<TouchableOpacity
						style={getViewStyle(isSorted, column.width, i, columns.length)}
						key={column.key}
						onPress={() => {
							!noSort  &&
							onSortChange({
								key: column.key,
								direction: !isSorted ? 'asc' : (
									sortConfig.direction === 'asc' ? 'desc' : 'asc'
								)
							});
						}}
					>
						{column.icon && <FontAwesome5
							key={column.key}
							name={column.icon}
							size={20}
							color={textColor}
							style={{ marginLeft: 10 }}
						/>}

						<TextComponent
							style={getTextStyle(isSorted, i < columns.length - 1, column.width)}
							key={column.key + '1'}
						>
							{column.label}
						</TextComponent>

						{ isSorted && sortConfig.direction === 'asc' ?
							<FontAwesome5
								key={column.key + '2'}
								name="chevron-up"
								size={12}
								color={sortIndicatorColor}
								style={{ marginLeft: 10 }}
							/>
							: false}
						{ isSorted && sortConfig.direction === 'desc' ?
							<FontAwesome5
								key={column.key + '3'}
								name="chevron-down"
								size={12}
								color={sortIndicatorColor}
								style={{ marginLeft: 10 }}
							/>
							: false}
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

SortHeader.propTypes = {
	columns: PropTypes.arrayOf(PropTypes.shape({
		key: PropTypes.any.isRequired,
		// Node can be string, React element, or anything renderable.
		label: PropTypes.node.isRequired
	})),
	sortConfig: PropTypes.exact({
		key: PropTypes.any.isRequired,
		direction: PropTypes.oneOf(['asc', 'desc']).isRequired
	}),
	onSortChange: PropTypes.func.isRequired,
	borderRadius: PropTypes.number,
	noSort: PropTypes.bool,
	// solid: PropTypes.bool,
	// center: PropTypes.bool,
	// ignoreFirstColumnInSort: PropTypes.bool,
	height: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	sortIndicatorColor: PropTypes.string,
	tintColor: PropTypes.string,
	selectedColor: PropTypes.string,
	borderColor: PropTypes.string,
	textColor: PropTypes.string,
	TextComponent: PropTypes.object,
	cellContainerStyle: PropTypes.object,
	headerContainerStyle: PropTypes.object
};

export default SortHeader;

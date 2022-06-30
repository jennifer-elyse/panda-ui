import React from 'react';
import PropTypes from 'prop-types';
import {
	TouchableOpacity,
	Platform,
	Text
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const SortColumn = (props) => {
	const {
		column,
		i,
		columnCount,
		sortConfig,
		onSortChange,
		borderRadiusLeft,
		borderRadiusRight,
		noSort,
		height,
		sortIndicatorColor = '#4a1830',
		selectedColor = '#a34e76',
		borderColor = 'transparent',
		textColor = '#fff'
	} = props;

	const commonTextStyle = {
		flexGrow: 1,
		width: 0,
		fontWeight: 'bold',
		maxHeight: height,
		color: textColor,
		paddingLeft: 5
	};

	const commonViewStyle = {
		flexGrow: 1,
		width: 0,
		padding: 10,
		height: height,
		justifyContent: 'center',
		alignItems: 'center'
	};

	const activeTextStyle = {
		...commonTextStyle,
		color: textColor
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
		borderLeftWidth: Platform.OS === 'ios' ? 0 : 0.5,
		borderRightStyle: Platform.OS === 'ios' ? 'none' : 'solid',
		borderTopLeftRadius: borderRadiusLeft,
		borderColor: Platform.OS === 'ios' ? undefined : borderColor
	};

	const rightBorderStyle = {
		borderRightWidth: Platform.OS === 'ios' ? 0 : 0.5,
		borderRightStyle: Platform.OS === 'ios' ? 'none' : 'solid',
		borderTopRightRadius: borderRadiusRight,
		borderColor: Platform.OS === 'ios' ? undefined : borderColor
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
			width: '100%',
			flexWrap: 'nowrap',
			flexDirection: 'row',
			backgroundColor: 'transparent',
			borderTopLeftRadius: borderRadiusLeft,
			borderTopRightRadius: borderRadiusRight
		};
	}

	/**
	 * Getter for view styles.
	 *
	 * @param  {boolean} active
	 * @param  {number}  flexGrow
	 * @param  {string} i
	 * @param  {number} length
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
			alignItems: 'center'
		};
	}

	let isSorted = sortConfig.key === column.key;
	isSorted = noSort ? false : isSorted;

	return (
		<TouchableOpacity
			style={getViewStyle(isSorted, column.width, i, columnCount)}
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

			<Text
				style={[
					getTextStyle(isSorted, i < columnCount - 1, column.width),
					{ textAlign: column?.textAlign ? column.textAlign : 'left' }
				]}
				key={column.key + '1'}
			>
				{column.label}
			</Text>

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
};

SortColumn.propTypes = {
	column: PropTypes.shape({
		key: PropTypes.any.isRequired,
		// Node can be string, React element, or anything renderable.
		label: PropTypes.node,
		width: PropTypes.node.isRequired,
		icon: PropTypes.node,
		textAlign: PropTypes.node
	}),
	i: PropTypes.number,
	sortConfig: PropTypes.exact({
		key: PropTypes.any.isRequired,
		direction: PropTypes.oneOf(['asc', 'desc']).isRequired
	}),
	onSortChange: PropTypes.func.isRequired,
	borderRadius: PropTypes.number,
	borderRadiusLeft: PropTypes.number,
	borderRadiusRight: PropTypes.number,
	noSort: PropTypes.bool,
	height: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	sortIndicatorColor: PropTypes.string,
	tintColor: PropTypes.string,
	columnCount: PropTypes.number,
	selectedColor: PropTypes.string,
	borderColor: PropTypes.string,
	textColor: PropTypes.string
};

export default SortColumn;

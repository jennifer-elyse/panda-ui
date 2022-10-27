import React from 'react';
import PropTypes from 'prop-types';
import {
	TouchableOpacity,
	Platform,
	Text
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronUp } from '@fortawesome/pro-solid-svg-icons';
import { faChevronDown } from '@fortawesome/pro-solid-svg-icons';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const SortColumnFlex = (props) => {
	const {
		column,
		i,
		columnCount=1,
		sortConfig,
		onSortChange,
		borderRadiusLeft,
		borderRadiusRight,
		noSort,
		height,
		sortIndicatorColor = '#4a1830',
		selectedColor = '#a34e76',
		borderColor = 'transparent',
		textColor = '#fff',
		textActiveColor = '#fff',
		cellContainerStyle
	} = props;

	const commonTextStyle = {
		flexGrow: 1,
		width: 0,
		fontWeight: 'bold',
		maxHeight: height,
		color: textColor,
		paddingLeft: borderRadiusLeft > 0 && column.textAlign === 'left' ? 10 : 5,
		paddingRight: borderRadiusRight > 0 && column.textAlign === 'right' ? 10 : 5
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
			borderTopRightRadius: borderRadiusRight,
			marginLeft: borderRadiusLeft > 0 && column.textAlign === 'left' ? 10 : undefined,
			marginRight: borderRadiusRight > 0 && column.textAlign === 'right' ? 10 : undefined,
			textAlign: column.textAlign || 'center'
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
			...cellContainerStyle,
			flexGrow,
			flexDirection: 'row',
			alignItems: 'center',
			textAlign: column?.textAlign || 'center'
		};
	}

	const sortKey = column.sortKey ? column.sortKey : column.key;
	let isSorted = sortConfig.key === sortKey;

	return (
		<TouchableOpacity
			style={getViewStyle(isSorted, column.width, i, columnCount)}
			key={sortKey}
			onPress={() => {
				!noSort  &&
				onSortChange({
					key: sortKey,
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
				key={sortKey + '1'}
			>
				{column.label}
			</Text>

			{ isSorted && sortConfig.direction === 'asc' ?
				<FontAwesomeIcon
					key={sortKey + '2'}
					icon={faChevronUp}
					size={12}
					color={sortIndicatorColor}
					style={{ marginLeft: 10, marginRight: 10 }}
				/>
				: false}
			{ isSorted && sortConfig.direction === 'desc' ?
				<FontAwesomeIcon
					key={sortKey + '3'}
					icon={faChevronDown}
					size={12}
					color={sortIndicatorColor}
					style={{ marginLeft: 10, marginRight: 10 }}
				/>
				: false}
		</TouchableOpacity>
	);
};

SortColumnFlex.propTypes = {
	column: PropTypes.shape({
		key: PropTypes.any.isRequired,
		// Node can be string, React element, or anything renderable.
		sortKey: PropTypes.node,
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
	textColor: PropTypes.string,
	textActiveColor: PropTypes.string,
	cellContainerStyle: PropTypes.object,
	screenWidth: PropTypes.number
};

export default SortColumnFlex;

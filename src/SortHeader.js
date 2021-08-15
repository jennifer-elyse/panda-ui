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
		roundCorners = false,
		noSort = false,
		// TODO: not yet implemented
		// solid = false,
		// center = false,
		// ignoreFirstColumnInSort = true,
		sortIndicatorColor = '#424242',
		tintColor = '#213a63',
		selectedColor = '#8cb1d7',
		tintDarkColor = '#213a63',
		textColor = '#fff',
		TextComponent=Text
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
		maxHeight: 45,
		backgroundColor: tintColor,
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

	const textBorderStyle = {
		borderRightWidth: 0.5,
		borderStyle: 'solid',
		borderColor: tintDarkColor
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
	function getViewStyle(active, showBorder, flexGrow) {
		const baseStyle = active ? activeViewStyle : commonViewStyle;
		const borderStyle =  showBorder ? textBorderStyle : undefined;

		return {
			...baseStyle,
			...borderStyle,
			flexGrow,
			flexDirection: 'row',
			alignItems: 'center'
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
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5
		// borderBottomRightRadius: 5,
		// borderBottomLeftRadius: 5
	};

	const rootStyle = roundCorners ? rootStyleRounded : rootStyleUnrounded;

	return (
		<View style={rootStyle}>
			{columns.map((column, i) => {
				let isSorted = sortConfig.key === column.key;
				isSorted = noSort ? false : isSorted;
				return (
					<TouchableOpacity
						style={getViewStyle(isSorted, i < columns.length - 1, column.width)}
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
	roundCorners: PropTypes.bool,
	noSort: PropTypes.bool,
	// solid: PropTypes.bool,
	// center: PropTypes.bool,
	// ignoreFirstColumnInSort: PropTypes.bool,
	sortIndicatorColor: PropTypes.string,
	tintColor: PropTypes.string,
	selectedColor: PropTypes.string,
	tintDarkColor: PropTypes.string,
	textColor: PropTypes.string,
	TextComponent: PropTypes.func
};

export default SortHeader;


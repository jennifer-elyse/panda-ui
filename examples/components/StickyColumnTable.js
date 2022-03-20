import React, { useState, useEffect, useRef } from 'react';
import {
	StyleSheet,
	View,
	ScrollView,
	Text,
	FlatList,
	PlatForm } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import StyledText from '../components/StyledText';
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import {
	useThemeContext,
	themeSelector
} from '../contexts/ThemeContext';
import { H1, Body2 } from '../components/StyledText';

// Panda Imports
import {
	DoubleCard,
	SearchBar,
	SortHeader,
	useSortedData,
	TabGroup,
	Button
} from 'react-native-panda-ui';


const columns = [
	{ key: 'name',		label: 'Name', 		icon: null, width: 1 },
	{ key: 'color',		label: 'Color', 	icon: null, width: 1 },
	{ key: 'faveFood',	label: 'FaveFood', 	icon: null, width: 2 },
	{ key: 'peeves',	label: 'Peeves', 	icon: null, width: 1 },
	{ key: 'loves',		label: 'Loves', 	icon: null, width: 2 }
];

const defaultSortConfig = {
	key: columns[1].key,
	direction: 'asc'
};

const ScrollerEnum = {
	None: 'none',
	Header: 'header',
	StickyContent: 'sticky-content',
	ScrollContent: 'scroll-content'
};

const StickyColummnTable = (props) => {
	const navigation 								= useNavigation();
	const [userSession] 							= useThemeContext();
	const [showLeftChevron, setShowLeftChevron] 	= useState(false);
	const [showRightChevron, setShowRightChevron] 	= useState(false);
	const theme 									= themeSelector(userSession);
	const [sortConfig, setSortConfig] 				= useState(defaultSortConfig);
	const {
		data
	} = props;
	const contentHorizontalScrollView 	= useRef();
	const headerHorizontalScrollView 	= useRef();
	const contentVerticalScrollView 	= useRef();
	const headerVerticalScrollView 		= useRef();
	const activeScroller                = useRef(ScrollerEnum.None);


	// On mount trigger a small scroll so that the left and right chevrons display correctly.
	// This is a hacky way to do this, but we're not sure how to read the correct dimensions
	// outside of a scroll event.
	useEffect(() => {
		headerHorizontalScrollView.current.scrollTo({ x: 1 });
	}, []);

	const handleScroll_headerHorizontal = (event) => {
		activeScroller.current = ScrollerEnum.Header;
		const positionX = event.nativeEvent.contentOffset.x;
		const outerWidth = event.nativeEvent.layoutMeasurement.width;
		const innerWidth = event.nativeEvent.contentSize.width;
		const positionXRemaining = innerWidth - outerWidth - positionX;

		setShowLeftChevron(positionX > 20);
		setShowRightChevron(positionXRemaining > 20);

		if (Platform.OS === 'ios' || activeScroller.current === ScrollerEnum.Header) {
			contentHorizontalScrollView.current.scrollTo({ x: positionX, animated: false });
		}
	};

	const handleScroll_contentHorizontal = (event) => {
		if (Platform.OS === 'ios' || activeScroller.current === ScrollerEnum.ScrollContent) {
			const positionX = event.nativeEvent.contentOffset.x;
			headerHorizontalScrollView.current.scrollTo({ x: positionX, animated: false });
		}
	};

	const handleScroll_stickyContent = (event) => {
		if (Platform.OS === 'ios' || activeScroller.current === ScrollerEnum.StickyContent) {
			const positionY = event.nativeEvent.contentOffset.y;
			contentVerticalScrollView.current.scrollTo({ y: positionY, animated: false });
		}
	};

	const handleScroll_contentVertical = (event) => {
		if (Platform.OS === 'ios' || activeScroller.current === ScrollerEnum.ScrollContent) {
			const positionY = event.nativeEvent.contentOffset.y;
			headerVerticalScrollView.current.scrollTo({ y: positionY, animated: false });
		}
	};

	// const FlatList_Header = () => {
	// 	return (
	// 		<TabGroup
	// 			options={columns}
	// 			// sortConfig={sortConfig}
	// 			// onSortChange={setSortConfig}
	// 			center
	// 			borderRadius={Styles[theme].borderRadius}
	// 			height={40}
	// 			sortIndicatorColor={Colors[theme].buttonTextColor}
	// 			activeTextColor={Colors[theme].buttonTextColor}
	// 			backgroundColor={Colors[theme].tintColor}
	// 			selectedColor={Colors[theme].tabBarActiveColor}
	// 			inactiveTextColor={Colors[theme].buttonTextColor}
	// 		/>
	// 	);
	// }

	return (
		<View style={styles.container}>
			{ /*sticky column*/ }
			<View key="headerColumn">
				<Button
					label="Animal"
					color={Colors[theme].tintColor}
					textColor={Colors[theme].buttonTextColor}
					height={40}
					width={100}
					border={false}
					onPress={() => ({})}
					key="stickyAnimal"
					gradient={[]}
				/>
				<ScrollView
					contentContainerStyle={{ width: '100%', padding: 0, alignItems: 'space-between' }}
					ref={headerVerticalScrollView}
					onScroll={handleScroll_stickyContent}
					onScrollBeginDrag={() => activeScroller.current = ScrollerEnum.StickyContent}
					scrollEventThrottle={16}
				>
					<View>
						<View style={{ height: 25 }}>
							<Text>Panda</Text>
						</View>
						<View style={{ height: 25 }}>
							<Text>Red Panda</Text>
						</View>
						<View style={{ height: 25 }}>
							<Text>Ugly Panda</Text>
						</View>
						<View style={{ height: 25 }}>
							<Text>Trash Panda</Text>
						</View>
						<View style={{ height: 25 }}>
							<Text>Candy Panda</Text>
						</View>
					</View>
				</ScrollView>
			</View>
			{ /*content column*/ }

			<View key="contentColumn" style={{ width: 250 }}>
				<ScrollView
					ref={headerHorizontalScrollView}
					onScroll={handleScroll_headerHorizontal}
					scrollEventThrottle={16}
					onScrollBeginDrag={() => activeScroller.current = ScrollerEnum.Header}
					horizontal={true}
					fadingEdgeLength={150}
					contentContainerStyle={{ flexGrow: 1, height: '100%', padding: 0, alignItems: 'space-between' }}
				>
					{showLeftChevron &&
						<Button
							iconElement={<Icon name="chevron-left" size={14} color={Colors[theme].buttonTextColor} />}
							size="small"
							height={40}
							width={10}
							solid={false}
							style={{ marginLeft: 2, justifyContent: 'center' }}
							disabled
							border={false}
							transparent
							onPress={() => ({}) }
							key="left-arrow"
						/>
					}
						{columns.map((option, i) => {
							return (
								<Button
									label={option.label}
									color={Colors[theme].tintColor}
									textColor={Colors[theme].buttonTextColor}
									// size={size}
									height={40}
									// disabled={disabled}
									width={i === 2 || i === 4 ? 200 : 100}
									border={false}
									// color={selected ? color : inactiveTextColor}
									// textColor={selected ? activeTextColor : inactiveTextColor}
									// style={i === 0
									// 	? selected ? buttonSelectedLeftStyle : buttonLeftStyle
									// 	: selected ? buttonSelectedNotLeftStyle : buttonNotLeftStyle}
									onPress={() => ({})}
									key={option.key}
									gradient={[]}
								/>
							);
						})}


					{showRightChevron &&
						<Button
							iconElement={<Icon name="chevron-right" size={14} color={Colors[theme].buttonTextColor} />}
							size="small"
							height={40}
							width={10}
							solid={false}
							style={{ marginRight: 2, justifyContent: 'center' }}
							transparent
							disabled
							border={false}
							onPress={() => ({}) }
							key="right-arrow"
						/>
					}
				</ScrollView>
				<ScrollView
					ref={contentHorizontalScrollView}
					scrollEventThrottle={16}
					horizontal
					onScroll={handleScroll_contentHorizontal}
					onScrollBeginDrag={() => activeScroller.current = ScrollerEnum.ScrollContent}
					fadingEdgeLength={150}
					indicatorStyle="black"
					persistentScrollbar
				>
					<ScrollView
						ref={contentVerticalScrollView}
						onScroll={handleScroll_contentVertical}
						onScrollBeginDrag={() => activeScroller.current = ScrollerEnum.ScrollContent}
						scrollEventThrottle={16}
						persistentScrollbar
					>
						<View>
							{ 	data.map((item, i) => {
									return (
										<View
											key={item.characterId}
											style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
											<View style={{ width: 100, height: 25, alignItems: 'center' }}>
												<Text>{item.name}</Text>
											</View>
											<View style={{ width: 100, height: 25, alignItems: 'center' }}>
												<Text>{item.color}</Text>
											</View>
											<View style={{ width: 200, height: 25, alignItems: 'center' }}>
												<Text>{item.faveFood}</Text>
											</View>
											<View style={{ width: 100, height: 25, alignItems: 'center' }}>
												<Text>{item.peeves}</Text>
											</View>
											<View style={{ width: 200, height: 25, alignItems: 'center' }}>
												<Text>{item.loves}</Text>
											</View>
										</View>
									)
								})
							}
						</View>
					</ScrollView>
				</ScrollView>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
export default StickyColummnTable;

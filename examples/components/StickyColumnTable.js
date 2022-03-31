import React, { useState, useEffect, useRef } from 'react';
import {
	StyleSheet,
	View,
	ScrollView,
	Text,
	Dimensions,
	Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

// Panda Imports
import {
	SortHeader,
	Button
} from 'react-native-panda-ui';

const ScrollerEnum = {
	None: 'none',
	Header: 'header',
	StickyContent: 'sticky-content',
	ScrollContent: 'scroll-content'
};

const StickyColumnTable = (props) => {
	const [showLeftChevron, setShowLeftChevron] 	= useState(false);
	const [showRightChevron, setShowRightChevron] 	= useState(false);
	const {
		data,
		columns,
		headerHeight,
		stickyHeaderOptions,
		rowHeight,
		sortConfig,
		borderRadius,
		headerBackgroundColor,
		backgroundColor,
		onSortChange,
		sortIndicatorColor,
		borderColor,
		selectedColor,
		headerTextColor,
		textColor,
		scrollArrowColor,
		maxHeight,
		maxWidth,
		width
	} = props;
	const horizontalScrollView 	        = useRef();
	const contentVerticalScrollView 	= useRef();
	const headerVerticalScrollView 		= useRef();
	const activeScroller                = useRef(ScrollerEnum.None);


	// On mount trigger a small scroll so that the left and right chevrons display correctly.
	// This is a hacky way to do this, but we're not sure how to read the correct dimensions
	// outside of a scroll event.
	useEffect(() => {
		horizontalScrollView.current.scrollTo({ x: 1 });
	}, []);

	const handleScroll_horizontal = (event) => {
		activeScroller.current = ScrollerEnum.Header;
		const positionX = event.nativeEvent.contentOffset.x;
		const outerWidth = event.nativeEvent.layoutMeasurement.width;
		const innerWidth = event.nativeEvent.contentSize.width;
		const positionXRemaining = innerWidth - outerWidth - positionX;

		setShowLeftChevron(positionX > 20);
		setShowRightChevron(positionXRemaining > 20);
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

	return (
		<View style={styles.container}>
			{ /* sticky column */ }
			<View key="headerColumn">
				<View style={{
					height: headerHeight,
					backgroundColor: headerBackgroundColor,
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center' }}>
					<Text
						style={{
							fontWeight: 'bold',
							color: headerTextColor,
							textAlign: stickyHeaderOptions.textAlign ? stickyHeaderOptions.textAlign : 'left',
							paddingLeft: 10,
							flexGrow: stickyHeaderOptions.width,
							justifyContent: 'center',
							alignItems: 'center'
						}}
						key="sticky"
					>
						{stickyHeaderOptions.label}
					</Text>
				</View>
				<ScrollView
					contentContainerStyle={{ width: '100%', padding: 0, alignItems: 'space-between' }}
					ref={headerVerticalScrollView}
					onScroll={handleScroll_stickyContent}
					onScrollBeginDrag={() => activeScroller.current = ScrollerEnum.StickyContent}
					scrollEventThrottle={16}
					style={{ maxHeight: maxHeight || Dimensions.get('screen').height / 2 }}
				>
					<View>
						{ data.map((item, i) => {
							return (
								<View
									key={i*-1}
									style={{ flexDirection: 'row', height: rowHeight, alignItems: 'center', justifyContent: 'center', backgroundColor: backgroundColor }}>
									<Text style={{ paddingLeft: 10, flexGrow: stickyHeaderOptions.width, textAlign: stickyHeaderOptions.textAlign, color: textColor }}>{item[stickyHeaderOptions.key]}</Text>
								</View>
							);
						})}
					</View>
				</ScrollView>
			</View>
			{ /* content column */ }

			<View key="contentColumn" style={{ flex: 1, width: maxWidth || Dimensions.get('window').width }}>
				<ScrollView
					ref={horizontalScrollView}
					scrollEventThrottle={16}
					horizontal
					onScroll={handleScroll_horizontal}
					onScrollBeginDrag={() => activeScroller.current = ScrollerEnum.ScrollContent}
					indicatorStyle="black"
					persistentScrollbar
					style={{ width: '100%' }}
				>
					{/* This <View> is required to create a flex column layout inside the horizontal <ScrollView> */}
					<View
						style={{ minWidth: Dimensions.get('screen').width * 2, marginTop: -1 }}>
						<SortHeader
							columns={columns}
							sortConfig={sortConfig}
							onSortChange={onSortChange}
							borderRadiusLeft={0}
							borderRadiusRight={borderRadius}
							height={headerHeight}
							backgroundColor={headerBackgroundColor}
							sortIndicatorColor={sortIndicatorColor}
							borderColor={borderColor}
							selectedColor={selectedColor}
							textColor={headerTextColor}
						/>
						<ScrollView
							ref={contentVerticalScrollView}
							onScroll={handleScroll_contentVertical}
							onScrollBeginDrag={() => activeScroller.current = ScrollerEnum.ScrollContent}
							scrollEventThrottle={16}
							persistentScrollbar
							style={{ maxHeight: Dimensions.get('screen').height / 2 }}
							// stickyHeaderIndices={[0]}
						>
							<View
								style={{ minWidth: Dimensions.get('screen').width * 2 }}>
								{ data.map((item, i) => {
									return (
										<View
											key={i}
											style={{ flex: 1, flexDirection: 'row', height: rowHeight, alignItems: 'center', justifyContent: 'center', backgroundColor: backgroundColor }}>
											{
												columns.map((detail, ii) => {
													return (
														<Text style={{ paddingLeft: 10, flexGrow: columns[ii].width, width: 0, textAlign: columns[ii].textAlign, color: textColor }}>{item[columns[ii].key]}</Text>
													);
												})
											}
										</View>
									);
								})}
							</View>
						</ScrollView>
					</View>
				</ScrollView>
				{showLeftChevron &&
					<Button
						iconElement={<Icon name="chevron-left" size={14} color={scrollArrowColor} />}
						size="small"
						height={40}
						width={10}
						solid={false}
						style={{ marginLeft: 2, justifyContent: 'center', position: 'absolute' }}
						disabled
						border={false}
						transparent
						onPress={() => ({}) }
						key="left-arrow"
					/>
				}
				{showRightChevron &&
					<Button
						iconElement={<Icon name="chevron-right" size={14} color={scrollArrowColor} />}
						size="small"
						height={40}
						width={10}
						solid={false}
						style={{ marginRight: 2, justifyContent: 'center', position: 'absolute', right: 0 }}
						transparent
						disabled
						border={false}
						onPress={() => ({}) }
						key="right-arrow"
					/>
				}
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
export default StickyColumnTable;

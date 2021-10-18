// React Imports
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
	FlatList,
	View,
	TouchableHighlight,
	SafeAreaView,
	StyleSheet
} from 'react-native';

// Expo imports
import { StatusBar } from 'expo-status-bar';


import chroma from 'chroma-js';

// Panda Imports
import {
	Card,
	DoubleCard,
	SearchBar,
	SortHeader,
	useSortedData
} from 'react-native-panda-ui';

// Local Imports
import {
	useThemeContext,
	themeSelector
} from '../contexts/ThemeContext';
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import FlatListItemSeparator from '../components/FlatListItemSeparator';
import LoadingIndicator from '../components/LoadingIndicator';
import { H1, Body2 } from '../components/StyledText';
import ThemeSelect from '../components/ThemeSelect';
import { getCharacters, getCharacterQualities } from '../utils/apiHandler';


const columns = [
	{ key: 'animal',	label: 'Animal', 	icon: null, width: 1 },
	{ key: 'name',		label: 'Name', 		icon: null, width: 1 },
	{ key: 'color',		label: 'Color', 	icon: null, width: 1 }
];

const defaultSortConfig = {
	key: columns[1].key,
	direction: 'asc'
};

const DataScreen = () => {
	const [userSession] = useThemeContext();
	const theme = themeSelector(userSession);
	// state hooks
	// useState utilizes the current state and a function that updates it
	const [highlightedIndex, setHighlightedIndex] = useState(null);
	const [characterData, setCharacterData] 	= useState([]);
	const [qualitiesData, setQualitiesData] 	= useState([]);
	const [loading, setLoading] 				= useState(false);
	const [sortConfig, setSortConfig] 			= useState(defaultSortConfig);

	// hooks
	const sortedApiData 				= useSortedData(qualitiesData, sortConfig);

	// refs
	const listRef = useRef();

	// config
	const rowHeight = 45;
	const highlightedColor = Colors[theme].highlightColor;
	const highlightedTextColor =
		chroma.contrast(highlightedColor, '#fff') > 5
			? '#fff' : '#000';

	useEffect(() => {
		(async () => {
			setLoading(true);
			let response = await getCharacters();
			setCharacterData(response.data.characters);
			response = await getCharacterQualities();
			// console.log('response', response.data.qualities);
			setQualitiesData(response.data.qualities);
			setLoading(false);
		})();
	}, []);

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			marginTop: StatusBar.height,
			backgroundColor: Colors[theme].backgroundColor,
			alignItems: 'center'
		},
		row: {
			flex: 1,
			flexDirection: 'row',
			height: 45,
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: Colors[theme].cardColor
		},
		highlightedRow: {
			flex: 1,
			flexDirection: 'row',
			height: 45,
			marginVertical: 5,
			marginHorizontal: 2.5,
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: highlightedColor
		}
	});

	useEffect(() => {
		if (highlightedIndex !== null) {
			listRef.current.scrollToOffset({ offset: rowHeight * highlightedIndex, animated: true });
		}
	}, [highlightedIndex]);

	async function findCharacterRecord(value, searchType) {
		const itemIndex = sortedApiData.findIndex((item) => {
			return String(item[searchType]) === value;
		});
		setHighlightedIndex(itemIndex > -1 ? itemIndex : null);
	}

	const Separator = useCallback(
		props => <FlatListItemSeparator backgroundColor={Colors[theme].cardColor} color={Colors[theme].tintColor} />,
		[theme]
	);

	if (loading) {
		return (
			<LoadingIndicator
				activityIndicatorColor={Colors[theme].activityIndicatorColor}
				backgroundColor={Colors[theme].backgroundColor}
			/>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<ThemeSelect
				characterData={characterData}
				setLoading={setLoading}
			/>
			<View style={{ width: '95%', marginTop: 30, marginBottom: 15 }}>
				<DoubleCard
					backCardElevation={5}
					cardElevation={8}
					borderRadius={Styles[theme].borderRadius}
					padding={Styles[theme].padding}
					backCardColor={Colors[theme].backCardColor}
					backCardGradient={Colors[theme].backCardGradient}
					cardColor={Colors[theme].cardColor}
				>
					<SearchBar
						columns={[
							{ label: 'Animal', value: 'animal', key: 1 },
							{ label: 'Name', value: 'name', key: 2 },
							{ label: 'Color', value: 'color', key: 3 }
						]}
						data={sortedApiData}
						onSubmit={findCharacterRecord}
						backgroundColor={Colors[theme].cardColor}
						borderColor={Colors[theme].borderColor}
						buttonColor={Colors[theme].buttonColor}
						pickerBorderColor={Colors[theme].borderColor}
						pickerText={Colors[theme].borderColor}
					/>
				</DoubleCard>
			</View>
			<View style={{ flexDirection: 'row', marginHorizontal: 20, marginVertical: 15 }}>
				<H1 textColor={Colors[theme].textColor}>Characteristics</H1>
			</View>
			<View style={{ height: '40%', width: '95%', marginHorizontal: 10, marginBottom: 5 }}>
				<SortHeader
					columns={columns}
					sortConfig={sortConfig}
					onSortChange={setSortConfig}
					roundCorners={true}
					center
					borderRadius={Styles[theme].borderRadius/10}
					height={40}
					sortIndicatorColor={Colors[theme].buttonTextColor}
					tintColor={Colors[theme].tintColor}
					selectedColor={Colors[theme].tabBarActiveColor}
					textColor={Colors[theme].buttonTextColor}
				/>
				<FlatList
					ItemSeparatorComponent={Separator}
					style={{
						borderColor: Colors[theme].tintColor,
						borderLeftWidth: 1,
						borderBottomWidth: 1,
						borderRightWidth: 1,
						borderBottomRightRadius: 5,
						borderBottomLeftRadius: 5
					}}
					ref={listRef}
					data={sortedApiData}
					renderItem={({ item, index, separators }) => (
						<TouchableHighlight style={highlightedIndex === index ? styles.highlightedRow : styles.row}>
							<View
								style={{ flex: 1, flexDirection: 'row', height: 45, alignItems: 'center', justifyContent: 'center' }}
								// onPress={() => { navigateToComponents(); }}
							>
								<Body2 textColor={highlightedIndex === index ? highlightedTextColor : Colors[theme].textColor} style={{ width: 0, flexGrow: columns[0].width, textAlign: 'center' }}>
									{item.animal}
								</Body2>
								<Body2 textColor={highlightedIndex === index ? highlightedTextColor : Colors[theme].textColor} style={{ width: 0, flexGrow: columns[1].width, textAlign: 'center' }}>
									{item.name}
								</Body2>
								<Body2 textColor={highlightedIndex === index ? highlightedTextColor: Colors[theme].textColor} style={{ width: 0, flexGrow: columns[2].width, textAlign: 'center' }}>
									{item.color}
								</Body2>
							</View>
						</TouchableHighlight>
					)}
					keyExtractor={(item, index) => String(index)}
					height={'100%'}
				/>
			</View>
		</SafeAreaView>
	);
};

export default DataScreen;

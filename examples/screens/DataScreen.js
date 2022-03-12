// React Imports
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
	FlatList,
	View,
	TouchableHighlight,
	SafeAreaView,
	StyleSheet,
	ScrollView
} from 'react-native';

// Expo imports
import { StatusBar } from 'expo-status-bar';

import chroma from 'chroma-js';

// Panda Imports
import {
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
	const [highlightedCharacterId, setHighlightedCharacterId] = useState(null);
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
			paddingVertical: 5,
			paddingHorizontal: 2.5,
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: highlightedColor
		}
	});

	useEffect(() => {
		if (highlightedCharacterId !== null) {
			listRef.current.scrollToOffset({ offset: rowHeight * highlightedCharacterId, animated: true });
		}
	}, [highlightedCharacterId]);

	async function findCharacterRecord(value, searchType) {
		const character = sortedApiData.find((item) => {
			return String(item[searchType]) === value;
		});
		setHighlightedCharacterId(character.characterId);
		// for index, use sortedApiData.findIndex and setHighlightedIndex(itemIndex > -1 ? itemIndex : null);

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
			<View style={{ width: '95%', marginTop: -5, marginBottom: 15 }}>
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
						borderRadius={Styles[theme].borderRadius}
						onSubmit={findCharacterRecord}
						backgroundColor={Colors[theme].cardColor}
						borderColor={Colors[theme].borderColor}
						buttonColor={Colors[theme].buttonColor}
						pickerBorderColor={Colors[theme].borderColor}
						pickerTextColor={Colors[theme].textColor}
						buttonTextColor={Colors[theme].textColor}
					/>
				</DoubleCard>
			</View>
			<View style={{ flexDirection: 'row', marginHorizontal: 20, marginVertical: 10 }}>
				<H1 textColor={Colors[theme].textColor}>Characteristics</H1>
			</View>
			<View style={{ height: '40%', width: '95%', borderRadius: Styles[theme].borderRadius, marginHorizontal: 10, marginBottom: 5 }}>
				<SortHeader
					columns={columns}
					sortConfig={sortConfig}
					onSortChange={setSortConfig}
					roundCorners={true}
					center
					borderRadius={Styles[theme].borderRadius}
					height={40}
					sortIndicatorColor={Colors[theme].buttonTextColor}
					tintColor={Colors[theme].tintColor}
					borderColor={Colors[theme].tintColor}
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
						borderBottomRightRadius: Styles[theme].borderRadius,
						borderBottomLeftRadius: Styles[theme].borderRadius
					}}
					ref={listRef}
					data={sortedApiData}
					renderItem={({ item, index, separators }) => (
						<TouchableHighlight style={highlightedCharacterId === item.characterId ? styles.highlightedRow : styles.row}>
							<View
								style={{ flex: 1, flexDirection: 'row', height: 45, alignItems: 'center', justifyContent: 'center' }}
								// onPress={() => { navigateToComponents(); }}
							>
								<Body2 textColor={highlightedCharacterId === item.characterId ? highlightedTextColor : Colors[theme].textColor} style={{ width: 0, flexGrow: columns[0].width, textAlign: 'center' }}>
									{item.animal}
								</Body2>
								<Body2 textColor={highlightedCharacterId === item.characterId ? highlightedTextColor : Colors[theme].textColor} style={{ width: 0, flexGrow: columns[1].width, textAlign: 'center' }}>
									{item.name}
								</Body2>
								<Body2 textColor={highlightedCharacterId === item.characterId ? highlightedTextColor: Colors[theme].textColor} style={{ width: 0, flexGrow: columns[2].width, textAlign: 'center' }}>
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

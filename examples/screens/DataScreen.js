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

// Panda Imports
import {
	Card,
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
import FlatListItemSeparator from '../components/FlatListItemSeparator';
import Loading from '../components/Loading';
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
	const [userSession, dispatch] = useThemeContext();
	const theme = themeSelector(userSession);
	// state hooks
	// useState utilizes the current state and a function that updates it
	const [highlightedIndex, setHighlightedIndex] = useState(null);
	const [characterData, setCharacterData] 	= useState([]);
	const [qualitiesData, setQualitiesData] 	= useState([]);
	const [character, setCharacter]				= useState({ id: '0', animal: '' });
	const [loading, setLoading] 				= useState(false);
	const [sortConfig, setSortConfig] 			= useState(defaultSortConfig);

	// hooks
	const sortedApiData 				= useSortedData(qualitiesData, sortConfig);

	// refs
	const listRef = useRef();

	// config
	const rowHeight = 45;

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
			backgroundColor: Colors[theme].cardColor,
		},
		highlightedRow: {
			flex: 1,
			flexDirection: 'row',
			height: 45,
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: Colors[theme].tintLightColor
		}
	});

	const updateTheme = async () => {
		setLoading(true);
		if (character.id > 0) {
			const response = await getCharacterQualities(character.id);
			dispatch({ type: 'SET_THEME', payload: { theme: response.theme } });
		} else {
			dispatch({ type: 'SET_THEME', payload: { theme: 'default' } });
		}
		setLoading(false);
	};

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
			<Loading
				activityIndicatorColor={Colors[theme].tintColor}
				backgroundColor={Colors[theme].backgroundColor}
			/>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<ThemeSelect
				character={character}
				setCharacter={setCharacter}
				characterData={characterData}
				onPress={updateTheme}
			/>
			<Card borderRadius={50} style={{ elevation: 5, width: '95%', alignItems: 'center', padding: 10, justifyContent: 'center', backgroundColor: Colors[theme].backCardColor, marginTop: 30, marginBottom: 15 }} >
				<Card borderRadius={40} style={{ elevation: 8, padding: 10, width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: Colors[theme].cardColor }} >
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
						buttonColor={Colors[theme].tintColor}
						pickerBorderColor={Colors[theme].borderColor}
						pickerText={Colors[theme].borderColor}
					/>
				</Card>
			</Card>
			<View style={{ flexDirection: 'row', marginHorizontal: 20, marginVertical: 15 }}>
				<H1 textColor={Colors[theme].textColor}>Characteristics</H1>
			</View>
			<View style={{ height: 200, width: '95%', marginHorizontal: 10, marginBottom: 5 }}>
				<SortHeader
					columns={columns}
					sortConfig={sortConfig}
					onSortChange={setSortConfig}
					roundCorners={true}
					center
					borderRadius={5}
					height={40}
					sortIndicatorColor={Colors[theme].tintDarkColor}
					tintColor={Colors[theme].tintColor}
					selectedColor={Colors[theme].tintLightColor}
					tintDarkColor={Colors[theme].tintDarkColor}
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
								<Body2 textColor={highlightedIndex === index ? Colors[theme].tintDarkColor : Colors[theme].textColor} style={{ width: 0, flexGrow: columns[0].width, textAlign: 'center' }}>
									{item.animal}
								</Body2>
								<Body2 textColor={highlightedIndex === index ? Colors[theme].tintDarkColor : Colors[theme].textColor} style={{ width: 0, flexGrow: columns[1].width, textAlign: 'center' }}>
									{item.name}
								</Body2>
								<Body2 textColor={highlightedIndex === index ? Colors[theme].tintDarkColor: Colors[theme].textColor} style={{ width: 0, flexGrow: columns[2].width, textAlign: 'center' }}>
									{item.color}
								</Body2>
							</View>
						</TouchableHighlight>
					)}
					keyExtractor={(item, index) => String(index)}
				/>
			</View>
		</SafeAreaView>
	);
};

export default DataScreen;

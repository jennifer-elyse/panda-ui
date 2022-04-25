// React Imports
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
	View,
	SafeAreaView,
	StyleSheet
} from 'react-native';

// Expo imports
import { StatusBar } from 'expo-status-bar';

import chroma from 'chroma-js';

// Panda Imports
import {
	DoubleCard,
	useSortedData,
	ScanTextInput
} from 'react-native-panda-ui';

import StickyColumnTable from '../components/StickyColumnTable';

// Local Imports
import {
	useThemeContext,
	themeSelector
} from '../contexts/ThemeContext';
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import FlatListItemSeparator from '../components/FlatListItemSeparator';
import LoadingIndicator from '../components/LoadingIndicator';
import { ButtonText } from '../components/StyledText';
import ThemeSelect from '../components/ThemeSelect';
import { getCharacters, getCharacterQualities } from '../utils/apiHandler';


const columns = [
	{ key: 'animal',	label: 'Animal', 	icon: null, width: 1 },
	{ key: 'name',		label: 'Name', 		icon: null, width: 1 },
	{ key: 'color',		label: 'Color', 	icon: null, width: 1 }
];
const stickyColumns = [
	{ key: 'name',		label: 'Name', 		icon: null, width: 1, textAlign: 'left' },
	{ key: 'color',		label: 'Color', 	icon: null, width: 1, textAlign: 'left' },
	{ key: 'faveFood',	label: 'FaveFood', 	icon: null, width: 2, textAlign: 'left' },
	{ key: 'peeves',	label: 'Peeves', 	icon: null, width: 1, textAlign: 'left' },
	{ key: 'loves',		label: 'Loves', 	icon: null, width: 2, textAlign: 'left' }
];

const stickyColumn = {
	key: 'animal',		label: 'Animal', 		icon: null, width: 1, textAlign: 'left'
};

const defaultSortConfig = {
	key: columns[0].key,
	direction: 'asc'
};


const DataScreen = () => {
	const [userSession] = useThemeContext();
	const theme = themeSelector(userSession);
	// state hooks
	// useState utilizes the current state and a function that updates it
	const [highlightedCharacterId, setHighlightedCharacterId] 	= useState(null);
	const [characterData, setCharacterData] 					= useState([]);
	const [qualitiesData, setQualitiesData] 					= useState([]);
	const [loading, setLoading] 								= useState(false);
	const [sortConfig, setSortConfig] 							= useState(defaultSortConfig);
	const [stickySortConfig, setStickySortConfig] 				= useState(defaultSortConfig);

	// hooks
	const sortedApiData = useSortedData(qualitiesData, sortConfig);
	const stickySortedApiData = useSortedData(qualitiesData, stickySortConfig);

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
			<View
				style={{ marginTop: 15, width: '95%' }}>
				<DoubleCard
					backCardElevation={5}
					cardElevation={8}
					borderRadius={Styles[theme].borderRadius}
					padding={Styles[theme].padding}
					backCardColor={Colors[theme].backCardColor}
					backCardGradient={Colors[theme].backCardGradient}
					cardColor={Colors[theme].cardColor}
				>
					<ScanTextInput
						onSubmit={() => {}}
						style={{ height: 30, width: '80%' }}
						width="95%"
						inactiveKeyboardIconColor="grey"
						textElement={<ButtonText style={{ marginRight: 10 }} buttonTextColor={Colors[theme].buttonColor}>Scan</ButtonText>}
					/>
				</DoubleCard>
			</View>
			<View
				style={{ marginTop: 30, marginBottom: 30, height: 180, width: '95%' }}>
				<StickyColumnTable
					data={stickySortedApiData}
					columns={stickyColumns}
					sortConfig={stickySortConfig}
					onSortChange={setStickySortConfig}
					stickyHeaderOptions={stickyColumn}
					headerHeight={40}
					rowHeight={50}
					headerTextColor={Colors[theme].buttonTextColor}
					textColor={Colors[theme].tintColor}
					defaultSortConfig={defaultSortConfig}
					borderRadius={Styles[theme].borderRadius}
					headerBackgroundColor={Colors[theme].tintColor}
					backgroundColor={Colors[theme].cardColor}
					sortIndicatorColor={Colors[theme].buttonTextColor}
					borderColor={Colors[theme].tintColor}
					selectedColor={Colors[theme].tabBarActiveColor}
					scrollArrowColor={Colors[theme].buttonTextColor}
				/>
			</View>
		</SafeAreaView>
	);
};

export default DataScreen;

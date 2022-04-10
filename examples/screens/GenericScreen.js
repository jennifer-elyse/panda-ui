// React Imports
import React, { useState, useEffect } from 'react';
import {
	View,
	ScrollView,
	SafeAreaView
} from 'react-native';

// Expo imports
import { StatusBar } from 'expo-status-bar';

import {
	useSortedData
} from 'react-native-panda-ui';

// Local Imports
import {
	useThemeContext,
	themeSelector
} from '../contexts/ThemeContext';
import { Form, Field } from 'react-final-form';
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import LoadingIndicator from '../components/LoadingIndicator';
import ScanTextInputField from '../components/ScanTextInputField';
import { Body3, ButtonText } from '../components/StyledText';
import StickyColumnTable from '../components/StickyColumnTable';


const GenericScreen = () => {
	const [themeContext] = useThemeContext();
	const theme = themeSelector(themeContext);
	const [columns, setColumns] = useState([]);
	const [stickyColumn, setStickyColumn] = useState({});
	// state hooks
	// useState utilizes the current state and a function that updates it
	const [loading, setLoading] 			= useState(false);
	const [fieldsData, setFieldsData] 		= useState([]);
	const [resultsData, setResultsData] 	= useState([]);
	const [rows, setRows]					= useState(0);
	const [sortConfig, setSortConfig] 		= useState({});
	const sortedApiData 					= useSortedData(resultsData, sortConfig);

	useEffect(() => {
		(async () => {
			setLoading(true);
			let data = []; // = await getScreen();
			setFieldsData(data);
			setLoading(false);
		})();
	}, []);

	const onSubmit = async values => {
		setLoading(true);
		setLoading(false);
	};

	const noUnicode = value => {
		if (value) {
			const nonAsciiRegex = /[^\u0000-\u007f]+/g;
			const nonAsciiCharacters = value ? value.match(nonAsciiRegex) : undefined;
			return (nonAsciiCharacters ? `${nonAsciiCharacters} characters are not supported` : undefined);
		}
		return undefined;
	};

	if (loading) {
		return (
			<LoadingIndicator
				activityIndicatorColor={Colors[theme].activityIndicatorColor}
				backgroundColor={Colors[theme].backgroundColor}
			/>
		);
	}

	return (
		<SafeAreaView style={{ flex: 1, marginTop: StatusBar.height, alignItems: 'center' }}>
			<View style={{ marginHorizontal: 10, alignItems: 'center' }}>
				<Form
					onSubmit={onSubmit}
					render={({ handleSubmit, form, submitting, pristine, values }) => (
						<ScrollView style={{ width: '100%' }}>
							<View style={{ marginHorizontal: 10, marginTop: 30, alignItems: 'center' }}>
								{ fieldsData && fieldsData.map((item, i) => {
									const Component = item.type === 'scan' ? ScanTextInputField : undefined;
									return (
										<View
											key={item.name}
											style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
										>
											<Field
												name={item.name}
												validate={noUnicode}
												component={Component}
												initialValue={'527281'}
												onSubmit={async(value) => {
													const response = []; // await getData(server, 'GET', context, [{ name, value }]);
													setRows(response.data.length);
													setResultsData(response.data);
													if (response.Rows > 0) {
														const keys = Object.keys(response.data[0]).sort((a, b) => a.localeCompare(b));
														const firstKey = keys[0];
														const columnFromKey = (key) => ({
															key, label: key.replaceAll('_', ' '), icon: null, width: 1
														});
														setStickyColumn(columnFromKey(firstKey));
														setColumns(
															keys
															.filter((key, i) => i !== 0)
															.map(columnFromKey)
														);

														setSortConfig({
															key: firstKey,
															direction: 'asc'
														});
													}
												}}
												style={{ width: 250, height: 40, borderWidth: 0, borderBottomWidth: 1 }}
												label={item.display_name}
												textElement={<Body3 style={{ marginRight: 10 }}>{item.display_name}</Body3>}
											/>
										</View>
									);
								})}
							</View>
						</ScrollView>
					)}
				/>
				{
					rows > 1 &&
						<StickyColumnTable
							data={sortedApiData}
							columns={columns}
							sortConfig={sortConfig}
							onSortChange={setSortConfig}
							stickyHeaderOptions={stickyColumn}
							headerHeight={40}
							rowHeight={50}
							headerTextColor={Colors[theme].buttonTextColor}
							textColor={Colors[theme].tintColor}
							defaultSortConfig={sortConfig}
							borderRadius={0}
							headerBackgroundColor={Colors[theme].tintColor}
							backgroundColor={Colors[theme].cardColor}
							sortIndicatorColor={Colors[theme].buttonTextColor}
							borderColor={Colors[theme].tintColor}
							selectedColor={Colors[theme].tabBarActiveColor}
							scrollArrowColor={Colors[theme].buttonTextColor}
						/>
				}
			</View>
		</SafeAreaView>
	);
};

export default GenericScreen;

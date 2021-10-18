// React Imports
import React, { useState, useEffect } from 'react';
import {
	View,
	SafeAreaView,
	StyleSheet,
	ScrollView,
	Platform
} from 'react-native';

// Expo imports
import { StatusBar } from 'expo-status-bar';

// Panda Imports
import {
	Card,
	CheckBoxGroup,
	Chip,
	CounterInput,
	DoubleCard,
	RadioGroup,
	ToggleButton
} from 'react-native-panda-ui';

// Local Imports
import {
	useThemeContext,
	themeSelector,
	invertedSelector,
	gradientSelector
} from '../contexts/ThemeContext';
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import LoadingIndicator from '../components/LoadingIndicator';
import { H1 } from '../components/StyledText';
import ThemeSelect from '../components/ThemeSelect';
import { getCharacters, getCharacterQualities } from '../utils/apiHandler';

const colorOptions =
	[{
		label: 'Rose Gold',
		value: '1'
	}, {
		label: 'Red',
		value: '2'
	}, {
		label: 'Grey',
		value: '3'
	}, {
		label: 'Midnight',
		value: '4'
	}];

const lovesOptions =
	[{
		label: 'Judgy People',
		value: '1',
		mutuallyExclusive: 'N'
	}, {
		label: 'Books',
		value: '2',
		mutuallyExclusive: 'N'
	}, {
		label: 'Good Conversation',
		value: '3',
		mutuallyExclusive: 'N'
	}, {
		label: 'Bling',
		value: '4',
		mutuallyExclusive: 'N'
	}];


export default function SettingsScreen() {
	const [userSession, dispatch] = useThemeContext();
	const theme = themeSelector(userSession);
	const inverted = invertedSelector(userSession);
	const gradient = gradientSelector(userSession);
	const [selectedColor, setSelectedColor] 	= useState('');
	const [selectedLoves, setSelectedLoves] 	= useState([]);
	const [loading, setLoading] 				= useState(false);

	const [characterCount, setCharacterCount] 	= useState(0);
	const [characterData, setCharacterData] 	= useState([]);
	const [qualitiesDate, setQualitiesData] 	= useState([]);

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			marginTop: StatusBar.height,
			backgroundColor: Colors[theme].backgroundColor,
			alignItems: 'center'
		}
	});

	useEffect(() => {
		(async () => {
			setLoading(true);
			let response = await getCharacters();
			setCharacterData(response.data.characters);
			response = await getCharacterQualities();
			setQualitiesData(response.data.qualities);
			setLoading(false);
		})();
	}, []);

	function handleCountChange(newCount) {
		setCharacterCount(newCount ? newCount : 1);
	}

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
			<ScrollView style={{ width: '100%' }}>
				<View style={{ alignItems: 'center' }}>
					<View style={{ width: '90%', marginTop: 30 }}>
						<DoubleCard
							backCardElevation={5}
							cardElevation={8}
							borderRadius={Styles[theme].borderRadius}
							padding={Styles[theme].padding}
							backCardColor={Colors[theme].backCardColor}
							backCardGradient={Colors[theme].backCardGradient}
							cardColor={Colors[theme].cardColor}
						>
							<View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
								<ToggleButton
									onValueChange={(value) => {
										dispatch({ type: 'SET_THEME', payload: { inverted: value } });
									}}
									size="standard"
									selectedValue={inverted}
									height={50}
									border={Styles[theme].accentBorderWidth}
									borderRadius={Styles[theme].borderRadius}
									color={Colors[theme].buttonColor}
									activeTextColor={Colors[theme].buttonTextColor}
									inactiveTextColor={Colors[theme].buttonColor}
									options={[{ label: 'Heads', value: false, svg: require('../assets/trashpanda.svg') }, { label: 'Tails', value: true, svg: require('../assets/trashcan.svg') }]}
								/>
							</View>
						</DoubleCard>
					</View>
					<View style={{ width: '90%', marginTop: 30 }}>
						<DoubleCard
							backCardElevation={5}
							cardElevation={8}
							borderRadius={Styles[theme].borderRadius}
							padding={Styles[theme].padding}
							backCardColor={Colors[theme].backCardColor}
							backCardGradient={Colors[theme].backCardGradient}
							cardColor={Colors[theme].cardColor}
						>
							<View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
								<ToggleButton
									onValueChange={(value) => {
										dispatch({ type: 'SET_THEME', payload: { gradient: value } });
									}}
									size="standard"
									selectedValue={gradient}
									height={50}
									border={Styles[theme].accentBorderWidth}
									borderRadius={Styles[theme].borderRadius}
									color={Colors[theme].buttonColor}
									activeTextColor={Colors[theme].buttonTextColor}
									inactiveTextColor={Colors[theme].buttonColor}
									options={[{ label: 'No Gradient', value: false }, { label: 'Gradient', value: true }]}
								/>
							</View>
						</DoubleCard>
					</View>
					<View style={{ flexDirection: 'row', marginHorizontal: 20, marginVertical: 15 }}>
						<H1 textColor={Colors[theme].textColor}>Which is Tsuki's color?</H1>
					</View>
					<View style={{
						width: 250,
						height: 350,
						padding: 10,
						alignItems: 'center',
						justifyContent: 'center' }}>
						<DoubleCard
							backCardElevation={5}
							cardElevation={8}
							borderRadius={Styles[theme].borderRadius}
							padding={Styles[theme].padding}
							backCardColor={Colors[theme].backCardColor}
							backCardGradient={Colors[theme].backCardGradient}
							cardColor={Colors[theme].cardColor}
						>
							<RadioGroup
								containerStyle={{
									width: '100%',
									paddingVertical: Platform.OS !== 'ios' ? 20 : 15,
									paddingHorizontal: Platform.OS !== 'ios' ? 15 : 12,
									borderWidth: Styles[theme].accentBorderWidth,
									borderStyle: 'solid',
									borderColor: Colors[theme].borderColor,
									borderRadius: Styles[theme].borderRadius - (Styles[theme].padding * 2)
								}}
								options={colorOptions}
								value={selectedColor}
								onChange={setSelectedColor}
								backgroundColor={Colors[theme].buttonColor}
								textColor={Colors[theme].buttonTextColor}
								checkedColor={Colors[theme].buttonTextColor}
								checkBoxContainerStyle={{ borderRadius: Styles[theme].borderRadius }}
							/>
						</DoubleCard>
					</View>
					<View style={{ flexDirection: 'row', marginHorizontal: 20, marginVertical: 15 }}>
						<H1 textColor={Colors[theme].textColor}>Which are Kenzo's loves?</H1>
					</View>

					<View style={{ width: 320, height: 310, padding: 10, alignItems: 'center', justifyContent: 'center' }}>
						<DoubleCard
							backCardElevation={5}
							cardElevation={8}
							borderRadius={Styles[theme].borderRadius}
							padding={Styles[theme].padding}
							backCardColor={Colors[theme].backCardColor}
							backCardGradient={Colors[theme].backCardGradient}
							cardColor={Colors[theme].cardColor}
						>
							<CheckBoxGroup
								containerStyle={{
									width: '100%',
									height: '100%',
									paddingVertical: Platform.OS !== 'ios' ? 20 : 15,
									paddingHorizontal: Platform.OS !== 'ios' ? 15 : 12,
									borderWidth: Styles[theme].accentBorderWidth,
									borderStyle: 'solid',
									borderColor: Colors[theme].borderColor,
									borderRadius: Styles[theme].borderRadius - (Styles[theme].padding * 2)
								}}
								options={lovesOptions}
								value={selectedLoves}
								onChange={setSelectedLoves}
								backgroundColor={Colors[theme].buttonColor}
								textColor={Colors[theme].buttonTextColor}
								checkedColor={Colors[theme].buttonTextColor}
								checkBoxContainerStyle={{ borderRadius: Styles[theme].borderRadius }}
							/>
						</DoubleCard>
					</View>
					<View style={{ height: 150, width: '85%', marginTop: 20, marginBottom: 35 }}>
						<DoubleCard
							backCardElevation={5}
							cardElevation={8}
							borderRadius={Styles[theme].borderRadius}
							backCardColor={Colors[theme].backCardColor}
							backCardGradient={Colors[theme].backCardGradient}
							cardColor={Colors[theme].cardColor}
						>
							<View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
								<CounterInput
									value={characterCount}
									onChange={handleCountChange}
									cardColor={Colors[theme].cardColor}
									backCardColor={Colors[theme].backCardColor}
									buttonTextColor={Colors[theme].textColor}
									textColor={Colors[theme].textColor}
								/>
							</View>
						</DoubleCard>
					</View>
					<View style={{ height: 250, width: '85%', marginTop: 20, marginBottom: 35 }}>
						<DoubleCard
							backCardElevation={5}
							cardElevation={8}
							borderRadius={Styles[theme].borderRadius}
							backCardColor={Colors[theme].backCardColor}
							backCardGradient={Colors[theme].backCardGradient}
							cardColor={Colors[theme].cardColor}
						>
							<View style={{ height: '100%', width: '100%', flexDirection: 'row', margin: 'auto', padding: 10, flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
								{qualitiesDate.map((item, i) => {
									return (
										<View
											key={i}
											style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: 10 }}
										>
											<Chip
												value={item.name}
												svg={item.svg}
												backgroundColor={Colors[theme].backgroundColor}
												deleteIconColor={Colors[theme].buttonColor}
												buttonTextColor={Colors[theme].buttonTextColor}
												chipColor={Colors[theme].buttonColor}
												borderColor={Colors[theme].borderColor}
												textStyle={{ fontWeight: 'bold' }}
												onPressDelete={() => {

												}}
											/>
										</View>);
								})}
							</View>
						</DoubleCard>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// Panda Imports
import {
	Button,
	DoubleCard,
	StyledText
} from 'react-native-panda-ui';

import StyledSelect from '../components/StyledSelect';
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import {
	useThemeContext,
	themeSelector,
	baseThemeSelector
} from '../contexts/ThemeContext';
import { getCharacterQualities } from '../utils/apiHandler';

const ThemeSelect = ({ characterData, setLoading, setQualitiesData }) => {
	const [userSession, dispatch] = useThemeContext();
	const theme = themeSelector(userSession);
	const baseTheme = baseThemeSelector(userSession);
	const [character, setCharacter]	= useState({ id: '0', animal: '', theme: theme });

	const updateTheme = async () => {
		setLoading(true);
		dispatch({ type: 'SET_THEME', payload: { theme: character.theme } });
		const response = character.id  > 0 && await getCharacterQualities(character.id);
		// console.log(response);
		setQualitiesData && setQualitiesData(response);
		setLoading(false);
	};

	useEffect(() => {
		// updater function form
		setCharacter((previousCharacter) => ({
			...previousCharacter,
			theme
		}));
	}, [theme]);

	return (
		<View style={{ height: 100, width: '95%', marginVertical: 30 }}>
			<DoubleCard
				backCardElevation={5}
				cardElevation={8}
				borderRadius={Styles[theme].borderRadius}
				backCardColor={Colors[theme].backCardColor}
				backCardGradient={Colors[theme].backCardGradient}
				cardColor={Colors[theme].cardColor}
				padding={Styles[theme].padding}
			>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
					<View style={{ borderWidth: Styles[theme].accentBorderWidth, borderColor: Colors[theme].borderColor, borderRadius: Styles[theme].borderRadius, marginRight: 8, width: '60%' }}>
						<StyledSelect
							onValueChange={(itemValue, itemIndex) => {
								setCharacter({ id: characterData[itemIndex -1]?.id, animal: characterData[itemIndex -1]?.animal, theme: itemValue });
							}}
							items={
								characterData && characterData.map((c, i) => {
									return {
										label: c.animal,
										value: c.theme,
										key: c.id
									};
								})
							}
							selectedValue={baseTheme}
							value={character.theme}
							validationErrorColor={Colors[theme].validationError}
							textColor={Colors[theme].borderColor}
							backgroundColor={Colors[theme].cardColor}
						/>
					</View>
					<View style={{ justifyContent: 'center', alignItems: 'center' }}>
						<Button
							// label="APPLY"
							//iconElement={<FontAwesome5 name="search" size={15} color={Colors[theme].buttonTextColor} />}
							textElement={<StyledText.ButtonText buttonTextColor={Colors[theme].buttonTextColor}>APPLY</StyledText.ButtonText>}
							onPress={() => updateTheme()}
							style={{ padding: 5 }}
							width={110}
							height={42}
							borderRadius={Styles[theme].borderRadius}
							textColor={Colors[theme].buttonTextColor}
							color={Colors[theme].buttonColor}
							solid={true}
							border={true}
							borderWidth={Styles[theme].buttonBorderWidth}
							gradient={Colors[theme].buttonGradient}
						/>
					</View>
				</View>
			</DoubleCard>
		</View>
	);
};

export default ThemeSelect;

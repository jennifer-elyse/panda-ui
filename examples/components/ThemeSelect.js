import React, { useState } from 'react';
import { View } from 'react-native';

// Panda Imports
import {
	Button,
	Card
} from 'react-native-panda-ui';

import StyledSelect from '../components/StyledSelect';
import Colors from '../constants/Colors';
import {
	useThemeContext,
	themeSelector
} from '../contexts/ThemeContext';
import { getCharacterQualities } from '../utils/apiHandler';

const ThemeSelect = ({ characterData, setLoading, setQualitiesData }) => {
	const [userSession, dispatch] = useThemeContext();
	const theme = themeSelector(userSession);
	const [character, setCharacter]	= useState({ id: '0', animal: '' });

	const updateTheme = async () => {
		setLoading(true);
		if (character.id > 0) {
			const response = await getCharacterQualities(character.id);
			setQualitiesData && setQualitiesData(response);
			dispatch({ type: 'SET_THEME', payload: { theme: response.theme } });
		} else {
			dispatch({ type: 'SET_THEME', payload: 'default' });
		}
		setLoading(false);
	};

	return (
		<View style={{ height: 80, width: '95%', marginTop: 10 }}>
			<Card
				elevation={5}
				borderRadius={50}
				backgroundColor={Colors[theme].backCardColor}
				style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}
			>
				<Card
					elevation={8}
					borderRadius={40}
					backgroundColor={Colors[theme].cardColor}
					style={{ alignItems: 'space-between', justifyContent: 'center', height: '100%', width: '100%', padding: 10 }}
				>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
						<View style={{ borderWidth: 1, borderColor: Colors[theme].borderColor, borderRadius: 30, marginRight: 8, width: '60%' }}>
							<StyledSelect
								onValueChange={(itemValue, itemIndex) => {
									setCharacter({ id: itemValue, animal: characterData[itemIndex -1]?.animal });
								}}
								items={
									characterData && characterData.map((c, i) => {
										return {
											label: c.animal,
											value: c.id,
											key: c.id
										};
									})
								}
								selectedValue={character?.id}
								value={character.id || 0}
								validationErrorColor={'#9c1717'}
								textColor={Colors[theme].borderColor}
								backgroundColor={Colors[theme].backgroundColor}
							/>
						</View>
						<View style={{ justifyContent: 'center', alignItems: 'center' }}>
							<Button
								label="APPLY"
								onPress={async () => updateTheme()}
								style={{ padding: 5 }}
								width={110}
								height={42}
								borderRadius={35}
								textColor={Colors[theme].buttonTextColor}
								color={Colors[theme].buttonColor}
								solid={true}
								border={true}
								borderWidth={1}
							/>
						</View>
					</View>
				</Card>
			</Card>
		</View>
	);
};

export default ThemeSelect;

import React from 'react';
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

const ThemeSelect = ({ character, setCharacter, characterData, onPress }) => {
	const [userSession] = useThemeContext();
	const theme = themeSelector(userSession);

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
								onPress={async () => onPress()}
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

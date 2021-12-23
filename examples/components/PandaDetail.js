import React from 'react';
import { View, Platform, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Image from 'react-native-remote-svg';

import { StyledText } from 'react-native-panda-ui';
import Colors from '../constants/Colors';
import {
	useThemeContext,
	themeSelector
} from '../contexts/ThemeContext';

const PandaDetail = ({ qualitiesData }) => {
	const [userSession] = useThemeContext();
	const theme = themeSelector(userSession);

	const navigation = useNavigation();

	const navigateToHelp = (qualitiesData) => {
		navigation.navigate('HomeStack', {
			screen: 'Help'
		});
	};

	return (
		<View style={{ width: '100%', alignItems: 'center' }}>
			<View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
				<StyledText.H1 textColor={Colors[theme].textColor} style={{ textAlign: 'left' }}>{qualitiesData.name}</StyledText.H1>
			</View>
			<View style={{ flexDirection: 'column', justifyContent: 'center' }}>
				<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>
					<TouchableOpacity
						onPress={() => {
							// navigateToHelp(qualitiesData);
						}}
						style={{ flexDirection: 'column', marginLeft: 5, marginVertical: 5 }}
					>
						{qualitiesData.svg ?
							<Image
								showWebviewLoader={false}
								source={qualitiesData.svg}
								style={{ height: Platform.OS === 'ios' ? 120 : 120, width: 250, marginBottom: 10, resizeMode: 'contain' }}
								resizeMode="contain"
							/>
							:
							<View
								style={{ height: 120, width: 120 }}
							/>
						}
						{qualitiesData.animal &&
							<View style={{ width: '80%', flexDirection: 'row' }}>
								<StyledText.H3 textColor={Colors[theme].textColor} style={{ marginRight: 5 }}>Animal:</StyledText.H3>
								<StyledText.Body2 textColor={Colors[theme].textColor}>{qualitiesData.animal}</StyledText.Body2>
							</View>
						}
						{qualitiesData.color &&
							<View style={{ width: '80%', flexDirection: 'row' }}>
								<StyledText.H3 textColor={Colors[theme].textColor} style={{ marginRight: 5 }}>Color:</StyledText.H3>
								<StyledText.Body2 textColor={Colors[theme].textColor}>{qualitiesData.color}</StyledText.Body2>
							</View>
						}
						{qualitiesData.faveFood &&
							<View style={{ width: '80%', flexDirection: 'row' }}>
								<StyledText.H3 textColor={Colors[theme].textColor} style={{ marginRight: 5 }}>Fave Food:</StyledText.H3>
								<StyledText.Body2 textColor={Colors[theme].textColor}>{qualitiesData.faveFood}</StyledText.Body2>
							</View>
						}
						{qualitiesData.peeves &&
							<View style={{ width: '80%', flexDirection: 'row' }}>
								<StyledText.H3 textColor={Colors[theme].textColor} style={{ marginRight: 5 }}>Peeves:</StyledText.H3>
								<StyledText.Body2 textColor={Colors[theme].textColor}>{qualitiesData.peeves}</StyledText.Body2>
							</View>
						}
						{qualitiesData.loves &&
							<View style={{ width: '80%', flexDirection: 'row', marginBottom: 30 }}>
								<StyledText.H3 textColor={Colors[theme].textColor} style={{ marginRight: 5 }}>Loves:</StyledText.H3>
								<StyledText.Body2 textColor={Colors[theme].textColor}>{qualitiesData.loves}</StyledText.Body2>
							</View>
						}
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default PandaDetail;

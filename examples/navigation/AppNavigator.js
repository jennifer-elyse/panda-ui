import 'react-native-gesture-handler';
import React from 'react';
import {
	View
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ProIcon from 'react-native-fontawesome-pro';

import Colors from '../constants/Colors';
import {
	useThemeContext,
	themeSelector
} from '../contexts/ThemeContext';
import PandaHomeScreen from '../screens/PandaHomeScreen';
import DataScreen from '../screens/DataScreen';
import ChoiceScreen from '../screens/ChoiceScreen';
import NavigationScreen from '../screens/NavigationScreen';
import HelpScreen from '../screens/HelpScreen';
import OptInScreen from '../screens/OptInScreen';
// import SplashGeneratorScreen from '../screens/SplashGeneratorScreen';

// const generateSplashMode = false;
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false
			}}>
			<Stack.Screen name="Home" 	component={PandaHomeScreen} />
			{/*<Stack.Screen name="Data" 	component={DataScreen} />*/}
			<Stack.Screen name="Help" 	component={HelpScreen} />
		</Stack.Navigator>
	);
}

const AppNavigator = () => {
	const [userSession] = useThemeContext();
	const theme = themeSelector(userSession);

	// if (generateSplashMode) {
	// 	return <SplashGeneratorScreen />;
	// }

	return (
		<NavigationContainer>
			<Tab.Navigator
				tabBarOptions={{
					headerShown: false,
					activeTintColor: Colors[theme].buttonTextColor,
					inactiveTintColor: 'lightgrey',
					activeBackgroundColor: Colors[theme].tintColor,
					inactiveBackgroundColor: Colors[theme].tintDarkColor
				}}
				screenOptions={({ route }) => ({
					headerShown: false,
					tabBarActiveTintColor: Colors[theme].buttonTextColor,
					tabBarInactiveTintColor: 'lightgrey',
					tabBarActiveBackgroundColor: Colors[theme].tintColor,
					tabBarInactiveBackgroundColor: Colors[theme].tintDarkColor,
					// eslint-disable-next-line react/display-name
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;
						// console.log('route.name', route.name);
						if (route.name === 'HomeStack') {
							iconName = focused
								? 'home-heart'
								: 'home';
						} else if (route.name === 'Choices') {
							iconName = 'filter';
						} else if (route.name === 'Navigation') {
							iconName = 'bars';
						} else if (route.name === 'Data') {
							iconName = 'table';
						} /* else if (route.name === 'OptIn') {
							iconName = 'optin-monster';
						} */

						return (<ProIcon
							style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 10 }}
							name={iconName}
							size={18}
							color={Colors[theme].buttonTextColor} />);
					}
				})}
			>
				<Tab.Screen
					name="HomeStack"
					component={HomeStack}
				/>
				<Tab.Screen name="Choices" 		component={ChoiceScreen} />
				<Tab.Screen name="Data" 		component={DataScreen} />
				<Tab.Screen name="Navigation" 	component={NavigationScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigator;

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';

import ProIcon from 'react-native-fontawesome-pro';
import chroma from 'chroma-js';
import { LinearGradient } from 'expo-linear-gradient';

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

const mainTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: 'transparent'
	}
};

function HomeStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false
			}}>
			<Stack.Screen name="HomeScreen" component={PandaHomeScreen} />
			{/*<Stack.Screen name="Data" 	component={DataScreen} />*/}
			<Stack.Screen name="Help" 	component={HelpScreen} />
		</Stack.Navigator>
	);
}

const AppNavigator = () => {
	const [userSession] = useThemeContext();
	const theme = themeSelector(userSession);
	const inactiveTintColor =
		chroma.contrast(Colors[theme].tintDarkColor, '#fff') > 5
			? '#fff' : '#000';
	const activeTintColor =
		chroma.contrast(Colors[theme].tintColor, '#fff') > 5
			? '#fff' : '#000';

	// if (generateSplashMode) {
	// 	return <SplashGeneratorScreen />;
	// }

	return (
		<NavigationContainer>
			<Tab.Navigator
				tabBarOptions={{
					headerShown: false,
					activeTintColor: activeTintColor,
					inactiveTintColor
					// activeBackgroundColor: Colors[theme].tintColor,
					// inactiveBackgroundColor: Colors[theme].tintDarkColor
				}}
				tabBar={(props) => {
					return (
						<LinearGradient
							colors={Colors[theme].primaryGradient}
							start={[0, 0]}
							end={[1, 1]}
							width="100%"
						>
							<BottomTabBar
								{...props}
								style={{ backgroundColor: 'transparent' }}
							/>
						</LinearGradient>
					);
				}}
				screenOptions={({ route }) => ({
					headerShown: false,
					tabBarActiveTintColor: activeTintColor,
					tabBarInactiveTintColor: inactiveTintColor,
					// tabBarActiveBackgroundColor: Colors[theme].tintColor,
					// tabBarInactiveBackgroundColor: Colors[theme].tintDarkColor,
					// eslint-disable-next-line react/display-name
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;
						let styleColor = focused ? activeTintColor : inactiveTintColor;
						// console.log('route.name', route.name);
						if (route.name === 'Home') {
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
							color={styleColor} />);
					}
				})}
			>
				<Tab.Screen
					name="Home"
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

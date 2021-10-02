import 'react-native-gesture-handler';
import React from 'react';
import {
	View,
	Text,
	TouchableOpacity
} from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';

import ProIcon from 'react-native-fontawesome-pro';
import chroma from 'chroma-js';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../constants/Colors';
import {
	useThemeContext,
	themeSelector,
	gradientSelector
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
	const gradient = gradientSelector(userSession);
	const inactiveTintColor =
		chroma.contrast(Colors[theme].tabBarInactiveColor, '#fff') > 5
			? '#fff' : '#000';
	const activeTintColor =
		chroma.contrast(Colors[theme].tabBarActiveColor, '#fff') > 5
			? '#fff' : '#000';

	// if (generateSplashMode) {
	// 	return <SplashGeneratorScreen />;
	// }

	return (
		<NavigationContainer>
			<Tab.Navigator
				tabBarOptions={{
					headerShown: false,
					activeTintColor,
					inactiveTintColor,
					activeBackgroundColor: Colors[theme].tabBarActiveColor,
					inactiveBackgroundColor: Colors[theme].tabBarInactiveColor
				}}
				tabBar={(props) => {
					return gradient ? (
						<LinearGradient
							colors={Colors[theme].tabBarGradient}
							start={[0, 0]}
							end={[1, 1]}
						>
							<MyTabBar
								{...props}
								style={{ backgroundColor: 'transparent', overflow: 'hidden' }}
							/>
						</LinearGradient>
					) : (
						<BottomTabBar
							{...props}
							style={{ backgroundColor: 'transparent', overflow: 'hidden' }}
						/>
					);
				}}
				screenOptions={({ route }) => ({
					headerShown: false,
					tabBarActiveTintColor: activeTintColor,
					tabBarInactiveTintColor: inactiveTintColor,
					tabBarActiveBackgroundColor: Colors[theme].tabBarActiveColor,
					tabBarInactiveBackgroundColor: Colors[theme].tabBarInactiveColor,
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

function MyTabBar({ state, descriptors, navigation, ...props }) {
	const focusedOptions = descriptors[state.routes[state.index].key].options;
	// console.log('descriptors', descriptors);
	if (focusedOptions.tabBarVisible === false) {
		return null;
	}

	return (
		<View style={{ flexDirection: 'row', height: 60 }}>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				{/*console.log('options', options);*/}
				const label =
				options.tabBarLabel !== undefined
					? options.tabBarLabel
					: options.title !== undefined
						? options.title
						: route.name;

				const tabBarIcon = options.tabBarIcon;
				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name);
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: 'tabLongPress',
						target: route.key
					});
				};

				return (
					<TouchableOpacity
						accessibilityRole="button"
						accessibilityState={isFocused ? { selected: true } : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						onPress={onPress}
						onLongPress={onLongPress}
						style={{ flex: 1 }}
						key={route.key}
					>
						<View style={{ alignItems: 'center', marginTop: 15 }}>
							{tabBarIcon({
								focused: isFocused,
								color: isFocused ? props.activeTintColor : props.inactiveTintColor,
								size: 20
							})}
							<Text style={{ color: isFocused ? props.activeTintColor : props.inactiveTintColor }}>
								{label}
							</Text>
						</View>
					</TouchableOpacity>
				);
			})}
		</View>
	);
}

export default AppNavigator;

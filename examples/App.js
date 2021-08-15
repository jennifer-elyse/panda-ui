import React, { useState } from 'react';
import { View, Platform, LogBox } from 'react-native';
import { ErrorBoundary } from 'react-error-boundary';

// import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';

import { configureFontAwesomePro } from 'react-native-fontawesome-pro';

import Colors from './constants/Colors';
import { ToastContextProvider } from './contexts/ToastContext';
import { ThemeContextProvider } from './contexts/ThemeContext';
import {
	useThemeContext,
	themeSelector
} from './contexts/ThemeContext';
import AppNavigator from './navigation/AppNavigator';
import ErrorFallback from './components/ErrorFallback';

const errorBoundaryHandler = (error, info) => {
	// TODO: send error
};

export default function AppWrap() {
	return (
		<ErrorBoundary
			FallbackComponent={ErrorFallback}
			onError={errorBoundaryHandler}
		>
			<ThemeContextProvider>
				<App />
			</ThemeContextProvider>
		</ErrorBoundary>
	);
}

function App() {
	const [isLoadingComplete, setLoadingComplete] = useState(false);
	const [userSession] = useThemeContext();

	const theme = themeSelector(userSession);

	const container = {
		flex: 1,
		height: '100%',
		backgroundColor: Colors[theme].backgroundColor
	};


	// @TODO: This is to hide a Warning caused by NativeBase after upgrading to RN 0.62
	LogBox.ignoreLogs([
		'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
		'Warning: componentWillMount is deprecated',
		'Warning: componentWillUpdate is deprecated',
		'Warning: componentWillUnmount is deprecated',
		'Warning: componentWillReceiveProps is deprecated',
		'Warning: componentWillReceiveProps has been renamed'
	]);
	// ------- END OF WARNING SUPPRESSION

	configureFontAwesomePro();


	if (!isLoadingComplete) {
		return (
			<AppLoading
				startAsync={loadResourcesAsync}
				onError={handleLoadingError}
				onFinish={() => handleFinishLoading(setLoadingComplete)}
			/>
		);
	}

	return (
		<View style={container}>
			<LinearGradient
				colors={Colors[theme].primaryGradient}
				start={[0, 0]}
				end={[1, 10]}
				style={{
					width: '100%',
					height: Platform.OS !== 'ios' ? Constants.statusBarHeight + 10 : 20
				}}
			>
				<StatusBar
					translucent={true}
					backgroundColor={'transparent'}
					style="light"
				/>
			</LinearGradient>
			<ToastContextProvider>
				<AppNavigator />
			</ToastContextProvider>
		</View>
	);
}

async function loadResourcesAsync() {
	// await Promise.all([
	// 	Asset.loadAsync([
	// 		require('./assets/images/panda.svg'),
	// 		require('./assets/images/redpanda.svg')
	// 	])
	// ]);
	return true;
}

function handleLoadingError(error) {
	// In this case, you might want to report the error to your error reporting
	// service, for example Sentry
	console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
	setLoadingComplete(true);
}

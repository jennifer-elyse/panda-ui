import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default function LoadingIndicator({
	activityIndicatorColor='#213a63',
	backgroundColor='#fff',
	height }) {
	return (
		<View
			style={
				height ? { height, elevation: 10 } : [StyleSheet.absoluteFill, { position: 'absolute', zIndex: 10, height: '100%', width: '100%', backgroundColor }]
			}
		>
			<ActivityIndicator
				size="large"
				color={activityIndicatorColor}
				style={[StyleSheet.absoluteFill, { position: 'absolute', zIndex: 10, height: '100%', width: '100%' }]} />
		</View>
	);
}

LoadingIndicator.propTypes = {
	activityIndicatorColor: PropTypes.string,
	backgroundColor: PropTypes.string,
	height: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string
	])
};

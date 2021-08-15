import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default function Loading({ activityIndicatorColor='#213a63', backgroundColor='#fff' }) {
	return (
		<View
			style={[
				StyleSheet.absoluteFill,
				{
					position: 'absolute',
					zIndex: 10,
					height: '100%',
					width: '100%',
					elevation: 10,
					backgroundColor
				}
			]}
		>
			<ActivityIndicator
				size="large"
				color={activityIndicatorColor}
				style={[StyleSheet.absoluteFill, { position: 'absolute', zIndex: 10, height: '100%', width: '100%' }]} />
		</View>
	);
}

Loading.propTypes = {
	activityIndicatorColor: PropTypes.string,
	backgroundColor: PropTypes.string
};

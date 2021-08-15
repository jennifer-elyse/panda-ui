import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';

export default function ErrorFallback({ error }) {
	return (<View style={styles.container}><Text>{error.message}</Text></View>);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	}
});

ErrorFallback.propTypes = {
	error: PropTypes.object
};

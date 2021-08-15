import React from 'react';
import { View } from 'react-native';

export default function FlatListItemSeparator({ color='lightgrey', backgroundColor }) {
	return (
		<View
			style={{
				height: 1,
				width: '100%',
				alignItems: 'center',
				backgroundColor: backgroundColor
			}}
		>
			<View
				style={{
					height: 1,
					width: '90%',
					backgroundColor: color
				}}
			/>
		</View>
	);
}

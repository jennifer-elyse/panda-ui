import React, { useState } from 'react';
import { View, StyleSheet, LayoutAnimation, UIManager, Platform } from 'react-native';
import Button from './Button';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
	UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const Drawer = (props) => {
	const { children, DrawerContent } = props;
  const [menuToggle, setMenuToggle] = useState(false);

  const accentTextColor = 'salmon';
  const color = 'black';

  const toggleMenu = () => {
		LayoutAnimation.configureNext(
			LayoutAnimation.create(200, LayoutAnimation.Types.linear, LayoutAnimation.Properties.opacity)
		);
		setMenuToggle(prev => !prev);
	};

  return (
		<View style={styles.container}>
			{menuToggle && <View style={styles.sideMenu}>{DrawerContent}</View>}
			<View>
				{children}
				<View style={styles.innerContainer}>
					<Button
						label=">"
						onPress={toggleMenu}
						accentTextColor={accentTextColor}
						color={color}
					/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
    flexDirection: 'row'
  },
	innerContainer: {
    position: 'absolute',
    top: 300,
    left: 0
  },
	sideMenu: {
		width: 300,
		height: '100%',
		backgroundColor: 'salmon'
	}
});

export default Drawer;

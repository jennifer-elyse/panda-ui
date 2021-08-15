import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Platform
} from 'react-native';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
	faFrownOpen as farFrownOpen,
	faFrown as farFrown,
	faMeh as farMeh,
	faSmile as farSmile,
	faGrin as farGrin
} from '@fortawesome/pro-regular-svg-icons';
import {
	faFrownOpen as fasFrownOpen,
	faFrown as fasFrown,
	faMeh as fasMeh,
	faSmile as fasSmile,
	faGrin as fasGrin
} from '@fortawesome/pro-solid-svg-icons';

// Third Party Imports
import Image from 'react-native-remote-svg';

export default function Feedback({ theme='fontAwesome', rating, setRating, style, title='' }) {
	const inputFor = {
		textAlign: 'left',
		paddingHorizontal: 10,
		marginHorizontal: 30,
		color: '#000000',
		fontWeight: 'bold',
		fontSize: 12
	};
	const row = {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 5,
		width: '100%',
		flexGrow: 1,
		height: 100,
		...style
	};

	return (
		<View style={row}>
			<View style={styles.starColumn}>
				<Text style={inputFor}>
					{title}
				</Text>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
						marginTop: 10
					}}>
					{theme ===  'fontAwesome' && // frown-open, frown, meh, smile, grin faFrownOpen, faFrown, faMeh, faSmile, faGrin
						[
							{ rating: 1, color: '#dc1414', icon: farFrownOpen, selectedIcon: fasFrownOpen },
							{ rating: 2, color: '#fb880a', icon: farFrown, selectedIcon: fasFrown },
							{ rating: 3, color: '#edc41c', icon: farMeh, selectedIcon: fasMeh },
							{ rating: 4, color: '#57c529', icon: farSmile, selectedIcon: fasSmile },
							{ rating: 5, color: '#2eb733', icon: farGrin, selectedIcon: fasGrin }
						].map(value => (
							<TouchableOpacity
								onPress={() => setRating(value.rating)}
								key={value.rating}
							>
								<FontAwesomeIcon
									style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 10 }}
									icon={rating === value.rating ? value.selectedIcon : value.icon}
									size={36}
									color={rating === value.rating ? value.color : (rating === 0 ? 'grey' : 'lightgrey')} />
								<View style={{ height: 5, width: '100%', backgroundColor: value.color, marginTop: 5, alignItems: 'center', justifyContent: 'center' }} />
							</TouchableOpacity>
						))
					}
					{theme ===  'panda' && // frown-open, frown, meh, smile, grin faFrownOpen, faFrown, faMeh, faSmile, faGrin
						[
							{ rating: 1, color: '#dc1414', icon: require('./assets/images/openFrownPanda.svg'), selectedIcon: require('./assets/images/_openFrownPanda.svg') },
							{ rating: 2, color: '#fb880a', icon: require('./assets/images/frownPanda.svg'), selectedIcon: require('./assets/images/_frownPanda.svg') },
							{ rating: 3, color: '#edc41c', icon: require('./assets/images/mehPanda.svg'), selectedIcon: require('./assets/images/_mehPanda.svg') },
							{ rating: 4, color: '#57c529', icon: require('./assets/images/smilePanda.svg'), selectedIcon: require('./assets/images/_smilePanda.svg') },
							{ rating: 5, color: '#2eb733', icon: require('./assets/images/grinPanda.svg'), selectedIcon: require('./assets/images/_grinPanda.svg') }
						].map(value => (
							<TouchableOpacity
								onPress={() => setRating(value.rating)}
								key={value.rating}
								style={{ alignItems: 'center', justifyContent: 'center', maxWidth: 60, maxHeight: 45 }}
							>
								<Image
									showWebviewLoader={false}
									style={{
										height: Platform.OS === 'ios' ? 120 : 40,
										width: Platform.OS === 'ios' ? 250 : 50,
										alignItems: 'center',
										justifyContent: 'center',
										marginHorizontal: 5,
										marginTop: Platform.OS === 'ios' ? -8 : 0,
										resizeMode: 'contain',
										transform: [
											{ scaleX: Platform.OS === 'ios' ? 0.6 : 1 },
											{ scaleY: Platform.OS === 'ios' ? 0.6 : 1 }]
									}}
									source={rating === value.rating ? value.selectedIcon : value.icon}
									resizeMode="contain"
								/>
								<View style={{ height: 5, width: '100%', backgroundColor: value.color, marginTop:  Platform.OS === 'ios' ? -30 : 5, alignItems: 'center', justifyContent: 'center' }} />
							</TouchableOpacity>
						))
					}
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	starColumn: {
		width: '100%',
		paddingVertical: 5,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

Feedback.propTypes = {
	rating: PropTypes.number.isRequired,
	setRating: PropTypes.func.isRequired,
	style: PropTypes.object,
	title: PropTypes.string,
	theme: PropTypes.string
};

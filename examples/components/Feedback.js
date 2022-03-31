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
import openFrownPanda 	from './assets/images/openFrownPanda.svg';
import _openFrownPanda 	from './assets/images/_openFrownPanda.svg';
import frownPanda 		from './assets/images/frownPanda.svg';
import _frownPanda 		from './assets/images/_frownPanda.svg';
import mehPanda 		from './assets/images/mehPanda.svg';
import _mehPanda 		from './assets/images/_mehPanda.svg';
import smilePanda 		from './assets/images/smilePanda.svg';
import _smilePanda 		from './assets/images/_smilePanda.svg';
import grinPanda 		from './assets/images/grinPanda.svg';
import _grinPanda 		from './assets/images/_grinPanda.svg';

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
							{ rating: 1, color: '#dc1414', icon: openFrownPanda, selectedIcon: _openFrownPanda },
							{ rating: 2, color: '#fb880a', icon: frownPanda, selectedIcon: _frownPanda },
							{ rating: 3, color: '#edc41c', icon: mehPanda, selectedIcon: _mehPanda },
							{ rating: 4, color: '#57c529', icon: smilePanda, selectedIcon: _smilePanda },
							{ rating: 5, color: '#2eb733', icon: grinPanda, selectedIcon: _grinPanda }
						].map(value => {
							const SourceComponent = rating === value.rating ? value.selectedIcon : value.icon;
							return (
								<TouchableOpacity
									onPress={() => setRating(value.rating)}
									key={value.rating}
									style={{ alignItems: 'center', justifyContent: 'center', maxWidth: 60, maxHeight: 45 }}
								>
									<SourceComponent
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
										resizeMode="contain"
									/>
									<View style={{ height: 5, width: '100%', backgroundColor: value.color, marginTop:  Platform.OS === 'ios' ? -30 : 5, alignItems: 'center', justifyContent: 'center' }} />
								</TouchableOpacity>
							);
						})
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

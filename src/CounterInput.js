import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import ProIcon from 'react-native-vector-icons/FontAwesome5';

import Card from './Card';

const CounterInput = ({ value, onChange, renderLabel,
	buttonTextColor='#000', textColor='#000', containerStyle,
	backCardColor, cardColor='#fff'
}) => {

	const increment = () => onChange(value + 1);
	const decrement = () => onChange(value - 1);
	const labelStyle = {
		color: textColor,
		paddingHorizontal: 65,
		fontSize: 56
	};
	const container  = {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 5,
		...containerStyle
	};

	return (
		<View style={container}>
			{ backCardColor ?
				(
					<Card
						backgroundColor={backCardColor}
						elevation={5}
						height={50}
						width={50}
						style={{ alignItems: 'center' }}
						borderRadius={50}
					>
						<Card
							solid={false}
							backgroundColor={cardColor}
							elevation={8}
							height={40}
							width={40}
							style={{ alignItems: 'center', marginTop: 5 }}
							borderRadius={50}
							onPress={decrement}
						>
							<View style={{ alignSelf: 'center',  alignItems: 'center', justifyItems: 'center', marginTop: 9 }}>
								<ProIcon name="minus" size={21} color={buttonTextColor} />
							</View>
						</Card>
					</Card>
				) : (
					<Card
						backgroundColor={cardColor}
						elevation={5}
						height={40}
						width={40}
						style={{ alignItems: 'center', justifyItems: 'center' }}
						borderRadius={50}
						onPress={increment}
					>
						<View style={{ alignSelf: 'center',  alignItems: 'center', justifyItems: 'center', marginTop: 9 }}>
							<ProIcon name="plus" size={21} color={buttonTextColor} />
						</View>
					</Card>
				)
			}
			<Text style={labelStyle}>{renderLabel ? renderLabel(value) : value}</Text>
			{ backCardColor ?
				(
					<Card
						backgroundColor={backCardColor}
						elevation={5}
						height={50}
						width={50}
						style={{ alignItems: 'center' }}
						borderRadius={50}
					>
						<Card
							solid={false}
							backgroundColor={cardColor}
							elevation={8}
							height={40}
							width={40}
							style={{ alignItems: 'center', marginTop: 5 }}
							borderRadius={50}
							onPress={increment}
						>
							<View style={{ alignSelf: 'center',  alignItems: 'center', justifyItems: 'center', marginTop: 9 }}>
								<ProIcon name="plus" size={21} color={buttonTextColor} />
							</View>
						</Card>
					</Card>
				) : (
					<Card
						backgroundColor={cardColor}
						elevation={5}
						height={40}
						width={40}
						style={{ alignItems: 'center', justifyItems: 'center' }}
						borderRadius={50}
						onPress={increment}
					>
						<View style={{ alignSelf: 'center',  alignItems: 'center', justifyItems: 'center', marginTop: 9 }}>
							<ProIcon name="plus" size={21} color={buttonTextColor} />
						</View>
					</Card>
				)
			}
		</View>
	);
};

CounterInput.propTypes = {
	value: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired,
	renderLabel: PropTypes.func,
	buttonTextColor: PropTypes.string,
	textColor: PropTypes.string,
	backCardColor: PropTypes.string,
	cardColor: PropTypes.string,
	containerStyle: PropTypes.object
};

export default CounterInput;

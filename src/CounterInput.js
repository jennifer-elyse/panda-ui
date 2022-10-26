import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import ProIcon from 'react-native-vector-icons/FontAwesome5';

import Card from './Card';

const inputSizes = {
	small: 'small',
	standard: 'standard',
	large: 'large',
	xlarge: 'xlarge'
};

const sizes = {
	small: { size: 35, margin: 2.5, icon: 11, font: 36 },
	standard: { size: 40, margin: 3.5, icon: 16, font: 46 },
	large: { size: 50, margin: 4.5, icon: 21, font: 56 },
	xlarge: { size: 60, margin: 5.5, icon: 30, font: 66 }
};

const CounterInput = (props) => {
	const {
		value,
		onChange,
		renderLabel,
		counterColor='#000',
		containerStyle,
		backCardColor,
		backCardGradient,
		incrementBackgroundColor='#fff',
		decrementBackgroundColor='#fff',
		incrementTextColor='#000',
		decrementTextColor='#000',
		variationNumberOfCards=1,
		cardPadding=10,
		size='standard',
		borderRadius=50
	} = props;

	const increment = () => onChange(value + 1);
	const decrement = () => onChange(value - 1);
	const container  = {
		flexDirection: 'row',
		alignItems: 'center',
		padding: cardPadding / 2,
		...containerStyle
	};

	const backCardDimensionSize = size === inputSizes.large ? sizes.large.size
		: size === inputSizes.standard ? sizes.standard.size
			: size === inputSizes.xlarge ? sizes.xlarge.size
				: sizes.small.size;

	const cardDimensionSize = size === inputSizes.large ? sizes.large.size - cardPadding
		: size === inputSizes.standard ? sizes.standard.size - cardPadding
			: size === inputSizes.xlarge ? sizes.xlarge.size
				: sizes.small.size - cardPadding;

	const margin = size === inputSizes.large ? sizes.large.margin
		: size === inputSizes.standard ? sizes.standard.margin
			: size === inputSizes.small ? sizes.small.margin
				: sizes.xlarge.margin;

	const iconSize = size === inputSizes.large ? sizes.large.icon
		: size === inputSizes.standard ? sizes.standard.icon
			: size === inputSizes.xlarge ? sizes.xlarge.icon
				: sizes.small.icon;

	const labelStyle = {
		color: counterColor,
		// paddingHorizontal: size === inputSizes.large ? sizes.large.size : size === inputSizes.standard ? sizes.standard.size : sizes.small.size,
		fontSize: size === inputSizes.large ? sizes.large.font
			: size === inputSizes.standard ? sizes.standard.font
				: size === inputSizes.xlarge ? sizes.xlarge.font
					: sizes.small.font,
		width: '100%',
		textAlign: 'center'
	};

	return (
		<View style={container}>
			{ variationNumberOfCards === 2 ?
				(
					<Card
						backgroundColor={backCardColor}
						elevation={5}
						height={backCardDimensionSize}
						width={backCardDimensionSize}
						style={{ alignItems: 'center', justifyContent: 'center' }}
						borderRadius={borderRadius}
						gradient={backCardGradient && backCardGradient.length > 1 ? backCardGradient : []}
					>
						<Card
							backgroundColor={incrementBackgroundColor}
							elevation={8}
							height={cardDimensionSize}
							width={cardDimensionSize}
							style={{ alignItems: 'center', justifyContent: 'center', marginBottom: cardPadding / 2 }}
							borderRadius={borderRadius}
							onPress={decrement}
						>
							<View
								style={{
									backgroundColor: decrementBackgroundColor,
									height: cardDimensionSize,
									width: cardDimensionSize,
									overflow: 'hidden',
									borderRadius: borderRadius,
									alignSelf: 'center',
									alignItems: 'center',
									justifyContent: 'center',
									marginTop: margin }}
							>
								<ProIcon
									size={iconSize}
									name="minus"
									color={decrementTextColor}
								/>
							</View>
						</Card>
					</Card>
				) : (
					<Card
						backgroundColor={backCardColor}
						elevation={5}
						height={cardDimensionSize}
						width={cardDimensionSize}
						style={{ alignItems: 'center', justifyContent: 'center' }}
						borderRadius={borderRadius}
						onPress={decrement}
					>
						<View
							style={{
								backgroundColor: decrementBackgroundColor,
								height: cardDimensionSize,
								width:  cardDimensionSize,
								overflow: 'hidden',
								borderRadius: borderRadius,
								alignSelf: 'center',
								alignItems: 'center',
								justifyContent: 'center' }}
						>

							<ProIcon
								size={iconSize}
								name="minus"
								color={decrementTextColor}
							/>
						</View>
					</Card>
				)
			}
			<View
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					width: size === inputSizes.large ? 120 : size === inputSizes.standard ? 100 : 70,
					margin: 'auto',
					textAlign: 'center'
				}}
			>
				<Text style={labelStyle}>{renderLabel ? renderLabel(value) : value}</Text>
			</View>
			{ variationNumberOfCards === 2 ?
				(
					<Card
						backgroundColor={backCardColor}
						gradient={backCardGradient && backCardGradient.length > 1 ? backCardGradient : []}
						elevation={5}
						height={backCardDimensionSize}
						width={backCardDimensionSize}
						style={{ alignItems: 'center', justifyContent: 'center' }}
						borderRadius={borderRadius}
					>
						<Card
							solid={false}
							backgroundColor={incrementBackgroundColor}
							elevation={8}
							height={cardDimensionSize}
							width={cardDimensionSize}
							style={{ alignItems: 'center', justifyContent: 'center', marginBottom: cardPadding / 2 }}
							borderRadius={borderRadius}
							onPress={increment}
						>
							<View
								style={{
									backgroundColor: incrementBackgroundColor,
									height: cardDimensionSize,
									width: cardDimensionSize,
									overflow: 'hidden',
									borderRadius: borderRadius,
									alignSelf: 'center',
									alignItems: 'center',
									justifyContent: 'center',
									marginTop: margin }}
							>
								<ProIcon
									size={iconSize}
									name="plus"
									color={incrementTextColor}
								/>
							</View>
						</Card>
					</Card>
				) : (
					<Card
						backgroundColor={backCardColor}
						elevation={5}
						height={cardDimensionSize}
						width={cardDimensionSize}
						style={{ alignItems: 'center', justifyContent: 'center' }}
						borderRadius={borderRadius}
						onPress={increment}
					>
						<View
							style={{
								backgroundColor: incrementBackgroundColor,
								height: cardDimensionSize,
								width: cardDimensionSize,
								overflow: 'hidden',
								borderRadius: borderRadius,
								alignSelf: 'center',
								alignItems: 'center',
								justifyContent: 'center' }}
						>
							<ProIcon
								size={iconSize}
								name="plus"
								color={incrementTextColor}
							/>
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
	counterColor: PropTypes.string,
	textColor: PropTypes.string,
	backCardColor: PropTypes.string,
	backCardGradient: PropTypes.array,
	incrementBackgroundColor: PropTypes.string,
	decrementBackgroundColor: PropTypes.string,
	incrementTextColor: PropTypes.string,
	decrementTextColor: PropTypes.string,
	containerStyle: PropTypes.object,
	variationNumberOfCards: PropTypes.number,
	cardPadding: PropTypes.number,
	size: PropTypes.oneOf([inputSizes.small, inputSizes.standard, inputSizes.large, inputSizes.xlarge]),
	borderRadius: PropTypes.number
};

export default CounterInput;

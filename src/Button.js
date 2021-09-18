import React from 'react';
import PropTypes from 'prop-types';
import {
	View,
	TouchableNativeFeedback,
	Text,
	Platform
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Image from 'react-native-remote-svg';

import warning from './utils/warning';

const Button = (props) => {
	const {
		onPress,
		icon,
		svg,
		label,
		disabled,
		width='auto',
		size='standard',
		solid=true,
		color,
		gradient,
		style,
		fontSize,
		allowInteraction=true,
		borderRadius=0,
		borderWidth=0,
		height,
		dropShadow=false,
		column=false,
		borderColor,
		disabledColor='lightgrey',
		disabledGradient,
		textColor='#fff',
		TextComponent=Text
	} = props;

	warning(icon || label || svg, 'Must provide "icon", "label", or "svg" to <Button>.');

	const displayColor = disabled ? disabledColor : gradient.length > 1 ? 'transparent' : color;
	const backgroundColor = solid ? displayColor : 'transparent';

	const buttonStyle = {
		...style,
		width: width,
		height: height > 0 ? height : size === 'small' ? 30 : size === 'standard' ? 35 : 45,
		flexDirection: column ? 'column' : 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: backgroundColor,
		borderRadius: borderRadius,
		overflow: 'hidden'
	};

	const buttonStyleBorder = {
		...buttonStyle,
		borderStyle: 'solid',
		borderColor: borderColor ? borderColor : displayColor,
		borderWidth: borderWidth
	};

	const buttonStyleDropShadow = {
		...buttonStyle,
		borderWidth: 1,
		borderRadius: 2,
		borderColor: '#ddd',
		borderBottomWidth: 0,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 1
	};

	const Component = (disabled || !allowInteraction) ? View : TouchableNativeFeedback;

	return (
		<Component onPress={(disabled || !allowInteraction) ? undefined : () => onPress()} style={buttonStyle }>
			{gradient.length > 1 ?
				Platform.OS === 'ios' ?
					(
						<View style={borderWidth > 0 && !gradient ?
							buttonStyleBorder
							:
							dropShadow ? buttonStyleDropShadow : buttonStyle }>
							<LinearGradient
								colors={disabled ? disabledGradient : gradient}
								start={[0, 0]}
								end={[1, 1]}
								width="100%"
								height="100%"
							>
								<View style={borderWidth > 0 && !gradient ?
									buttonStyleBorder
									:
									dropShadow ? buttonStyleDropShadow : buttonStyle }>

									<ButtonContent
										icon={icon}
										svg={svg}
										label={label}
										disabled={disabled}
										size={size}
										solid={solid}
										color={color}
										fontSize={fontSize}
										disabledColor={disabledColor}
										textColor={textColor}
										TextComponent={TextComponent}
									/>
								</View>
							</LinearGradient>
						</View>)

					:
					(<LinearGradient
						colors={disabled ? disabledGradient : gradient}
						start={[0, 0]}
						end={[1, 1]}
						width="100%"
						height="100%"
						style={borderWidth > 0 ?
							buttonStyleBorder
							:
							dropShadow ? buttonStyleDropShadow : buttonStyle}
					>
						<View style={borderWidth > 0 && !gradient ?
							buttonStyleBorder
							:
							dropShadow ? buttonStyleDropShadow : buttonStyle }>
							<ButtonContent
								icon={icon}
								svg={svg}
								label={label}
								disabled={disabled}
								size={size}
								solid={solid}
								color={color}
								fontSize={fontSize}
								disabledColor={disabledColor}
								textColor={textColor}
								TextComponent={TextComponent}
							/>
						</View>
					</LinearGradient>)
				:
				(<View style={borderWidth > 0 ?
					buttonStyleBorder
					:
					dropShadow ? buttonStyleDropShadow : buttonStyle }>
					<ButtonContent
						icon={icon}
						svg={svg}
						label={label}
						disabled={disabled}
						size={size}
						solid={solid}
						color={color}
						fontSize={fontSize}
						disabledColor={disabledColor}
						textColor={textColor}
						TextComponent={TextComponent}
					/>
				</View>)
			}
		</Component>
	);
};


const ButtonContent = (props) => {
	const {
		icon,
		svg,
		label,
		disabled,
		size='standard',
		solid=true,
		color,
		fontSize,
		disabledColor='lightgrey',
		textColor='#fff',
		TextComponent=Text
	} = props;

	warning(icon || label || svg, 'Must provide "icon", "label", or "svg" to <Button>.');

	const displayColor = disabled ? disabledColor : color;
	const contentColor = solid ? textColor : displayColor;

	const buttonLabelStyle = {
		color: contentColor,
		fontSize: fontSize || (size === 'small' ? 14 : size === 'standard' ? 16 : 20),
		fontWeight: 'bold',
		paddingLeft: icon || svg ? 8 : 0,
		textAlign: 'center'
	};

	return (
		<React.Fragment>
			{!!icon &&
				<FontAwesome5 name={icon} size={size === 'small' ? 13 : size === 'standard' ? 15 : 21} color={contentColor} />
			}
			{svg && Platform.OS === 'ios' ?
				(
					<Image
						showWebviewLoader={false}
						style={{
							height: Platform.OS === 'ios' ? 120 : 40,
							width: Platform.OS === 'ios' ? 250 : 50,
							resizeMode: 'contain',
							transform: [
								{ scaleX: Platform.OS === 'ios' ? (size === 'small' ? 0.4 : 0.6) : 1 },
								{ scaleY: Platform.OS === 'ios' ? (size === 'small' ? 0.4 : 0.6) : 1 }]
						}}
						source={svg}
						resizeMode="contain"
					/>
				)
				: svg && Platform.OS !== 'ios' ?
					(
						<Image
							showWebviewLoader={false}
							style={{
								height: 40,
								width: 50,
								resizeMode: 'contain',
								transform: [
									{ scaleX: Platform.OS !== 'ios' ? (size === 'small' ? 0.6 : 0.8) : 1 },
									{ scaleY: Platform.OS !== 'ios' ? (size === 'small' ? 0.6 : 0.8) : 1 }]
							}}
							source={svg}
							resizeMode="contain"
						/>
					) : (undefined)
			}
			{label && Platform.OS === 'ios' ?
				(
					<TextComponent style={buttonLabelStyle}>{label}</TextComponent>
				)
				: label && Platform.OS !== 'ios' ?
					(
						<TextComponent style={[buttonLabelStyle/* , { marginLeft: -15 } */]}>{label}</TextComponent>
					) : (undefined)
			}
		</React.Fragment>
	);
};

Button.propTypes = {
	onPress: PropTypes.func.isRequired,
	icon: PropTypes.string,
	label: PropTypes.string,
	svg: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	disabled: PropTypes.bool,
	width: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	size: PropTypes.oneOf(['small', 'standard', 'large']),
	solid: PropTypes.bool,
	color: PropTypes.string,
	disabledColor: PropTypes.string,
	style: PropTypes.object,
	fontSize: PropTypes.number,
	textColor: PropTypes.string,
	allowInteraction: PropTypes.bool,
	borderRadius: PropTypes.number,
	borderWidth: PropTypes.number,
	height: PropTypes.number,
	dropShadow: PropTypes.bool,
	column: PropTypes.bool,
	borderColor: PropTypes.string,
	TextComponent: PropTypes.func,
	gradient: PropTypes.array,
	disabledGradient: PropTypes.array
};

export default Button;

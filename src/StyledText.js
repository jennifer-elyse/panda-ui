import React from 'react';
import { Text } from 'react-native';


export default function StyledText({ textColor='#424242', ...props }) {

	const textStyle = {
		color: props.textColor,
		fontSize: 12,
		lineHeight: 15,
		...props.style
	};
	return (<Text numberOfLines={props.numberOfLines || 1} style={textStyle}>{props.children}</Text>);
}

export const H1 = props => {

	const textStyle = {
		color: props.textColor,
		fontWeight: 'bold',
		fontSize: 20,
		lineHeight: 23,
		...props.style
	};
	return (<Text numberOfLines={props.numberOfLines || 1} style={textStyle}>{props.children}</Text>);
};

export const H2 = props => {

	const textStyle = {
		color: props.textColor,
		fontWeight: 'bold',
		fontSize: 16,
		lineHeight: 21,
		...props.style
	};
	return (<Text numberOfLines={props.numberOfLines || 1} style={textStyle}>{props.children}</Text>);
};

export const H3 = props => {

	const textStyle = {
		color: props.textColor,
		fontWeight: 'bold',
		fontSize: 14,
		lineHeight: 17,
		...props.style
	};
	return (<Text numberOfLines={props.numberOfLines || 1} style={textStyle}>{props.children}</Text>);
};

export const Subtitle1 = props => {

	const textStyle = {
		color: props.textColor,
		fontSize: 16,
		lineHeight: 18,
		...props.style
	};
	return (<Text numberOfLines={props.numberOfLines || 1} style={textStyle}>{props.children}</Text>);
};

export const Body1 = props => {

	const textStyle = {
		color: props.textColor,
		fontSize: 16,
		lineHeight: 19,
		...props.style
	};
	return (<Text numberOfLines={props.numberOfLines || 1} style={textStyle}>{props.children}</Text>);
};

export const Body2 = props => {

	const textStyle = {
		color: props.textColor,
		fontSize: 14,
		lineHeight: 17,
		...props.style
	};
	return (<Text numberOfLines={props.numberOfLines || 1} style={textStyle}>{props.children}</Text>);
};

export const Body3 = props => {

	const textStyle = {
		color: props.textColor,
		fontSize: 12,
		lineHeight: 15,
		...props.style
	};
	return (<Text numberOfLines={props.numberOfLines || 1} style={textStyle}>{props.children}</Text>);
};

export const TabText = ({ buttonColor, ...props }) => {

	const textStyle = {
		color: buttonColor,
		fontSize: 14,
		...props.style
	};
	return (<Text numberOfLines={props.numberOfLines || 1} style={textStyle}>{props.children}</Text>);
};

export const ButtonText = ({ buttonTextColor, ...props }) => {

	const textStyle = {
		color: buttonTextColor,
		fontWeight: 'bold',
		fontSize: 14,
		...props.style
	};
	return (<Text numberOfLines={props.numberOfLines || 1} style={textStyle}>{props.children}</Text>);
};

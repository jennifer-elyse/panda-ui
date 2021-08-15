import React, { useRef, useState, useContext } from 'react';
import {
	View
} from 'react-native';
import Toast from 'react-native-easy-toast';
import Image from 'react-native-remote-svg';

import StyledText from '../components/StyledText';
import Colors from '../constants/Colors';
import { useThemeContext, themeSelector } from '../contexts/ThemeContext';

const ToastContext = React.createContext();

export const ToastContextProvider = ({ children }) => {
	const toastRef = useRef();
	const [userSession] = useThemeContext();
	const theme = themeSelector(userSession);
	const [style, setStyle] = useState(success);
	const success = {
		backgroundColor: 'transparent'
	};
	const info = {
		backgroundColor: 'transparent'
	};
	const warning = {
		backgroundColor: 'transparent'
	};
	const error = {
		backgroundColor: 'transparent'
	};
	// We only want to create the `toastApi` object once. Its methods reference
	// `toastRef.current` which will always be up-to-date when called. So we don't
	// need to redefine our custom API on every render. Clever use of the `useState`
	// hook achieves this. By setting the initial state value to our custom API
	// interface, and then never changing it, the value we receive from the `useState`
	// hook is the first version of the object created on the first render. This makes
	// the reference we have to the API stable, which means all context consumers will
	// never rerender unnecessarily.
	// textStyle doesn't work using this method, set as style on the Text node instead
	const [toastApi] = useState({
		showSuccess(content, duration=2000, callback) {
			setStyle(success);
			toastRef.current.show(
				<View style={{ minHeight: 75, flexDirection: 'row', borderRadius: 4, borderWidth: 1, borderColor: Colors[theme].successFontColor }}>
					<View style={{ width: 5, height: '100%', backgroundColor: Colors[theme].successFontColor }}></View>
					<View style={{ width: 10, height: '100%', backgroundColor: Colors[theme].successBackgroundColor }} />
					<View style={{ width: 300, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', height: '100%', backgroundColor: Colors[theme].successBackgroundColor }}>
						<Image
							source={{
								uri: `data:image/svg+xml;utf8,<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M7.00065 0.333252C3.32065 0.333252 0.333984 3.31992 0.333984 6.99992C0.333984 10.6799 3.32065 13.6666 7.00065 13.6666C10.6807 13.6666 13.6673 10.6799 13.6673 6.99992C13.6673 3.31992 10.6807 0.333252 7.00065 0.333252ZM5.66732 10.3333L2.33398 6.99992L3.27398 6.05992L5.66732 8.44659L10.7273 3.38659L11.6673 4.33325L5.66732 10.3333Z" fill="#2B9348"/>
								</svg>` }}
							style={{ height: 15, width: 15, marginRight: 5 }}
						/>
						<StyledText style={{ color: '#000' }}>Success </StyledText>
						<StyledText style={{ color: 'grey' }}>{content}</StyledText>
					</View>
				</View>, duration, callback);
		},
		hideSuccess(content, delay) {
			setStyle(success);
			toastRef.current.close(
				<View style={{ minHeight: 75, flexDirection: 'row', borderRadius: 4, borderWidth: 1, borderColor: Colors[theme].successFontColor }}>
					<View style={{ width: 5, height: '100%', backgroundColor: Colors[theme].successFontColor }}></View>
					<View style={{ width: 10, height: '100%', backgroundColor: Colors[theme].successBackgroundColor }} />
					<View style={{ width: 300, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', height: '100%', backgroundColor: Colors[theme].successBackgroundColor }}>
						<Image
							source={{
								uri: `data:image/svg+xml;utf8,<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M7.00065 0.333252C3.32065 0.333252 0.333984 3.31992 0.333984 6.99992C0.333984 10.6799 3.32065 13.6666 7.00065 13.6666C10.6807 13.6666 13.6673 10.6799 13.6673 6.99992C13.6673 3.31992 10.6807 0.333252 7.00065 0.333252ZM5.66732 10.3333L2.33398 6.99992L3.27398 6.05992L5.66732 8.44659L10.7273 3.38659L11.6673 4.33325L5.66732 10.3333Z" fill="#2B9348"/>
								</svg>` }}
							style={{ height: 15, width: 15, marginRight: 5 }}
						/>
						<StyledText style={{ color: '#000' }}>Success </StyledText>
						<StyledText style={{ color: 'grey' }}>{content}</StyledText>
					</View>
				</View>, delay);
		},
		showInfo(content, duration=4000, callback) {
			setStyle(info);
			toastRef.current.show(
				<View style={{ minHeight: 75, flexDirection: 'row', borderRadius: 4, borderWidth: 1, borderColor: Colors[theme].infoFontColor }}>
					<View style={{ width: 5, height: '100%', backgroundColor: Colors[theme].infoFontColor }}></View>
					<View style={{ width: 10, height: '100%', backgroundColor: Colors[theme].infoBackgroundColor }} />
					<View style={{ width: 300, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', height: '100%', backgroundColor: Colors[theme].infoBackgroundColor }}>
						<Image
							source={{
								uri: `data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M7.99942 0.73291C3.98592 0.73291 0.732422 3.98641 0.732422 7.99991C0.732422 12.0134 3.98592 15.2669 7.99942 15.2669C12.0129 15.2669 15.2664 12.0134 15.2664 7.99991C15.2664 3.98641 12.0129 0.73291 7.99942 0.73291ZM7.37792 3.99991H8.58792V5.28691H7.37792V3.99991ZM9.38042 11.8109H8.04942C7.53242 11.8109 7.31192 11.5909 7.31192 11.0629V7.62991C7.31192 7.46491 7.22392 7.38841 7.06992 7.38841H6.62992V6.19991H7.96142C8.47892 6.19991 8.69842 6.43091 8.69842 6.94791V10.3914C8.69842 10.5464 8.78642 10.6334 8.94042 10.6334H9.38042V11.8109Z" fill="#155CF6"/>
								</svg>` }}
							style={{ height: 15, width: 15, marginRight: 5 }}
						/>
						<StyledText style={{ color: '#000' }}>Information </StyledText>
						<StyledText style={{ color: 'grey' }}>{content}</StyledText>
					</View>
				</View>, duration, callback);
		},
		hideInfo(content, delay) {
			setStyle(info);
			toastRef.current.close(
				<View style={{ minHeight: 75, flexDirection: 'row', borderRadius: 4, borderWidth: 1, borderColor: Colors[theme].infoFontColor }}>
					<View style={{ width: 5, height: '100%', backgroundColor: Colors[theme].infoFontColor }}></View>
					<View style={{ width: 10, height: '100%', backgroundColor: Colors[theme].infoBackgroundColor }} />
					<View style={{ width: 300, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', height: '100%', backgroundColor: Colors[theme].infoBackgroundColor }}>
						<Image
							source={{
								uri: `data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M7.99942 0.73291C3.98592 0.73291 0.732422 3.98641 0.732422 7.99991C0.732422 12.0134 3.98592 15.2669 7.99942 15.2669C12.0129 15.2669 15.2664 12.0134 15.2664 7.99991C15.2664 3.98641 12.0129 0.73291 7.99942 0.73291ZM7.37792 3.99991H8.58792V5.28691H7.37792V3.99991ZM9.38042 11.8109H8.04942C7.53242 11.8109 7.31192 11.5909 7.31192 11.0629V7.62991C7.31192 7.46491 7.22392 7.38841 7.06992 7.38841H6.62992V6.19991H7.96142C8.47892 6.19991 8.69842 6.43091 8.69842 6.94791V10.3914C8.69842 10.5464 8.78642 10.6334 8.94042 10.6334H9.38042V11.8109Z" fill="#155CF6"/>
								</svg>` }}
							style={{ height: 15, width: 15, marginRight: 5 }}
						/>
						<StyledText style={{ color: '#000' }}>Information </StyledText>
						<StyledText style={{ color: 'grey' }}>{content}</StyledText>
					</View>
				</View>, delay);
		},
		showWarning(content, duration=4000, callback) {
			setStyle(warning);
			toastRef.current.show(
				<View style={{ minHeight: 75, flexDirection: 'row', borderRadius: 4, borderWidth: 1, borderColor: Colors[theme].warningFontColor }}>
					<View style={{ width: 5, height: '100%', backgroundColor: Colors[theme].warningFontColor }}></View>
					<View style={{ width: 10, height: '100%', backgroundColor: Colors[theme].warningBackgroundColor }} />
					<View style={{ width: 300, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', height: '100%', backgroundColor: Colors[theme].warningBackgroundColor }}>
						<Image
							source={{
								uri: `data:image/svg+xml;utf8,<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M7.66732 7.66659H6.33398V3.66659H7.66732V7.66659ZM7.66732 10.3333H6.33398V8.99992H7.66732V10.3333ZM7.00065 0.333252C6.12517 0.333252 5.25827 0.50569 4.44943 0.840722C3.64059 1.17575 2.90566 1.66682 2.28661 2.28587C1.03636 3.53612 0.333984 5.23181 0.333984 6.99992C0.333984 8.76803 1.03636 10.4637 2.28661 11.714C2.90566 12.333 3.64059 12.8241 4.44943 13.1591C5.25827 13.4941 6.12517 13.6666 7.00065 13.6666C8.76876 13.6666 10.4645 12.9642 11.7147 11.714C12.9649 10.4637 13.6673 8.76803 13.6673 6.99992C13.6673 6.12444 13.4949 5.25753 13.1598 4.4487C12.8248 3.63986 12.3338 2.90493 11.7147 2.28587C11.0956 1.66682 10.3607 1.17575 9.55187 0.840722C8.74304 0.50569 7.87613 0.333252 7.00065 0.333252Z" fill="#EBC348"/>
								</svg>` }}
							style={{ height: 15, width: 15, marginRight: 5 }}
						/>
						<StyledText style={{ color: '#000' }}>Warning </StyledText>
						<StyledText style={{ color: 'grey' }}>{content}</StyledText>
					</View>
				</View>, duration, callback);
		},
		hideWarning(content, delay) {
			setStyle(warning);
			toastRef.current.close(
				<View style={{ minHeight: 75, flexDirection: 'row', borderRadius: 4, borderWidth: 1, borderColor: Colors[theme].warningFontColor }}>
					<View style={{ width: 5, height: '100%', backgroundColor: Colors[theme].warningFontColor }}></View>
					<View style={{ width: 10, height: '100%', backgroundColor: Colors[theme].warningBackgroundColor }} />
					<View style={{ width: 300, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', height: '100%', backgroundColor: Colors[theme].warningBackgroundColor }}>
						<Image
							source={{
								uri: `data:image/svg+xml;utf8,<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M7.66732 7.66659H6.33398V3.66659H7.66732V7.66659ZM7.66732 10.3333H6.33398V8.99992H7.66732V10.3333ZM7.00065 0.333252C6.12517 0.333252 5.25827 0.50569 4.44943 0.840722C3.64059 1.17575 2.90566 1.66682 2.28661 2.28587C1.03636 3.53612 0.333984 5.23181 0.333984 6.99992C0.333984 8.76803 1.03636 10.4637 2.28661 11.714C2.90566 12.333 3.64059 12.8241 4.44943 13.1591C5.25827 13.4941 6.12517 13.6666 7.00065 13.6666C8.76876 13.6666 10.4645 12.9642 11.7147 11.714C12.9649 10.4637 13.6673 8.76803 13.6673 6.99992C13.6673 6.12444 13.4949 5.25753 13.1598 4.4487C12.8248 3.63986 12.3338 2.90493 11.7147 2.28587C11.0956 1.66682 10.3607 1.17575 9.55187 0.840722C8.74304 0.50569 7.87613 0.333252 7.00065 0.333252Z" fill="#EBC348"/>
								</svg>` }}
							style={{ height: 15, width: 15, marginRight: 5 }}
						/>
						<StyledText style={{ color: '#000' }}>Warning </StyledText>
						<StyledText style={{ color: 'grey' }}>{content}</StyledText>
					</View>
				</View>, delay);
		},
		showError(content, duration=4000, callback) {
			setStyle(error);
			toastRef.current.show(
				<View style={{ minHeight: 75, flexDirection: 'row', borderRadius: 4, borderWidth: 1, borderColor: Colors[theme].errorFontColor }}>
					<View style={{ width: 5, height: '100%', backgroundColor: Colors[theme].errorFontColor }}></View>
					<View style={{ width: 10, height: '100%', backgroundColor: Colors[theme].errorBackgroundColor }} />
					<View style={{ width: 300, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', height: '100%', backgroundColor: Colors[theme].errorBackgroundColor }}>
						<Image
							source={{
								uri: `data:image/svg+xml;utf8,<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M7.00065 0.333252C6.12517 0.333252 5.25827 0.50569 4.44943 0.840722C3.64059 1.17575 2.90566 1.66682 2.28661 2.28587C1.03636 3.53612 0.333984 5.23181 0.333984 6.99992C0.333984 8.76803 1.03636 10.4637 2.28661 11.714C2.90566 12.333 3.64059 12.8241 4.44943 13.1591C5.25827 13.4941 6.12517 13.6666 7.00065 13.6666C8.76876 13.6666 10.4645 12.9642 11.7147 11.714C12.9649 10.4637 13.6673 8.76803 13.6673 6.99992C13.6673 6.12444 13.4949 5.25753 13.1598 4.4487C12.8248 3.63986 12.3338 2.90493 11.7147 2.28587C11.0956 1.66682 10.3607 1.17575 9.55187 0.840722C8.74304 0.50569 7.87613 0.333252 7.00065 0.333252ZM10.334 7.66659H3.66732V6.33325H10.334V7.66659Z" fill="#E50B15"/>
								</svg>` }}
							style={{ height: 15, width: 15, marginRight: 5 }}
						/>
						<StyledText style={{ color: '#000' }}>Error </StyledText>
						<StyledText style={{ color: 'grey' }}>{content}</StyledText>
					</View>
				</View>, duration, callback);
		},
		hideError(content, delay) {
			setStyle(error);
			toastRef.current.close(
				<View style={{ minHeight: 75, flexDirection: 'row', borderRadius: 4, borderWidth: 1, borderColor: Colors[theme].errorFontColor }}>
					<View style={{ width: 5, height: '100%', backgroundColor: Colors[theme].errorFontColor }}></View>
					<View style={{ width: 10, height: '100%', backgroundColor: Colors[theme].errorBackgroundColor }} />
					<View style={{ width: 300, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', height: '100%', backgroundColor: Colors[theme].errorBackgroundColor }}>
						<Image
							source={{
								uri: `data:image/svg+xml;utf8,<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M7.00065 0.333252C6.12517 0.333252 5.25827 0.50569 4.44943 0.840722C3.64059 1.17575 2.90566 1.66682 2.28661 2.28587C1.03636 3.53612 0.333984 5.23181 0.333984 6.99992C0.333984 8.76803 1.03636 10.4637 2.28661 11.714C2.90566 12.333 3.64059 12.8241 4.44943 13.1591C5.25827 13.4941 6.12517 13.6666 7.00065 13.6666C8.76876 13.6666 10.4645 12.9642 11.7147 11.714C12.9649 10.4637 13.6673 8.76803 13.6673 6.99992C13.6673 6.12444 13.4949 5.25753 13.1598 4.4487C12.8248 3.63986 12.3338 2.90493 11.7147 2.28587C11.0956 1.66682 10.3607 1.17575 9.55187 0.840722C8.74304 0.50569 7.87613 0.333252 7.00065 0.333252ZM10.334 7.66659H3.66732V6.33325H10.334V7.66659Z" fill="#E50B15"/>
								</svg>` }}
							style={{ height: 15, width: 15, marginRight: 5 }}
						/>
						<StyledText style={{ color: '#000' }}>Error </StyledText>
						<StyledText style={{ color: 'grey' }}>{content}</StyledText>
					</View>
				</View>, delay);
		}
	});

	return (
		<React.Fragment>
			<Toast
				ref={toastRef}
				position="bottom"
				style={style}
				opacity={0.95}
			/>
			<ToastContext.Provider value={toastApi}>
				{children}
			</ToastContext.Provider>
		</React.Fragment>
	);
};

export const useToastContext = () => {
	const toast = useContext(ToastContext);
	if (toast === undefined) {
		throw new Error('useToastContext() hook could not read expected context. Did you forget to render <ToastContextProvider> above it?');
	}
	return toast;
};

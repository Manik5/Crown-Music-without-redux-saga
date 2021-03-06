import React from 'react';

import './custombutton.scss';

// import { CustomButtonContainer } from './custom-button.styles';

//  children is the "Sign In" between the CustomButton component in SignIn.jsx
//  inverted is the props to change the color

const CustomButton = ({ children,  isGoogleSignIn, inverted, ...otherProps }) => (
	<button
		className= { `${inverted  ? 'inverted' :  ' '} ${
			isGoogleSignIn  ?  'google-sign-in' :  ' '
			} custom-button` }
			{...otherProps}
		>
		{children}
	</button>
);

//  with styled components and not css

// const CustomButton = ({ children, ...props }) => (
//   <CustomButtonContainer {...props}>{children}</CustomButtonContainer>
// );

export default CustomButton;

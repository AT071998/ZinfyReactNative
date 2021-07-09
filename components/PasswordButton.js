import React from 'react'
import { Button } from 'react-native-elements'

const PasswordButton = ({ title, buttonType, buttonColor,buttonBackground,...rest }) => (
  <Button
    {...rest}
    type={buttonType}
    title={title}
    buttonStyle={{ borderColor: buttonColor, borderRadius: 20 }}
    titleStyle={{ color: buttonColor }}
  />
)

export default PasswordButton
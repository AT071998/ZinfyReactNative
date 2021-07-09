
import React, { Component, Fragment } from 'react'
import { Text, SafeAreaView, View, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import ErrorMessage from '../components/ErrorMessage'
import PasswordButton from '../components/PasswordButton';
import PasswordInput from '../components/PasswordInput';
import AsyncStorage from  "@react-native-async-storage/async-storage"


const validationSchema = Yup.object().shape({
    email: Yup.string()
      .label('Email')
      .email('Enter a valid email')
      .required('Please enter a registered email')
  })

  
class ForgotPassword extends Component {

    handlePasswordReset = async (values, actions) => {
       const {email} = values;
       const currentContext = this;
       const { navigate } = this.props.navigation;
       //console.log(email);
      // console.log(values);
       try {
        fetch('http://192.168.43.114:8000/api/password/create',{
            method:'POST',
            body:JSON.stringify({        
                "email" : email,
        }),
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json; charset=UTF-8'
            }
        })
        .then(function(response){
            response.json()
            .then(res=>{
                    console.log(res);
                    if(res.success==='success'){
                        //currentContext.setState({messageFromServer:"Password reset email is sent succesfully!",showError:false});
                        alert("We have sent you the password reset link for the mentioned email addresss");
                        //Navigation to be applied. . . 
                       // navigate('LoginS');
                       navigate("OtpVerification");
                       AsyncStorage.setItem('email', email); // Note: persist input
                       
                    }
                    else{
                        actions.setFieldError('general','We cant find a user with the registered email-address');
                    }
            })
        }).catch(err=>{
       console.log(err);

    })
}
    catch (error) {
      actions.setFieldError('general', error.message)
    }
  
        

    }
        
  render() {
        return (
          <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Forgot Password?</Text>
            <Formik
              initialValues={{ email: '' }}
              onSubmit={(values, actions) => {
                this.handlePasswordReset(values, actions)
              }}
              validationSchema={validationSchema}>
              {({
                handleChange,
                values,
                handleSubmit,
                errors,
                isValid,
                touched,
                handleBlur,
                isSubmitting
              }) => (
                <Fragment>
                  <PasswordInput
                    name='email'
                    value={values.email}
                    onChangeText={handleChange('email')}
                    placeholder='Enter email'
                    autoCapitalize='none'
                    iconName='ios-mail'
                    iconColor='#2C384A'
                    onBlur={handleBlur('email')}
                  />
                  <ErrorMessage errorValue={touched.email && errors.email} />
                  <View style={styles.buttonContainer}>
                    <PasswordButton
                      buttonType='outline'
                      onPress={handleSubmit}
                      title='Send Email and Continue'
                      buttonColor='#039BE5'
                     // loading = { isSubmitting }
                      disabled={!isValid ||isSubmitting }
                    />
                  </View>
                  <ErrorMessage errorValue={errors.general} />
                 
    
                </Fragment>
              )}
            </Formik>
          </SafeAreaView>
        )
      }
}

export default ForgotPassword


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop: 150
    },
    text: {
      color: '#333',
      fontSize: 24,
      marginLeft: 25
    },
    buttonContainer: {
      margin: 25
    }
  })
import { View, Text } from 'react-native'
import React, { useCallback } from 'react'
import styles from './SignUp.style'
import { navigate } from '@navigation/NavigationService'
import { Formik } from 'formik'
import { Input, AuthLayoutContainer, HaveAnAccount } from '@components/index'
import KeyboardAvoidingView from '@components/KeyboardAvoidingView'

const SignUp = () => {
    const redirectToLogin = useCallback(() => navigate('Login'), []);
    const handleSignUp = useCallback(()=>{},[])
  return (
    <AuthLayoutContainer
     title='Sign Up'
    description='Create your account to get started with us today.'
    >
      <Formik
              initialValues={{email: '', password: ''}}
              // validationSchema={signInValidationSchema}
              onSubmit={handleSignUp}>
              {({handleChange, handleSubmit, values, errors, touched}) => (
                <View style={{display:"flex",flexDirection:"column",gap:16, paddingVertical:20}}>
                  <Input
                  placeholder='Email address'
                  />
                  <Input
                  placeholder='Password'
                  inputType="password"
                  />
                   <Input
                  placeholder='Confirm password'
                  inputType="password"
                  />
                </View>
              )}
            </Formik>

      <HaveAnAccount text='Already have an account?' linkTitle='Login' onPress={redirectToLogin} />
    </AuthLayoutContainer>
  )
}

export default SignUp
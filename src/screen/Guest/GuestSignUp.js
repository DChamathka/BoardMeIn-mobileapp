import React, {useState, useEffect, createRef} from 'react';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert,
  Dimensions,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import {Button, Dialog, Portal} from 'react-native-paper';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import equals from 'validator/lib/equals';
import configdata from '../../config/config';
import Loader from '../../components/Loader';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');
const logo = require('../../../assest/images/logo.jpg');

const GuestSignUp = ({navigation}) => {
  const behavior = Platform.OS === 'ios' ? 'padding' : undefined;
  const CELL_COUNT = 6;
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [loading, setLoading] = useState(false);
  const [getCode, setGetCode] = useState('');
  const [value, setValue] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  const [isOTPsend, setIsOTPsend] = useState(false);
  const [visible, setVisible] = useState(false);
  const [otpVisible, setOtpVisible] = useState(false);
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const hideDialog = () => setVisible(false);
  const hideoDialog = () => setOtpVisible(false);

  const handleSubmit = () => {
    if (
      isEmpty(firstname) ||
      isEmpty(lastname) ||
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(password2)
    ) {
      alert('All fields are required');
      return;
    } else if (!isEmail(email)) {
      alert('Inavalid email');
      return;
    } else if (!equals(password, password2)) {
      alert('Passwords do not match');
      return;
    } else {
      setLoading(true);
      fetch(`${configdata.baseURL}/auth/emailverify`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: firstname,
          email: email,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.success) {
            setIsOTPsend(true);
            setOtpVisible(true);
            setGetCode(responseJson.code);
            Alert.alert('Check your email to get passcode');
          } else {
            alert(responseJson.errorMessage);
          }
        });

      /*  */
    }
  };
  if (isRegistraionSuccess) {
    return (
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Image
            source={require('../../.././assest/images/success.png')}
            style={{
              height: 150,
              marginTop: 20,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
          />
          <Dialog.Title>Registration Successful.</Dialog.Title>
          <Dialog.Title>Please Login</Dialog.Title>
          <Dialog.Actions>
            <Button
              onPress={() => {
                navigation.navigate('GuestSignIn');
                hideDialog();
              }}>
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }

  if (isOTPsend) {
    const checkCode = () => {
      if (isEmpty(value)) {
        setErrorMsg('Please Enter passcode');
      } else if (!equals(value, getCode)) {
        setErrorMsg('Wrong code. Re-enter correct passcode ');
        setValue(null);
      } else {
        hideDialog();
        fetch(`${configdata.baseURL}/auth/guestsignup`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
          }),
        })
          .then(response => response.json())
          .then(responseJson => {
            setLoading(false);
            console.log(responseJson);
            if (responseJson.success == true) {
              setIsRegistraionSuccess(true);
              setVisible(true);
              console.log('Registration Successful. Please Login to proceed');
            } else {
              alert(responseJson.errorMessage);
            }
          })
          .catch(error => {
            setLoading(false);
            console.error(error);
          });
      }
    };
    return (
      <Portal>
        <Dialog visible={otpVisible}>
          <Dialog.Title>Enter passcode here</Dialog.Title>
          <Dialog.Content>
            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
            <Button
              onPress={() => {
                checkCode();
              }}>
              Ok
            </Button>
            <Dialog.Title>
              {errorMsg != '' ? (
                <Text style={styles.errtxt}>{errorMsg}</Text>
              ) : null}
            </Dialog.Title>
          </Dialog.Content>
        </Dialog>
      </Portal>
    );
  }

  return (
    <>
      <Loader loading={loading} />
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.form}>
            <Image style={styles.logo} source={logo} />
            <View>
              <Text style={styles.headerTitle}>Guest Sign up</Text>
              <View style={{marginTop: heightScreen * 0.021}} />
            </View>
            <KeyboardAvoidingView behavior={behavior}>
              <Text style={styles.inputLabel}>First Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={firstname => setFirstname(firstname)}
                autoCapitalize="none"
                placeholderTextColor="#BFC9CA"
              />
              <View style={{marginTop: heightScreen * 0.011}} />
              <Text style={styles.inputLabel}>Last Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={lastname => setLastname(lastname)}
                autoCapitalize="none"
                placeholderTextColor="#BFC9CA"
              />
              <View style={{marginTop: heightScreen * 0.011}} />
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                onChangeText={email => setEmail(email)}
                autoCapitalize="none"
                placeholderTextColor="#BFC9CA"
              />
              <View style={{marginTop: heightScreen * 0.011}} />
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                onChangeText={password => setPassword(password)}
                autoCapitalize="none"
                secureTextEntry={true}
                placeholderTextColor="#BFC9CA"
              />
              <View style={{marginTop: heightScreen * 0.011}} />
              <Text style={styles.inputLabel}>Conform Password</Text>
              <TextInput
                style={styles.input}
                onChangeText={password2 => setPassword2(password2)}
                autoCapitalize="none"
                secureTextEntry={true}
                placeholderTextColor="#BFC9CA"
                onSubmitEditing={Keyboard.dismiss}
              />
            </KeyboardAvoidingView>
            <View style={styles.termsBox}>
              <Text style={styles.infoText}>
                By continuing you agree to our{' '}
                <Text style={[styles.infoText, styles.greenInfoText]}>
                  Terms of Service
                </Text>{' '}
                and{' '}
                <Text style={[styles.infoText, styles.greenInfoText]}>
                  Privacy Policy
                </Text>
              </Text>
              <View style={{marginTop: heightScreen * 0.011}} />
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleSubmit()}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.footer}>
              <Text style={styles.infoText}>
                Already have an guest account?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.pop()}>
                <Text style={[styles.infoText, styles.greenInfoText]}>
                  Sign in
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default {component: GuestSignUp, name: 'GuestSignUp'};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: '#4EB2E7',
  },
  logo: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 6,
    borderColor: '#000',
    borderWidth: 0.5,
  },
  form: {
    paddingHorizontal: widthScreen * 0.06,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginVertical: 20,
  },
  inputLabel: {
    fontSize: 20,
    lineHeight: 20,
    height: 20,
    fontFamily: 'Gilroy-Medium',
    color: '#444444',
  },
  headerTitle: {
    fontSize: 35,
    lineHeight: 35,
    height: 40,
    fontFamily: 'Gilory-Regualr',
    marginBottom: heightScreen * 0.017,
    color: '#000',
  },
  input: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 20,
    paddingVertical: heightScreen * 0.012,
    borderBottomWidth: 1.0,
    borderBottomColor: '#888888',
    marginBottom: heightScreen * 0.022,
  },
  button: {
    color: '#fff',
    textAlign: 'center',
    backgroundColor: '#22AFD1',
    marginBottom: 100,
    position: 'relative',
    bottom: -100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 35,
    borderRadius: 30,
  },
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
  errtxt: {
    color: 'red',
    fontSize: 20,
    position: 'absolute',
  },
  termsBox: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: heightScreen * 0.033,
  },
  infoText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Gilroy-Regular',
    fontWeight: '900',
    fontSize: 14,
    color: '#000',
    letterSpacing: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: heightScreen * 0.028,
  },
  greenInfoText: {
    color: '#00a100',
    marginLeft: 5.0,
  },
  button: {
    width: '100%',
    borderRadius: 19.0,
    paddingVertical: heightScreen * 0.027,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#51e2f5',
  },
  buttonText: {
    fontFamily: 'Gilroy-LightItalic',
    color: 'white',
    fontSize: 20,
    lineHeight: 20,
    height: 20,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});

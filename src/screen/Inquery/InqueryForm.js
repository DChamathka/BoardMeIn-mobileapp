import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import Loader from '../../components/Loader';
import configdata from '../../config/config';

const Inquiry = ({route}) => {
  const userId = route.params._id;
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState('');
  const [value, setValue] = useState('');
  const [inquiryType, setInqueryType] = useState([
    {
      label: 'Regarding Accomadation Place Inquiries',
      value: 'Regarding Accomadation Place Inquiries',
    },
    {label: 'Regarding System Inquiries', value: 'Regarding System Inquiries'},
    {label: 'Other Inquiries', value: 'Other Inquiries'},
  ]);

  const submit = () => {
    const rv = value.value
    if (value === '') {
      Alert.alert('Please select Inquiry type');
      return;
    }
    if (reason === '') {
      Alert.alert('You must describe your inquiry');
      return;
    }
    fetch(`http://192.168.43.200:5000/user/inquiry`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userid: userId,
        inquirytype: rv,
        reason: reason,
      }),
    })
      .then(res => res.json())
      .then(responseJson => {
        Alert.alert('Your inquiry send to the Admin');
        setLoading(true);
        setReason('');
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textdec}>Inquiry Type</Text>
      <RadioForm
        style={styles.radioButton}
        radio_props={inquiryType}
        initial={-1}
        buttonSize={10}
        onPress={(value) => setValue({value: value})}
      />
      <Text style={styles.textdec}>Reason</Text>
      <KeyboardAvoidingView>
        <TextInput
          style={styles.input}
          placeholder="Enter Reason"
          multiline
          numberOfLines={2}
          onChangeText={reason => setReason(reason)}
        />
      </KeyboardAvoidingView>
      <Button
        style={styles.buttondec}
        title="Submit"
        onPress={() => submit()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: 'skyblue',
    margin: 0,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 20,
  },
  container: {
    margin: 20,
    marginTop: 40,
  },
  radioButton: {
    margin: 20,
    marginTop: 20,
  },
  textdec: {
    marginLeft: 20,
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  buttondec: {
    marginTop: 50,
  },
  validatetext: {
    color: 'red',
    marginLeft: 20,
  },
});

export default {component: Inquiry, name: 'Inquiry'};

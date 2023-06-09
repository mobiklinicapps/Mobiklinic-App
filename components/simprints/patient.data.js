import React, {useContext, useState} from 'react';
import {
  View,
  Alert,
  Switch,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  StatusBar,
  Button,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Feather';
import {_removeStorageItem} from '../helpers/functions';
import {DiagnosisContext} from '../providers/Diagnosis';
import CustomHeader from '../ui/custom-header';
import Loader from '../ui/loader';
import DataResultsContext from '../contexts/DataResultsContext';
import {COLORS, DIMENS} from '../constants/styles';

const PatientData = ({navigation}) => {
  const diagnosisContext = React.useContext(DiagnosisContext);
  const {diagnoses} = diagnosisContext;
  const {dataResults} = useContext(DataResultsContext);

  // const navigation = useNavigation();
  // date
  const currentDate = new Date();

  const [state, setState] = React.useState({
    firstName: '',
    sex: '',
    ageGroup: '',
    phoneNumber: '',
    lastName: '',
    weight: '',
    height: '',
    district: '',
    country: '',
    primaryLanguage: '',
    simprintsGui: '',
  });

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        'https://mobi-be-production.up.railway.app/patients',
        {
          method: 'POST',
          body: JSON.stringify({
            firstName: state.firstName,
            lastName: state.lastName,
            sex: state.sex,
            ageGroup: state.ageGroup,
            phoneNumber: state.phoneNumber,
            weight: state.weight,
            height: state.height,
            district: state.district,
            country: state.country,
            primaryLanguage: state.primaryLanguage,
            simprintsGui: dataResults,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Accept: 'application/json',
          },
        },
      );

      if (response.ok) {
        console.log('Data posted successfully');
        navigation.navigate('SelectActivity');
      } else {
        console.error('Error posting data:', response.status);
        Alert.alert('Error', 'Failed to submit data. Please try again later.');
      }
    } catch (error) {
      console.error('Error posting data:', error);
      Alert.alert('Error', 'Failed to submit data. Please try again later.');
    }
  };

  const _header = () => (
    <CustomHeader
      left={
        <TouchableOpacity
          style={{
            marginHorizontal: 4,
            width: 35,
            height: 35,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={25} color={COLORS.BLACK} />
        </TouchableOpacity>
      }
      title={
        <Text style={[STYLES.centerHeader, STYLES.title]}>PATIENT PROFILE</Text>
      }
    />
  );

  if (state.isLoading) return <Loader />;

  return (
    <View style={STYLES.wrapper}>
      {_header()}
      <ScrollView style={STYLES.body}>
        <Text style={STYLES.terms}>Patient Profile</Text>

        {/* Simprints GUI */}
        <View style={STYLES.labeled}>
          <Text style={STYLES.label}>Simprints GUI</Text>
          <TextInput
            style={STYLES.field}
            value={dataResults}
            onChangeText={text => setState({...state, simprintsGui: text})}
            placeholder="Enter simprints GUI"
          />
        </View>
        {/* First Name */}
        <View style={STYLES.labeled}>
          <Text style={STYLES.label}>First Name:</Text>
          <TextInput
            style={STYLES.field}
            value={state.firstName}
            onChangeText={text => setState({...state, firstName: text})}
            placeholder="Enter first name"
          />
        </View>

        {/* Last Name */}
        <View style={STYLES.labeled}>
          <Text style={STYLES.label}>Last Name:</Text>
          <TextInput
            style={STYLES.field}
            value={state.lastName}
            onChangeText={text => setState({...state, lastName: text})}
            placeholder="Enter last name"
          />
        </View>
        {/* Phone Number */}
        <View style={STYLES.labeled}>
          <Text style={STYLES.label}>Phone Number:</Text>
          <TextInput
            style={STYLES.field}
            value={state.phoneNumber}
            keyboardType="phone-pad"
            onChangeText={text => setState({...state, phoneNumber: text})}
            placeholder="Enter phone number"
          />
        </View>

        <View style={STYLES.wrap}>
          {/* Sex */}
          <View style={STYLES.detail} placeholderTextColor="rgba(0,0,0,0.7)">
            <Picker
              placeholder="Sex"
              placeholderTextColor={COLORS.BLACK}
              selectedValue={state.sex}
              onValueChange={(value, index) => setState({...state, sex: value})}
              style={STYLES.pickerItemStyle}>
              <Picker.Item label="Sex" value="Gender" />
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>
          {/* Age Group */}
          <View style={STYLES.detail} placeholderTextColor="rgba(0,0,0,0.7)">
            <Picker
              placeholder="Age"
              placeholderTextColor={COLORS.BLACK}
              selectedValue={state.ageGroup}
              onValueChange={(value, index) =>
                setState({...state, ageGroup: value})
              }
              style={STYLES.pickerItemStyle}>
              <Picker.Item label="Age" value="Age group" />
              <Picker.Item label="0 - 3" value="0 - 3" />
              <Picker.Item label="3 - 10" value="3 - 10" />
              <Picker.Item label="10 - 17" value="10 - 17" />
              <Picker.Item label="17 - 40" value="17 - 40" />
              <Picker.Item label="40 - 60" value="40 - 60" />
              <Picker.Item label="60 above" value="60 above" />
            </Picker>
          </View>
        </View>

        <View style={STYLES.wrap}>
          {/* Weight */}
          <View style={STYLES.detail}>
            {/* <Text style={STYLES.label}>Weight:</Text> */}
            <TextInput
              keyboardType="numeric"
              value={state.weight}
              placeholderTextColor={COLORS.BLACK}
              onChangeText={text => setState({...state, weight: text})}
              placeholder="Weight (Kgs)"
            />
          </View>

          {/* Height */}
          <View style={STYLES.detail}>
            {/* <Text style={STYLES.label}>Height:</Text> */}
            <TextInput
              keyboardType="numeric"
              placeholderTextColor={COLORS.BLACK}
              value={state.weight}
              onChangeText={text => setState({...state, weight: text})}
              placeholder="Height (cm)"
            />
          </View>
        </View>

        {/* District */}
        <View style={STYLES.pickers} placeholderTextColor="rgba(0,0,0,0.7)">
          <Picker
            placeholder="District"
            placeholderTextColor={COLORS.BLACK}
            selectedValue={state.district}
            onValueChange={(value, index) =>
              setState({...state, district: value})
            }
            style={STYLES.pickerItemStyle}>
            <Picker.Item label="District" value="District" />
            <Picker.Item label="Kampala" value="Kampala" />
            <Picker.Item label="Buikwe" value="Buikwe" />
            <Picker.Item label="Jinja" value="Jinja" />
            <Picker.Item label="Masaka" value="Masaka" />
            <Picker.Item label="Mbarara" value="Mbarara" />
          </Picker>
        </View>
        {/* country */}
        <View style={STYLES.pickers} placeholderTextColor="rgba(0,0,0,0.7)">
          <Picker
            placeholder="Country"
            placeholderTextColor={COLORS.BLACK}
            selectedValue={state.country}
            onValueChange={(value, index) =>
              setState({...state, country: value})
            }
            style={STYLES.pickerItemStyle}>
            <Picker.Item label="Country" value="Country" />
            <Picker.Item label="Uganda" value="Uganda" />
            <Picker.Item label="Kenya" value="Kenya" />
            <Picker.Item label="Rwanda" value="Rwanda" />
            <Picker.Item label="Tanzania" value="Tanzania" />
          </Picker>
        </View>

        {/* Primary Language */}
        <View style={STYLES.pickers} placeholderTextColor="rgba(0,0,0,0.7)">
          <Picker
            placeholder="Primary Language"
            placeholderTextColor={COLORS.BLACK}
            selectedValue={state.primaryLanguage}
            onValueChange={(value, index) =>
              setState({...state, primaryLanguage: value})
            }
            style={STYLES.pickerItemStyle}>
            <Picker.Item label="Primary Language" value="Language" />
            <Picker.Item label="Luganda" value="Luganda" />
            <Picker.Item label="Lusoga" value="Lusoga" />
            <Picker.Item label="Runyakore" value="Runyakore" />
            <Picker.Item label="Rutoro" value="Rutoro" />
            <Picker.Item label="English" value="English" />
          </Picker>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={STYLES.submit} onPress={handleSubmit}>
          <Text style={STYLES.submitText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default PatientData;

const STYLES = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.WHITE_LOW,
  },
  header: {
    flex: 1,
  },
  body: {
    flex: 2,
    paddingHorizontal: 20,
  },
  alert: {
    color: COLORS.GREY,
    textAlign: 'center',
    marginTop: 15,
  },
  subtitle: {
    flexDirection: 'row',
    fontSize: 10,
    color: COLORS.GREY,
  },
  label: {
    fontWeight: 'medium',
    marginLeft: 5,
    marginRight: 5,
    color: COLORS.BLACK,
    fontSize:15
  },
  title: {
    fontWeight: 'bold',
    color: COLORS.BLACK,
    alignItems: 'center',
    flexGrow: 1,
  },
  leftHeader: {
    marginLeft: 10,
    flex: 1,
  },
  centerHeader: {
    flex: 2,
    alignItems: 'center',
    color: COLORS.SECONDARY,
  },
  rightHeader: {
    paddingRight: 10,
  },
  tip: {
    color: 'rgba(0,0,0,0.4)',
    paddingTop: 15,
    paddingBottom: 15,
  },
  input: {
    color: 'rgba(0,0,0,0.7)',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: COLORS.GREY,
    borderStyle: 'solid',
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: COLORS.GREY_LIGHTER,
  },
  textarea: {
    color: 'rgba(0,0,0,0.7)',
    minHeight: 70,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderColor: COLORS.GREY,
    borderStyle: 'solid',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 20,
  },
  terms: {
    paddingVertical: 10,
    textAlign: 'center',
    color: 'grey',
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 20,
  },
  pickers: {
    borderColor: COLORS.GREY,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontWeight: 'bold',
    // backgroundColor: COLORS.GREY,
  },
  pickerItemStyle: {
    color: 'rgba(0,0,0,0.7)',
  },
  labeled: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    // paddingVertical: 10,
    color: COLORS.BLACK,
    marginTop: 10,
    marginBottom: 10,
    borderColor: COLORS.GREY,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
  },
  field: {
    flex: 1,
    justifyContent: 'center',
    color: COLORS.BLACK,
  },
  submit: {
    backgroundColor: COLORS.BLACK,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  wrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 70,
    borderRadius: 20,
    borderColor: COLORS.GREY,
    borderStyle: 'solid',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: COLORS.GREY_LIGHTER,
  },
  pickerWrap: {
    borderColor: COLORS.GREY,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: COLORS.GREY_LIGHTER,
  },
  smallInput: {
    width: 80,
    height: 40,
    textAlign: 'right',
    color: COLORS.BLACK,
    borderRadius: 20,
    paddingHorizontal: 15,
    borderColor: COLORS.GREY,
    borderStyle: 'solid',
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: COLORS.GREY_LIGHTER,
  },
  wrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 70,
  },
  detail: {
    flex: 1,
    paddingHorizontal: 15,
    // paddingVertical: 10,
    color: COLORS.BLACK,
    marginTop: 10,
    marginBottom: 10,
    borderColor: COLORS.GREY,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    marginHorizontal: 5,
  },
  pickerStyle: {
    flex: 1,
    paddingHorizontal: 15,
    // paddingVertical: 10,
    color: COLORS.BLACK,
    marginTop: 10,
    marginBottom: 10,
    borderColor: COLORS.GREY,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    marginHorizontal: 5,
  },
});

import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StatusBar,
  StyleSheet,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {COLORS, DIMENS} from '../constants/styles';
import CustomHeader from '../parts/custom-header';
import CopyRight from '../simprints/copyright';

const GetStarted = ({navigation}) => {
  const handleLinkPress = () => {
    const url =
      'https://docs.google.com/document/d/1IKTAkLq2gCN2LDmBfjK9at5BVTBF68aj_bQmeeV92eo/edit?usp=sharing';
    Linking.openURL(url);
  };
  _header = () => (
    <CustomHeader
      left={
        <TouchableOpacity
          style={{paddingLeft: 10}}
          onPress={() => navigation.openDrawer()}>
          <Icon name="menu" size={25} color={COLORS.BLACK} />
        </TouchableOpacity>
      }
      title={
        <Text style={[styles.centerHeader, styles.textColor]}>Get Started</Text>
      }
      right={
        <TouchableOpacity style={{paddingRight: 10}}>
          <Icon name="user" size={25} color={COLORS.BLACK} />
        </TouchableOpacity>
      }
    />
  );

  return (
    <View style={styles.wrapper}>
      <StatusBar backgroundColor={COLORS.PRIMARY} barStyle="light-content" />
      <View style={styles.container}>
        <Text style={styles.title}>Help</Text>
        <Text style={styles.description}>
          Welcome to the Help page. If you need assistance, please contact our
          support team.
        </Text>
        <Text style={styles.contact}>Contact Information:</Text>
        <Text style={styles.contactDetails}>
          Email: mobiklinicuganda@gmail.com
        </Text>
        <Text style={styles.contactDetails}>Phone: +256 784 528444</Text>
        <Text style={styles.text}>
          <Text style={styles.link} onPress={handleLinkPress}>
            User Guide
          </Text>
        </Text>
        <CopyRight/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  textColor: {
    color: COLORS.BLACK,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: COLORS.SECONDARY,
  },
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.SECONDARY,

  },
  body: {
    flex: 2,
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  desc: {
    fontStyle: 'italic',
    marginTop: 5,
    marginBottom: 10,
    color: COLORS.BLACK,
  },
  title: {
    fontWeight: 'bold',
    color: COLORS.BLACK,
    textAlign: 'center',
  },
  alert: {
    color: COLORS.GREY,
    textAlign: 'center',
    marginTop: 15,
  },
  leftHeader: {
    flex: 1,
    paddingLeft: 10,
  },
  centerHeader: {
    flex: 2,
    flexDirection: 'row',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  rightHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  contact: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contactDetails: {
    fontSize: 16,
    marginBottom: 5,
  },
  link: {
    textDecorationLine: 'underline',
    color:COLORS.PRIMARY, 
    fontSize:16, 

  },
});

export default GetStarted;

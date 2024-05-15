import React, {useContext} from 'react';

import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FoIcon from 'react-native-vector-icons/Fontisto';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import {COLORS, DIMENS} from '../constants/styles';
import Emoji from 'react-native-emoji';
import CustomHeader from '../parts/custom-header';
import {CustomStatusBar} from '../ui/custom.status.bar';
import {signOut} from '../helpers/functions';
import {AuthContext} from '../contexts/auth';
import DataResultsContext from '../contexts/DataResultsContext';
import CopyRight from '../simprints/copyright';

const Dashboard = ({navigation}) => {
  const {setTokens, setUser} = React.useContext(AuthContext);
  const {userNames} = useContext(DataResultsContext);

  return (
    <View style={STYLES.wrapper}>
      <CustomStatusBar />

      <View style={STYLES.hero}>
        <Text style={STYLES.heroHeading}>
          Hey{' '}
          <Text style={{color: COLORS.PRIMARY}}>
            {userNames}
            {'\t'}
            <Emoji name="wave" />
          </Text>
          ,
        </Text>
        <Text style={STYLES.heroParagraph}>Welcome back!</Text>
        <Text style={STYLES.heroParagraph}>
          Choose an option below to continue.
        </Text>
      </View>
      <View style={STYLES.container}>
        <View style={[STYLES.column, STYLES.rightPad]}>
          <View style={STYLES.row}>
            <TouchableOpacity
              style={STYLES.card}
              onPress={() => navigation.navigate('SimprintsConnect')}>
              <View style={STYLES.cardIcon}>
                <Icon
                  name="heart"
                  size={40}
                  strokeSize={3}
                  color={COLORS.BLACK}
                />
              </View>
              <Text style={STYLES.cardTitle}>Beneficiary</Text>
            </TouchableOpacity>
          </View>

          <View style={STYLES.row}>
            <TouchableOpacity
              style={STYLES.card}
              onPress={() => navigation.navigate('Ambulance')}>
              <View style={STYLES.cardIcon}>
                <MIcon
                  name="ambulance"
                  size={40}
                  strokeSize={3}
                  color={COLORS.BLACK}
                />
              </View>
              <Text style={STYLES.cardTitle}>Ambulances</Text>
            </TouchableOpacity>
          </View>
          <View style={STYLES.row}>
            <TouchableOpacity
              style={STYLES.card}
              onPress={() => navigation.navigate('Profile')}>
              <View style={STYLES.cardIcon}>
                <FAIcon
                  name="user-md"
                  size={40}
                  strokeSize={3}
                  color={COLORS.BLACK}
                />
              </View>
              <Text style={STYLES.cardTitle}>My Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={STYLES.column}>
          <View style={STYLES.row}>
            <TouchableOpacity
              style={STYLES.card}
              onPress={() => navigation.navigate('Doctors')}>
              <View style={STYLES.cardIcon}>
                <FoIcon
                  name="doctor"
                  size={40}
                  strokeSize={3}
                  color={COLORS.BLACK}
                />
              </View>
              <Text style={STYLES.cardTitle}>Doctors</Text>
            </TouchableOpacity>
          </View>
          <View style={STYLES.row}>
            <TouchableOpacity
              style={STYLES.card}
              onPress={() => navigation.navigate('DisplayPatients')}>
              <View style={STYLES.cardIcon}>
                <Icon
                  name="users"
                  size={40}
                  strokeSize={3}
                  color={COLORS.BLACK}
                />
              </View>
              <Text style={STYLES.cardTitle}>Beneficary Lists</Text>
            </TouchableOpacity>
          </View>

          <View style={STYLES.row}>
            <TouchableOpacity
              style={STYLES.card}
              onPress={() => navigation.navigate('VaccinationDatesList')}>
              <View style={STYLES.cardIcon}>
                <MIcon
                  name="calendar"
                  size={40}
                  strokeSize={3}
                  color={COLORS.BLACK}
                />
              </View>
              <Text style={STYLES.cardTitle}>Appointments</Text>
            </TouchableOpacity>
          </View>

          <View style={STYLES.row}>
            <TouchableOpacity
              style={STYLES.card}
              onPress={() => navigation.navigate('Hospital')}>
              <View style={STYLES.cardIcon}>
                <MIcon
                  name="calendar"
                  size={40}
                  strokeSize={3}
                  color={COLORS.BLACK}
                />
              </View>
              <Text style={STYLES.cardTitle}>Hosptials</Text>
            </TouchableOpacity>
          </View>

          {/* <View style={STYLES.row}>
            <TouchableOpacity
              style={STYLES.card}
              onPress={() => {
                setTokens(null);
                signOut(setUser);
              }}>
              <View style={STYLES.cardIcon}>
                <MIcon
                  name="logout"
                  size={40}
                  strokeSize={3}
                  color={COLORS.BLACK}
                />
              </View>
              <Text style={STYLES.cardTitle}>Logout</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
      {/* <View style={STYLES.body}>
				<Icon name="smile" size={60} color={COLORS.GREY} />
				<Text style={STYLES.alert}>No data to show now.</Text>
			</View> */}
      <CopyRight />
    </View>
  );
};

const STYLES = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.SECONDARY,
  },
  hero: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  heroHeading: {
    fontSize: 23,
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  heroParagraph: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  header: {
    flex: 1,
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
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
    fontWeight: 'bold',
    marginLeft: 5,
    marginRight: 5,
  },
  title: {
    fontWeight: 'bold',
    color: COLORS.SECONDARY,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  leftHeader: {
    marginLeft: 10,
    flex: 1,
  },
  centerHeader: {
    flex: 2,
  },
  rightHeader: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 400,
    padding: 10,
  },
  column: {
    flex: 1,
  },
  rightPad: {
    paddingRight: 10,
  },
  row: {
    flex: 1,
  },
  card: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
    borderRadius: 10,
    marginBottom: 10,

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 2,
  },
  cardIcon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.ACCENT_1,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  cardTitle: {
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.BLACK,
  },
});

export default Dashboard;

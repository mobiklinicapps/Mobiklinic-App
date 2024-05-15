import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerNavigationLogged} from './drawers';
import Diagnose from '../screens/diagnosis';
import Ambulances from '../screens/ambulance';
import Doctors from '../screens/doctors';
import ViewDiagnosis from '../screens/diagnosis.view';
import NewDiagnosis from '../screens/diagnosis.new';
import FollowUp from '../screens/diagnosis.follow.up';
import Chat from '../screens/Chat';
import Chats from '../screens/Chats';
import Profile from '../screens/profile';
import PatientData from '../simprints/patient.data';
import SimprintsConnect from '../simprints/simprintsID';
import PatientMedical from '../simprints/patient.medical';
import Vaccination from '../simprints/vaccination';
import SelectActivity from '../simprints/select.activity';
// import PatientSummary from '../simprints/patient.summary';
import GetPatients from '../simprints/getPatients';
import PatientLists from '../simprints/patient.lists';
import AntenatalCare from '../simprints/antenatal.care';
import CenteredButtons from '../simprints/CenteredButtons';
import VaccinationDatesList from '../simprints/VaccinationDatesList';
import DisplayPatients from '../simprints/display.patients';
import BeneficaryAdd from '../simprints/patient.add';
import Hospital from '../screens/hospitals';

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        options={{headerShown: false}}
        component={DrawerNavigationLogged}
      />
      <Stack.Screen
        name="Doctors"
        options={{headerShown: false}}
        component={Doctors}
      />
      <Stack.Screen
        name="Ambulances"
        options={{headerShown: false}}
        component={Ambulances}
      />
      <Stack.Screen
        name="Diagnose"
        options={{headerShown: false}}
        component={Diagnose}
      />
      <Stack.Screen
        name="ViewDiagnosis"
        options={{headerShown: false}}
        component={ViewDiagnosis}
      />
      <Stack.Screen
        name="NewDiagnosis"
        options={{headerShown: false}}
        component={NewDiagnosis}
      />
      <Stack.Screen
        name="FollowUp"
        options={{headerShown: false}}
        component={FollowUp}
      />
      <Stack.Screen
        name="Chats"
        options={{headerShown: false}}
        component={Chats}
      />
      <Stack.Screen
        name="Chat"
        options={{headerShown: false}}
        component={Chat}
      />
      <Stack.Screen
        name="Profile"
        options={{headerShown: false}}
        component={Profile}
      />
      <Stack.Screen
        name="PatientData"
        options={{headerShown: false}}
        component={PatientData}
      />
      <Stack.Screen
        name="SimprintsConnect"
        options={{headerShown: false}}
        component={SimprintsConnect}
      />
      <Stack.Screen
        name="PatientMedical"
        options={{headerShown: false}}
        component={PatientMedical}
      />
      <Stack.Screen
        name="Vaccination"
        options={{headerShown: false}}
        component={Vaccination}
      />
      <Stack.Screen
        name="SelectActivity"
        options={{headerShown: false}}
        component={SelectActivity}
      />

      <Stack.Screen
        name="GetPatients"
        options={{headerShown: false}}
        component={GetPatients}
      />
      <Stack.Screen
        name="PatientLists"
        options={{headerShown: false}}
        component={PatientLists}
      />
      <Stack.Screen
        name="AntenatalCare"
        options={{headerShown: false}}
        component={AntenatalCare}
      />
      <Stack.Screen
        name="CenteredButtons"
        options={{headerShown: false}}
        component={CenteredButtons}
      />
      <Stack.Screen
        name="VaccinationDatesList"
        options={{headerShown: false}}
        component={VaccinationDatesList}
      />
      <Stack.Screen
        name="DisplayPatients"
        options={{headerShown: false}}
        component={DisplayPatients}
      />
      <Stack.Screen
        name="BeneficaryAdd"
        options={{headerShown: false}}
        component={BeneficaryAdd}
      />
        <Stack.Screen
        name="Hospital"
        options={{headerShown: false}}
        component={Hospital}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;

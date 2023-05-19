// import React from "react";
// import { createStackNavigator } from "@react-navigation/stack";
// import { DrawerNavigationLogged } from "./drawers";
// import Diagnose from "../screens/diagnosis";
// import Ambulances from "../screens/ambulance";
// import Doctors from "../screens/doctors";
// import ViewDiagnosis from "../screens/diagnosis.view";
// import NewDiagnosis from "../screens/diagnosis.new";
// import FollowUp from "../screens/diagnosis.follow.up";
// import Chat from "../screens/Chat";
// import Chats from "../screens/Chats";
// import Profile from "../screens/profile";

// const Stack = createStackNavigator();

// function AuthStack() {
// 	return (
// 		<Stack.Navigator>
// 			<Stack.Screen
// 				name="Dashboard"
// 				options={{ headerShown: false }}
// 				component={DrawerNavigationLogged}
// 			/>
// 			<Stack.Screen
// 				name="Doctors"
// 				options={{ headerShown: false }}
// 				component={Doctors}
// 			/>
// 			<Stack.Screen
// 				name="Ambulances"
// 				options={{ headerShown: false }}
// 				component={Ambulances}
// 			/>
// 			<Stack.Screen
// 				name="Diagnose"
// 				options={{ headerShown: false }}
// 				component={Diagnose}
// 			/>
// 			<Stack.Screen
// 				name="ViewDiagnosis"
// 				options={{ headerShown: false }}
// 				component={ViewDiagnosis}
// 			/>
// 			<Stack.Screen
// 				name="NewDiagnosis"
// 				options={{ headerShown: false }}
// 				component={NewDiagnosis}
// 			/>
// 			<Stack.Screen
// 				name="FollowUp"
// 				options={{ headerShown: false }}
// 				component={FollowUp}
// 			/>
// 			<Stack.Screen
// 				name="Chats"
// 				options={{ headerShown: false }}
// 				component={Chats}
// 			/>
// 			<Stack.Screen
// 				name="Chat"
// 				options={{ headerShown: false }}
// 				component={Chat}
// 			/>
// 			<Stack.Screen
// 				name="Profile"
// 				options={{ headerShown: false }}
// 				component={Profile}
// 			/>
// 		</Stack.Navigator>
// 	);
// }

// export default AuthStack;

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Diagnose from '../screens/diagnosis';
import Ambulances from '../screens/ambulance';
import Doctors from '../screens/doctors';
import ViewDiagnosis from '../screens/diagnosis.view';
import NewDiagnosis from '../screens/diagnosis.new';
import FollowUp from '../screens/diagnosis.follow.up';
import Chat from '../screens/Chat';
import Chats from '../screens/Chats';
import Profile from '../screens/profile';
// import {DrawerNavigation} from './drawers';
import Dashboard from '../screens/dashboard';
import {COLORS, DIMENS} from '../constants/styles';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import About from '../screens/about';

const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();

function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Dashboard"
          // options={{headerShown: false}}
          component={Dashboard}
        />
        <Stack.Screen
          name="About"
          // options={{headerShown: false}}
          component={About}
        />
        <Stack.Screen
          name="Doctors"
          // options={{headerShown: false}}
          component={Doctors}
        />
        <Stack.Screen
          name="Ambulances"
          // options={{headerShown: false}}
          component={Ambulances}
        />
        <Stack.Screen
          name="Diagnose"
          // options={{headerShown: false}}
          component={Diagnose}
        />
        <Stack.Screen
          name="ViewDiagnosis"
          // options={{headerShown: false}}
          component={ViewDiagnosis}
        />
        <Stack.Screen
          name="NewDiagnosis"
          // options={{headerShown: false}}
          component={NewDiagnosis}
        />
        <Stack.Screen
          name="FollowUp"
          // options={{headerShown: false}}
          component={FollowUp}
        />
        <Stack.Screen
          name="Chats"
          // options={{headerShown: false}}
          component={Chats}
        />
        <Stack.Screen
          name="Chat"
          // options={{headerShown: false}}
          component={Chat}
        />
        <Stack.Screen
          name="Profile"
          // options={{headerShown: false}}
          component={Profile}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthStack;

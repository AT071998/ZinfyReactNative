import 'react-native-gesture-handler';

// Import React and Component
import React from 'react';

// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator,HeaderBackButton} from '@react-navigation/stack';
import DrawerNavigationRoutes from './DrawerNavigationRoutes';
import UserNavigationRoutes from './UserNavigationRoutes';
import LoginScreen from './Screen/LoginScreen';
import EmployeeDashboard from './Screen/Employee/EmployeeDashboard';
import ForgotPassword from './Screen/ForgotPassword';
import OtpVerification from './Screen/OtpVerification';
import UpdatePassword from './Screen/UpdatePassword';


const Stack = createStackNavigator();

const Auth = ({navigation}) => {
  
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
            name="ForgotPassword"
                component={ForgotPassword}
                options={{
                  headerLeft: () => (
                    <HeaderBackButton onPress={()=>navigation.navigate("LoginScreen")}/>
                  ), }}
      />

<Stack.Screen
            name="OtpVerification"
                component={OtpVerification}
                options={{
                  headerLeft: () => (
                    <HeaderBackButton onPress={()=>navigation.navigate("LoginScreen")}/>
                  ), }}
      />


<Stack.Screen
            name="UpdatePassword"
                component={UpdatePassword}
                options={{
                  headerLeft: () => (
                    <HeaderBackButton onPress={()=>navigation.navigate("LoginScreen")}/>
                  ), }}
      />


      
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">  
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        
        
        <Stack.Screen
          name="EmployeeDashboard"
          component={EmployeeDashboard}
          // Hiding header for Navigation Drawer
          
        />

        <Stack.Screen
          name="DrawerNavigationRoutes"
          component={DrawerNavigationRoutes}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />

      <Stack.Screen
          name="UserNavigationRoutes"
          component={UserNavigationRoutes}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
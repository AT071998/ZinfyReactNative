import React from 'react';

// Import Navigators from React Navigation
import {createStackNavigator,HeaderBackButton} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { Button,Platform,Alert,FlatList,View,StyleSheet,Dimensions} from 'react-native';
// Import Screens
import { Icon } from "react-native-elements";
import { FontAwesome } from '@expo/vector-icons'; 
import CustomSidebarMenu from './components/CustomSideBarMenu';
import NavigationDrawerHeader from './components/NavigationDrawerHeader';
import { Ionicons } from '@expo/vector-icons'; 
import LeaveApply from './Screen/Employee/Leave/LeaveApply';
import LeaveHistory from './Screen/Employee/Leave/LeaveHistory';
import EmployeeDashboard from './Screen/Employee/EmployeeDashboard';
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import SalaryView from './Screen/Employee/Salary/SalaryView';
import SalarySlip from './Screen/Employee/Salary/SalarySlip';
import LoginScreen from './Screen/LoginScreen';
import ViewSalary from './Screen/Employee/Salary/ViewSalary';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ViewProfile from './Screen/Employee/Profile/ViewProfile';
import EditProfile from './Screen/Employee/Profile/EditProfile';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const colors = {
  themeColor: "#4263ec",
  white: "#fff",
  background: "#f4f6fc",
  greyish: "#a4a4a4",
  tint: "#2b49c3"
};

const { width } = Dimensions.get("screen");

const Dashboard = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="EmployeeDashboard"
      mode="card"
      headerMode="screen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} 
          />
        ),
       
       
        headerStyle: {
          backgroundColor: '#FFFFFF', //Set Header color
        },
        headerTintColor: '#323232', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
       // cardStyle: { backgroundColor: "#FFFFFF" },
        //headerTransparent:true
      }}>

<Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />


<Stack.Screen
        name="LeaveHistory"
        component={LeaveHistory}
        options={{
          title: 'Leave History', //Set Header Title
        }}
      />

      
<Stack.Screen
        name="ViewProfile"
        component={ViewProfile}
        options={{
          title:"Your Profile"
        }}
      />

<Stack.Screen
        name="Edit"
        component={EditProfile}
       // options={{headerShown: false}}
      />
   

    <Stack.Screen
        name="EmployeeDashboard"
        component={EmployeeDashboard}
        options={{
          title: 'Dashboard',
          headerRight: () => (
            <View style={styles.iconContainer}>
            <TouchableOpacity onPress={()=>props.navigation.navigate()}>
            <MaterialCommunityIcons
              name="bell-outline" //
              size={30}
              color="black"
              
            />
            </TouchableOpacity>
        
            
            </View>
          ), //Set Header Title
        }}
      />

<Stack.Screen
        name="LeaveApply"
        component={LeaveApply}
        options={{
          title: 'Leave Application',
        }}
      />




<Stack.Screen
        name="SalaryView"
        component={ViewSalary}
        options={{
          title: 'Detailed Salary Slip',
        }}
      />
         <Stack.Screen
        name="SalarySlip"
        component={SalarySlip}
        options={{
          title: 'SalarySlip',
          //Set Header Title
          headerLeft: () => (
            <HeaderBackButton onPress={()=>navigation.navigate("EmployeeDashboard")}/>
          ), 
         // headerLeft: (<HeaderBackButton onPress={_ => navigation.navigate("EmployeeDashboard")}/>) //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const LeaveStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="LeaveApply"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#FFFFFF', //Set Header color
        },
        headerTintColor: '#323232', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
       // cardStyle: { backgroundColor: "#FFFFFF" },
        //headerTransparent:true
      }}>
   

    <Stack.Screen
        name="LeaveApply"
        component={LeaveApply}
        options={{
          title: 'Leave Application',
         //Set Header Title 
        }}
      />


<Stack.Screen
        name="LeaveHistory"
        component={LeaveHistory}
        options={{
          title: 'Leave History', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};


const ManageLeaveStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="LeaveApply"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#FFFFFF', //Set Header color
        },
        headerTintColor: '#323232', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
       // cardStyle: { backgroundColor: "#FFFFFF" },
        //headerTransparent:true
      }}>
   

    <Stack.Screen
        name="LeaveHistory"
        component={LeaveHistory}
        options={{
          title: 'Leave History', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const ManageSalaryStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="SalaryView"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#FFFFFF', //Set Header color
        },
        headerTintColor: '#323232', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
       // cardStyle: { backgroundColor: "#FFFFFF" },
        //headerTransparent:true
      }}>

    <Stack.Screen
        name="SalaryView"
        component={SalaryView}
        options={{
          title: 'Advance Pay View', //Set Header Title
        }}
      />
       <Stack.Screen
        name="SalarySlip"
        component={SalarySlip}
        options={{
          title: 'SalarySlip',
          
        }}
      />
    </Stack.Navigator>
  );
};




const DrawerNavigatorRoutes = (props) => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: '#cee1f2',
        color: '#cee1f2',
        inactiveTintColor: "#000",
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          marginVertical:5,
          color:'white',
        },
        //itemStyle: {marginVertical: 5, color: 'white'},
     //   labelStyle: {
     //     fontSize: 18,
     //     marginLeft: 12,
      //    fontWeight: "normal",
      //    color:"#d8d8d8"
      //  }
        labelStyle: {
          color: '#d8d8d8',
        },
      }}
      screenOptions={{headerShown: false}}
      drawerContent={CustomSidebarMenu}>


      <Drawer.Screen
        name="employeedashboard"
        options={{drawerLabel: 'Dashboard',
        drawerIcon:()=><MaterialCommunityIcons name="view-dashboard" size={24} color="white" />}}
        component={Dashboard}
      />

      <Drawer.Screen
        name="leavescreenstack"
        options={{drawerLabel: 'Leave Application',
        drawerIcon:()=><MaterialCommunityIcons name="application" size={24} color="white" />}}
        component={LeaveStack}
      />

    <Drawer.Screen
        name="leavehistorystack"
        options={{drawerLabel: 'Leave History',
        drawerIcon:()=><FontAwesome name="history" size={24} color="white" />}}
        component={ManageLeaveStack}
      />

    <Drawer.Screen
        name="salaryviewstack"
        options={{drawerLabel: 'Salary View',
        drawerIcon:()=><MaterialCommunityIcons name="calendar-check-outline" size={24} color="white"/>}}
        component={ManageSalaryStack}
      />

     
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  icon: {
    paddingLeft: 10
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 120
  }
});


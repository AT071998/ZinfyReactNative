import React,{useState,useEffect} from 'react';

// Import Navigators from React Navigation
import {createStackNavigator,HeaderBackButton} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { Platform,Alert,FlatList,TouchableOpacity,Text,StyleSheet,View,Dimensions,Button} from 'react-native';
// Import Screens
import { FontAwesome } from '@expo/vector-icons'; 

import CustomSidebarMenu from './components/CustomSideBarMenu';
import NavigationDrawerHeader from './components/NavigationDrawerHeader';
import AddEmployee from './Screen/Admin/AddEmployee';
import DisplayEmployee from './Screen/Admin/DisplayEmployee';
import Profile from './Screen/Admin/Profile';
import AddStudent from './Screen/Admin/Students/AddStudent';
import ViewStudent from './Screen/Admin/Students/DisplayStudent';
import EmployeeList from './Screen/Admin/Attendance/EmployeeList';
import ShowAttendance from './Screen/Admin/Attendance/ShowAttendance';
import DateWiseReport from './Screen/Admin/Attendance/DatewiseReport';
import LeaveStatus from './Screen/Admin/Leaves/LeaveStatus';
import LeaveAction from './Screen/Admin/Leaves/LeaveAction';
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import EmpList from './Screen/Admin/Salary/EmpList';
import AdvancePayment from './Screen/Admin/Salary/AdvancePayment';
import AdvanceSalaryList from './Screen/Admin/Salary/AdvanceSalaryList';
import MonthlySalary from './Screen/Admin/Salary/MonthlySalary';
import ViewSalary from './Screen/Admin/Salary/ViewSalary';
import Dashboard from './Screen/Admin/Dashboard';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import AdminProfile from './Screen/Admin/AdminProfile';
import ChangePassword from './Screen/Admin/ChangePassword';
import { FontAwesome5 } from '@expo/vector-icons'; 
import EditAdminProfile from './Screen/Admin/EditAdminProfile';
import { Fontisto } from '@expo/vector-icons'; 
import AttendanceReport from './Screen/Admin/Reports/AttendanceReport';
import SalaryReport from './Screen/Admin/Reports/SalaryReport';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const { width } = Dimensions.get("screen");
const DashboardScreenStack = ({navigation}) => {

  const [data,setData] = useState([]);

  const fetchLeaveCountApi = ()=>{
    return fetch('http://192.168.43.114:8000/api/getPendingLeave')
    .then(res=>res.json())
                .then(result=>{
                    setData(result.data)
                    console.log(result.data);
                }).catch(err=>{
                    console.log("error occured");
                })
    }

    useEffect(()=>{
      fetchLeaveCountApi();
  },[])
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
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
        name="Dashboard"
        component={Dashboard} 
        options={{
          title: 'Dashboard',
          headerRight: () => (
            <View style={styles.iconContainer}>
     
          <TouchableOpacity >
            <Text style={{color:"red",alignContent:"flex-end",marginRight:10,marginBottom:0}}>{data}</Text>
            <MaterialCommunityIcons
              name="bell-outline" //
              size={30}
              color="black"
            />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={()=>navigation.navigate("Profile")} style={{marginTop:15}}>
            <AntDesign name="user" size={30} color="black" />
            </TouchableOpacity>
           
            </View>
          ), 
         
        }}
      />

<Stack.Screen
        name="EmpList"
        component={EmpList}
        options={{
          headerTitle: "Employee List",
        
          headerTitleStyle: {
            alignSelf: (Platform.OS === 'android') ? 'flex-start' : 'center',
           // marginRight:50
          },
          
        }}
      />  

    <Stack.Screen
        name="Profile"
        component={AdminProfile} 
        options={{
          title: 'Admin Profile',
          headerLeft: () => (
            <HeaderBackButton onPress={()=>navigation.navigate("Dashboard")}/>
          ), 
          
         
        }}
      />

<Stack.Screen
        name="ChangePassword"
        component={ChangePassword} 
        options={{
          title: 'Password',
          headerLeft: () => (
            <HeaderBackButton onPress={()=>navigation.navigate("Profile")}/>
          ), 
         
        }}
      />

<Stack.Screen
        name="EditProfile"
        component={EditAdminProfile} 
        options={{
          title: 'Edit',
          headerLeft: () => (
            <HeaderBackButton onPress={()=>navigation.navigate("Dashboard")}/>
          ), 
          
          
         
        }}
      />
       <Stack.Screen
        name="LeaveStatus"
        component={LeaveStatus}
        options={{
          title: 'Leave Requests', //Set Header Title
        }}
      />  

      <Stack.Screen
        name="LeaveAction"
        component={LeaveAction}
        options={{
          title: 'Take Action', //Set Header Title
          headerLeft: () => (
            <HeaderBackButton onPress={()=>navigation.navigate("LeaveStatus")}/>
          ), 
        }}
      />  
    

   
    </Stack.Navigator>
  );
};

const EmployeeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="DisplayEmployee"
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
        name="AddEmployee"
        component={AddEmployee} 
        options={{
          title: 'Create Employee',
          headerLeft: () => (
            <HeaderBackButton onPress={()=>navigation.navigate("DisplayEmployee")}/>
          ), 
        }}
      />

    <Stack.Screen
        name="DisplayEmployee"
        component={DisplayEmployee}
        options={{
          title: 'Employee List', //Set Header Title
        }}
      />

    <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile', //Set Header Title
          headerLeft: () => (
            <HeaderBackButton onPress={()=>navigation.navigate("DisplayEmployee")}/>
          ), 
        }}
      />
    </Stack.Navigator>
  );
};


const StudentScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="ViewStudent"
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
        name="AddStudent"
        component={AddStudent}
        options={{
          title: 'Add Student', //Set Header Title
          headerLeft: () => (
            <HeaderBackButton onPress={()=>navigation.navigate("ViewStudent")}/>
          ), 
        }}
      />
       <Stack.Screen
        name="ViewStudent"
        component={ViewStudent}
        options={{
          title: 'Student List',
          
        }}
      />
    </Stack.Navigator>
  );
};


const AttendanceScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="EmployeeList"
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
        name="EmployeeList"
        component={EmployeeList}
        options={{
          title: 'Employee List', //Set Header Title
        }}
      />

    <Stack.Screen
        name="DateWiseReport"
        component={DateWiseReport}
        options={{
          title: 'Report', //Set Header Title
          headerLeft: () => (
            <HeaderBackButton onPress={()=>navigation.navigate("EmployeeList")}/>
          ), 
        }}
      />  

    <Stack.Screen
        name="ShowAttendance"
        component={ShowAttendance}
        options={{
          headerTitle: "Attendance Report",
          headerLeft: () => (
            <HeaderBackButton onPress={()=>navigation.navigate("EmployeeList")}/>
          ), 
          //headerRight: () => (
      //      <Button 
       //      
       //       onPress={() => alert('This is a button!')}
       //       title="DateWise"
       //       style={ {headerRight:"12px"}}
       //       labelStyle={{fontWeight:1}}
       //       color={Platform.OS === 'android' ? '#ffc04d' : Colors.primaryColor}
       ///     />
         // ),
        }}
      />
     
    </Stack.Navigator>
  );
};

const LeaveScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="LeaveList"
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
        name="LeaveStatus"
        component={LeaveStatus}
        options={{
          title: 'Leave Requests', //Set Header Title
        }}
      />  

      <Stack.Screen
        name="LeaveAction"
        component={LeaveAction}
        options={{
          title: 'Take Action', //Set Header Title
          headerLeft: () => (
            <HeaderBackButton onPress={()=>navigation.navigate("LeaveStatus")}/>
          ), 
        }}
      />  

 
    </Stack.Navigator>
  );
};



const SalaryStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="EmpList"
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
        name="EmpList"
        component={EmpList}
        options={{
          headerTitle: "Employee List",
          headerTitleStyle: {
            alignSelf: (Platform.OS === 'android') ? 'flex-start' : 'center',
           // marginRight:50
          },
          
        }}
      />  

      <Stack.Screen
        name="AdvancePayment"
        component={AdvancePayment}
        options={{
          title: 'AdvancePayment',
          headerLeft: () => (
            <HeaderBackButton onPress={()=>navigation.navigate("EmpList")}/>
          ),  //Set Header Title
        }}
      />      
        <Stack.Screen
        name="AdvanceSalaryList"
        component={AdvanceSalaryList}
        options={{
          title: ' Advance Payment List', 
          headerLeft: () => (
            <HeaderBackButton onPress={()=>navigation.navigate("EmpList")}/>
          ), //Set Header Title
        }}
      />      

      <Stack.Screen
        name="MonthlySalary"
        component={MonthlySalary}
        options={{
          title: 'MonthlySalary', //Set Header Title
          headerLeft: () => (
            <HeaderBackButton onPress={()=>navigation.navigate("EmpList")}/>
          ), 
        }}
      />      

    <Stack.Screen
        name="ViewSalary"
        component={ViewSalary}
        options={{
          title: 'View Salary', //Set Header Title
          headerLeft: () => (
            <HeaderBackButton onPress={()=>navigation.navigate("EmpList")}/>
          ), 
        }}
      />      

    </Stack.Navigator>
  );
};


const reportscreenstack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="LeaveList"
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
        name="AttendanceReport"
        component={AttendanceReport}
        options={{
          title: 'Report',
            headerRight: () => (
              <View style={{marginLeft:10,marginRight:10}}>
            <Button 
             
             onPress={()=>navigation.navigate("SalaryReport")}
              title="SALARY REPORT"
              labelStyle={{fontWeight:1}}
             color = '#2E2EFF'
            />
              </View>
         
          ),
         
        }}
      />  

      <Stack.Screen
        name="SalaryReport"
        component={SalaryReport}
        options={{
          title: 'Report for Month',
         
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
        name="dashboardscreenstack"
        options={{drawerLabel: 'Dashboard',
        drawerIcon:()=><MaterialCommunityIcons name="view-dashboard" size={24} color="white" />}}
        component={DashboardScreenStack}
      />
      <Drawer.Screen
        name="employeescreenStack"
        options={{drawerLabel: 'Manage Employees',
        drawerIcon:()=><AntDesign name="addusergroup" size={24} color="white" />}}
        component={EmployeeScreenStack}
      />

      <Drawer.Screen
        name="studentscreenstack"
        options={{drawerLabel: 'Manage Students',
        drawerIcon:()=><FontAwesome5 name="user-graduate" size={24} color="white" />}}
        component={StudentScreenStack}
      />

    <Drawer.Screen
        name="attendancescreenstack"
        options={{drawerLabel: 'Manage Attendance',
        drawerIcon:()=><MaterialCommunityIcons name="calendar-check-outline" size={24} color="white" />}}
        component={AttendanceScreenStack}
      />

      <Drawer.Screen
        name="leavescreenstack"
        options={{drawerLabel: 'Manage Leaves',
      drawerIcon:()=><SimpleLineIcons name="envelope-letter" size={24} color="white" />}}
        
        component={LeaveScreenStack}
      />

      <Drawer.Screen
        name="salaryscreenstack"
        options={{drawerLabel: 'Manage Salaries',
        drawerIcon:()=><Fontisto name="money-symbol" size={24} color="white" />}}
        component={SalaryStack}
      />


    <Drawer.Screen
        name="reportscreenstack"
        options={{drawerLabel: 'Reports',
        drawerIcon:()=><FontAwesome name="files-o" size={24} color="white" />}}
        component={reportscreenstack}
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
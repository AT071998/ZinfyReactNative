import React,{useEffect,useState} from "react";
import { View, Text, StatusBar,StyleSheet,Alert} from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Touchable from 'react-native-platform-touchable';
import { Avatar } from 'react-native-paper';
import { Title } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { Component } from "react";
import { MaterialIcons } from '@expo/vector-icons'; 
import AsyncStorage from  "@react-native-async-storage/async-storage"
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 


const colors = {
  themeColor: "#4263ec",
  white: "#fff",
  background: "#f4f6fc",
  greyish: "#a4a4a4",
};

class Dashboard extends Component {
  
  constructor(props){
    super(props);
    this.state={
   
        dataSource:[],
        EmpNo:0,
        PendingLeave:0,
        Present:2,
        nextDate:'',
        name:'',
        item:'dashboard',
        
    }
  }

  fetchData = () =>{
     return fetch('http://192.168.43.114:8000/api/AllData')
       .then((response) => response.json())
       .then((responseJson) => {
        // console.log(responseJson);
         this.setState({dataSource: responseJson});
         this.setState({EmpNo:responseJson.q1[0].uuid});
         this.setState({PendingLeave:responseJson.q2[0].pendingLeave});

       /*  if(responseJson.q3 === []){
           console.log(responseJson.q3);
           console.log("entering");
          this.setState({Present:0});
         }else if(responseJson.q3[0].count > 0){
          console.log(responseJson.q3[0].count)
            this.setState({Present:responseJson.q3[0].count});
         }
       //  this.setState({Present:responseJson.q3[0].count});
       */
         this.setState({nextDate:responseJson.lastDay})
         this.setState({name:responseJson.q4[0].companyName});
       })
       .catch((error) => {
         console.error(error);
       })
   }

  componentDidMount(){
    this.fetchData();
    AsyncStorage.setItem('adminKey', "main"); // Note: persist input
  }


    

  Logout = ()=>{
    Alert.alert(
      'Logout',
      'Are you sure? You want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            return null;
          },
        },
        {
          text: 'Confirm',
          onPress: () => {
            AsyncStorage.clear();
            this.props.navigation.replace('Auth');
          },
        },
      ],
      {cancelable: false},
    );
  
  }


  render(){
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.themeColor
      }}>
      <StatusBar barStyle="light-content" backgroundColor={colors.themeColor} />
      <View style={{ backgroundColor: colors.themeColor}}>
        <View style={{ padding:10,flexDirection:"row",justifyContent:"space-between"}}>
          <Text style={{ color: colors.white, fontSize: 30 }}>
            Hello{"\n"}
            {this.state.name}
          </Text>
          <MaterialCommunityIcons name="office-building" size={60} color="white" />
        </View>
      </View>

      <View
        style={{
          padding: 15,
          flexDirection: "row",
          backgroundColor: colors.background,
          justifyContent: "space-between",
          alignItems: "center",
          textAlign:"center",
          borderTopLeftRadius: 20,
       //   borderTopRightRadius: 20
        }}
      >
         <Text style={{ fontSize: 24 ,}}>Dashboard</Text>
          <TouchableOpacity><Ionicons name="refresh" size={30} color="black" /></TouchableOpacity>
        
      </View>

      <ScrollView style={{backgroundColor: colors.background}}>

      <View style={styles.row}>
          <Touchable style={[styles.widgets]}>
            <View style={{alignItems:"center"}}>
                <SimpleLineIcons name="people" size={50} color="black" />
                <Title style={{fontSize:17,}}>Employees</Title>
                <Title style={{fontSize:20,}}>{this.state.EmpNo}</Title>
            </View>
          </Touchable>

          <Touchable style={styles.widgets} onPress={()=>this.props.navigation.navigate("LeaveStatus"  )}>
          <View style={{alignItems:"center"}}>
                <MaterialIcons name="pending-actions" size={50} color="black" />
                <Title style={{fontSize:17,}}>Leave Pending</Title>
                 <Title style={{fontSize:20,}}>{this.state.PendingLeave}</Title>
            </View>
          </Touchable>
        </View>
     
        <View style={styles.row}>
          <Touchable style={styles.widgets} onPress={()=>this.props.navigation.navigate("EmpList")}>
                  <View style={{alignItems:"center"}} >
                     <FontAwesome5 name="money-check" size={50} color="black" />
                        <Title style={{fontSize:17,}}>Issue Advance</Title>
                  </View>
          </Touchable>
          <Touchable style={styles.widgets}>
          <View style={{alignItems:"center"}}>
                <FontAwesome5 name="user-check" size={50} color="black" /> 
                <Title style={{fontSize:17,}}>{this.state.Present} Present</Title>
            </View>
          </Touchable>
        </View>

        <View style={styles.row}>
          <Touchable style={styles.widgets} >
                  <View style={{alignItems:"center"}}>
                    <MaterialIcons name="payments" size={50} color="black" />
                     <Title style={{fontSize:17,}}>Next Payment</Title>
                     <Title style={{fontSize:17,}}>{this.state.nextDate}</Title>
                  </View>
          </Touchable>
          <Touchable style={styles.widgets} onPress={()=>this.Logout()}>
          <View style={{alignItems:"center"}}>
               <MaterialCommunityIcons name="logout-variant" size={50} color="black" />
               <Title style={{fontSize:17,}}>Logout</Title>
            </View>
          </Touchable>
        </View>

        

       
      </ScrollView>
    </View>
  );
      }
}


const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor:"#E8E8E8"
  },
  row: {
    flex: 1,
    flexDirection: 'row',
     //changed height
    // height:"50px",
     marginTop:10,
     marginBottom:10,

  },
  title:{
    height:20,
    backgroundColor:"green",
  },
  tinyLogo: {
    width:100,
    height: 100,
  },
  widgets: { 
    backgroundColor: 'white',
    elevation: 2,
    flex: 1,
    height:130,
    marginBottom:10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center'
  }
})


export default Dashboard;
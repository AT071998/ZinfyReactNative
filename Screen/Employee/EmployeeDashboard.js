import React,{useEffect,useState} from "react";
import { View, Text, StatusBar,StyleSheet,Alert,LogBox} from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Touchable from 'react-native-platform-touchable';
import { Avatar } from 'react-native-paper';
import { Title } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { Component } from "react";
import AsyncStorage from  "@react-native-async-storage/async-storage"
import { MaterialIcons } from '@expo/vector-icons'; 
import { EvilIcons } from '@expo/vector-icons'; 
import {  Card,Button} from 'react-native-paper';



const colors = {
  themeColor: "#4263ec",
  white: "#fff",
  background: "#f4f6fc",
  greyish: "#a4a4a4",
};

class EmployeeDashboard extends Component {
  constructor(props){
    super(props);
    this.state={
        data:'',
        dataSource:[],
        dataSource2:[],
        dataSource3:[],
        status:'',
        EmpName:'',
        PendingCount:'',
        lastRefresh: Date(Date.now()).toString(),
        //for the purpose of time comparing during logout. . . . 
        currentDate:'',
        DashboardToken:0,
        TodaysDate:'',
        nextDate:'',
        NotificationToken:0,
        ActionToken:0,
        ApprovedDate:'',
        id:'',
        
    }
    LogBox.ignoreLogs(['componentWillReceiveProps']);
    this.refreshScreen = this.refreshScreen.bind(this);
    
  }

  refreshScreen() {
    this.setState({ lastRefresh: Date(Date.now()).toString() })
  }

  fetchUserName = (dataa) =>{
   // console.log("Usrname"+dataa);
    //const id = 1;
    return fetch('http://192.168.43.114:8000/api/dashboard/'+dataa)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({dataSource: responseJson}, 
          function() {
       //   console.log(this.state.dataSource);
          var name =  responseJson.data[0].employee_name
          this.setState({EmpName:name});
          
        });
      })
      .catch((error) => {
        console.error(error);
      })
    
  }

  getCurrentDate=()=>{

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    this.setState({TodaysDate:date+'-0'+month+'-'+ year});
    this.setState({nextDate:(date+1)+'-0'+month+'-'+year});
    
}

  fetchLeaveData = (dataaa) =>{
    //console.log("leave"+dataaa);
   // const id = 1;
    return fetch('http://192.168.43.114:8000/api/countPending/'+dataaa)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({dataSource2: responseJson}); 
          
          var count = responseJson.data;
          this.setState({PendingCount:count});   
      })
      .catch((error) => {
        console.error(error);
      })
  }

  fetchSalaryData = (dataaa) =>{
  //  console.log("salary"+dataaa);
   // const id = 1;
    return fetch('http://192.168.43.114:8000/api/SalaryStatus/'+dataaa)
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson);
        this.setState({dataSource3: responseJson.data} );
      //  console.log(this.state.dataSource3);
        this.setState({status:responseJson.data[0].status});
        //qconsole.log(this.state.status);
      })
      .catch((error) => {
        console.error(error);
      })
  }



  LogoutData = ()=>{
    console.log("Time inside logout"+this.state.currentDate);
    if('09:00:00' <= this.state.currentDate){
      if(this.state.currentDate <= '13:00:00'){
        this.GoaheadAlert();
        
        //Alert.alert("You cannot Logout for now. Your attendance for the day will be marked as Absent.Are your sure you want to logout?");
      }
      else{
        Alert.alert(
          'Confirm Attendance',
          'Are you sure??',
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () => this.GoBackLoginScreen()},
          ],
          { cancelable: false }
        )
      
      }
    }
    
   
  }




  GoaheadAlert = ()=>{
     console.log("entering");
      Alert.alert(
        'Confirm Attendance',
        'You cannot Logout for now. Your attendance for the day will be marked as Absent.Are your sure you want to logout?',
        [
          {text: 'Go back', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'Go ahead', onPress: () => this.GoBackLoginScreen()},
        ],
        { cancelable: false }
      )
  
  }

  GoBackLoginScreen = ()=>{
    console.log("Going through logout option");
    const that = this;
    console.log(this.state.data);
    fetch('http://192.168.43.114:8000/api/logout/'+this.state.data,{
      method:'POST',
      headers:{
          'Accept':'application/json',
          'Content-Type':'application/json; charset=UTF-8'
      }
  })
  .then(function(response){
      response.json()
      .then(function(resp){
        console.log(resp);
        //const that = this;
         if(resp.status === "updated"){
           console.log("Logout Successfully!");
           that.props.navigation.replace('Auth');
           AsyncStorage.clear();
         }else{
           console.log("not proper");
         }
      
      })
  })
   
  }




  fetchAnyLeaveNotification = (data)=>{
   // console.log("fetch leave"+data)
    return fetch('http://192.168.43.114:8000/api/notificationArea/'+data)
    .then((response) => response.json())
    .then((responseJson) => {
    //  console.log(responseJson);
     // console.log(this.state.DashboardToken);
        console.log(responseJson);
      if(responseJson.data === "no"){
        console.log("Show the normal dashboard");
        this.setState({DashboardToken:0});
      }else if(responseJson.status == "data"){
        //console.log("Perform the notification here");
        this.setState({DashboardToken:1});
        //console.log(responseJson.data[0].approved_on);
        this.setState({ApprovedDate:responseJson.data[0].todate});
      console.log("Approved date is"+this.state.ApprovedDate);
        const obtainedApiDate = responseJson.data[0].approved_on;
        console.log(this.state.TodaysDate);
        console.log(this.state.nextDate);
       
        console.log(obtainedApiDate);
        if(obtainedApiDate <= this.state.TodaysDate | this.state.TodaysDate <= this.state.nextDate ){
          //console.log("Date is today");
          console.log("Working");
          this.setState({NotificationToken:1});
          if(responseJson.data[0].is_approved == 1){
            this.setState({ActionToken:1});
            console.log("Acepted")
          }else if(responseJson.data[0].is_approved == 2){
            this.setState({ActionToken:2});
            console.log("Rejected");
          }

        }
        else{
          console.log("Hello");
          this.setState({DashboardToken:0});
        }


      }
    })
    .catch((error) => {
      console.error(error);
    })
  }

  componentDidMount(){
    AsyncStorage.getItem('EmpId').then((value) => {
      if (value !== null){
      // saved input is available
      this.setState({ data: JSON.parse(value)}); // Note: update state with last entered value
      var res = this.state.data;
      console.log("DASHBOARD Employee id is"+res);
      this.setState({id:res});
      //for comparing the time. . . . 
      var hours = new Date().getHours(); //To get the Current Hours
      var min = new Date().getMinutes(); //To get the Current Minutes
      var sec = new Date().getSeconds(); //To get the Current Seconds
      this.setState({currentDate: hours + ':' + min + ':' + sec});
     // console.log("Current date and time is "+this.state.currentDate);
      this.fetchUserName(res);
      this.getCurrentDate();
      this.fetchLeaveData(res);
      this.fetchSalaryData(res);
      this.fetchAnyLeaveNotification(res);
      AsyncStorage.setItem('input', JSON.stringify(res));
    }
    }).done();
   
  }



  render(){
    const {navigate} = this.props.navigation;
   
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.themeColor
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor={colors.themeColor} />
      <View style={{ backgroundColor: colors.themeColor}}>
        <View style={{ padding:20,flexDirection:"row",justifyContent:"space-between"}}>
          <Text style={{ color: colors.white, fontSize: 30 }}>
            Hello{"\n"}
            {this.state.EmpName}   
          </Text>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate("ViewProfile")} >
                <EvilIcons name="user" size={100} color="white" style={{marginLeft:10}}/>
                <Button mode="contained" color="white">Profile</Button>
          </TouchableOpacity>
          
         
        </View>
      </View>

      <View
        style={{
          padding: 20,
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
          <TouchableOpacity onPress={this.fetchLeaveData}><Ionicons name="refresh" size={30} color="black" /></TouchableOpacity>
        
      </View>

      <ScrollView style={{backgroundColor: colors.background}}>
        <View>
        {
              this.state.DashboardToken == 1 & this.state.ActionToken == 1 ? (
                
        <View>
           <View style={{height:100,backgroundColor:"green",padding:10,marginLeft:10,marginRight:10,borderRadius:10,flexDirection:"row"}}>
             <TouchableOpacity>
               <Text></Text>
             </TouchableOpacity>
                   <Text style={{fontSize:17,color:"white",}}>Hello,{"\n"} You Leave applied on {this.state.ApprovedDate} is Approved </Text>
                   </View>
        
       
        <View style={styles.row}>
                  <Touchable style={[styles.widgets]} onPress={()=>navigate("LeaveApply")}>
                    <View style={{alignItems:"center"}}>
                        <Ionicons name="md-add" size={40} color="black"/>
                        <Title style={{fontSize:17,}}>Apply Leave</Title>
                    </View>
                  </Touchable>

                  <Touchable style={styles.widgets}>
                  <View style={{alignItems:"center"}}>
                        <View style={{alignSelf:"flex-end"}}>
                            <Text style={{color:"red"}}>{this.state.PendingCount}</Text>
                        </View>
                        <Entypo name="notification" size={40} color="black" />
                        <Title style={{fontSize:17,}}>Pending Leave</Title>
                    </View>
                  </Touchable>
                </View>
            
                <View style={styles.row}>
                {this.state.status == "Paid" ? (
                                                  <Touchable style={styles.widgets} onPress={()=>navigate("SalarySlip")}>
                                                    <View style={{alignItems:"center"}}>
                                                    <MaterialIcons name="attach-money" size={40} color="black" />
                                                        <Title style={{fontSize:17,}}>View Salary Slip</Title>
                                                    </View>
                                                  </Touchable>
                                                  ) :(
                                                    <Touchable style={styles.widgets}>
                                                    <View style={{alignItems:"center"}}>
                                                    <MaterialIcons name="attach-money" size={40} color="black" />
                                                        <Title style={{fontSize:17,}}>Salary Slip is yet</Title>
                                                    </View>
                                                  </Touchable>
                                                    )
                                                    }
                

                  <Touchable style={styles.widgets} onPress={()=>this.LogoutData()}>
                  <View style={{alignItems:"center"}}>
          
                        <MaterialCommunityIcons name="logout-variant" size={40} color="black" />
                        <Title style={{fontSize:17,}}>Logout</Title>
                    </View>
                  </Touchable>
                </View>

                          </View>
                      ) : this.state.DashboardToken == 1 & this.state.ActionToken == 2 ?(
                <View>
                   <View style={{height:100,backgroundColor:"#FD9346",padding:10,marginLeft:10,marginRight:10,borderRadius:10,flexDirection:"row"}}>
                   <Text style={{fontSize:17,color:"white",}}>Hello,{"\n"} You Leave applied on {this.state.ApprovedDate} is Rejected. Kindly Contact Manager for further request. </Text>
                   </View>

                <View style={styles.row}>
                          <Touchable style={[styles.widgets]} onPress={()=>navigate("LeaveApply")}>
                            <View style={{alignItems:"center"}}>
                                <Ionicons name="md-add" size={40} color="black"/>
                                <Title style={{fontSize:17,}}>Apply Leave</Title>
                            </View>
                          </Touchable>
                
                          <Touchable style={styles.widgets}>
                          <View style={{alignItems:"center"}}>
                                <View style={{alignSelf:"flex-end"}}>
                                    <Text style={{color:"red"}}>{this.state.PendingCount}</Text>
                                </View>
                                <Entypo name="notification" size={40} color="black" />
                                <Title style={{fontSize:17,}}>Pending Leave</Title>
                            </View>
                          </Touchable>
                        </View>
                     
                        <View style={styles.row}>
                        {this.state.status == "Paid" ? (
                                                          <Touchable style={styles.widgets} onPress={()=>navigate("SalarySlip")}>
                                                             <View style={{alignItems:"center"}}>
                                                             <MaterialIcons name="attach-money" size={40} color="black" />
                                                                 <Title style={{fontSize:17,}}>View Salary Slip</Title>
                                                             </View>
                                                           </Touchable>
                                                           ) :(
                                                            <Touchable style={styles.widgets}>
                                                            <View style={{alignItems:"center"}}>
                                                            <MaterialIcons name="attach-money" size={40} color="black" />
                                                                <Title style={{fontSize:17,}}>Salary Slip is yet</Title>
                                                            </View>
                                                          </Touchable>
                                                            )
                                                            }
                         
                
                          <Touchable style={styles.widgets} onPress={()=>this.LogoutData()}>
                          <View style={{alignItems:"center"}}>
                  
                                <MaterialCommunityIcons name="logout-variant" size={40} color="black" />
                                <Title style={{fontSize:17,}}>Logout</Title>
                            </View>
                          </Touchable>
                        </View>
                
                                  </View>
              ):(
                <View>
               
              <View style={styles.row}>
                        <Touchable style={[styles.widgets]} onPress={()=>navigate("LeaveApply")}>
                          <View style={{alignItems:"center"}}>
                              <Ionicons name="md-add" size={40} color="black"/>
                              <Title style={{fontSize:17,}}>Apply Leave</Title>
                          </View>
                        </Touchable>
              
                        <Touchable style={styles.widgets}>
                        <View style={{alignItems:"center"}}>
                              <View style={{alignSelf:"flex-end"}}>
                                  <Text style={{color:"red"}}>{this.state.PendingCount}</Text>
                              </View>
                              <Entypo name="notification" size={40} color="black" />
                              <Title style={{fontSize:17,}}>Pending Leave</Title>
                          </View>
                        </Touchable>
                      </View>
                   
                      <View style={styles.row}>
                      {this.state.status == "Paid" ? (
                                                        <Touchable style={styles.widgets} onPress={()=>navigate("SalarySlip")}>
                                                           <View style={{alignItems:"center"}}>
                                                           <MaterialIcons name="attach-money" size={40} color="black" />
                                                               <Title style={{fontSize:17,}}>View Salary Slip</Title>
                                                           </View>
                                                         </Touchable>
                                                         ) :(
                                                          <Touchable style={styles.widgets}>
                                                          <View style={{alignItems:"center"}}>
                                                          <MaterialIcons name="attach-money" size={40} color="black" />
                                                              <Title style={{fontSize:17,}}>Salary Slip is yet</Title>
                                                          </View>
                                                        </Touchable>
                                                          )
                                                          }
                       
              
                        <Touchable style={styles.widgets} onPress={()=>this.LogoutData()}>
                        <View style={{alignItems:"center"}}>
                
                              <MaterialCommunityIcons name="logout-variant" size={40} color="black" />
                              <Title style={{fontSize:17,}}>Logout</Title>
                          </View>
                        </Touchable>
                      </View>
              
                                </View>
              )
         
         
        }   

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


export default EmployeeDashboard;
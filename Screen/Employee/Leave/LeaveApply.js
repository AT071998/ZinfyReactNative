import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Alert,
  View,
  Button,
  CardItem,
  TouchableOpacity,
  TextInput,ScrollView,
  LogBox
} from 'react-native';
import AsyncStorage from  "@react-native-async-storage/async-storage"
import { AntDesign } from '@expo/vector-icons'; 

import {  Body, Title, Text } from 'native-base';

import DatePicker from 'react-native-datepicker';
import { Card} from 'react-native-elements';



const LeaveApply = (props) => {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() +1)

    const todates = new Date();
    todates.setDate(todates.getDate()+2)
    const [fromdate, setFromDate] = useState(newDate);
    const [todate, setToDate] = useState(todates);
    const [leaveType,setLeaveType] = useState(1);
    const [description,setDescription] = useState('');
    const [id,setId] = useState('');
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);


    const submitData = () =>{
      if(description === ''){
        Alert.alert("Kindly write a description");
      }else if(leaveType === '') {
        Alert.alert('Kindly select the leave type')
      }
      else if(fromdate === ''){
        Alert.alert('Kindly select the from date')
      }else if(todate === ''){
        Alert.alert('Kindly select the to date')
      }
      else{
      fetch('http://192.168.43.114:8000/api/leaveApply/'+id, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
           "leave_type":leaveType,
           "reason":description,
           "date_from":fromdate,
           "date_to":todate,
        })
   
        }).then((response) => response.json())
            .then((responseJson) => {
              if(responseJson.status === "success"){
                alert("Leave is applied successfully!");
                props.navigation.navigate("LeaveHistory");
              }else{
                alert("kindly try again");
              } 
            }).catch((error) => {
              console.error(error);
            });
          }
    }



    const verify_SickType = (type) =>{
        if(type===1){
            setLeaveType(1);
            alert("clicked on "+leaveType)
        }
        else if(type==2){
            setLeaveType(2);
            alert("clicked on "+leaveType)
        }
        else if(type==3){
            setLeaveType(3);
            alert("clicked on "+leaveType)
        }
    }

    const LoadingId = () =>{

      AsyncStorage.getItem('EmpId').then((value) => {
        if (value !== null){
        setId(JSON.parse(value));
        console.log("LEAVE APPLICATION Employee id is"+JSON.parse(value));
          
        }else{
          console.log("No data found");
        }
      }).done();
    
    }

    useEffect(()=>{
      LoadingId();
    },[])

    return(
      <ScrollView style={styles.body}>
       <Text style={{marginTop:30,marginLeft:12,fontSize:30,textAlign:"center"}}>Leave Application</Text>
          <Text style={{marginTop:30,marginLeft:12}}>Choose Leave Type</Text>
          <View style={styles.container1}>
            <View style={ {flexDirection: "row"}}>
             <TouchableOpacity style={{marginLeft:10,marginRight:10}} onPress={()=>verify_SickType(1)} style={{
                        backgroundColor:
                            leaveType === 1
                                ? "red"
                                : "white"
                    }}>
                <Card pointerEvents="none">
                 
                    <View style={{alignContent:"center",alignItems:"center"}}>
                      <Text>Sick </Text>
                      <Text>Leave</Text> 
                    </View>
                   
                </Card>
             </TouchableOpacity>
  
                
             <TouchableOpacity onPress={()=>verify_SickType(2)} style={{
                        backgroundColor:
                            leaveType === 2
                                ? "red"
                                : "white"
                    }}>
            <Card    >
              <View style={{alignContent:"center",alignItems:"center"}}>
                <Text>Casual</Text>
                <Text>Leave</Text> 
              </View>
            </Card>
             </TouchableOpacity>
  
             <TouchableOpacity onPress={()=>verify_SickType(3)} style={{
                        backgroundColor:
                            leaveType === 3
                                ? "red"
                                : "white"
                    }}>
            <Card>
             <View style={{alignContent:"center",alignItems:"center"}}>
              <Text>Annual</Text>
              <Text>Leave</Text> 
            </View>
                  </Card>
             </TouchableOpacity>
      
            </View>
         
          </View>
         
           <View style={{flexDirection: 'row',justifyContent:"space-between"}}>
                <Text style={{padding:2,marginLeft:12,marginTop:2}}>Start Date <AntDesign name="calendar" size={15} color="black" /></Text>
                <Text style={{marginTop:2,marginRight:90}}>End Date <AntDesign name="calendar" size={15} color="black" /></Text>
          </View>
          <View style={{flexDirection: 'row',justifyContent:"space-between"}}>             
          <View style={styles.container1}>
          <View style={styles.buttonContainerRight}>
            <DatePicker
                        style={styles.datepickerstyle}       
                        date={fromdate} // Initial date from state
                        mode="date" // The enum of date, datetime and time
                        showIcon={false}
                        minDate={new Date()}
                        placeholder= "Choose the Date"
                        placeHolderTextStyle={{ color: "black" }}
                        format="DD-MM-YYYY"
                      
                        customStyles={{
                                    dateInput: {
                                        borderLeftWidth: 0,
                                        borderRightWidth: 0,
                                        borderTopWidth: 0,
                                        borderBottomWidth:0,
                                       // fontSize:30
                                    },
                                    dateText: {
                                    color: 'black',
                                     fontSize:17
                                    }
                                }}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        disabled={false}
                        onDateChange={(fromdate) => {
                                setFromDate(fromdate);
                        }}           
                />
              </View>
              </View>
  
        <View style={styles.container1}>
          <View style={styles.buttonContainerRight}>
          <DatePicker
                      style={styles.datepickerstyle}       
                       date={todate} // Initial date from state
                        mode="date" // The enum of date, datetime and time
                        showIcon={false}
                        minDate={new Date()}
                        placeholder= "Choose the Date "
                        placeHolderTextStyle={{ color: "black" }}
                        format="DD-MM-YYYY"
                        modalTransparent={false}
                        animationType={"fade"}
                        customStyles={{
                                    dateInput: {
                                        borderLeftWidth: 0,
                                        borderRightWidth: 0,
                                        borderTopWidth: 0,
                                        borderBottomWidth:0,
                                        fontSize:30
                                    },
                                    dateText: {
                                      color: 'black',
                                      fontSize:17
                                    }
                                }}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        disabled={false}
                        onDateChange={(todate) => {
                                setToDate(todate);
                        }}           
                />

            </View>
        </View>
  
      </View>
  
        <Text style={{padding:2,marginLeft:12,marginTop:2}}>Description</Text>
        <View style={styles.container}>
        <View style={styles.textinputContainerRight}>
        <TextInput
            style={styles.taskItemContent}
            onChangeText={text=> setDescription(text)}
            value={description}
            multiline={true}
            numberOfLines={3}
            placeholder="Write the reason"
            underlineColorAndroid='transparent'
            require={true}
/>
              
              
      </View>
                          </View>
        <View style={styles.btncontainer}>
          <TouchableOpacity style={styles.buttoncontainer} onPress = {() => submitData()}>
            <View>
              <Body style={styles.bodyStyle}>
                <Text style={styles.buttontemContent} >APPLY LEAVE</Text>
              </Body>
            </View>
          </TouchableOpacity>
        </View>
  
          
      </ScrollView>   
    )

  
                      }

  const styles = StyleSheet.create({
    container: {
  flex: 1,
  flexDirection: 'row',
  alignItems:'center',
  alignContent:'center',
  justifyContent:'center',
  paddingBottom:15,
},

container1: {
flex: 1,
flexDirection: 'row',
alignItems:'center',
alignContent:'center',
justifyContent:'center',
paddingBottom:15,
},


btncontainer: {
flex: 1,
flexDirection: 'row',
alignContent:'center',
alignItems: 'center',
justifyContent: 'center',
paddingBottom:15,
},

buttoncontainer: {
flex: 1,
backgroundColor:'#4444FF',
  alignContent:'center',
  justifyContent:'center',
  marginLeft:15,
  marginTop:0,
  marginRight:15,
  marginBottom:0,
  height:60,
  borderRadius:10,
  shadowColor: "#000",

 
  shadowOpacity: 0.50,
  shadowRadius: 12.35,
  elevation: 10,
},



taskItemContent: { 
color: 'black',
fontSize: 15,
marginLeft:10,
},

postInput: {
  fontSize: 24,
  borderColor:'#42435b',
  borderWidth:1,
  margin:10,
  //fontFamily: "Outrun future"
  },


datepickerstyle:{color:'white',
fontSize:15,
//outline:"none",

},

buttontemContent: { 
color: 'white',
fontWeight:'bold',
fontSize: 15,
alignItems:'center',
},

bodyStyle:{
borderWidth:0,
justifyContent:'center',
},
buttonContainerCard: {
  
  alignContent:'center',
 // justifyContent:'center',
  marginLeft:15,
  marginTop:0,
  marginRight:15,
  marginBottom:0,
  backgroundColor: '#ffffff',
  height:40,
  width:130,
  borderRadius:4,
  elevation: 10,
},

buttonContainerRight: {
  flex: 1,
  alignContent:'center',
  justifyContent:'center',
  marginLeft:15,
  marginTop:0,
  marginRight:15,
  marginBottom:0,
 backgroundColor: '#ffffff',
  height:60,
  borderRadius:8,
 shadowColor: "#000",
  
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.50,
  shadowRadius: 12.35,
  elevation: 10,
},
textinputContainerRight: {
  flex: 1,
  alignContent:'flex-start',
  marginLeft:15,
  marginTop:0,
  marginRight:15,
  marginBottom:0,
  backgroundColor: '#ffffff',
  height:160,
  borderRadius:8,
  shadowColor: "#000",

  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.50,
  shadowRadius: 12.35,
  elevation: 10,
},

body:{
paddingTop:15,
paddingBottom:30,
backgroundColor: '#efefef',
}
});

export default LeaveApply;
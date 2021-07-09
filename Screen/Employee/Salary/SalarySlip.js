
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Image, Platform,PermissionsAndroid} from 'react-native';
import { Card} from 'react-native-paper';
import AsyncStorage from  "@react-native-async-storage/async-storage"
import { Component } from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons'; 
import { Modal } from 'react-native-irvs-modal';
import { Alert } from 'react-native';

class SalarySlip extends Component{
    constructor(props){
        super(props);
        this.state={
           data:[],
           val:0,
           month:0,
           obtainedMonth:0,
      //     selectedPrinter:'',
           
            
        }
}
    /*  requestCameraPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: "Cool Photo App Camera Permission",
              message:
                "Cool Photo App needs access to your camera " +
                "so you can take awesome pictures.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the camera");
          } else {
            console.log("Camera permission denied");
          }
        } catch (err) {
          console.warn(err);
        }
      };

      */


            fetchMonth = ()=>{
              var month = new Date().getMonth() + 1;
              this.setState({month:month});
            }
            
            fetchData = (dataa)=>{
                return fetch('http://192.168.43.114:8000/api/SalaryView/'+dataa)
                .then((response) => response.json())
                .then((responseJson) => {
                  this.setState({data: responseJson.data});
                  console.log(responseJson.data);
                })
                .catch((error) => {
                  console.error(error);
                })
            }

            componentDidMount(){
                AsyncStorage.getItem('input').then((value) => {
                    if (value !== null){
                    console.log("Value is:"+value);
                    this.setState({val:JSON.parse(value)});
                    var res = this.state.val;
                    this.fetchData(res);
                    this.fetchMonth();

                  }
                  }).done();
                }

                navigateToSalarySlip = (month,year) =>{
                  //Alert.alert(month+""+year);
                  this.props.navigation.navigate("SalaryView",{
                    'Month':month,
                    'Year':year
                  });
                 // AsyncStorage.setItem('Month', month);
                 // AsyncStorage.setItem('Year',)
                }

          render(){
              return (
                  <View style={styles.container}>
                    <FlatList
                      style={{flex:1}}
                      data={this.state.data}
                      renderItem={({ item }) => 
                              
                                  
                                        < View style={{marginLeft:10,marginRight:10}}>
                                              { this.state.month == item.monthname ? (
                                                  <View style={{flexDirection:"row",marginTop:5,}}>
                                                  <Text style={{color:"black",fontSize:15,backgroundColor:"#E8E8E8",}}>Recent </Text><Ionicons name="timer-outline" size={24} color="black" style={{color:"black",fontSize:15,backgroundColor:"#E8E8E8",}}/>                                 
                                                  </View>
                                              ):
                                              (
                                                  <View style={{flexDirection:"row",marginTop:5,}}>
                                                          <Text style={{color:"black",fontSize:15,backgroundColor:"#E8E8E8",}}>{item.month}  </Text>  
                                                          <Octicons  style={{color:"black",fontSize:15,backgroundColor:"#E8E8E8",}} name="calendar" size={20} color="black" />                                
                                                  </View>
                                              )
                                                  
                                              }
                                              
                                              <Card>
                                                  <View style={styles.listItem}>   
                                                  <View style={{flexDirection:"column",justifyContent:"space-between"}}>
                                                      <Text style={{color:"black",fontSize:15}}>Your salary of Rs. {item.SalaryPaid} is generated for the Month of {item.month} {"\n"}</Text>     
                                                      <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                                      <Text style={{color: 'blue'}} onPress={()=>this.navigateToSalarySlip(item.month,item.year)}>View Salary Slip</Text>  
                                                      <Text style={{color: 'blue'}}>{item.paidDate} {item.time}AM</Text>    
                                                      </View>         
                                                                      
                                                  </View>
                                              </View>
                                              
                                          </Card>
                                          
                              
                              </View>
                                      
                                  
                                      
                        }
                      keyExtractor={(item, index) => index.toString()}
                    />
                    
                      
                    
                  </View>
                );
          }
        
    
  
}


export default SalarySlip;


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex:1,
    backgroundColor: 'white',
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
  },
  listItem:{
    padding:10,
    height:85,
    backgroundColor:"#E8E8E8",
    width:"100%",
    marginBottom:5,
    
  },
  
});
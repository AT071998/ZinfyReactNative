import React,{Component,useState,useEffect} from 'react';
import { View, Text, StyleSheet, SafeAreaView,Image,FlatList, ScrollView,ActivityIndicator, TouchableOpacity,Alert} from 'react-native'
import { Card, Divider} from 'react-native-elements';
import { Button } from 'react-native-elements';
import { SearchBar } from 'react-native-elements';
import { Feather } from '@expo/vector-icons'; 



const MonthlySalary = (props,route,navigation) => {


    const {id,employee_name,phone,email,salary,designation} = props.route.params.item;
    const [Data,setData] = useState([]);
    const [q1,setq1] = useState(0);
    const [q2,setq2] = useState(0);
    const [q3,setq3] = useState(0);
    const [q4,setq4] = useState(0);
    const [q5,setq5] = useState(0);
    const [date,setDate] = useState('');
    const [compare,setCompareDate] = useState('');

    const getCurrentDate=()=>{

      var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
      setDate(31 + '-' + 6 + '-' + 2021);
      var comp = lastday(year,month);
      setCompareDate(comp+'-'+month+'-'+year);
}

const lastday = function(y,m){
  return  new Date(y, m, 0).getDate();
  }
    const RenderData = () =>{
      //console.log("Hello");
      fetch('http://192.168.43.114:8000/api/salaryData/'+id)
                .then(res=>res.json())
                .then(result=>{
                  console.log(result);
                  setData(result);
                  setq1(result.q1);
                  setq2(result.q2);
                  setq3(result.q3);
                  setq4(result.q4);
                  setq5(result.q5);
                }).catch(err=>{
                  
                })
    }

    const alertData = (id)=>{
      Alert.alert(
        'Payment',
        'Are you sure?',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => submitData(id)},
        ],
        { cancelable: false }
      )
    }

    const submitData = (id)=>{
   //   console.log(compare);
   //   console.log(date);
      //if(comp === date)
      if('31-6-2021' === date){
        fetch('http://192.168.43.114:8000/api/paysalary/'+id, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "status":"Paid",
          "perDay":q3,
          "count":q1,
        })
   
        }).then((response) => response.json())
            .then((responseJson) => {
             if(responseJson.status ==="success"){
               Alert.alert("Payment is generated successfully!");
               props.navigation.navigate("ViewSalary");
             }
             else {
               Alert.alert("Please try again!");
             }   
            }).catch((error) => {
              console.error(error);
            });
      }else{
        Alert.alert("It is not the End of Month");
      }
      
    }

    useEffect(()=>{
      RenderData();
      getCurrentDate();
  },[])
    
    
    
    return(
      <View> 
         <Card containerStyle={styles.card}>
                    <View style={{flexDirection:'column',}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}> 
                            <View style={{flexDirection:'column'}}>
                            <Text>Employee Name: {employee_name}</Text>
                            <Text style={{marginTop:10}}>Designation: {designation} </Text>
                            </View>
                           
                            <Text>{date}</Text>
                        </View>

                        <Divider style={{ backgroundColor: '#dfe6e9', marginVertical:20,borderWidth:0.2}} />
                            <View style={{flexDirection:'row', textAlign:"center",marginTop:5}}>
                                <Text style={{ fontSize:20,alignSelf: 'center',textAlign:"center",marginLeft:10}}>Salary Reciept of Month {q5}</Text>
                            </View>

                            <Divider style={{ backgroundColor: '#dfe6e9', marginVertical:20,borderWidth:0.2}} />
                            <Text>Payment Details</Text>
                    
                            <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:20}}>
                                        <Text>Fixed Salary</Text>
                                        <Text style={{fontSize:20}}>Rs. {salary}</Text>
                            
                            </View>
                            <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:20}}>
                                        <Text>Advance Taken(If Any)</Text>
                                        <Text style={{fontSize:20}}>Rs. {q2}</Text>
                            </View>
                            <Divider style={{ backgroundColor: '#dfe6e9', marginVertical:20,borderWidth:0.2}} />
                            <Text>Other data</Text>

                            <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:20}}>
                                        <Text>Attendance Count</Text>
                                        <Text style={{fontSize:20}}>{q1} Days</Text>
                            
                            </View>
                            <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:20}}>
                                        <Text>Average/Day</Text>
                                        <Text  style={{fontSize:20}}>Rs. {q3} </Text>
                            </View>
                            <Divider style={{ backgroundColor: '#dfe6e9', borderWidth:0.2}} />
                            <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:20}}>
                                        <Text style={{marginTop:10}}>Final Salary Generated</Text>
                                        <Text  style={{fontSize:30,color:"red"}}>Rs. {q4}</Text>
                            </View>

                            <View style={{flexDirection:'row',marginTop:20,alignSelf:"center"}}>
                              <TouchableOpacity>
                                 <Button title="Pay" onPress={()=>alertData(id)}
                                  buttonStyle={{backgroundColor:"#0000D1",width:80,height:40,marginTop:0,}} />
                              </TouchableOpacity>
                              
                            
                            </View>
                        </View>

                    </Card>
         
       </View>
                

    );

  }


 


  


const styles = StyleSheet.create({

card:{
    marginTop:50,
    backgroundColor:'white',
    height:550,
    borderWidth:0,
    marginBottom:2,
    borderRadius:20

	},
  buttonContainerRight: {
    backgroundColor: '#ffffff',
    height:60,
    width:50,
    borderRadius:8,
  
},
	time:{
		fontSize:38,
		color:'black'
	},
	notes: {
		fontSize: 18,
		color:'black',
		textTransform:'capitalize'
	},
  note: {
		fontSize: 15,
		color:'black',
		textTransform:'capitalize'
	}
});


export default MonthlySalary
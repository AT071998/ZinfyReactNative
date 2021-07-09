import React,{Component,useState,useEffect} from 'react';
import { View, Text, StyleSheet, SafeAreaView,Image,FlatList, ScrollView,ActivityIndicator, TouchableOpacity,Alert} from 'react-native'
import { Card, Divider} from 'react-native-elements';
import { Button } from 'react-native-elements';
import { SearchBar } from 'react-native-elements';
import { Feather } from '@expo/vector-icons'; 
import AsyncStorage from  "@react-native-async-storage/async-storage"


const ViewSalary = (props) => {
   // console.log(props);
   //const {Month} = props.route.params.Month;
   //console.log("Month is:"+Month);
  // const {year} = props.route.params.Year;
  // console.log(year);
  const month = props.route.params.Month;
  const year = props.route.params.Year;

   const [Data,setData] = useState([]);
   const [q1,setq1] = useState(0);
   const [q2,setq2] = useState(0);
   const [q3,setq3] = useState(0);
   const [q4,setq4] = useState(0);
   const [q5,setq5] = useState(0);
   const [q6,setq6] = useState(0);
   const [q7,setq7] = useState(0);
   const [date,setDate] = useState('');
   const [fixdSalary,setfixdSalary] = useState('');
   const [datePayment,setdatePayment] = useState('');
   const [Timepayment,setTimePayment] = useState('');
   const [id,setId] = useState('');
  

    const RenderData = (id) =>{
        //console.log("Hello");
        console.log(id+""+month+""+year);
        return fetch('http://192.168.43.114:8000/api/salarySlip/'+id+'/'+month+'/'+year)
                  .then(res=>res.json())
                  .then(result=>{
                     console.log("fetching");
                     console.log(result);
                     setData(result);
                     setq1(result.q1);
                     setq2(result.q2);
                    // setSalary(result.salary[0].salaryPaid);
                    // console.log(salary);
                     setq3(result.q3);
                     setq4(result.q4);
                     setq5(result.q5);
                     setq6(result.q6);
                     setq7(result.q7);

                     //setfixdSalary(result.salary.)
                     setdatePayment(result.salary.paidDate);
                     setTimePayment(result.salary.TimePayment);
                     setfixdSalary(result.fixedsalary.salary);
                  }).catch(err=>{
                    
                  })
                  
      }


      const LoadingId = () =>{
        AsyncStorage.getItem('EmpId').then((value) => {
          if (value !== null){
          setId(JSON.parse(value));
          console.log("SALARY SLIP Employee id is"+JSON.parse(value));
          RenderData(JSON.parse(value));
          }else{
            console.log("No data found");
          }
        }).done();
      


        
      
      }

    useEffect(()=>{
        LoadingId();
        
  },[])
    
    
    
    return(
      <View> 
        <Card containerStyle={styles.card}>
                    <View style={{flexDirection:'column',}}>
                            <View style={{flexDirection:'column', textAlign:"center",marginTop:5}}>
                                <Text style={{ fontSize:20,alignSelf: 'center',textAlign:"center",marginLeft:10}}>Salary Reciept of Month {q5}</Text>
                                <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:20}}>
                                    <View style={{flexDirection:"column"}}>
                                        <Text style={{marginTop:10}}>Date of Payment</Text>
                                        <Text  style={{fontSize:15,color:"red"}}> {datePayment}</Text>
                                    </View>

                                    <View style={{flexDirection:"column"}}>
                                        <Text style={{marginTop:10}}>Time of Payment</Text>
                                        <Text  style={{fontSize:15,color:"red"}}> {Timepayment} AM</Text>
                                    </View>
                                 </View>
                                </View>
                           

                            <Divider style={{ backgroundColor: '#dfe6e9', marginVertical:20,borderWidth:0.2}} />
                            <Text>Payment Details</Text>
                    
                            <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:20}}>
                                        <Text>Fixed Salary</Text>
                                        <Text style={{fontSize:20}}>Rs. {fixdSalary}</Text>
                            
                            </View>
                            <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:20}}>
                                        <Text>Advance Taken(If Any)</Text>
                                        <Text style={{fontSize:20}}>Rs. {q2}</Text>
                            </View>
                            <Divider style={{ backgroundColor: '#dfe6e9', marginVertical:20,borderWidth:0.2}} />
                            <Text>Other data</Text>
                            <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:20}}>
                                        <Text>Total No of Full Days </Text>
                                        <Text style={{fontSize:20}}>{q6} Days</Text>
                            
                            </View>

                            <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:20}}>
                                        <Text>Total No of Half Days </Text>
                                        <Text style={{fontSize:20}}>{q7} Days</Text>
                            
                            </View>
                            <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:20}}>
                                        <Text>Total No of Days Present</Text>
                                        <Text style={{fontSize:20}}>{q1} Days</Text>
                            
                            </View>
                            <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:20}}>
                                        <Text>Average/Day</Text>
                                        <Text  style={{fontSize:20}}>Rs. {q3} </Text>
                            </View>
                            <Divider style={{ backgroundColor: '#dfe6e9', borderWidth:0.2}} />
                            <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:20}}>
                                        <Text style={{marginTop:10}}>Final Salary Generated</Text>
                                        <Text  style={{fontSize:30,color:"red"}}>Rs. {q4}/-</Text>
                            </View>

                            <Divider style={{ backgroundColor: '#dfe6e9',borderWidth:0.2}} />

                            <View style={{flexDirection:'row',marginTop:20,alignSelf:"center"}}>
                             <Text style={{textAlign:"center"}}>Approved By Manager</Text>
                              
                            </View>
                        </View>

                    </Card>
         
       </View>
                

    );

  }


 


  


const styles = StyleSheet.create({

card:{
    marginTop:10,
    backgroundColor:'white',
    height:650,
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


export default ViewSalary;
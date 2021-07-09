
import React,{useState,setState,useEffect} from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
  Button
} from 'react-native'
import { Card} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import { Entypo } from '@expo/vector-icons'; 
import { Alert,LogBox } from 'react-native';


const AdvancePayment = (props,route,navigation) => {

    const {id,employee_name,phone,email,salary,designation} = props.route.params.item;
    const [currentDate, setCurrentDate] = useState('')
    const [advSalary,setadSalary] = useState(0);
    const salarye = parseInt(salary)-parseInt(advSalary);
    const [fromdate, setFromDate] = useState('');
    const [MasterData,setMasterData] = useState([]);
    const [status,setStatus] = useState(0);
    const [PendingAmt,setPendingAmt] = useState(0);
    const [Data,setData] = useState([]);
    const [msalary,setmSalary] = useState('');
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);


    const findFirst = ()=>{
      fetch('http://192.168.43.114:8000/api/findfirst/'+id)
      .then(res=>res.json())
      .then(result=>{
          setMasterData(result);
          console.log(result);
          if(result.data ==="error"){
            setStatus(0);
          }else{
          var results = result.data[0].status;
          console.log("status is"+results);
          setStatus(1);  
          }
      }).catch(err=>{
        console.log(err);
      })
    }

    const  validate = () => {
      console.log('Validating Email Here!');
  }

    const PendingAmount = ()=>{
      fetch('http://192.168.43.114:8000/api/pending/'+id)
      .then(res=>res.json())
      .then(result=>{
          setData(result);
          if(result.data === "error"){
            console.log("Hello");
          }else{
            var results = result.data[0].pendingAmount;
            setPendingAmt(results);
          }
         
  
      }).catch(err=>{
        console.log(err);
      })
    }


    useEffect(() => {
       findFirst();
       PendingAmount();
    }, []);
  

    const verifyAmount = ()=>{
      fetch('http://192.168.43.114:8000/api/salaryEmployee/'+id)
      .then(res=>res.json())
      .then(result=>{
          setmSalary(result.data[0].salary);
          console.log(msalary);
          if(advSalary < msalary){
           // console.log("Entering");
           storeData()
          }else{
            Alert.alert("Advance cannot be greater than Salary");

          }
      }).catch(err=>{
        console.log(err);
      })
    

    }
    const storeData = () =>{
      console.log("Date is:"+ fromdate);
        fetch('http://192.168.43.114:8000/api/advancepay/'+id, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
           "status":"First",
           "amount":advSalary,
           "paidDate":fromdate,
           "pendingAmount":salarye,
        })
   
        }).then((response) => response.json())
            .then((responseJson) => {
              if(responseJson.status === "success"){
                  Alert.alert("Advance Payment Successfully recorded");
                  props.navigation.navigate("AdvanceSalaryList");
               
              }else{
                alert("Something went wrong. Try again! Please fill all details.");
              }
            }).catch((error) => {
              console.error(error);
            });
      }
  return (
    <KeyboardAvoidingView enabled>
    
    <ScrollView>
    {
      status == 0 ? (
        
        <View style={{borderWidth:1,margin:10}}>  
          <View style={{marginTop:20}}>
        <Text style={{fontSize:20,textAlign:"center",textDecorationStyle:"dotted"}}>Fill the FORM</Text>
      </View>
         <View style={{flexDirection:"column",marginLeft:5,marginTop:20}}>
            <Card> 
                <View style={{flexDirection:"column",justifyContent:"space-between"}}>
                <Text style={{fontSize:15}}>Employee Name:{"\t\t"} {employee_name}</Text>
                <Text style={{fontSize:15}}>Designation: {designation}</Text>
                </View>

               
                                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                      <Text style={{fontSize:20,color:"red",marginTop:2}}>Pending Amount</Text>
                                    <Text style={{color:"green",fontSize:25}}> Rs.{salarye}</Text>
                                    </View>
                     
                 
            </Card>
           
        </View>
        <Text style={{marginLeft:20,marginTop:5}}>Select the Date</Text>
        <View style={{borderWidth:0.5,marginLeft:20,marginRight:20,marginTop:10,borderColor: '#dadae8',}}>
        <DatePicker
                      style={{marginTop:10}}       
                      date={fromdate} // Initial date from state
                      mode="date" // The enum of date, datetime and time
                      showIcon={false}
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
        
       
        
        <View>
           

          <View style={{paddingLeft:30,paddingTop:30}}>
              <Text>Total Salary</Text>
              <TextInput style={styles.inputStyle} 
              placeholder='Monthly Salary'  value={String(salary)} editable={false} keyboardType="numeric"/>
          </View>

          <View style={{paddingLeft:30,paddingTop:30}}>
              <Text>Advance Amount Taken</Text>
              <TextInput style={styles.inputStyle} 
              placeholder='Advance Amount' 
              value={advSalary} 
              keyboardType="numeric"
              onChangeText={text=>setadSalary(text)}
              onBlur={e => validate()}/>
          </View>
                    
           
          <TouchableOpacity style={styles.buttonStyle}
          activeOpacity={0.5} onPress={()=>verifyAmount()}>
              <Text style={styles.buttonTextStyle}>GENERATE</Text>
          </TouchableOpacity>
   
        </View>
    
    </View>) : status == 1 ? (
                    <View style={{alignContent:"center",justifyContent:"center",alignItems:"center"}}>
                      <Entypo name="circle-with-cross" size={150} color="black" />
                      <Text style={{color: '#007500',fontSize:30,textAlign:"center"}}>You cannot provide another Advance Payment.{"\n"}
                      Pending Amount to  be paid as Salary is:{PendingAmt}</Text>
                      <Button onPress={()=>props.navigation.navigate("AdvanceSalaryList")} title="View Details"></Button>
                    </View>
                  ): (
                <View>
                  <Text>Hello</Text>
                </View>
                                    )
      } 
        
     </ScrollView>
    </KeyboardAvoidingView>
    
    
  )
                    }

  

  
                    


  const theme = {
    colors:{
        primary:"#006aff"
    }
}

const styles = StyleSheet.create({

  container: {
    flex:1,
    justifyContent: 'center',
    marginTop:90,
    //backgroundColor: '#ecf0f1',
    padding: 8,
  },
  button:{
    marginTop:12,
    marginLeft:12,
    marginRight:12,
    marginBottom:12,
  },
  add:{
    marginRight:180,
    marginLeft:12
  },
  modalView:{
    position:"absolute",
    bottom:2,
    width:"100%",
    backgroundColor:"white"

},
modalButtonView:{
    flexDirection:"row",
    justifyContent:"space-around",
    padding:10
},



  buttonStyle: {
      backgroundColor: 'blue',
      borderWidth: 0,
      color: '#FFFFFF',
      borderColor: '#7DE24E',
      height: 40,
      alignItems: 'center',
      marginLeft: 35,
      marginRight: 35,
      marginTop: 20,
      marginBottom: 20,
    },
  buttonContainerRight: {
     // flex: 1
      marginLeft:9,
      marginTop:5,
      marginRight:15,
      marginBottom:0,
      backgroundColor: '#ffffff',
      height:90,
      borderRadius:8,
      shadowColor: "#000",
      shadowOpacity: 0.50,
      shadowRadius: 12.35,
      elevation: 10,
  },
  btncontainer: {
   // flex: 1,
    flexDirection: 'row',
    alignContent:'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom:15,
    paddingLeft:50,
    marginTop:20,
  },
  inputStyle: {
      //flex: 1,
      color: 'black',
      marginRight:15,
      paddingLeft: 15,
      paddingRight: 15,
      borderWidth: 1,
      height:40,
      borderColor: '#dadae8',
    },
  buttonTextStyle: {
      color: '#FFFFFF',
      paddingVertical: 10,
      fontSize: 16,
    },
  buttoncontainer: {
        backgroundColor:'#4444FF',
        paddingLeft:50,
        flex: 1,
      alignContent:'center',
      justifyContent:'center',
      //marginLeft:20,
      marginTop:0,
      marginRight:30,
      marginBottom:0,
      height:60,
      borderRadius:10,
      shadowColor: "#000",
      shadowOpacity: 0.50,
      shadowRadius: 12.35,
      elevation: 10,
      
  },
})

export default AdvancePayment;
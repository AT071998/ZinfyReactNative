
import React,{useState,setState, useEffect} from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,

} from 'react-native'
import { Button} from 'react-native-paper';
import AsyncStorage from  "@react-native-async-storage/async-storage"
import { set } from 'react-native-reanimated';
import { Alert } from 'react-native';


const EditProfile = (props) => {

    const [data,setData] = useState([]);
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [empid,setId] = useState('');
    

    const fetchData = (empId)=>{
        fetch('http://192.168.43.114:8000/api/showdata/'+empId)
        .then(res=>res.json())
        .then(result=>{
            setData(result.data);
            setName(result.data[0].employee_name);
            setEmail(result.data[0].email);
            setPhone(result.data[0].phone);
            //setId()
        }).catch(err=>{
           
        })
    }

    const validateData = ()=>{
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const regmobNo = /^[0]?[789]\d{9}$/;
      if(name === ''){
        Alert.alert("Enter the Name");

      }else if (reg.test(email) === false) {
        //console.log("Email is Correct");
        Alert.alert('Fill the Valid Email Address');
      }else if(regmobNo.test(phone) === false ){
        Alert.alert('Fill the Valid Phone Number');
      }else{
        updateData();
      }
    }


    const updateData = ()=>{
        //console.log(empId)
        return fetch("http://192.168.43.114:8000/api/editprofile/"+empid,{
            method:"post",
            headers:{
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                "phone":phone,
                "email":email,
                "employee_name":name,
            })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.status === "success"){
                alert("Data Updated");
                props.navigation.navigate("ViewProfile");
            }else{
                alert("Not Updated");
            }
        })
    }
  

    const LoadingId = ()=>{
        AsyncStorage.getItem('EmpId').then((value) => {
            if (value !== null){
            setId(JSON.parse(value));
            console.log("PROFILE EDIT is"+JSON.parse(value));
            fetchData(JSON.parse(value));
            }else{
              console.log("No data found");
            }
          }).done();
        
    }
    useEffect(()=>{
       LoadingId();
    },[]);


  
    return (
      <KeyboardAvoidingView enabled>
      <ScrollView>
      <View style={styles.container}>
          <Text style={{textAlign:"center",textDecorationLine:"underline",fontSize:20,marginBottom:20}}>UPDATE YOUR PROFILE</Text>
        <Text style={styles.add}>Your Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          autoCapitalize="none"
          placeholderTextColor='#8A8A8A'
          value={name}
          onChangeText={text=>setName(text)}
         
        />
        <Text style={styles.add}>Change Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder='Change Email Adress'
          autoCapitalize="none"
          placeholderTextColor='#8A8A8A'
          value={email}
          onChangeText={text=>setEmail(text)}
         /// maxLength={100}
         // multiline={true}
         // numberOfLines={6}
         
        />
        <Text style={styles.add}>Change Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder='Change Phone Number'
          autoCapitalize="none"
          placeholderTextColor='#8A8A8A'
          value={phone}
          onChangeText={text=>setPhone(text)}
          
        />
                
                <Button style={styles.button} 
                mode="contained" 
                onPress={() => validateData()}>Update Details</Button> 
        </View>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  input1: {
    height: 70,
    backgroundColor: 'transparent',
    borderColor:'#8A8A8A',
    marginLeft: 10,
    marginRight:10,
    marginBottom:10,
    borderRadius: 5,
    fontSize: 14,
    color:"black",
    fontWeight: '500',
    borderWidth:1,
   
},
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    height:"100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  input: {
    height: 40,
    backgroundColor: 'transparent',
    borderColor:'#8A8A8A',
    marginLeft: 10,
    marginRight:10,
    color: 'black',
    marginBottom:10,
    borderRadius: 5,
    fontSize: 14,
    paddingRight:10,
    fontWeight: '500',
    borderWidth:1,
  },
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
    marginLeft:12,
    marginBottom:2,
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
}
})

export default EditProfile;
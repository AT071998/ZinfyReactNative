
import React,{useState,setState, useEffect} from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
  Alert
} from 'react-native'
import { Button} from 'react-native-paper';
import { add } from 'react-native-reanimated';

const EditAdminProfile = ({navigation,route}) => {
    
    const [data,setData] = useState([]);
    const [Name,setName] = useState('');
    const [address,setAddress] = useState('');
    const [holder,setHolder] = useState('');
    const [gsit,setGsit] = useState('');
    const [email,setEmail] = useState('');
    const [alemail,setalemail] = useState('');
    const [alph,setalph] = useState('');
    const [ph,setph] = useState('');


    const fetchData = ()=>{
        fetch('http://192.168.43.114:8000/api/adminprofile/')
        .then(res=>res.json())
        .then(result=>{
            setData(result);
            setName(result[0].companyName);
            setAddress(result[0].Address);
            setHolder(result[0].accountHandler);
            setGsit(result[0].GSITNumber);
            setph(result[0].phoneNumber);
            setalph(result[0].alternateNumber);
            setEmail(result[0].email);
            setalemail(result[0].alternateEmail);
        }).catch(err=>{
           
        })
}

const validateData = ()=>{
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  const regmobNo = /^[0]?[789]\d{9}$/;
    if(Name === ''){
      Alert.alert("Enter the Name");
  
    }else if (reg.test(email) === false) {
      //console.log("Email is Correct");
      Alert.alert('Fill the Valid Email Address');
    }else if(regmobNo.test(ph) === false ){
      Alert.alert('Fill the Valid Phone Number');
    }else if(holder ===''){
      Alert.alert('Enter Account holder name');
    }else if(address === ''){
      Alert.alert("Enter the address");
    }
    else{
      updateDetails();
    }
  }

    useEffect(()=>{
        fetchData();
    },[]);

    const updateDetails = ()=>{
       return fetch("http://192.168.43.114:8000/api/editdetails/",{
            method:"post",
            headers:{
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                "companyName":Name,
                "phone":ph,
                "alternateNumber":alph,
                "email":email,
                "alternateEmail":alemail,
                "Address":address,
                "accountHandler":holder,
                "gsit":gsit,
            })
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.Status === "success"){
                alert("Data Updated");
                navigation.navigate("Profile");
            }else{
                alert("Not Updated");
            }
        })
       
    }
    return (
      <KeyboardAvoidingView enabled>
      <ScrollView>
      <View style={styles.container}>
        <Text style={styles.add}>Compnay Name</Text>
        <TextInput
          style={styles.input}
          placeholder='Company Name'
          autoCapitalize="none"
          placeholderTextColor='#8A8A8A'
          value={Name}
          onChangeText={text=>setName(text)}
         
        />
        <Text style={styles.add}>Address</Text>
        <TextInput
          style={styles.input1}
          placeholder='Address'
          autoCapitalize="none"
          placeholderTextColor='#8A8A8A'
          value={address}
          onChangeText={text=>setAddress(text)}
          maxLength={100}
          multiline={true}
          numberOfLines={6}
         
        />
        <Text style={styles.add}>Account Handler Name</Text>
        <TextInput
          style={styles.input}
          placeholder='Account Handler Name'
          autoCapitalize="none"
          placeholderTextColor='#8A8A8A'
          value={holder}
          onChangeText={text=>setHolder(text)}
          
        />
        <Text style={styles.add}>GSIT Number</Text>
        <TextInput
          style={styles.input}
          label="Phone"
          placeholder='GSIT Number'
          autoCapitalize="none"
          placeholderTextColor='#8A8A8A'
          value={gsit}
          onChangeText={text=>setGsit(text)}
        />

        <Text style={styles.add}>Email Address</Text>
         <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"   
          keyboardType="number-pad"
          placeholderTextColor='#8A8A8A'
          value={email}
          onChangeText={text=>setEmail(text)}
        />

            <Text style={styles.add}>Alternate Email Address</Text>
            <TextInput
            style={styles.input}
            placeholder='Alternate Email'
            autoCapitalize="none"   
            keyboardType="number-pad"
            placeholderTextColor='#8A8A8A'
            value={alemail}
          onChangeText={text=>setalemail(text)}
            />

            <Text style={styles.add}>Phone Number</Text>
            <TextInput
            style={styles.input}
            placeholder='Phone Number'
            autoCapitalize="none"   
            keyboardType="number-pad"
            placeholderTextColor='#8A8A8A'
            value={ph}
          onChangeText={text=>setph(text)}
            />

                <Text style={styles.add}>Alternate Phone Number</Text>
                <TextInput
                style={styles.input}
                placeholder='Alternate Phone number'
                autoCapitalize="none"   
                keyboardType="number-pad"
                placeholderTextColor='#8A8A8A'
                value={alph}
          onChangeText={text=>setalph(text)}
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

export default EditAdminProfile;
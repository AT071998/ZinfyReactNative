
import React,{useState,setState} from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
  Share,
  Modal,
  ToastAndroid,
  Platform,
  AlertIOS,
  Image,
  Clipboard
} from 'react-native'
import { Button} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons'; 
import { Alert } from 'react-native';


const AddEmployee = ({navigation,route}) => {
 
  const [modalVisible, setModalVisible] = useState(false);

 
  const getDetails = (type)=>{
   // console.log(route.params.salary);
  // alert(route.params.salary);
    if(route.params){
       switch(type){
           case "employee_name":
               return route.params.employee_name
           case "phone":
              return route.params.phone
           case "email":
             return route.params.email
           case "salary":
               return route.params.salary
           case "designation":
             return  route.params.designation
       }
    }
    return ""
 }

 function notifyMessage(msg) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT)
  } else {
    AlertIOS.alert(msg);
  }
}
 
  const [Name,setName]=useState(getDetails("employee_name"))
  const [Designation,setDesignation]=useState(getDetails("designation"))
  const [Phone,setPhone]=useState(getDetails("phone"))
  const [Email,setEmail]=useState(getDetails("email"))
  const [Salary,setSalary]=useState(getDetails("salary"))
  //const [modal,setModal] = useState(false)
  const [modalPassword,setModalPassword] = useState('');
  const [modalUUID,setmodalUUID] = useState('');
  const [modalEmail,setModalEmail] = useState('');


  const copyToClipboard = ()=>{
    //Clipboard.setString("Kindly find your following credentials in order to Login to Zinfy App.\n Unique ID "+modalUUID+"\n"+"Email Address "+modalEmail+"\n Password Generated is "+modalPassword);
    //alert('Copied to Clipboard!');
    Share.share(
      {   
        message: "Kindly find your following credentials in order to Login to Zinfy App.\n Unique ID "+modalUUID+"\n"+"Email Address "+modalEmail+"\n Password Generated is "+modalPassword,
        title:"Share Credentials"
      }).then(result => console.log(result)).catch(errorMsg => console.log(errorMsg));
  }

  const writeToClipboard = async () => {
    await Clipboard.setString("Kindly find your following credentials in order to Login to Zinfy App.\n Unique ID "
    +modalUUID+"\n"+"Email Address "+modalEmail+"\n Password Generated is "+modalPassword);
    notifyMessage("Copied to Clipboard");
    copyToClipboard();
  };

  const Modaldata = ()=>{
    writeToClipboard();
  }

  
  const performValidation = () =>{
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const regmobNo = /^[0]?[789]\d{9}$/;
    if(Name===''){
      Alert.alert('Fill the employee Name');
    }else if(Designation ===''){
      Alert.alert('Fill the designation');
    }else if (reg.test(Email) === false) {
      //console.log("Email is Correct");
      Alert.alert('Fill the Valid Email Address');
    }else if(regmobNo.test(Phone) === false ){
      Alert.alert('Fill the Valid Phone Number');
    }else{
      submitData();
    }



  }
  const submitData = () =>{
    fetch('http://192.168.43.114:8000/api/insertEmployee/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
           "employee_name":Name,
           "designation":Designation,
           "email":Email,
           "phone":Phone,
           "salary":Salary,
        })
   
        }).then((response) => response.json())
            .then((responseJson) => {
              if(responseJson.message === "Email already exists!"){
                  alert("Email already exists");
              }else if(responseJson.message === "Phone number already exists"){
                  alert("Phone Number already exists");
              }else if(responseJson.message ==="Successfully Added"){
               setModalVisible(true);
               setModalEmail(responseJson.data.email);
               setModalPassword(responseJson.token);
               setmodalUUID(responseJson.data.employee_uuid);
          //   alert("Added Successfullly.Password genereated is "+responseJson.data.password+" Employee ID generated is "+responseJson.data.employee_uuid);
             //  navigation.navigate("DisplayEmployee");
              }else{
                alert("Something went wrong. Try again!");
              }
   
            }).catch((error) => {
              console.error(error);
            });
  }

  
 

  const updateDetails = ()=>{
    
    fetch("http://192.168.43.114:8000/api/editEmployee/"+route.params.id,{
        method:"post",
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          "employee_name":Name,
          "designation":Designation,
          "email":Email,
          "phone":Phone,
          "salary":Salary,
        })
    })
    .then(res=>res.json())
    .then(data=>{



        alert('updated successfuly');
        navigation.navigate("DisplayEmployee")
    })
    .catch(err=>{
      Alert.alert("someting went wrong")
  })
}


    return (
      <KeyboardAvoidingView enabled>
      <ScrollView>
      <View style={styles.container}>
        <Text style={styles.add}>Employee Name</Text>
        <TextInput
          style={styles.input}
          placeholder='Employee Name'
          autoCapitalize="none"
          placeholderTextColor='#8A8A8A'
          label="Name"
          value={Name} 
          onChangeText={text=>setName(text)}
        />
        <Text style={styles.add}>Designation</Text>
        <TextInput
          style={styles.input}
          placeholder='Designation'
          autoCapitalize="none"
          placeholderTextColor='#8A8A8A'
          value={Designation} 
          onChangeText={text=>setDesignation(text)}
        />
        <Text style={styles.add}>Employee Email</Text>
        <TextInput
          style={styles.input}
          placeholder='Email Id'
          autoCapitalize="none"
          placeholderTextColor='#8A8A8A'
          value={Email} 
          onChangeText={text=>setEmail(text)}
        />
        <Text style={styles.add}>Phone Number</Text>
        <TextInput
          style={styles.input}
          label="Phone"
          placeholder='Phone Number'
          autoCapitalize="none"
          placeholderTextColor='#8A8A8A'
          value={Phone} 
          keyboardType="number-pad"
          onChangeText={text=>setPhone(text)}
        />
        <Text style={styles.add}>Employee Salary</Text>
         <TextInput
          style={styles.input}
          placeholder='Salary'
          autoCapitalize="none"
          value={String(Salary)} 
          keyboardType="number-pad"
          onChangeText={text=>setSalary(text)}
          placeholderTextColor='#8A8A8A'
        />
         {route.params?
             <Button style={styles.button} 
             mode="contained" 
             onPress={() => updateDetails()}>Update Details</Button>
             : 
             <Button style={styles.button} 
             mode="contained" 
             onPress={() => performValidation()}>Add Employee</Button>
             }
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          navigation.navigate("EmpList");
        }}>
        <View style={styles.centeredView}>    
              <View style={styles.modalView}> 
              <View style={{flexDirection:"row",justifyContent:"space-between"}}>
              <Image
          style={{ width: 100, height: 150, borderRadius: 70, marginTop: -50,marginLeft:-10 }}
          source={{
            uri:'https://png.pngtree.com/png-vector/20190228/ourmid/pngtree-check-mark-icon-design-template-vector-isolated-png-image_711429.jpg'
              //'https://images.unsplash.com/photo-1561409625-df3c51c39c2f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=775&q=80',
          }}></Image>
              <Text style={{fontSize:40,marginTop:20}}>Success</Text>
              </View>
                <Text style={{marginTop:0}}>Employee is added succesfully.
                 Please send this info. Mail already sent to the employee with info.</Text>
                <View style={{justifyContent:"center"}}>
                  <Text style={{textAlign:"center",fontSize:20}}>Email Address</Text>
                  <Text style={{textAlign:"center"}}>{Email}</Text>
                  <Text style={{textAlign:"center",fontSize:20}}>Password</Text>
                  <Text style={{textAlign:"center"}}>{modalPassword}</Text>
                  <Text style={{textAlign:"center",fontSize:20}}>Employee ID</Text>
                  <Text style={{textAlign:"center"}}>{modalUUID}</Text>
                </View>
                    
                <Button style={styles.button} 
                    mode="contained" 
                    onPress={() =>Modaldata()}>COPY <Ionicons name="ios-copy-outline" size={24} color="black" /></Button>
              </View>
        </View>
      </Modal>

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
    marginTop: 22
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
    //width: 300,
    borderColor:'#8A8A8A',
    height: 40,
    backgroundColor: 'transparent',
    marginLeft: 10,
    marginRight:10,
    color: 'black',
    marginBottom:10,
    borderRadius: 5,
    fontSize: 14,
    fontWeight: '500',
    borderWidth:1,
    padding:10,
  },
  container: {
    flex:1,
    justifyContent: 'center',
    marginTop:20,
    backgroundColor: '#ecf0f1',
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
    marginBottom:10,
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
centeredView: {
  flex: 1,
  justifyContent: "center",
  marginTop: 10,
},
modalView: {
  margin: 10,
  backgroundColor: "white",
  borderRadius: 20,
  height:420,
  padding:30,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  
},
button2:{
  borderRadius: 20,
  padding: 10,
  elevation: 2
},
button1: {
  marginTop:12,
  marginLeft:12,
  marginRight:12,
  marginBottom:12,
},
buttonOpen: {
  backgroundColor: "#F194FF",
},
buttonClose: {
  backgroundColor: "#2196F3",
},
})

export default AddEmployee;
import React,{useState,useEffect} from 'react';
import { View, StyleSheet, Image,Text,Pressable,TextInput,Button,TouchableOpacity,ToastAndroid,Alert
} from 'react-native';
import { LogBox } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Modal } from 'react-native-irvs-modal';

import AsyncStorage from  "@react-native-async-storage/async-storage"


const UpdatePassword = (props,route) => {

    const [New,setNew] = useState('');
    const [Confirm,setConfirm] = useState('');
    const [hidePasss, setHidePasss] = useState(true);
    const [hidePassss, setHidePassss] = useState(true);
    const [Error,setError] = useState(false);
    const [showDialog,setDialog] = useState(false);
    const [textHolder,setTextHolder] = useState(0);
    const [sumHolder,setSumHolder] = useState(0);
    const [random_number_1,setRandomNumber1] = useState(0);
    const [random_number_2,setRandomNumber2] = useState(0);
    const [val,setVal] = useState('');

    LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified.']);



  const ChangePassword = ()=>{
      console.log("val is"+val);
      if(New === Confirm){
        setDialog(false);
        fetch('http://192.168.43.114:8000/api/password/change/'+val, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
           "password":New,
        })
   
        }).then((response) => response.json())
            .then((responseJson) => {
              if(responseJson.Status === "success"){
                 setDialog(true);
                 sendEmail();
                 //addNSecondsDelay(50);
                // props.navigation.navigate("LoginScreen");
              }else{
                alert("Something went wrong. Try again!");
              }
   
            }).catch((error) => {
              console.error(error);
            });
        
      }else{
        setError(true);
        
      }
  }


  const sendEmail = ()=>{
    console.log(val);
    fetch('http://192.168.43.114:8000/api/password/success/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         "email":val
      })
 
      }).then((response) => response.json())
          .then((responseJson) => {
           console.log("mail sent"
           );
 
          }).catch((error) => {
            console.error(error);
          });
  }


 
  useEffect(()=>{
    AsyncStorage.getItem('email').then((value) => {
        if (value !== null){
           // console.log(value);
            setVal(value);
      }
      }).done();
  },[])


  const generate_captcha = () => {
 
    var number_1 = Math.floor(Math.random() * 100) + 1;
 
    var number_2 = Math.floor(Math.random() * 100) + 1;
 
    var sum = number_1 + number_2;
 
    setRandomNumber1(number_1);
    setRandomNumber2(number_2);
    setSumHolder(sum);
   // this.setState({ sum_holder: sum });
  }
 
  const run_captcha_function =()=>{
 
        var temp = random_number_1 + random_number_2 ;
        if(textHolder == temp)
        {
          //Write Your Code Here Which you want to execute on RIGHT Captcha Entered.
          Alert.alert("Captcha Metched");
          ChangePassword();
        }
        else{
          //Write Your Code Here Which you want to execute on WRONG Captcha Entered.
          Alert.alert("Captcha NOT Matched");
        }
    // Calling captcha function, So each time new captcha number generates on button clicks.
    generate_captcha();
 
  }

  const runBack = () =>{
    setDialog(false);
    props.navigation.navigate("LoginScreen");
  }
 


    useEffect(()=>{
        generate_captcha();
      },[])
    
  
  return (
    <View style={{flexDirection:"row",justifyContent:"space-around",marginTop:9}}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Change Password</Text>
            <View style={styles.input}>
            <TextInput
                autoCapitalize="none"
                placeholder="NewPasssword"
                value={New} 
                onChangeText={text=>setNew(text)}
                placeholderTextColor='#DCDCDC'
                secureTextEntry={hidePasss ? true : false}/>
                <Icon
                style={{marginLeft:125,marginTop:10}}
                name={hidePasss ? 'eye-slash' : 'eye'}
                size={15}
                color="grey"
                onPress={() => setHidePasss(!hidePasss)}/>
            </View>

            <View style={styles.input}>
            <TextInput
                autoCapitalize="none"
                placeholder="Confirm Passsword"
                placeholderTextColor='#DCDCDC'
                value={Confirm}
                onChangeText={(Text)=>setConfirm(Text)}
                secureTextEntry={hidePassss ? true : false}
                />
                <Icon
                style={{marginLeft:95,marginTop:10}}
                name={hidePassss ? 'eye-slash' : 'eye'}
                size={15}
                color="grey"
                onPress={() => setHidePassss(!hidePassss)}
            />
               
            </View>
            {
              Error &&
              <Text style={{color:"red",textAlign:"center",marginBottom:10}}>Password dont match</Text>
            }

       <View style={styles.captcha_view}>
 
          <Text style={{ fontSize: 20, textAlign: 'center', color: '#000' }}>
            {random_number_1} {"+"} {random_number_2} {"= "}
          </Text>
 
          <TextInput
            placeholder="Enter Sum"
            onChangeText={data => setTextHolder(data)}
            style={styles.textInputStyle}
            underlineColorAndroid='transparent'
          />
 
          <TouchableOpacity onPress={generate_captcha} >
 
            <Image source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2019/08/reload_image.jpg' }}
              style={{ width: 42, height: 42, resizeMode: 'contain', margin: 5 }} />
 
          </TouchableOpacity>
 
        </View>
            <Pressable onPress={()=>ChangePassword()}>
            <Button style={styles.button} title="Change Password"
                onPress={()=>run_captcha_function()} mode="contained">Change password</Button>       
            </Pressable>

            <Modal
                visible={showDialog} 
                type="success"
                title="Success!"
                message="Password Changed"
                confirmButtonAction={() => { runBack()}}
            />
           
          </View>
        </View>
    
     
    </View>
  );
};




export default UpdatePassword;

const styles = StyleSheet.create({
  cardContent: {
    flexDirection: 'row',
    padding:8,
  },
  myText:{
    fontSize:15,
    marginTop:3,
    marginLeft:5,
    
  },
  root: {
    flex:1,
   
  },
  
    centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 22
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding:30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    
  },
  captcha_view: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //margin: 10,
    borderColor: '#000',
    width: '90%',
    height: 100,
   // borderWidth: 1,
   // borderRadius: 7,
    padding: 5,
    backgroundColor: '#fff'
  },
 
  textInputStyle: {
 
    textAlign: 'center',
    height: 40,
    width: 150,
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 7,
  },
 
  button: {
 
    width: '80%',
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: '#BF360C',
    borderRadius: 3,
    marginTop: 20
  },
 
  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    padding: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginTop:0,
    textAlign:"center",
    fontSize:20,
    textDecorationStyle:"solid",
    marginBottom:20,
  },
  input: {
    //width: 300,
    height: 40,
    backgroundColor: 'transparent',
    flexDirection:"row",
    borderColor:'black',
    marginLeft: 10,
    marginRight:10,
    color: 'black',
    marginBottom:10,
    borderRadius: 5,
    fontSize: 14,
    fontWeight: '500',
    borderWidth:1,
  },
});


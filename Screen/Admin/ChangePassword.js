import React,{useState} from 'react';
import { View, StyleSheet, Image,Text,Pressable,TextInput,Button,TouchableOpacity,ToastAndroid,
} from 'react-native';
import { LogBox } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Modal } from 'react-native-irvs-modal';

const ChangePassword = (props,route) => {

    const [New,setNew] = useState('');
    const [Confirm,setConfirm] = useState('');
    const [hidePasss, setHidePasss] = useState(true);
    const [hidePassss, setHidePassss] = useState(true);
    const [Error,setError] = useState(false);
    const [showDialog,setDialog] = useState(false);
    LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified.']);



  const ChangePassword = ()=>{
      if(New === Confirm){
        fetch('http://192.168.43.114:8000/api/passwordChange', {
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
                  
                 //props.navigation.navigate("Profile");
              }else{
                alert("Something went wrong. Try again!");
              }
   
            }).catch((error) => {
              console.error(error);
            });
        
      }
      else{
        setError(true);
        setDialog(false);
        
      }
       // setDialog(true);
        

  }
  
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
                style={{marginLeft:136,marginTop:10}}
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
                style={{marginLeft:115,marginTop:10}}
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
            <Pressable onPress={()=>ChangePassword()}>
            <Button style={styles.button} title="Change Password"
                onPress={()=>ChangePassword()} mode="contained">Change password</Button>       
            </Pressable>

            <Modal
                visible={showDialog} 
                type="success"
                title="Success!"
                message="Password Changed"
                confirmButtonAction={() => { setDialog(false)}}
            />
           
          </View>
        </View>
    
     
    </View>
  );
};




export default ChangePassword;

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


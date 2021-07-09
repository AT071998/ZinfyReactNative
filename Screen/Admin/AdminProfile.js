import React,{useState,useEffect} from 'react';
import { View, StyleSheet, Image,Text,Linking,Platform,Alert,Modal,Pressable,TextInput} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Title, Card,Button} from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import AsyncStorage from  "@react-native-async-storage/async-storage"
import Dialog from "react-native-dialog";
import { FontAwesome } from '@expo/vector-icons';

const AdminProfile = (props,route) => {

  const [dataSource,setDataSource] = useState([]);
  const [email,setEmail] = useState('');
  const [name,setName] = useState('');
  const [phone,setPhone] = useState('');
  const [altphone,setaltphone] = useState('');
  const [altemail,setaltemail] = useState('');
  const [holder,setholder] = useState('');
  const [address,setAddress] = useState('');
  const [gsit,setgsit] = useState('');
  const [key,setKey] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [Old,setOld] = useState('');
  const [data,setData] = useState('');
  const [Loading,setLoading] = useState(true);
  const [errorState,setError] = useState(false);


  const fetchData = ()=>{
    fetch('http://192.168.43.114:8000/api/ManagerData/1')
    .then(res=>res.json())
    .then(result=>{
        setDataSource(result.data);
        setEmail(result.data[0].email);
        setName(result.data[0].companyName);
        setPhone(result.data[0].phoneNumber);
        setAddress(result.data[0].Address);
        setaltemail(result.data[0].alternateEmail);
        setaltphone(result.data[0].alternateNumber);
        setholder(result.data[0].accountHandler);
        setgsit(result.data[0].GSITNumber);
    }).catch(err=>{
    })
}





useEffect(()=>{
  AsyncStorage.getItem('adminKey').then((value) => {
    if (value !== null){
      setKey(value);
      fetchData();
  }
  else{
    alert("NOT AUTHORISED");
  }
  }).done();
  
},[])

const showModal = ()=>{
  setModalVisible(true);
}

const fetchPasswordData  = ()=>{
  setLoading(true);
//  console.log(Old);
  fetch('http://192.168.43.114:8000/api/VerifyPassword/')
  .then(res=>res.json())
  .then(result=>{
      setData(result.data[0].token);
     // console.log(data);
      if(data === Old){
        props.navigation.navigate("ChangePassword");
        setLoading(false);
        setModalVisible(!modalVisible);
      }else{
        setError(true);
      }
     
  }).catch(err=>{
      setLoading(false);
      setError(err);
  })
   //setModalVisible(!modalVisible);
   
}


  return (
    <View style={styles.root}>
      <LinearGradient
        colors={['#0a77d5', '#ff9a00']}
        style={{ height: 100 }}></LinearGradient>
        
      <View style={{ alignItems: 'center' }}>
        <Image
          style={{ width: 100, height: 100, borderRadius: 70, marginTop: -50 }}
          source={{
            uri:'https://kb.spinbackup.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'
              //'https://images.unsplash.com/photo-1561409625-df3c51c39c2f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=775&q=80',
          }}></Image>
      </View>
     
      <View style={{alignItems: 'center',margin:15 }}>
        <Title>{name}</Title>
      </View>
      <Card style={{ margin: 3,backgroundColor:"#E8E8E8"}} onPress={()=>{
      
      }}>
        <View style={styles.cardContent}>
        <MaterialIcons name="email" size={24} color="#0000E7" />
        <Text style={styles.myText}>email:        {email}</Text>
        </View>
      </Card>

      <Card style={{ margin: 3,backgroundColor:"#E8E8E8" }} >
        <View style={styles.cardContent}>
        <MaterialIcons name="alternate-email" size={24} color="#0000E7" />
        <Text style={styles.myText}>Alternate Phone :      {altemail}</Text>
        </View>
      </Card>

      <Card style={{ margin: 3,backgroundColor:"#E8E8E8" }} >
        <View style={styles.cardContent}>
        <Entypo name="phone" size={24} color="#0000E7" />
        <Text style={styles.myText}>phone :      {phone}</Text>
        </View>
      </Card>

      <Card style={{ margin: 3,backgroundColor:"#E8E8E8" }} >
        <View style={styles.cardContent}>
        <MaterialIcons name="confirmation-number" size={24} color="#0000E7" />
        <Text style={styles.myText}>Alternate Phone :      {altphone}</Text>
        </View>
      </Card>
    

      <Card style={{ margin: 3,backgroundColor:"#E8E8E8" }} >
        <View style={styles.cardContent}>
        <MaterialCommunityIcons name="account-arrow-right-outline" size={24} color="#0000E7" />
        <Text style={styles.myText}>Account Holder Name :      {holder}</Text>
        </View>
      </Card>
     
      <Card style={{ margin: 3,backgroundColor:"#E8E8E8" }} >
        <View style={{
    flexDirection: 'row',
    padding:8,
  }}>
        <FontAwesome name="address-card-o" size={24} color="#0000E7" />
        <Text style={{
            fontSize:15,
            marginTop:3,
            marginRight:10,
            textAlign:"center",
            
        }}>Address : {address}</Text>
        </View>
      </Card>



  <View style={{flexDirection:"row",justifyContent:"space-around",marginTop:9}}>
  <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>    
              <View style={styles.modalView}>
                
                <Text style={{textAlign:"left",fontSize:20}}>Change Password</Text>
                <Text style={{textAlign:"left",fontSize:15,marginBottom:20}}>Enter your Old password in order enter your new password. . </Text>
                <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  placeholder="Old Passsword"
                  placeholderTextColor='#DCDCDC'
                  value={Old} 
                  onChangeText={text=>setOld(text)}/>
                   {errorState &&
                    <View>
                    <Text style={{color:"red"}}>Please Enter a Value!</Text>
                    </View>
                    }
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={()=>fetchPasswordData()}>
                      <Text style={styles.textStyle}>Submit</Text>
                    </Pressable>
                    
              </View>
      
        </View>

      </Modal>
      <View style={{flexDirection:"row",justifyContent:"flex-end"}}>
      <Pressable
        onPress={() => showModal()}>
        <Button style={styles.button1} 
             mode="contained">Change password</Button>

      </Pressable>

      <Pressable
        onPress={() => props.navigation.navigate("EditProfile")}>
    
        <Button style={styles.button1} 
             mode="contained">Edit Profile</Button>
     
      </Pressable>
      </View>

    </View>

  </View>
</View>
  );
};




       



const theme ={
  colors:{
    primary:"#0000E7"
  }
}
const styles = StyleSheet.create({
  cardContent: {
    flexDirection: 'row',
    padding:8,
  },
  myText:{
    fontSize:15,
    marginTop:3,
    marginLeft:5,
//    textAlign:"justify",
textAlign:"center",
    
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
  button:{
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginTop:0,
    textAlign:"center",
    fontSize:20,
    textDecorationStyle:"solid"
  },
  input: {
    //width: 300,
    height: 40,
    backgroundColor: 'transparent',
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
export default AdminProfile;

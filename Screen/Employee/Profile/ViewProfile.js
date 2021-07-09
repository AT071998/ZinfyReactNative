import React, { useState,useEffect } from 'react';
import { View, StyleSheet, Image,Text,Linking,Platform,Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Title, Card,Button} from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import AsyncStorage from  "@react-native-async-storage/async-storage"

const ViewProfile = (props,route) => {


  const [data,setData] = useState([]);
  const [id,setId] = useState('');
  const [empId,setEmpId] = useState('');
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [uuid,setuuid] = useState('');
  const [designation,setDesignation] = useState('');

  const LoadingId = () =>{
    AsyncStorage.getItem('EmpId').then((value) => {
      if (value !== null){
      setId(JSON.parse(value));
      console.log("Profile EMPLOYEE id is"+JSON.parse(value));
     // fetchData();
     //fetchLeaveRequestApi(JSON.parse(value));
     fetchProfileData(JSON.parse(value));
        
      }else{
        console.log("No data found");
      }
    }).done();
  
  
  }

  const fetchProfileData = (id)=>{
    fetch('http://192.168.43.114:8000/api/profileData/'+id)
    .then(res=>res.json())
    .then(result=>{
        setData(result.data);
        setEmpId(result.data[0].id);
        setName(result.data[0].employee_name);
        setEmail(result.data[0].email);
        setPhone(result.data[0].phone);
        setDesignation(result.data[0].designation);
        setuuid(result.data[0].employee_uuid);
    }).catch(err=>{
        //setLoading(false);
       // setError(err);
    })


  }

  useEffect(()=>{
    LoadingId();
},[])


  return (
    <View style={styles.root}>
      <LinearGradient
        colors={['#0a77d5', '#ff9a00']}
        style={{ height: 200 }}></LinearGradient>
      <View style={{ alignItems: 'center' }}>
        <Image
          style={{ width: 100, height: 100, borderRadius: 70, marginTop: -50 }}
          source={{
            uri:
              'https://cdn.iconscout.com/icon/free/png-512/laptop-user-1-1179329.png',
          }}></Image>
      </View>
      <View style={{ alignItems: 'center',margin:15 }}>
        <Title>{name}</Title>
        <Text style={{ fontSize: 15 }}>Designation: {designation}</Text>
      </View>

       <Card style={{ margin: 3,backgroundColor:"#E8E8E8" }} >
        <View style={styles.cardContent}>
        <AntDesign name="idcard" size={24} color="#0000E7" />
        <Text style={styles.myText}>Employee UUID :{uuid}</Text>
        </View>
      </Card>
      <Card style={{ margin: 3,backgroundColor:"#E8E8E8"}} >
        <View style={styles.cardContent}>
        <MaterialIcons name="email" size={24} color="#0000E7" />
        <Text style={styles.myText}>Email Address :   {email}</Text>
        </View>
      </Card>

      <Card style={{ margin: 3,backgroundColor:"#E8E8E8" }} >
        <View style={styles.cardContent}>
        <Entypo name="phone" size={24} color="#0000E7" />
        <Text style={styles.myText}>Phone Number: {phone}</Text>
        </View>
      </Card>


      <View style={{flexDirection:"row",justifyContent:"space-around",marginTop:9}}>
        <Button icon="content-save-edit" mode="contained" theme={theme} onPress={() => {props.navigation.navigate("Edit",
        {"EmpId":empId}
        )
        }} >
    Edit
  </Button>

 
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
    
  },
  root: {
    flex:1,
   
  },
});
export default ViewProfile;

import React from 'react';
import { View, StyleSheet, Image,Text,Linking,Platform,Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Title, Card,Button} from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const Profile = (props,route) => {
  const {id,employee_name,phone,email,salary,designation} = props.route.params.item;
//  alert(salary);
  //console.log(salary);
  const openDial=()=>{
      if(Platform.OS === "android"){
          Linking.openURL(`tel:${phone}`);
      }else {
          Linking.openURL(`telprompt:${phone}`);
      }
  }


  const deleteEmployee = () =>{
  //  console.log(id);    
  Alert.alert(
    'Logout',
    'Are you sure?',
    [
      {
        text: 'Cancel',
        onPress: () => {
          return null;
        },
      },
      {
        text: 'Confirm',
        onPress: () => {
                  console.log("Employee Id is:"+id);
              fetch('http://192.168.43.114:8000/api/deleteEmployee/'+id, {
                method: 'DELETE',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  'id' : id,
                })
              
                }).then((response) => response.json())
                .then((responseJson) => {
                  if(responseJson.data==="deleted"){
                      alert("Deleted successfully!");
                      props.navigation.navigate('DisplayEmployee');
                  }
                  else if(responseJson.data==="wrong"){
                        Alert("Something went wrong!!");
                  }
              
                }).catch((error) => {
                  console.error(error);
                });
        },
      },
    ],
    {cancelable: false},
  );  
    
  
   
  
  }
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
              'https://images.unsplash.com/photo-1561409625-df3c51c39c2f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=775&q=80',
          }}></Image>
      </View>
      <View style={{ alignItems: 'center',margin:15 }}>
        <Title>{employee_name}</Title>
        <Text style={{ fontSize: 15 }}>{designation}</Text>
      </View>
      <Card style={{ margin: 3,backgroundColor:"#E8E8E8"}} onPress={()=>{
        Linking.openURL(`mailto:${email}`)
      }}>
        <View style={styles.cardContent}>
        <MaterialIcons name="email" size={24} color="#0000E7" />
        <Text style={styles.myText}>Email Address :   {email}</Text>
        </View>
      </Card>

      <Card style={{ margin: 3,backgroundColor:"#E8E8E8" }} onPress={()=>openDial()}>
        <View style={styles.cardContent}>
        <Entypo name="phone" size={24} color="#0000E7" />
        <Text style={styles.myText}>Phone Number: {phone}</Text>
        </View>
      </Card>
       <Card style={{ margin: 3,backgroundColor:"#E8E8E8"}}>
        <View style={styles.cardContent}>
        <FontAwesome name="money" size={24} color="#0000E7" />
        <Text style={styles.myText}>Salary: {'\u20A8'} {salary} / Month</Text>
        </View>
      </Card>

      <Card style={{ margin: 3,backgroundColor:"#E8E8E8"}}>
        <View style={styles.cardContent}>
        <FontAwesome name="money" size={24} color="#0000E7" />
        <Text style={styles.myText}>CTC : {'\u20A8'}   {salary*12} </Text>
        </View>
      </Card>

      <View style={{flexDirection:"row",justifyContent:"space-around",marginTop:9}}>
        <Button icon="content-save-edit" mode="contained" theme={theme} onPress={() => {props.navigation.navigate("AddEmployee",
        {id,employee_name,phone,email,designation,salary}
        )
        }} >
    Edit
  </Button>

  <Button icon="account-remove" mode="contained" theme={theme} onPress={() => deleteEmployee()}>Remove
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
export default Profile;

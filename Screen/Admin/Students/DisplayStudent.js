import React,{Component,useState,useEffect} from 'react';
import { View, Text, StyleSheet, SafeAreaView,Image,TouchableOpacity,Platform,FlatList,Linking,Alert} from 'react-native'
import { Card, Divider} from 'react-native-elements';

import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
const ViewStudent = (props)=> {

    const [data,setData] = useState([]);
    const [Loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    const fetchData = ()=>{
        fetch('http://192.168.43.114:8000/api/AllStudent/')
        .then(res=>res.json())
        .then(result=>{
            setData(result);
           // setMasterDataSource(result);
            setLoading(false);
        }).catch(err=>{
            setLoading(false);
            setError(err);
        })
        }

        useEffect(()=>{
            fetchData();
        },[])


        const ListEmptyView = () => {
          return (
            <View style={styles.MainContainer}>
       
              <Text style={{textAlign: 'center'}}> Sorry, No Data Present In FlatList... Try Again.</Text>
       
            </View>
       
          );
        }


      const deleteAddress = (id)=> {
          Alert.alert(
            'Delete Address',
            'Are you sure want to delete this Student ?',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => deleteAddressDetail(id)},
            ],
            { cancelable: false }
          )
        }

       const deleteAddressDetail=(id)=> {
        console.log(id);      
        fetch('http://192.168.43.114:8000/api/deleteStudent/'+id, {
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
      
          if(responseJson.data === "success"){
            alert("Record deleted successfully!");
          //  setData(responseJson.Data);
          //Refreshing the flatlist based on the deleted data
          }else if(responseJson.data === "failure"){
            alert("Something went wrong.Try Again");
          }
      
        }).catch((error) => {
           console.error(error);
        });
      
        
        }

        
  

    return(
      <View style={styles.container}>
        <FlatList
          style={{flex:1}}
          data={data}
                    renderItem={({ item }) => 
                    <Card containerStyle={styles.card}>
                      <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                        <View style={{flexDirection:"row"}}>
                          <View>
                          <FontAwesome5 name="user-graduate" size={24} color="black" />
                          </View>
                       
                         <Text style={{marginLeft:10,fontSize:24}}>{item.studentName}</Text>
                        </View>
                     
                    {/*  <TouchableOpacity>
                          <AntDesign name="edit" size={24} color="black" />
                    </TouchableOpacity> */}
                      <TouchableOpacity onPress={() => deleteAddress(item.id)}>
                            <AntDesign name="delete" size={24} color="black" />
                      </TouchableOpacity>
                  
                    </View>
                    <Divider style={{ backgroundColor: '#dfe6e9', marginVertical:10}} />
                    <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:5}}>
                      <Text style={styles.note}>Course: {item.course_name}</Text>
                        <View style={{flexDirection:'column', justifyContent:'flex-end',marginTop:5}}>
                                    <Text style={{marginRight:18}}>Total Fee</Text>
                                    <Text style={{justifyContent:'space-between',marginRight:18}}>Rs. {item.Total_Fee}</Text>
                                </View>  
                        
                            </View>
                    
                    <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:5}}>
                 <Text style={{width:100,height:40,borderBottomColor:"black"}}>College: {item.college_name} </Text>
                        <View style={{flexDirection:'column', justifyContent:'flex-end',marginTop:5}}>
                                    <Text>Pending Fee</Text>
                                    <Text style={{justifyContent:'space-between'}}>Rs. {item.due_fee}</Text>
                                </View>  
                        
                            </View>

                    <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:50}}>
                        <Entypo name="email" size={24} color="black" /><Text onPress={()=>{Linking.openURL(`mailto:${item.email}`)}}>{item.email}</Text>
                        <AntDesign name="phone" size={24} color="black" /><Text onPress={()=>openDial()}>{item.phone}</Text>
                        
                            </View>
                            <Divider style={{ backgroundColor: '#dfe6e9', marginVertical:10}} />

                        </Card>
                        
                         }
                         keyExtractor={(item, index) => index.toString()}
                         onRefresh={()=>fetchData()}
                         refreshing={Loading}
                         ListEmptyComponent={ListEmptyView()}
                        />
        <TouchableOpacity style={styles.fab} onPress={()=>props.navigation.navigate("AddStudent")}>
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>

      </View>
    );
  
}

const styles = StyleSheet.create({
 
card:{
    backgroundColor:'#ffd194',
    borderWidth:0,
    borderRadius:20

	},
  buttonContainerRight: {
   
    backgroundColor: '#ffffff',
    height:60,
    width:50,
    borderRadius:8,
},
container: {
    justifyContent: 'center',
    flex:1,
    width:"100%",
    backgroundColor: '#F7F7F7',
   
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
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
	//	textTransform:'capitalize',
	},
    fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        backgroundColor: '#2E2EFF',
        borderRadius: 30,
        elevation: 8
      },
      fabIcon: {
        fontSize: 40,
        color: 'white'
      }
});


export default ViewStudent;
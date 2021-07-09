import React, {useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Alert,
  View,
  ActivityIndicator,
  FlatList,
  Text
  
} from 'react-native';
import AsyncStorage from  "@react-native-async-storage/async-storage"
import { Card, Divider} from 'react-native-elements';
import { Button} from 'react-native-paper';



const LeaveHistory = (props) => {


  const [dataSource,setDataSource] = useState([]);
  const [Loading,setLoading] = useState(true);
  const [id,setId] = useState('');
  const [text,setText] = useState('');

  const fetchLeaveRequestApi = (id)=>{
    console.log("entering");
    console.log(id);
    return fetch('http://192.168.43.114:8000/api/leaveemp/'+id)
    .then(res=>res.json())
                .then(result=>{
                    console.log(result.data);
                    if(result.data === "404" ){
                      setLoading(false);
                     // setText("Not");
                     Alert.alert("No Leave Applied till now");
                    }else if(result.status === "data"){
                       setDataSource(result.data);
                       console.log(result.data);
                       setLoading(false);
                    }
                    
                  
                }).catch(err=>{
                   console.log("fetching error");
                })
}


const LoadingId = () =>{
  AsyncStorage.getItem('EmpId').then((value) => {
    if (value !== null){
    setId(JSON.parse(value));
    console.log("LEVAE HISTORY Employee id is"+JSON.parse(value));
   // fetchData();
   fetchLeaveRequestApi(JSON.parse(value));
      
    }else{
      console.log("No data found");
    }
  }).done();


}


useEffect(()=>{
  LoadingId();
  
},[])


const ListEmptyView = () => {
  return (
    <View style={{marginTop:30}}>

      <Text style={{textAlign: 'center',fontSize:15}}> Sorry, No Data Present In FlatList... Try Again.</Text>
      <Text style={{textAlign: 'center',marginTop:10,}}>You can apply for leave using your dashboard</Text>
      <Text style={{textAlign: 'center',marginTop:10,}}>OR</Text>
      <Button style={{marginRight:40,marginLeft:40,marginTop:20}} 
                mode="contained" 
                onPress={() => props.navigation.navigate("LeaveApply")}>Apply Leave</Button> 
    </View>

  );
}



return (
  <View >

     {
        Loading?
        <ActivityIndicator size="large" color="#0000ff"></ActivityIndicator>
        :
       
  
  <FlatList
    style={{flex:0}}
    data={dataSource}
    renderItem={({ item,index }) => 
          <Card containerStyle={styles.card}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}> 
            {item.is_approved == 0 ? (
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                 <Text style={{color: '#D18700',fontSize:15}}>Pending</Text>
                 
              </View>
            ) : item.is_approved == 1 ? (
              <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{color: '#007500',fontSize:15}}>Approved</Text>
               
              </View>
            ): item.is_approved == 2 ? (
              <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{color: '#FF5733',fontSize:15}}>Rejected</Text>
               
              </View>
            ) : (
              <View>
              <Text>No Action</Text>
              </View>
            )
          }
             
            </View>
         
          <Divider style={{ backgroundColor: '#dfe6e9', marginVertical:5}} />
          <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:5}}>
              <View style={{flexDirection:'column', justifyContent:'flex-end',marginTop:2}}>
                         <Text>From</Text>
                        <Text style={{justifyContent:'space-between'}}>{item.fromdate}</Text>
              </View>  
              <View style={{flexDirection:'column', justifyContent:'flex-end',marginTop:2}}>
                         <Text>To</Text>
                        <Text style={{justifyContent:'space-between'}}>{item.todate}</Text>
              </View>  
              
        </View>

        <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:10}}>
             <Text>Leave type</Text>
             {item.leave_type == 1 ? (
                                             <Text>Sick type</Text>
                                        ) : item.leave_type == 2 ? (
                                            <View>
                                            <Text>Casual Leave</Text>
                                            </View>
                                        ): item.leave_type == 3? (
                                            <View>
                                            <Text>Annual Leave</Text>
                                            </View>
                                        ) : (
                                            <View>
                                            <Text>No Action</Text>
                                            </View>
                                        )
                                        }
                         
        </View>  
            

        <Divider style={{ backgroundColor: '#dfe6e9', marginVertical:5}} />
        
        <View style={{flexDirection:'row',justifyContent:"space-between",marginTop:10}}>
          <Text>Applied Date: {item.applieddate}</Text>
          <Text style={{color: '#C576F6',fontSize:15}}>{item.days} Days</Text>
        </View>
        

        </Card>
    }
    keyExtractor={(item, index) => index.toString()}
    refreshing={Loading}
    ListEmptyComponent={ListEmptyView()}
    onRefresh={()=>fetchLeaveRequestApi()}
        />
  }
        
</View>
);

}

  const styles = StyleSheet.create({
    container: {
  flex: 1,
  flexDirection: 'row',
  alignItems:'center',
  alignContent:'center',
  justifyContent:'center',
  paddingBottom:15,
},

container1: {
flex: 1,
flexDirection: 'row',
alignItems:'center',
alignContent:'center',
justifyContent:'center',
paddingBottom:15,
},


btncontainer: {
flex: 1,
flexDirection: 'row',
alignContent:'center',
alignItems: 'center',
justifyContent: 'center',
paddingBottom:15,
},

buttoncontainer: {
flex: 1,
backgroundColor:'#4444FF',
  alignContent:'center',
  justifyContent:'center',
  marginLeft:15,
  marginTop:0,
  marginRight:15,
  marginBottom:0,
  height:60,
  borderRadius:10,
  shadowColor: "#000",

 
  shadowOpacity: 0.50,
  shadowRadius: 12.35,
  elevation: 10,
},



taskItemContent: { 
color: 'black',
fontSize: 15,
marginLeft:10,
},

postInput: {
  fontSize: 24,
  borderColor:'#42435b',
  borderWidth:1,
  margin:10,
  //fontFamily: "Outrun future"
  },


datepickerstyle:{color:'white',
fontSize:15,
//outline:"none",

},

buttontemContent: { 
color: 'white',
fontWeight:'bold',
fontSize: 15,
alignItems:'center',
},

bodyStyle:{
borderWidth:0,
justifyContent:'center',
},
buttonContainerCard: {
  
  alignContent:'center',
 // justifyContent:'center',
  marginLeft:15,
  marginTop:0,
  marginRight:15,
  marginBottom:0,
  backgroundColor: '#ffffff',
  height:40,
  width:130,
  borderRadius:4,
  elevation: 10,
},

buttonContainerRight: {
  flex: 1,
  alignContent:'center',
  justifyContent:'center',
  marginLeft:15,
  marginTop:0,
  marginRight:15,
  marginBottom:0,
 backgroundColor: '#ffffff',
  height:60,
  borderRadius:8,
 shadowColor: "#000",
  
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.50,
  shadowRadius: 12.35,
  elevation: 10,
},
textinputContainerRight: {
  flex: 1,
  alignContent:'flex-start',
  marginLeft:15,
  marginTop:0,
  marginRight:15,
  marginBottom:0,
  backgroundColor: '#ffffff',
  height:160,
  borderRadius:8,
  shadowColor: "#000",

  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.50,
  shadowRadius: 12.35,
  elevation: 10,
},

body:{
paddingTop:15,
paddingBottom:30,
backgroundColor: '#efefef',
}
});

export default LeaveHistory;
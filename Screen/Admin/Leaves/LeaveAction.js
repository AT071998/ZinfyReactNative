import React,{Component} from 'react';
import { View, Text, StyleSheet, SafeAreaView,Image,FlatList, ScrollView,ActivityIndicator} from 'react-native'
import { Card, Divider} from 'react-native-elements';
import { Button } from 'react-native-elements';
import { SearchBar } from 'react-native-elements';
import { Feather } from '@expo/vector-icons'; 
class LeaveAction extends Component {  


    constructor(props){
        super(props);  //this.navigate = this.props.navigation.navigate,
        this.state={
          dataSource:[],
       
        }
      }

      
    
    componentDidMount(){
        const data =  this.props.route.params.ID;
        console.log(data);
        const data2 = this.props.route.params.EMPID;
        console.log("Emp id:"+data2);
        return fetch('http://192.168.43.114:8000/api/leavereq/'+data)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          this.setState({dataSource: responseJson.data})
       //   console.log(responseJson.);
        }
          
          )
        .catch((error) => {
          console.error(error);
        });
       
    }

        action_status = (id,type) =>{
          const {navigate} = this.props.navigation;
           alert("ID is"+id+"Type is:"+type);
        if(type===1){
          return fetch('http://192.168.43.114:8000/api/approve/'+id,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               "is_approved":1
            })
       
            }).then((response) => response.json())
                .then((responseJson) => {
                  if(responseJson.status ==="success"){
                    alert("Leave request is approved");
                    //this.renderPending();
                    navigate("LeaveStatus");
                    
                  }   
                }).catch((error) => {
                  console.error(error);
                });
        }
        else if(type===0){
          return fetch('http://192.168.43.114:8000/api/approve/'+id,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               "is_approved":2
            })
       
            }).then((response) => response.json())
                .then((responseJson) => {
                  if(responseJson.status ==="success"){
                    alert("Leave request is rejected");
                    navigate("LeaveStatus");
                  }
                }).catch((error) => {
                  console.error(error);
                });
    }
  }
    
        
  render(){
  
    return(
      <View> 
          <FlatList
            
          data={this.state.dataSource}
          renderItem={({ item}) => 
                <Card containerStyle={styles.card}>
                    <View style={{flexDirection:'column',}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}> 
                            <View style={{flexDirection:'column'}}>
                            <Text>Employee Name:{item.employee_name} </Text>
                            <Text style={{marginTop:10}}>Designation: {item.designation}</Text>
                            </View>
                           
                            <Image style={{ width: 100, height: 100, borderRadius: 70, marginTop: -40 }} source={{
                                uri:'https://images.unsplash.com/photo-1561409625-df3c51c39c2f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=775&q=80',
                            }}></Image>
                        </View>

                        <Divider style={{ backgroundColor: '#dfe6e9', marginVertical:20,borderWidth:0.2}} />
                            <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:5}}>
                                <View style={{flexDirection:'column', justifyContent:'flex-end',marginTop:2}}>
                                        <Text>From</Text>
                                        <Text style={{justifyContent:'space-between'}}>{item.date_from}</Text>
                                </View>  
                                <View style={{flexDirection:'column', justifyContent:'flex-end',marginTop:2}}>
                                        <Text>To</Text>
                                        <Text style={{justifyContent:'space-between'}}>{item.todate}</Text>
                                </View>  
                    
                            </View>

                            <View style={{flexDirection: 'row', alignItems: 'center',marginTop:10}}>
                            <Feather name="calendar" size={15} color="black" />
                            <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                            
                                <View>
                                
                                  <Text style={{width: 50, textAlign: 'center'}}>{item.days} Days</Text>
                                </View>
                                <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                                <Feather name="calendar" size={15} color="black" />
                            </View>
                                <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:20}}>
                                        <Text>Leave type</Text>
                                        {item.leave_type == 1 ? (
                                             <Text>Sick type</Text>
                                        ) : item.leave_type == 2 ? (
                                            <View>
                                            <Text>Casual Type</Text>
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
                            <View style={{ marginVertical:5,marginTop:20}} >
                                <View style={{flexDirection:'column', justifyContent:'space-between',}}>
                                    <Text style={{marginBottom:4}}>Reason</Text>
                                    <Text style={{height:150,backgroundColor:"#E8E8E8",textAlign:"justify"}}>{item.reason}</Text>
                                
                                </View>
                            </View>

                            <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:20}}>
                                        <Text>Applied on</Text>
                                        <Text>{item.applieddate}</Text>
                            </View>

                            <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:20}}>
                            <Button title="Approve"  buttonStyle={{backgroundColor:"#0000D1",width:80,height:40,marginTop:0,}} onPress={()=>this.action_status(item.LeaveId,1)}/>
                            <Button title="Reject" buttonStyle={{backgroundColor:"#FF0000",marginLeft:10,width:80,height:40,marginTop:0,}} onPress={()=>this.action_status(item.LeaveId,0)}/>
                            </View>
                        </View>

                    </Card>
                     }
                     keyExtractor={(item, index) => index.toString()}
          
              />
                
                </View>

              
                        
                  
                  
               
                

    );

  }


 


  

}
const styles = StyleSheet.create({

card:{
    marginTop:50,
    backgroundColor:'white',
    height:550,
    borderWidth:0,
    marginBottom:2,
    borderRadius:20

	},
  buttonContainerRight: {
    backgroundColor: '#ffffff',
    height:60,
    width:50,
    borderRadius:8,
   //shadowColor: "#000",
    
    //shadowOffset: {
   //   width: 0,
   //   height: 0,
   // },
   // shadowOpacity: 0.50,
   // shadowRadius: 12.35,
  //  elevation: 10,
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
		textTransform:'capitalize'
	}
});


export default LeaveAction;
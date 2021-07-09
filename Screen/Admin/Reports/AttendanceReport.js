import React, { useState,useEffect, Component } from 'react';
import { View, StyleSheet, Image,Text,Linking,Platform,Alert,FlatList} from 'react-native';
import { Title, Card,Button} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';


class AttendanceReport extends Component{
  constructor(props){
    super(props);
    this.state={
        yearData : [
          {
            "year":"2020"
          },{
            "year":"2021"
          },
          {
            "year":"2022"
          }
        ],
        monthData:[],
        yearPicker:'',
        monthPicker:'',
        name:'',
        designation:'',
        check:1,
        q1:0,
        q2:0,
        q3:0,
        data:'',
        date:'',
        noData:1,
        
        
    }
    
  }


  //get current date.. .
   getCurrentDate=()=>{

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    this.setState({date:date+'-'+month+'-'+year})
    
}



   //Load the month data to dropdown
   monthApiResource = ()=>{
    return fetch('http://192.168.43.114:8000/api/months/')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        monthData: responseJson
      }, function() {
        // In this block you can do something with new state.
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }



  renderApi = ()=>{
     console.log("year "+this.state.yearPicker);
     console.log("month"+this.state.monthPicker);
      fetch('http://192.168.43.114:8000/api/report/attendance', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "month":this.state.monthPicker,
            "year":this.state.yearPicker
   
        })
   
        }).then((response) => response.json())
            .then((responseJson) => {   
              console.log(responseJson);   
              if(responseJson.status === "failure"){
                console.log("No data found");
                this.setState({check:0});
                this.setState({noData:1});
              }else if(responseJson.status ==="success"){
               this.setState({check:0});
               this.setState({noData:2});
               this.setState({data:responseJson.data});
               console.log(this.state.data);
               console.log("check is"+this.state.check);
              }
             
            }).catch((error) => {
              console.error(error);
            });
      
  
    
     
   }
 
  

  componentDidMount(props){
    this.monthApiResource();
    
  }
 

  render(){
 const isResponseData = this.state.check == '0' ? this.renderDone() : this.renderInProgress()
  const {navigate} = this.props.navigation;
  console.log(this.state.check);
  return(
    <View>
        <View style={{ margin:15 }}>
          
       <View>
         <View style={{flexDirection:"row",justifyContent:"space-between"}}>
           <View style={{flexDirection:"column"}}>
           <Text style={{textAlign:"center",fontSize:20,marginLeft:15,textDecorationLine:"underline"}}>ATTENDANCE WISE MONTHLY REPORT</Text>
           </View>
          
         </View>
       </View>
      </View>

      <View style={{flexDirection:"row",justifyContent:"space-between",padding:10}}>
        <Text style={{marginLeft:10}}>Choose Month</Text>
        <Text style={{marginRight:90}}>Choose Year</Text>
        </View>
        <View style={{flexDirection:"row",justifyContent:"flex-start"}}>
        <View style={{borderWidth:1,marginLeft:5,marginRight:2,borderColor:"#8A8A8A",height:40,borderRadius:20}}>
        <Picker style={styles.input}
                    selectedValue={this.state.monthPicker}
                    onValueChange={(itemValue, itemIndex) => this.setState({monthPicker: itemValue})} >
                      <Picker.Item key={'unselectable'} label="Select Month" value={"month"} />
                    {this.state.monthData.map((item, key)=>(
                    <Picker.Item style={styles.input} label={item.month} value={item.month} key={key} />)
                    )}
            
        </Picker>
        </View>
        <View style={{borderWidth:1,marginLeft:5,marginRight:2,borderColor:"#8A8A8A",height:40,borderRadius:20}}>
        <Picker style={styles.input}
                    selectedValue={this.state.yearPicker}
                    onValueChange={(itemValue, itemIndex) => this.setState({yearPicker: itemValue})} >
                      <Picker.Item key={'unselectable'} label="Select Year" value={0} />
                    {this.state.yearData.map((item, key)=>(
                    <Picker.Item style={styles.input} label={item.year} value={item.year} key={key} />)
                    )}
            
        </Picker>
        </View>
        </View>
      
        <Button style={styles.button} 
             mode="contained" 
             onPress={() => this.renderApi()}>VIEW</Button>
      
       {isResponseData}
     
      
     </View>
   );
 }

 renderInProgress(){
  return(
   <View>
      
   </View>

   );
}
renderDone(){
  return(
    <View>
      {
        this.state.noData === 1 ?(
          <View style={{alignContent:"center",justifyContent:"center",marginTop:20}}>
          <FontAwesome5 name="calendar-times" size={50} color="black" style={{textAlign:"center"}}/>
          <Text style={{alignContent:"center",textAlign:"center",fontSize:20}}>No record found</Text>
          </View>
        
        ) :(
          <View>
          <View style={{flexDirection:"row",justifyContent:"space-between",
          marginLeft:10,marginRight:10}}>
             <Text style={{fontSize:20,marginLeft:15}}>Name</Text>
             <Text style={{fontSize:20,}}>{"\t\t\t\t\t"}Present</Text>
             <Text style={{fontSize:20,}}>Percentage</Text>
        
           </View>
          <FlatList
              //  style={{flex:1}}
                data={this.state.data}
                renderItem={({ item }) => 
           <View >
                <Card style={styles.listItem}>
                  <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                  <View style={{flexDirection:"row",marginTop:10}}>
                                    <View style={{flexDirection:"column",textAlign:"center"}}>
                                   <View style={{justifyContent:"center",alignContent:"center",alignItems:"center"}}><AntDesign name="user" size={20} color="black" /></View><Text style={{fontSize:15}}>{item.employee_name}</Text> 
                                    <Text style={{fontSize:15,color:"red"}}>{item.employee_uuid}</Text>
                                    </View>
                                         
                                         
                                  </View>
      
                                  <View style={{flexDirection:"row",marginTop:10}}>
                                      <View style={{width: 60,height: 20,justifyContent: "center",}}>
                                      <Text style={{alignSelf: 'center',fontWeight: 'bold',color: 'black',fontSize: 15, }}>{item.count} Days</Text>
                                      </View>
                                  </View>
      
                                 
                                  {item.percentage > 50 && item.percentage < 75 ? (
                                     <View style={{width: 60,height: 60,justifyContent: "center",borderRadius: 60 / 2,backgroundColor: 'orange',marginTop:10}}>
                                              <Text style={{alignSelf: 'center',fontWeight: 'bold',color: 'white',fontSize: 15,}}>{item.percentage} %</Text>
                                        </View>
                                              )
                                               : 
                                               item.percentage > 75 ? (
                                                <View style={{width: 60,height: 60,justifyContent: "center",borderRadius: 60 / 2,backgroundColor: 'green',marginTop:10}}>
                                                <Text style={{alignSelf: 'center',fontWeight: 'bold',color: 'white',fontSize: 15,}}>{item.percentage} %</Text>
                                          </View>
                                              )
                                              :
                                              item.percentage < 50 ? 
                                               (
                                                <View style={{width: 60,height: 60,justifyContent: "center",borderRadius: 60 / 2,backgroundColor: 'red',marginTop:10}}>
                                                <Text style={{alignSelf: 'center',fontWeight: 'bold',color: 'white',fontSize: 15,}}>{item.percentage} %</Text>
                                          </View>
                                              ):
                                              (
                                                <View>
                                                <Text>No Action</Text>
                                                </View>
                                              )
                                              }
                              
      
      
                                 
      
      
                  </View>
                         
                          
      
                 </Card>
           </View>
                }
      
                keyExtractor={(item, index) => index.toString()}
                
                />
          </View>
        )
      }
      </View>

    
     
   );
 
 }
 
  
  
}


const theme ={
  colors:{
    primary:"#0000E7"
  }
}
const styles = StyleSheet.create({


  myText:{
    fontSize:15,
    marginTop:3,
    marginLeft:5,
    
  },
  container: {
  //  flex:1,
    justifyContent: 'center',
  //  marginTop:10,
    //backgroundColor: '#ecf0f1',
    //padding: 8,
  },

  listItem:{
    // margin:10,
     padding:10,
     marginBottom:5,
     backgroundColor:"#E8E8E8",
     borderColor:"black",
     alignSelf:"center",
     flexDirection:"row",
     borderRadius:5
     
   },
  input: {
    width: 160,
    height: 40,
    marginLeft:10,
    color: 'black',
    marginBottom:10,
    borderRadius: 5,
    fontSize: 14,
    fontWeight: '500',
    borderWidth:1
  },
  button1:{
    marginTop:12,
    marginLeft:12,
    marginRight:12,
    marginBottom:12,
    width:"30%",
    height:"60%",
    
  },
  button:{
    marginTop:12,
    marginLeft:12,
    marginRight:12,
    marginBottom:12,
   // width:"30%"
  },
  root: {
    flex:1,
    justifyContent: 'center',
    marginTop:10,
    //backgroundColor: '#ecf0f1',
    padding: 8,
   
  },
});
export default AttendanceReport;

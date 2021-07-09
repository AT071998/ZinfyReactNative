import React, { useState,useEffect, Component } from 'react';
import { View, StyleSheet, Image,Text,Linking,Platform,Alert,FlatList} from 'react-native';
import { Title, Card,Button} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import { SearchBar } from 'react-native-elements';
import { Divider} from 'react-native-elements';
import { Fontisto } from '@expo/vector-icons'; 

import AsyncStorage from  "@react-native-async-storage/async-storage";

class SalaryView extends Component{
  
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
              },
            ],
            monthData:[],
            yearPicker:'',
            monthPicker:'',
            name:'',
            designation:'',
            check:'',
            data:[],
            val:'',
            amt:'',
            paiddate:'',
            pendingAmt:'',
            no:'',
            
        }      
      }

      renderData = (id,year,month)=>{
        //http://192.168.43.114:8000/api/advancehistoryEmp/1/2021/6
        return fetch('http://192.168.43.114:8000/api/advancehistoryEmp/'+id+'/'+year+'/'+month)
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.data === "error"){
                this.setState({check:0, no:1}) //Skip
            }else{
                this.setState({
                    data: responseJson});
                    var amountGiven = responseJson.data[0].amount;
                    var paidDate = responseJson.data[0].paid;
                    var pendingAmt = responseJson.data[0].pendingAmount;
                    this.setState({check:0,amt:amountGiven,paidDate:paidDate,pendingAmt:pendingAmt,no:0});
            }
          
        })
        .catch((error) => {
          console.error(error);
        });
      }



      monthApiResource = ()=>{
        return fetch('http://192.168.43.114:8000/api/months/')
        .then((response) => response.json())
        .then((responseJson) => {
           // console.log("Data");
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



   

      componentDidMount(props){
        this.monthApiResource();
        AsyncStorage.getItem('EmpId').then((value) => {
            if (value !== null){
            this.setState({ val: JSON.parse(value)}); 
            var res = this.state.val;
           // console.log("Result"+res);
            var today = new Date();
            var month = today.getMonth()+1;
            console.log("Month is "+month);
            var year = today.getFullYear();
            console.log("Year is"+year);
            this.renderData(res,year,month);
          }
          }).done();
       
        
      }


      
      renderApi = ()=>{
       // console.log("Check is:"+this.state.check);
       console.log(this.state.val);
        return fetch('http://192.168.43.114:8000/api/advancehistoryEmps/'+this.state.val+'/'+this.state.yearPicker+'/'+this.state.monthPicker)
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.data === "error"){
                this.setState({check:1,no:1})
            }else{
                this.setState({
                    data: responseJson.data});
                    var amountGiven = responseJson.data[0].amount;
                    console.log(amountGiven);
                    var paidDate = responseJson.data[0].paid;
                    console.log(paidDate);
                    var pendingAmt = responseJson.data[0].pendingAmount;
                    this.setState({check:1,amt:amountGiven,paidDate:paidDate,pendingAmt:pendingAmt,no:0});
            }
            
          
        })
        .catch((error) => {
          console.error(error);
        });
        
          }
    
      



      render(){

        //check is 1 now. . . . 
        const isResponseData = this.state.check == '0' ? this.renderDone() : this.renderInProgress()
        const {navigate} = this.props.navigation;
     //   console.log(this.state.res);
        return(
          <View>
              <View style={{ margin:15 }}>
                <Text style={{fontSize:20,textAlign:"center",textDecorationLine:'underline'}}>Check Advance Payment</Text>
                
             <View>
               <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                 <View style={{flexDirection:"column"}}>
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
                               <Picker.Item key={'unselectable'} label="Select Month" value={0} />
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
                   onPress={() => this.renderApi()}>Go</Button>
             {isResponseData}
           </View>
         );
       }
       renderInProgress(){
         return(
            <View style={{margin:10}}>
            { 
            this.state.no == 1 ? (
                <Card>
                  <View style={{justifyContent:"center",alignItems:"center",alignSelf:"center",height:160}}>
                    <Fontisto name="check" size={40} color="black" />
                    <Text>No advance taken</Text>
                  </View>
                </Card>
            ):
            this.state.no == 0 ? (
              <Card>
              <View style={styles.listItem}>   
              <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                      <Text style={{color:"red",fontSize:20}}>Advance{"\n"} Payment</Text>
                          <View style={{flexDirection:"column"}}>
                          <Text style={{fontSize:15,color:"green"}}>Amount Given: Rs. {this.state.amt}</Text>     
                          <Text style={{fontSize:15,color:"green"}}>Date of Payment {this.state.paidDate}</Text>
                          </View>
                             
              </View>
              <Divider style={{ backgroundColor: 'black', marginVertical:15}} />
              <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                <Text >Your Remaining salary for the month is Rs. {this.state.pendingAmt}</Text>
                
              </View>
              <Divider style={{ backgroundColor: 'black', marginVertical:15}} />
              <View style={{flexDirection:"row"}}>
                  <Text></Text>
              </View>
              </View>
          </Card>
            ):(
                <View>
                    <Text>Something went wrong</Text>
                </View>
            )
   }
        </View>
      
      
          );
       }
       renderDone(){
         return(
            <View style={{margin:10}}>
                { 
                //If advance is not taken. . . 
                this.state.no == 1 ? (
                  <Card>
                  <View style={{justifyContent:"center",alignItems:"center",alignSelf:"center",height:160}}>
                    <Fontisto name="check" size={40} color="black" />
                    <Text>No advance taken</Text>
                  </View>
                </Card>
                ):
                this.state.no ==0 ? (
                 <Card>
                    <View style={styles.listItem}>   
             {/*      <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                            <Text style={{color:"red",fontSize:15}}>Advance Pay</Text>
                                <View style={{flexDirection:"column"}}>
                                <Text>Amount Given {this.state.amt}</Text>     
                                <Text>Date of Payment {this.state.paidDate}</Text>
                                </View>
                                   
                    </View>
                    <Divider style={{ backgroundColor: 'black', marginVertical:15}} />
                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                      <Text>Your salary for the month is Rs. {this.state.pendingAmt}</Text>
                      
                    </View>
                    <Divider style={{ backgroundColor: 'black', marginVertical:15}} />
                    <View style={{flexDirection:"row"}}>
                        <Text></Text>
                    </View>
                */}

                    </View>
                </Card>
                ):(
                    <View>
                        <Text>Something went wrong</Text>
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
  listItem:{
    padding:10,
    height:120,
    backgroundColor:"#E8E8E8",
    width:"100%",
    marginBottom:5,
    
  },
  container: {
  //  flex:1,
    justifyContent: 'center',
  //  marginTop:10,
    //backgroundColor: '#ecf0f1',
    //padding: 8,
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
export default SalaryView;

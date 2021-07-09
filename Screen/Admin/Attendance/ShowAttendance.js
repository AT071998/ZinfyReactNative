import React, { useState,useEffect, Component } from 'react';
import { View, StyleSheet, Image,Text,Linking,Platform,Alert,FlatList} from 'react-native';
import { Title, Card,Button,Divider} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';


class ShowAttendance extends Component{
  constructor(props){
    super(props);
    //this.navigate = this.props.navigation.navigate,
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
        extraData:0, //for data not found. . . . 
        
        
    }
    
  }

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




  componentDidMount(props){
    //this.yearApiResource();
    this.monthApiResource();
    const {id,employee_name,phone,email,salary,designation} = this.props.route.params.item;
    this.setState({
      id:id,
      name:employee_name,
      designation:designation,
    })
  }

  renderApi = ()=>{
   // console.log("ID is"+this.state.id);
   //console.log("Mont Picker is"+this.state.monthPicker);
    //console.log("Year picker is"+this.state.yearPicker);
    fetch('http://192.168.43.114:8000/api/attendanceview/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
 
          "id":this.state.id,
          "month":this.state.monthPicker,
          "year":this.state.yearPicker
 
      })
 
      }).then((response) => response.json())
          .then((responseJson) => {
            if(responseJson.status === "data"){
                 // console.log(responseJson);
              //  console.log(responseJson.q1[0].working);
                var working = responseJson.q1.working;
                //  console.log(responseJson.q2[0].fullday);
                  var fullday = responseJson.q2.fullday;
                // console.log(responseJson.q3[0].halfday);
                  var halfday = responseJson.q3.halfday;
                  console.log(halfday);
                // this.setState({ working: responseJson.q1[0].working})
                  this.setState({check:0,q1:working,q2:fullday,q3:halfday,extraData:0});
                //  this.myFunction();
            }else if(responseJson.status === "404"){
                this.setState({check:0,extraData:1});
            }
         
 
          }).catch((error) => {
            console.error(error);
          });
    

  }


  render(){
  const isResponseData = this.state.check == '0' ? this.renderDone() : this.renderInProgress()
  const {navigate} = this.props.navigation;
 // console.log(this.state.check);
  return(
    <View>
        <View style={{ margin:15 }}>
          
       <View>
         <View style={{flexDirection:"row",justifyContent:"space-between"}}>
           <View style={{flexDirection:"column"}}>
           <Title>Name: {this.state.name} </Title>
           <Text style={{ fontSize: 15 }}>Designation:  {this.state.designation} </Text>
           </View>
           <Button style={styles.button1} onPress={()=>{navigate('DateWiseReport', {
            data: this.state.id});}}
             mode="contained" 
             >REPORT</Button>
         </View>
       </View>
      </View>

      <View style={{flexDirection:"row",justifyContent:"space-between",padding:10}}>
        <Text style={{marginLeft:10}}>Choose Month</Text>
        <Text style={{marginRight:90}}>Choose Year</Text>
        </View>
        <View style={{flexDirection:"row",justifyContent:"flex-start",}}>
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
          <View style={{borderWidth:1,borderColor:"#8A8A8A",height:40,borderRadius:20}}>
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
    <View>
       
    </View>


    );
 }
 renderDone(){
   return(
      <View>
        {
          this.state.extraData == 0 ?(
            <Card containerStyle={styles.card}>
                  <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:20,marginBottom:10}}>
                    <Text style={{marginLeft:10}}>Total Present Count</Text>
                    <Text style={{marginRight:20,fontSize:20}}>{this.state.q1} Days</Text>
                  </View>
                  <Divider style={{ backgroundColor: '#dfe6e9', marginVertical:10}} />
                

                  <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:10,marginBottom:20}}>
                    <Text style={{marginLeft:10}}>No of full days attended by Employee</Text>
                    <Text style={{marginRight:20,fontSize:20}}>{this.state.q2} Days</Text>
                  </View>
                  <Divider style={{ backgroundColor: '#dfe6e9', marginVertical:10}} />
                  <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:10,marginBottom:20}}>
                    <Text style={{marginLeft:10}}>No of Half days attended by Employee</Text>
                    <Text style={{marginRight:20,fontSize:20}}>{this.state.q3} Days</Text>
                  </View>
          </Card>
          ): this.state.extraData == 1 ?(
            <Card containerStyle={styles.card}>
           <View style={{justifyContent:"center",alignContent:"center",alignItems:"center"}}>
             <Text style={{textAlign:"center",fontSize:20}}>No Data Found</Text>
            </View>
    </Card>
          ):(
            <Card containerStyle={styles.card}>
            <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:20,marginBottom:10}}>
            <Text>Something went wrong. Try Again</Text>
            </View>
    </Card>
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
export default ShowAttendance;

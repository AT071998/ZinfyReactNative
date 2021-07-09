import React,{useState,setState, Component} from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Modal
} from 'react-native'
import {Picker} from '@react-native-picker/picker';
import { Button} from 'react-native-paper';
import SwitchExample from './switch'
import { Alert } from 'react-native';


class AddStudent extends Component{
  
    constructor(props){
        super(props);
        this.state={
            Name:'',
            register:'',
            courseDataSource:[],
            collegeDataSource:[],
            PickerValueHolder : '',
            CollegeValueHolder:'',
            Phone:'',
            Email:'',
            Paid:'',
            Total:'',
            switch1Value: false,
        }
        
      }

      toggleSwitch1 = (value) => {
        this.setState({switch1Value: value})
        console.log('Switch 1 is: ' + value)
     }

      courseApiResource = () =>{
        return fetch('http://192.168.43.114:8000/api/showcourses/')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            courseDataSource: responseJson
          }, function() {
            // In this block you can do something with new state.
          });
        })
        .catch((error) => {
          console.error(error);
        });
      }

      collegeApiResource = ()=>{
        return fetch('http://192.168.43.114:8000/api/showcolleges/')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            collegeDataSource: responseJson
          }, function() {
            // In this block you can do something with new state.
          });
        })
        .catch((error) => {
          console.error(error);
        });
      }
      componentDidMount() {
            this.courseApiResource();
            this.collegeApiResource();
        
      }

      getCurrentYear=()=>{

        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        return year;//format: dd-mm-yyyy;
  }



  validateData = () =>{
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const regmobNo = /^[0]?[789]\d{9}$/;
    if(this.state.Name === ''){
      Alert.alert("Enter the student Name");
    }else if(this.state.register === ''){
      Alert.alert("Enter the Register Number")
    }
    else if(this.state.Total === ''){
      Alert.alert("Enter the total fee");
    }
    else if(this.state.Paid === ''){
      Alert.alert("Enter the Paid amount")
    }
    else if (reg.test(Email) === false) {
      //console.log("Email is Correct");
      Alert.alert('Fill the Valid Email Address');
    }else if(regmobNo.test(Phone) === false ){
      Alert.alert('Fill the Valid Phone Number');
    }else{
      this.submitData();
    }
  }
      submitData = () =>{
   //     console.log(this.state);
        var year = new Date().getFullYear();
      
       
    fetch('http://192.168.43.114:8000/api/addstudent/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
   
            "studentName":this.state.Name,
            "college_id":this.state.CollegeValueHolder,
            "regId":this.state.Register,
            "phone":this.state.Phone,
            "email":this.state.Email,
            "batchYear":year,
            "course_id":this.state.PickerValueHolder,
            "Total_fee":this.state.Total,
            "paid_fee":this.state.Paid,
            "final_status":this.state.switch1Value,

   
        })
   
        }).then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson);
              // Showing response message coming from server after inserting records.
              if(responseJson.message === "Email already exists!"){
                 Alert.alert("Email already exists");
              }
              else if(responseJson.message === "Phone number already exists"){
                Alert.alert("Phone number already exists");
              }
              if(responseJson.status === "success"){
                alert("Student data inserted successfully!. Due amount left is " +responseJson.data.due_fee);
              }else if(responseJson.status === "failure"){
                alert("Something went wrong!Please try again");
              }
   
            }).catch((error) => {
              console.error(error);
            });
       
      }

    render(){

    return (
      <KeyboardAvoidingView enabled>
      <ScrollView>
      <View style={styles.container}>
        <Text style={{flexDirection:"row",borderColor:'black',textAlign:"center",fontSize:15,marginBottom:10}}>Add Student for the Batch - {this.getCurrentYear()}</Text>
        <Text style={styles.add}>Student Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(Name) => {this.setState({Name})}}
          placeholderText="Enter Student Name"
          blurOnSubmit={false}
          autoCorrect={false}
          value={this.state.Name}
        />

        <Text style={styles.add}>Register Number</Text>
        <TextInput
          style={styles.input}
          onChangeText={(Register) => {this.setState({Register})}}
          placeholderText="Enter Register Number"
          blurOnSubmit={false}
          autoCorrect={false}
          value={this.state.Register}
        />

        <Text style={styles.add}>Choose course type</Text>
        <Picker style={styles.input}
                    selectedValue={this.state.PickerValueHolder}
        
                    onValueChange={(itemValue, itemIndex) => this.setState({PickerValueHolder: itemValue})} >
                     <Picker.Item key={'unselectable'} label="Select a role" value={0} />
                    {this.state.courseDataSource.map((item, key)=>(
                    <Picker.Item style={styles.input} label={item.course_name} value={item.id} key={key} />)
                    )}
            
        </Picker>

        <Text style={styles.add}>Choose College</Text>
        <Picker style={styles.input}
                    selectedValue={this.state.CollegeValueHolder}
        
                    onValueChange={(itemValue, itemIndex) => this.setState({CollegeValueHolder: itemValue})} >
        
                    {this.state.collegeDataSource.map((item, key)=>(
                    <Picker.Item style={styles.input} label={item.college_name} value={item.id} key={key} />)
                    )}
            
        </Picker>

        <Text style={styles.add}>Phone Number</Text>
        <TextInput
          style={styles.input}
          onChangeText={(Phone) => {this.setState({Phone})}}
          placeholderText="Enter Phone Number"
          blurOnSubmit={false}
          keyboardType="number-pad"
          autoCorrect={false}
          value={this.state.Phone}
        />


        
        <Text style={styles.add}>Email Address</Text>
        <TextInput
          style={styles.input}
          onChangeText={(Email) => {this.setState({Email})}}
          placeholderText="Enter Email Address"
          blurOnSubmit={false}
          autoCorrect={false}
          value={this.state.Email}
        />

        <Text style={styles.add}>Total Fee</Text>
        <TextInput
          style={styles.input}
          onChangeText={(Total) => {this.setState({Total})}}
          placeholderText="Enter Total fee" 
          blurOnSubmit={false}
          keyboardType="number-pad"
          autoCorrect={false}
          value={String(this.state.Total)}
        />
        
        <Text style={styles.add}>Paid Fee</Text>
        <TextInput
          style={styles.input}
          onChangeText={(Paid) => {this.setState({Paid})}}
          placeholderText="Enter Paid" 
          keyboardType="number-pad"
          blurOnSubmit={false}
          autoCorrect={false}
          value={String(this.state.Paid)}
        />

      
        <View style={{flexDirection:"column"}}>
        <Text style={styles.add}>Final Declaration
        Has the candidate?</Text> 
         <SwitchExample style={styles.switchstyle}
            toggleSwitch1 = {this.toggleSwitch1}
            switch1Value = {this.state.switch1Value}
        />


        </View>
        

       

            <Button style={styles.button} 
             mode="contained" 
             onPress={() => this.validateData()}>Add Student</Button>

        
        
            
      </View>
      </ScrollView>
      </KeyboardAvoidingView>
      
      
    )
            }
  }


  const theme = {
    colors:{
        primary:"#006aff"
    }
}

const styles = StyleSheet.create({

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
  container: {
    flex:1,
    justifyContent: 'center',
    marginTop:10,
    //backgroundColor: '#ecf0f1',
    padding: 8,
  },
  button:{
    marginTop:12,
    marginLeft:12,
    marginRight:12,
    marginBottom:12,
  },
  switchstyle:{
    //marginRight:10,
    marginLeft:12
  },
  add:{
    marginRight:180,
    marginLeft:12
  },
  modalView:{
    position:"absolute",
    bottom:2,
    width:"100%",
    backgroundColor:"white"

},
modalButtonView:{
    flexDirection:"row",
    justifyContent:"space-around",
    padding:10
}
})

export default AddStudent;
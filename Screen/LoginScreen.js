import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
  ActivityIndicator
} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {Picker} from '@react-native-picker/picker';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import { EvilIcons } from '@expo/vector-icons'; 
import AsyncStorage from  "@react-native-async-storage/async-storage"

class LoginScreen extends Component{

  constructor(props){
    super(props);
    this.state={
        Email:'',
        Password:'',
        dataSource:[],
        PickerValueHolder : 'Select a role',
        emailError:'',
        passwordError:'',
        invalidError:'',
        showLoader:false,
        data:'',
        loginFailed:'',
        lastRefresh: Date(Date.now()).toString(),
    }
    this.Login = this.Login.bind(this)
    this.refreshScreen = this.refreshScreen.bind(this)
  }

  refreshScreen() {
    this.setState({ lastRefresh: Date(Date.now()).toString() })
}

  componentDidMount() {
   
    return fetch('http://192.168.43.114:8000/api/roles/')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson
        }, function() {
          // In this block you can do something with new state.
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  clearData = ()=>{
    console.log("entering");
    this.setState({Email:''});
    console.log("email changed"+this.state.Email);
    this.setState({Password:''});
  }

 /* checkFieldEmpty = () =>{
    if(this.state.Email === ''){
      this.setState({emailError:"Enter the email address"});

    }else if(this.state.Password === ''){
      this.setState({passwordError:"Enter the password"});
    }
  }

  */

  checkEmailFieldEmpty = () =>{
    if(this.state.Email===''){
      return true;
    }else {
      return false;
    }
  }

  checkPasswordFieldEmpty = () =>{
    if(this.state.Password ===''){
      return true;
    }else {
      return false;
    }
  }

  Login = () =>{
      
    const member_id = this.state.PickerValueHolder;
   // console.log(this.checkEmailFieldEmpty());
     if(this.checkEmailFieldEmpty() === false & this.checkPasswordFieldEmpty() === false & member_id !== 'Select a role'){
      this.setState({invalidError:''})
      this.showLoader();
      const currentContext = this;
      this.message = null;
      //const member_id = this.state.PickerValueHolder;
      const {navigate} = this.props.navigation;
      fetch('http://192.168.43.114:8000/api/login/'+member_id,{
        method:'POST',
        body:JSON.stringify({        
            "email" : this.state.Email,
            "password" : this.state.Password,
    }),
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json; charset=UTF-8'
        }
    })
    .then(function(response){
        response.json()
        .then(function(resp){
         // console.log(member_id);
            currentContext.hideLoader();
          //  currentContext.clearData();
          //  if(member_id == 'Select a role'){
           //   Alert.alert("You have no access to app. Select the Role");
           // }
            if(resp.role === "admin"){ 
              //Navigation route for admin dashboard. . . .
            //  alert("Admin");
              navigate("DrawerNavigationRoutes");
            }
            else if(resp.role === "employee"){
                var id  = resp.data.employee_id;
                //console.log("ID IS"+id);
                currentContext.setState({data:id});
                //console.log("ID IS:"+currentContext.state.data);
               // alert(currentContext.state.data);
                AsyncStorage.setItem('EmpId', JSON.stringify(currentContext.state.data));
                console.log("LOGIN EMPLOYEE ID IS:"+currentContext.state.data); // Note: persist input
                navigate("UserNavigationRoutes");
            }
            else{
               // currentContext.setState({Email:''});
               // currentContext.setState({Password:''});
                currentContext.setState({loginFailed:"Invalid Credentails. Please enter again. . . "})
             //   Alert.alert("Login Failed.")
                
            }
        
        })
    })
     }
    else if(member_id ==='Select a role'){
      Alert.alert('Seelct the role');
    }
    else if(this.checkEmailFieldEmpty() === true & this.checkPasswordFieldEmpty()===true){
      Alert.alert("Enter the Email address");
    }
   else if(this.checkPasswordFieldEmpty()===true){
     Alert.alert("Enter Password");
   }else{
     Alert.alert("Fill all the details");
   }
      
  }


  showLoader = () => {
    this.setState({ showLoader:true }); 
   };



 hideLoader = () => { 
   this.setState({ showLoader:false }); };
  render()
  {
    
  return (
    
    <ImageBackground source={require('../assets/background.jpeg')} style={styles.image}>  
    <ScrollView contentContainerStyle={styles.container}>
    
      <Image
        source={require('../assets/rn-social-logo.png')}
        style={styles.logo}
      />


      <Text style={styles.text}>Zinfy</Text>
    
      <View style={styles.inputContainer}>
        <View style={styles.iconStyle}>
            <EvilIcons name="check" size={25} color="#000000" />
        </View>
        <Picker style={styles.DropdownContainer}
            selectedValue={this.state.PickerValueHolder}
 
            onValueChange={(itemValue, itemIndex) => this.setState({PickerValueHolder: itemValue})} 
            >

            <Picker.Item key={'unselectable'} label="Select a role" value={0} />
            {this.state.dataSource.map((item, key)=>(
         
            <Picker.Item style={styles.input} label={item.role_name} value={item.id} key={key} />)
            )}
    
          </Picker>
    </View>
      <FormInput
       
        onChangeText={(Email) => {this.setState({Email})}}
        placeholderText="Email"   
        iconType="user"
        keyboardType="email-address"
        returnKeyType="next"
        autoCapitalize="none"
        blurOnSubmit={false}
        autoCorrect={false}
    //    onSubmitEditing={()=> this.Password.focus()}
      />
      {
        this.setState.emailError ?(
          <View>
            <Text>{this.state.emailError}</Text>
          </View>
        ):(
          <View>
           
          </View>
        )
      }
  
      <FormInput
        
        onChangeText={(Password)=>this.setState({Password})}
        placeholderText="Password"
        iconType="lock"
        blurOnSubmit={false}
        secureTextEntry={true}
        returnKeyType="next"
      //  ref={(input) => this.Password = input}
      />

{
        this.setState.passwordError ?(
          <View>
            <Text>{this.state.passwordError}</Text>
          </View>
        ):(
          <View>
           
          </View>
        )
      }
  
       {
         this.state.loginFailed=="Invalid Credentails. Please enter again. . . " ? (
            <View>
              <Text style={{color:"red",fontSize:14}}>{this.state.loginFailed}</Text>
            </View>
         ):(
          <View>
         </View>
         )
       }

      <FormButton
        buttonTitle="Sign In"
        onPress={()=>this.Login()}
      />

      <TouchableOpacity style={styles.forgotButton} onPress={() => this.props.navigation.navigate("ForgotPassword")}>
        <Text style={styles.navButtonText}>Forgot Password?</Text>
      </TouchableOpacity>

      <View style={{ position: 'absolute', top:"50%",right: 0, left: 0 }}>
          <ActivityIndicator animating={this.state.showLoader} size="large" color="red" />
    </View>
    
    </ScrollView>
    </ImageBackground>
   
      
    
  );
  }
  
}


export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    
  },
  validEmail: {
    borderColor: '#ccc',
  },
  validPassword: {
    borderColor: '#ccc',
  },
  invalidEmail: {
    borderColor: '#FF0000',
  },
  invalidPassword: {
    borderColor: '#FF0000',
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
   // fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 30,
    color: 'orange',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  //  fontFamily: 'Lato-Regular',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  invalidError:{
    color: 'red',
    marginTop:5,
    width:"100%",
    textAlign:"center",
    fontSize: 20,
  //  fontFamily: 'Lato-Regular'
  },
  backgroundImage:{
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.3,
    flex: 1,
    resizeMode: 'cover',
},
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height: windowHeight / 15,
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  DropdownContainer: {
    marginTop: 12,
    marginBottom: 13,
    width: '100%',
    height: windowHeight / 15,
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
  //  fontFamily: 'Lato-Regular',
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: 50,
  },

  errorTextStyle: {
    color: 'red',
    //flex:0.3,
   // marginLeft:0,
  // width:"100%",
   //textAlign:"left",
    fontSize: 15,
    //fontFamily: 'Lato-Regular'
  },
});

import React, { useState, useEffect,useRef } from 'react'
import { TextInput } from 'react-native'
import { Text, SafeAreaView,KeyboardAvoidingView, View, StyleSheet,Button } from 'react-native'
import AsyncStorage from  "@react-native-async-storage/async-storage"
import { Alert } from 'react-native'

const OtpVerification = ({navigation})=> {
    let textInput = useRef(null);
    const lengthInput = 5;
    const [internalVal,setinternalVal] = useState("");
    const [data,setData] = useState([]);
    const [val,setVal] = useState('');

    const onChangeText = (val)=>{
         setinternalVal(val);
      }

      useEffect(()=>{
        textInput.focus();
        AsyncStorage.getItem('email').then((value) => {
            if (value !== null){
               // console.log(value);
                setVal(value);
          }
          }).done();
      },[])
    

      const promptOTP = ()=>{
       // Alert.alert(val);
        fetch('http://192.168.43.114:8000/api/password/check/'+val)
        .then(res=>res.json())
        .then(result=>{
            setData(result.data.otp);
            console.log("Data is"+result.data.otp);
           if(result.data.otp === internalVal){
               //Alert.alert("Matched");
               navigation.navigate("UpdatePassword");
           }else if(result.data.otp != internalVal){ 
               Alert.alert("Not Matched");
           }
        }).catch(err=>{
        
        })
      }

        return (
          <View style={styles.container}>
              <KeyboardAvoidingView
              keyboardVerticalOffset={50}
              behavior={'padding'}
              style={styles.containerAvoidingView}
              >
                  <Text style={styles.textTitle}>{"Input your OTP"}</Text>
                  <View style={{flexDirection:"column"}}>
                      <View style={styles.containerInput}>
                      <View
                      style={[styles.cellView,
                        {
                            borderBottomColor:6===internalVal.length ? '#FB6C6A' :'#234db7'
                        }]}
                        >
                    <TextInput
                      ref={(input)=>textInput=input}
                      onChangeText={onChangeText}
                      style={styles.cellText}
                      value={internalVal}
                      maxLength={lengthInput}
                      returnKeyType="done"
                      keyboardType="numeric"
                      />    
                    </View>        
                      </View>
                    <Button title="CHECK OTP" onPress={()=>promptOTP()}></Button>
                     
                  </View>
              </KeyboardAvoidingView>
            
          </View>
        )
      }


export default OtpVerification;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop: 150
    },
   containerAvoidingView:{
       flex:1,
       alignItems:'center',
       marginTop:10
   },
   textTitle:{
       marginTop:50,
       marginBottom:50,
       fontSize:16
   },
   containerInput:{
       flexDirection:'row',
       alignItems:'center',
       justifyContent:'center',
       marginTop:10,
   },
   cellView:{
       paddingVertical:20,
       width:200,
       paddingTop:10,
       margin:5,
       justifyContent:'center',
       alignItems:'center',
       borderBottomWidth:1.5
   },
   cellText:{
       textAlign:'center',
       fontSize:16,
   }
  })
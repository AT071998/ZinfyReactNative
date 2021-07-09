import React,{Component} from 'react';
import { Text, View, StyleSheet,ActivityIndicator,FlatList,ImageBackground } from 'react-native';
import Constants from 'expo-constants';
import { FontAwesome } from '@expo/vector-icons'; 
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import { ScrollView } from 'react-native';


function Item({ item }) {
  return (
    <Card style={{ borderRadius:20,marginLeft:10,marginRight:10,marginBottom:10}}>
      
            <View style={{flexDirection:"row"}}>

            <Card style={{backgroundColor:"#E8E8E8",margin:10,height:80,width:"30%",borderRadius:10}}>
            
              <View style={{alignContent:"center",justifyContent:"center",alignItems:"center"}}>
                    <Text style={{fontSize:30,}}>{item.formatted_dob}</Text>
                    <Text style={{fontSize:30}}>{item.month}</Text>
                  </View>
             
            </Card>
              <View style={{flexDirection:"column"}}>
                <Text style={{marginTop:20,fontSize:15,color:"red",marginRight:12}}><FontAwesome name="sign-in" size={24} color="red" /> Check In</Text>
                <Text style={{marginTop:20,fontSize:20,color:"red"}}>{item.login_time} AM</Text>
              </View>
              <View style={{flexDirection:"column"}}>
                <Text style={{marginTop:20,fontSize:15,color:"green",marginRight:12}}><FontAwesome name="sign-out" size={24} color="green" />Check Out</Text>
                <Text style={{marginTop:20,fontSize:20,color:"green"}}>{item.logout_time} PM</Text>
              </View>
              </View>
            </Card>    
 
  );
}

class DateWiseReport extends Component {

  constructor(props){
      super(props);
      this.state = {
          data:'',
          dataSource:[],
          //Loading:true,
      }
  }

  

  componentDidMount(){
        const data =  this.props.route.params.data
        //this.props.route.params.source
        this.setState({data});
        console.log(data);
        fetch("http://192.168.43.114:8000/api/attendancedate/"+data)
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
           dataSource: responseJson.data
          })
         // this.setState({Loading:false});
          console.log(this.state.dataSource);
        })
        .catch(error=>console.log(error)) //to catch the errors if any
        }
    
    render() {
 
    
       
          return (  

          <View style={styles.container}>
           
            <FlatList
              data={this.state.dataSource}
              renderItem={({ item }) => <Item item={item}/>}
             // keyExtractor={item => item.id}
             keyExtractor={(item,index)=>index.toString()}
            />
            
          </View>
       
          
           ) ;
       
      }
  
   
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',

  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DateWiseReport;

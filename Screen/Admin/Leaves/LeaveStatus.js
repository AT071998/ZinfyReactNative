import React,{Component,useState,useEffect} from 'react';
import { View, Text, StyleSheet, SafeAreaView,Image,FlatList, ScrollView,ActivityIndicator} from 'react-native'
import { Card, Divider} from 'react-native-elements';
import { Button } from 'react-native-elements';

import { SearchBar } from 'react-native-elements';

const LeaveStatus = (props,route)=> {

  const [dataSource,setDataSource] = useState([]);
  const [Loading,setLoading] = useState(true);
  const [error,setError] = useState(null);
  const [search, setSearch] = useState('');
  const [masterDataSource, setMasterDataSource] = useState([]);    


  const fetchLeaveRequestApi = ()=>{
    return fetch('http://192.168.43.114:8000/api/showLeaveRequests')
    .then(res=>res.json())
                .then(result=>{
                    console.log(result.data);
                    setDataSource(result.data);
                   // console.log(result.data);
                    setMasterDataSource(result.data);
                    setLoading(false);
                }).catch(err=>{
                    setLoading(false);
                    setError(err);
                })
    }


        useEffect(()=>{
            fetchLeaveRequestApi();
        },[])



        const searchFilterFunction = (text) => {
          if (text) {
            const newData = masterDataSource.filter(function (item) {
              const itemData = item.employee_name
                ? item.employee_name.toUpperCase()
                : ''.toUpperCase() ;
              const textData = text.toUpperCase();
              return itemData.indexOf(textData) > -1;
            });
            setDataSource(newData);
            setSearch(text);
          } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setDataSource(masterDataSource);
            setSearch(text);
          }
          
        };
      

        const ListEmptyView = () => {
          return (
            <View style={styles.MainContainer}>
       
              <Text style={{textAlign: 'center'}}> Sorry, No Data Present In FlatList... Try Again.</Text>
       
            </View>
       
          );
        }
        if(error){
          return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 12,justifyContent: 'center', alignItems: 'center'}}>
              Error fetching data... 
              Check your network connection!
            </Text>
          </View>
          );
        }
        
    return(
      <View >
        <SearchBar style={{marginTop:20,}}
          round
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          searchIcon={{ size: 24 }}
          placeholder="Type Here..."
          value={search}
        />
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
                    <Text>{item.employee_name}</Text>
                    <Text>Applied Date: {item.applieddate}</Text>
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
              
                <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:2}}>
                   
                    <View style={{flexDirection:'column', justifyContent:'flex-end',marginTop:2}}>
                                
                    </View>  
                    
              </View>

                <View style={{flexDirection:'column',alignItems:"flex-end",marginTop:10}}>
                    
              </View>
              <Divider style={{ backgroundColor: '#dfe6e9', marginVertical:5}} />
              {item.is_approved == 0 ? (
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                       <Text style={{color: '#D18700',fontSize:15}}>Pending</Text>
                       <Button title="Action >" buttonStyle={{backgroundColor:"#800000",marginLeft:10,width:80,height:30,marginTop:0,}} onPress={()=>props.navigation.navigate("LeaveAction",{
                         ID:item.LeaveId,
                         EMPID:item.employee_id,
                       })}/>
                    </View>
                  ) : item.is_approved == 1 ? (
                    <View>
                      <Text style={{color: '#007500',fontSize:15}}>Approved</Text>
                    </View>
                  ): item.is_approved == 2 ? (
                    <View>
                      <Text style={{color: '#FF5733',fontSize:15}}>Rejected</Text>
                    </View>
                  ) : (
                    <View>
                    <Text>No Action</Text>
                    </View>
                  )
                }
                
                 
              

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
    justifyContent: 'center',
    flex:1,
    //width:"100%",
    //margin: 10,
    backgroundColor: '#F7F7F7',
    marginTop:10,
   
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
  },
card:{
    marginTop:10,
  //  flex:1,
    backgroundColor:'white',
   // height:230,
    borderWidth:0,
    marginBottom:2,
    borderRadius:20

	},
  buttonContainerRight: {
    //flex: 1,
    //justifyContent: 'center',
    //  alignItems: 'center',
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


export default LeaveStatus;
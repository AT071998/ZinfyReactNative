
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Image, Platform,TouchableOpacity,ActivityIndicator, Alert} from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import { Card} from 'react-native-paper';
import { SearchBar } from 'react-native-elements';
import { Divider} from 'react-native-elements';
import { Button } from 'react-native-elements';

const ViewSalary = (props) =>{
        const [data,setData] = useState([]);
        const [Loading,setLoading] = useState(true);
        const [error,setError] = useState(null);
        const [search, setSearch] = useState('');
        const [masterDataSource, setMasterDataSource] = useState([]);
        const [month,setMonth] =  useState('');

        const fetchData = ()=>{
                    fetch('http://192.168.43.114:8000/api/displaySalary')
                    .then(res=>res.json())
                    .then(result=>{
                        setData(result.data);
                        setMasterDataSource(result.data);
                        setLoading(false);
                        setMonth(result.month);
                    }).catch(err=>{
                        setLoading(false);
                        setError(err);
                    })
        }

        useEffect(()=>{
            fetchData();
        },[])


        const searchFilterFunction = (text) => {
          if (text) {
            const newData = masterDataSource.filter(function (item) {
              const itemData = item.employee_name
                ? item.employee_name.toUpperCase()
                : ''.toUpperCase();
              const textData = text.toUpperCase();
              return itemData.indexOf(textData) > -1;
            });
            setData(newData);
            setSearch(text);
          } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setData(masterDataSource);
            setSearch(text);
          }
          
        };

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
        
    return (
      <View style={styles.container}>
         <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          placeholder="Type Here..."
          value={search}
        />
      
          {
              Loading?
              <ActivityIndicator size="large" color="#0000ff"></ActivityIndicator>
              :
          
        <FlatList
          style={{flex:1}}
          data={data}
          renderItem={({ item }) => 
          <TouchableOpacity>
              <Card>
                    <View style={styles.listItem}>   
                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                            <Text style={{color:"red",fontSize:20}}>{item.employee_name}</Text>
                            { item.status=="Paid" ?(
                                 <Text style={{fontSize:20,color:"green"}}>PAID</Text>
                            ):(
                                <Text style={{fontSize:20,color:"red"}}>NOT PAID</Text>
                            )
                                
                            }
                                                           
                    </View>
                    <Divider style={{ backgroundColor: 'black', marginVertical:15}} />
                    <View style={{flexDirection:"column",justifyContent:"space-between"}}>
                        <View  style={{flexDirection:"row",justifyContent:"space-between"}}>
                        <Text style={{fontSize:15}}>Salary Paid: Rs. {item.SalaryPaid}</Text>
                        <Text>Month:{item.month}</Text>
                        </View>
                     
                      <Text>Payment Made on: {item.paidDate}</Text>
                    </View>
                   
                    

                    </View>
                </Card>
            </TouchableOpacity>
            }
          keyExtractor={(item, index) => index.toString()}
          onRefresh={()=>fetchData()}
          refreshing={Loading}
          //keyExtractor={item => item.email}
        />
}
        
      </View>
    );
  
}


export default ViewSalary;


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex:1,
   // width:"100%",
    //margin: 10,
    backgroundColor: '#F7F7F7',
    marginTop:10,
   
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
  },
  listItem:{
   // margin:10,
    padding:20,
    marginLeft:20,
    marginRight:10,
    marginBottom:5,
    height:150,
    backgroundColor:"#E8E8E8",
    borderColor:"black",
    width:"90%",
    borderRadius:5
    
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#03A9F4',
    borderRadius: 30,
    elevation: 8
  },
  fabIcon: {
    fontSize: 40,
    color: 'white'
  }
});
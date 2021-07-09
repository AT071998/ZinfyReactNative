import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

const NavigationDrawerHeader = (props) => {

  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={toggleDrawer}>
     
            <MaterialCommunityIcons
              name="text"
              size={30}
              color="black"
              style={{width: 25, height: 30, marginLeft: 10,}}
            />
          
          
        
      </TouchableOpacity>
    </View>
  );
};
export default NavigationDrawerHeader;
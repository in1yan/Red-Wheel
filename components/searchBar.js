import {react} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const Bar=()=>{
	return (
	  <View style={styles.searchSection}>
        <TextInput style={styles.input} placeholder="search any manga"/>    
      </View>
      );
}

const styles = StyleSheet.create({
		searchSection: {
    marginTop:'5%',
    marginBottom:'5%',
    width:'100%',
    padding:10,
  },  
  input:{
    backgroundColor:'#fff',
    color:'red',
    borderRadius:50,
    height:40,
    textAlign:'center',
    fontSize:20
  }
});
export default Bar;
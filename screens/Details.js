import react from 'react';
import {View,Text, ScrollView,StyleSheet, Image,FlatList,TouchableOpacity, Dimensions} from 'react-native';

const Details = ({navigation,route}) =>{
	const ch=Array.from({length:route.params.chapters},(_,index)=>index+1);
	const renderCh=({item})=>(
			<TouchableOpacity onPress={()=>navigation.navigate('Viewer',{url:route.params.url,ch:item})}>
				<View key={item} style ={styles.chButton}>
					<Text style={{fontSize:20 ,textAlign:'center',textAlignVertical:'center'}}>ch {item}</Text>
				</View>
			</TouchableOpacity>
			);
	return (
			<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
				<Text style={styles.heading}>{route.params.title}</Text>
				<View style={styles.Section}>
					<Image source={{uri:route.params.poster}} style={styles.poster}/>
				</View>
				<Text style={styles.sectionTitle}>Description</Text>
				<Text style={styles.desc}>{route.params.desc}</Text>
				<Text style={styles.sectionTitle}>Chapters</Text>
				<View style={styles.section}>
                    <FlatList
                        data={ch}
                        renderItem={renderCh}
                        keyExtractor={(item) => item.toString()}
                        numColumns={4}
                    />
				</View>
			</ScrollView>
		);
}
const styles = StyleSheet.create({
	  container: {
    flex: 1,
    backgroundColor: '#15191a',
    marginLeft:0,
    marginTop:0,
    marginRight:0,
  },
  heading: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop:10,
    textAlign:'center',
    color:'red'
  },
  section: {
    marginBottom: 24,
    alignSelf:'center',
    marginLeft:10
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft:10,
    color:'red'
  },
  poster:{
  	    width:250 ,
    height: 350,
    resizeMode: 'cover',
    borderRadius:10,
    alignSelf:'center'

  },
  desc:{
  	fontSize:20,
  	textAlign:'center',
  	backgroundColor:'#1D2425',
  	borderRadius:10,
  	marginLeft:10,
  	marginRight:10,
    color:'#fff'
  },
  chButton:{
  	width:60,
  	height:40,
  	marginBottom: 24,
  	textAlign:'center',
  	backgroundColor:'red',
  	marginRight:10,
  	borderRadius:20
  },
})
export default Details;
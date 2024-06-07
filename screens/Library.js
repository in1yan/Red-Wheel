import react,{useState} from 'react';
import {Text,ScrollView,TouchableOpacity,FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../components/card.js'
const Library=({navigation,route})=>{
	const [manga,setManga]=useState([]);
	const readFromLib=async()=>{
	    const old = await AsyncStorage.getItem('reads');
	    const oldArray=old ? JSON.parse(old) : [];
	    console.log(oldArray)
	    setManga(oldArray)
	}
	if (manga.length==0){
		readFromLib();
	}
	const RenderCard = ({ item }) => {
	    return (
	      <TouchableOpacity onPress={() => navigation.navigate('Details',
	        { title: item.title, poster: item.poster, desc: item.desc, chapters: item.chapters, url: item.url })}>
	        <Card key={item.title} poster={item.poster} title={item.title} desc={item.desc} />
	      </TouchableOpacity>
	    )
  }
	manga.map((item,index)=>console.log(item.title))
	return (
		<FlatList
		data={manga}
		renderItem={RenderCard}
		keyExtractor={(item)=>item.title}
		numColumns={2}
		columnWrapperStyle={{backgroundColor:'#15191a',paddingLeft:20,justifyContent: 'space-between'}}
		/>
	)
}

export default Library;
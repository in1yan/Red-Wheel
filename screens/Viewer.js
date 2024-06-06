import React, { useState, useEffect,useRef } from 'react';
import {Modal,Text,ActivityIndicator,View,Image,ScrollView,TouchableOpacity,Dimensions, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('window').width;

const Viewer = ({ navigation, route }) => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chapter,setChapter] = useState(route.params.ch);
  const [modalVisible,setModalVisible] = useState(true);
  const scrollRef = useRef(null);

  const loadPages=(ch)=>{
    fetch(`https://environmental-shina-iniyanv-9010b247.koyeb.app/pages/?ch=${ch}&url=${route.params.url}`)
    .then((resp)=>resp.json())
    .then((json)=>setPages(json))
    .finally(()=>setLoading(false))
  }
  if (loading){
    loadPages(chapter)
  }

  pages.map((item,index)=>console.log(item.url))
  const RenderPage = ({ uri }) => {
    const [ratio, setRatio] = useState(1);
    useEffect(() => {
      if (uri) {
        Image.getSize(uri, (width, height) => {
           setRatio(width / height);
        });
     }
    }, [uri]);

    return (
     <Image
       style={{ width: '100%', height: undefined, aspectRatio: ratio }}
       resizeMode="contain"
       source={{ uri }}
     />
   );
};
  const handleChange=async(chapter)=>{
    setChapter(chapter);
    loadPages(chapter);
    await AsyncStorage.setItem(route.params.title,chapter.toString())
    scrollRef.current.scrollTo({x:0,y:0,animated:true});
  }
  return (
      <Modal style={{flex:1,alignItems:'center',justifyContent:'center'}} animationType={"fade"} visible={modalVisible} onRequestClose={()=>navigation.goBack()}>
      {
        loading?(
          <View style={{height:'100%',alignItems:'center',justifyContent:'center',backgroundColor:'#15191a'}}>
          <ActivityIndicator size='large' color='red'/>
          <Text style={{color:'white'}}>Please wait...</Text>
          </View>
          ):(
            <ScrollView ref={scrollRef}>
              {pages.map((item,index)=><RenderPage key={index} uri={item.url}/>)}
              <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={()=>handleChange(chapter-1)}>
                  <Text style={{color:'white',fontSize:20}}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>handleChange(chapter+1)}>
                  <Text style={{color:'white',fontSize:20}}>Next</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )
      }
    </Modal>
  );
}
const styles = StyleSheet.create({
    image:{
      width:'100%',
      height:'100%',
      resizeMode:'cover',
    },
    footer:{
      flex:1,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      paddingVertical:10,
      backgroundColor:'#1D2425',

    },
    button:{
      backgroundColor:'red',
      borderRadius:10,
      width: 100,
      height:30,
      alignItems:'center',
      justifyContent:'center',
      margin:20
    }
})

export default Viewer;

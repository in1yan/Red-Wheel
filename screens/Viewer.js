import React, { useState, useEffect,useRef } from 'react';
import {Modal,Text,ActivityIndicator,FlatList,View,Image,TouchableOpacity,Dimensions, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('window').width;

const Viewer = ({ navigation, route }) => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chapter,setChapter] = useState(route.params.ch);
  const [modalVisible,setModalVisible] = useState(true);
  const [update,setUpdate]=useState(false);
  const flatListRef = useRef(null);
  const lastRatioRef = useRef(1);

  const loadPages=(ch)=>{
    setLoading(true);
    fetch(`https://environmental-shina-iniyanv-9010b247.koyeb.app/pages/?ch=${ch}&url=${route.params.url}`)
    .then((resp)=>resp.json())
    .then((json)=>setPages(json))
    .finally(()=>setLoading(false))
  }
  useEffect(()=>{
    loadPages(chapter);
  },[chapter])

  pages.map((item,index)=>console.log(item.url))
  const RenderPage = ({ uri }) => {
    const [ratio, setRatio] = useState(lastRatioRef.current);
    useEffect(() => {
      if (uri) {
        Image.getSize(uri, (width, height) => {
          const newRatio = width/height;
          setRatio(newRatio);
          lastRatioRef.current = newRatio;
        },()=>{
          setRatio(lastRatioRef.current)
        });
     }
    }, [uri]);

    return (
     <Image
       style={{ width: '100%', height: undefined, aspectRatio: ratio , marginBottom:0}}
       resizeMode="contain"
       source={{ uri }}
     />
   );
};
  const handleChange=async(chapter)=>{
    setChapter(chapter);
    setUpdate(true);
    if (flatListRef.current){
    flatListRef.current.scrollToOffset({offset:0,animated:true});
    }
    await AsyncStorage.setItem(route.params.title,chapter.toString())
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
            <FlatList
            ref={flatListRef}
            data={pages}
            renderItem={({item})=><RenderPage uri={item.url}/>}
            keyExtractor={item=>item.url}
            ListFooterComponent={
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={()=>handleChange(chapter-1)}>
                  <Text style={{color:'white',fontSize:20}}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>handleChange(chapter+1)}>
                  <Text style={{color:'white',fontSize:20}}>Next</Text>
                </TouchableOpacity>
            </View>

            }
            initialNumToRender={1}
            extraData={update}
            />
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

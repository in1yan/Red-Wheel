import React, { useState, useEffect } from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Modal,Text,ActivityIndicator,View,Image,ScrollView} from 'react-native';
const Viewer = ({ navigation, route }) => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    fetch(`https://environmental-shina-iniyanv-9010b247.koyeb.app/pages/?ch=${route.params.ch}&url=${route.params.url}`)
    .then((resp)=>resp.json())
    .then((json)=>setPages(json))
    .finally(()=>setLoading(false))
  },[]);

  const Close=()=>{
    navigation.goBack();
  }
  const [modalVisible,setModalVisible] = useState(true);
  return (
      <Modal style={{flex:1,alignItems:'center',justifyContent:'center'}} animationType={"fade"} visible={modalVisible} onRequestClose={()=>setModalVisible(!modalVisible)}>
      {
        loading?(
          <View style={{height:'100%',alignItems:'center',justifyContent:'center',backgroundColor:'#15191a'}}>
          <ActivityIndicator size='large' color='red'/>
          <Text style={{color:'white'}}>Please wait...</Text>
          <Text style={{color:'white'}}>swipe down to close viewer</Text>
          </View>
          ):(
      <ImageViewer  imageUrls={pages} enablePreload={true} enableSwipeDown={true} onSwipeDown={Close} maxOverflow={100} />
      )
      }
    </Modal>
  );
}

export default Viewer;

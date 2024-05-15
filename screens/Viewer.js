import React, { useState, useEffect } from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Modal,Text,ActivityIndicator,View} from 'react-native';
const Viewer = ({ navigation, route }) => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  // const pages= [{"url": "https://readm.today/uploads/chapter_files/16086/1/0.4.jpg"}, {"url": "https://readm.today/uploads/chapter_files/16086/1/0.5.jpg"}, {"url": "https://readm.today/uploads/chapter_files/16086/1/1.jpg"}, {"url": "https://readm.today/uploads/chapter_files/16086/1/2.jpg"}, {"url": "https://readm.today/uploads/chapter_files/16086/1/3.jpg"}, {"url": "https://readm.today/uploads/chapter_files/16086/1/4.jpg"}, {"url": "https://readm.today/uploads/chapter_files/16086/1/5.jpg"}, {"url": "https://readm.today/uploads/chapter_files/16086/1/6.jpg"}, {"url": "https://readm.today/uploads/chapter_files/16086/1/7.jpg"}, {"url": "https://readm.today/uploads/chapter_files/16086/1/8.jpg"}, {"url": "https://readm.today/uploads/chapter_files/16086/1/9.jpg"}, {"url": "https://readm.today/uploads/chapter_files/16086/1/10.jpg"}, {"url": "https://readm.today/uploads/chapter_files/16086/1/11.jpg"}, {"url": "https://readm.today/uploads/chapter_files/16086/1/12.jpg"}, {"url": "https://readm.today/uploads/chapter_files/16086/1/13.jpg"}, {"url": "https://readm.today/uploads/chapter_files/16086/1/14.jpg"}, {"url": "https://readm.today/uploads/chapter_files/16086/1/15.jpg"}, {"url": "https://readm.today/uploads/chapter_files/16086/1/16.jpg"}, {"url": "https://readm.today/uploads/chapter_files/16086/1/17.jpg"}, {"url": "https://readm.today/uploads/chapter_files/16086/1/18.jpg"},{"url": "https://readm.today/uploads/chapter_files/16086/1/0.4.jpg"}, {"url": "https://readm.today/uploads/chapter_files/16086/1/0.5.jpg"}, {"url": "https://readm.today/uploads/chapter_files/16086/1/1.jpg"}, {"url": "https://readm.today/uploads/chapter_files/16086/1/2.jpg"}, {"url": "https://readm.today/uploads/chapter_files/16086/1/3.jpg"}, {"url": "https://readm.today/uploads/chapter_files/16086/1/4.jpg"}, {"url": "https://readm.today/uploads/chapter_files/16086/1/5.jpg"}, {"url": "https://readm.today/uploads/chapter_files/16086/1/6.jpg"}, {"url": "https://readm.today/uploads/chapter_files/16086/1/7.jpg"}, {"url": "https://readm.today/uploads/chapter_files/16086/1/8.jpg"}, {"url": "https://readm.today/uploads/chapter_files/16086/1/9.jpg"}, {"url": "https://readm.today/uploads/chapter_files/16086/1/10.jpg"}, {"url": "https://readm.today/uploads/chapter_files/16086/1/11.jpg"}, {"url": "https://readm.today/uploads/chapter_files/16086/1/12.jpg"}, {"url": "https://readm.today/uploads/chapter_files/16086/1/13.jpg"}, {"url": "https://readm.today/uploads/chapter_files/16086/1/14.jpg"}, {"url": "https://readm.today/uploads/chapter_files/16086/1/15.jpg"}, {"url": "https://readm.today/uploads/chapter_files/16086/1/16.jpg"}, {"url": "https://readm.today/uploads/chapter_files/16086/1/17.jpg"}, {"url": "https://readm.today/uploads/chapter_files/16086/1/18.jpg"}];
  useEffect(()=>{
    fetch(`https://environmental-shina-iniyanv-9010b247.koyeb.app/pages/?ch=${route.params.ch}&url=${route.params.url}`)
    .then((resp)=>resp.json())
    .then((json)=>setPages(json))
    .finally(()=>setLoading(false))
  },[]);
  const Close=()=>{
    navigation.goBack();
  }
  return (
    <Modal style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      {
        loading?(
          <View style={{height:'100%',alignItems:'center',justifyContent:'center',backgroundColor:'#15191a'}}>
          <ActivityIndicator size='large' color='red'/>
          <Text style={{color:'white'}}>Please wait...</Text>
          </View>
          ):(
      <ImageViewer imageUrls={pages} enablePreload={true} enableSwipeDown={true} onSwipeDown={Close}maxOverflow={100} />
      )
      }
    </Modal>
  );
}

export default Viewer;

import React, { useState, useEffect } from 'react';
import {View,
        Text, 
        StyleSheet, 
        ScrollView, 
        TouchableOpacity,
        FlatList, 
        ActivityIndicator
        } from 'react-native';
import Card from '../components/card.js';
import Bar from '../components/searchBar.js'
      
const Home = ({ navigation }) => {

  const pop_url = "https://environmental-shina-iniyanv-9010b247.koyeb.app/popular";
  const anime_url="https://environmental-shina-iniyanv-9010b247.koyeb.app/anime-reads";
  const [pop, setPop] = useState([]);
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [items,setItems]=useState(20);

  useEffect(() => {
    fetch(pop_url)
      .then((resp) => resp.json())
      .then((json) => setPop(json))
      .finally(() => setLoading(false))
  },[] );
  useEffect(() => {
    fetch(anime_url)
      .then((resp) => resp.json())
      .then((json) => setAnime(json))
      .finally(() => setLoading(false))
  },[] );
  const renderCard = ({ item}) => {
    return (
      <TouchableOpacity key={item.title} onPress={() => navigation.navigate('Details',
        { title: item.title, poster: item.poster, desc: item.desc, chapters: item.chapters, url: item.url })}>
        <Card key={item.title} poster={item.poster} title={item.title} desc={item.desc} />
      </TouchableOpacity>
    )
  }
  const more=()=>{
    setItems(items+20)
  }
  const LoadMore=()=>{
  return(
    <TouchableOpacity style={{backgroundColor:'red',width:200,margin:20,alignItems:'center',justifyContent:'center',alignSelf:'center',borderRadius:5}} onPress={more}>
      <Text style={{color:'white',fontSize:15,fontWeight:'bold'}}>Load more</Text>
    </TouchableOpacity>
    )
}
  return (
    <ScrollView vertical style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Anime Reads...</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.section}>
          <View style={{width:20}}></View>
          {anime.map((item, index) =>renderCard({item}))}
          <View style={{width:220}}></View>
        </ScrollView>

      <View style={styles.container}>
        <Text style={styles.sectionTitle}>POPULAR</Text>
            {console.log(anime)}
        {loading ? (
            <View style={{height:'100%',alignItems:'center',justifyContent:'center'}}>
                <ActivityIndicator size='large' color='red'/>
                <Text>Please wait ...</Text>
            </View>
            ) : (
          <FlatList
            data={pop.slice(0,items)}
            renderItem={renderCard}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapperStyle}
            ListFooterComponent={<LoadMore/>}
          />)
        }
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15191a',
    marginLeft: 0,
    marginTop: 0,
    marginRight: 10,
    height:'100%',
    width:'100%',
    paddingLeft:5
  },
  section: {
    marginBottom: 24,
    width:'100%',
    paddingRight:100,
    marginRight:200,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color:'red',
    paddingRight:10,
    paddingLeft:10
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
});

export default Home;

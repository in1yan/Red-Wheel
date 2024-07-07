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
const recommended = [
    {
        "title": "One Piece",
        "poster": "https://readm.today/uploads/chapter_files/cover/tbn/1586509760_198x0.jpg",
        "desc": "Greatness, Glory, Gold. A Pirate Named Gold Roger, also known as the Pirate King, has conquered it all. He was executed for an unknown reason, but before he died, he revealed his last words about the legendary treasure named One Piece, hidden in the Grand Line. Twenty-two years after his death, a pirate named Monkey D. Luffy appears with one goal: to become the next Pirate King and find the treasure One Piece. This starts the never-ending adventure. Inspired by his childhood hero 'Red-Haired' Shanks, Luffy sets out on a journey to find One Piece and become the new Pirate King. After eating the Devil Fruit, he gains the power to do so. To accomplish this, he must reach the end of the most deadly and dangerous ocean: the Grand Line. But first, he must find a crew.",
        "url": "https://readm.today/manga/one-piece-150424",
        "chapters": "1141"
    },
    {
        "title": "One Punch Man",
        "poster": "https://readm.today/uploads/chapter_files/cover/tbn/1527534783_198x0.jpg",
        "desc": "This story takes place in the fictional Z-City, where the world is full of mysterious beings, villains, and monsters that cause destruction and havoc. An association of heroes has been established to protect citizens. Saitama, the titular One Punch Man, is so powerful that he can defeat very powerful monsters and villains with just a single punch, making his life boring because he is a superhero. Saitama was once a typical salaryman but decided to become a hero after saving a child from a monster. He trained every day for three years with an inhuman workout routine, eventually gaining superhuman strength and speed. Genos, a cyborg, saw Saitama’s capabilities and assigned himself as his student, seeking to gain the strength needed to achieve his goals.",
        "url": "https://readm.today/manga/one-punch-man-200324",
        "chapters": "292"
    },
    {
        "title": "Solo Leveling",
        "poster": "https://readm.today/uploads/chapter_files/cover/tbn/1596230126_198x0.jpg",
        "desc": "Not available",
        "url": "https://readm.today/manga/soIo-IeveIing-220424",
        "chapters": "203"
    },
    {
        "title": "Shingeki no Kyojin",
        "poster": "https://readm.today/uploads/chapter_files/cover/tbn/cover_80_198x0.jpg",
        "desc": "Several hundred years ago, humans were nearly exterminated by giants. Giants are typically several stories tall, seem to have no intelligence, devour human beings and, worst of all, seem to do it for the pleasure rather than as a food source. A small percentage of humanity survived by walling themselves in a city protected by extremely high walls, even taller than the biggest of giants.Flash forward to the present and the city has not seen a giant in over 100 years. Teenage boy Eren and his foster sister Mikasa witness something horrific as the city walls are destroyed by a super giant that appears out of thin air. As the smaller giants flood the city, the two kids watch in horror as their mother is eaten alive. Eren vows that he will murder every single giant and take revenge for all of mankind.Nominated for the 4th Manga Taisho Awards (2011) and winner of the 35th annual Kodansha Manga award for Best Shounen.",
        "url": "https://readm.today/manga/shingeki-no-kyojin-170424",
        "chapters": "145"
    },
    {"chapters": "261", "desc": "Yuuji is a genius at track and field. But he has zero interest running around in circles, he's happy as a clam in the Occult Research Club. Although he's only in the club for kicks, things get serious when a real spirit shows up at school! Life's about to get really strange in Sugisawa Town #3 High School!", "poster": "https://readm.today/uploads/chapter_files/cover/tbn/1703075306_198x0.jpg", "title": "Jujutsu Kaisen", "url": "https://readm.today/manga/jujutsu-kaisen-588420"},

];

  const pop_url = "https://environmental-shina-iniyanv-9010b247.koyeb.app/popular";
  const [pop, setPop] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(pop_url)
      .then((resp) => resp.json())
      .then((json) => setPop(json))
      .finally(() => setLoading(false))
  },[] );
  const renderCard = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Details',
        { title: item.title, poster: item.poster, desc: item.desc, chapters: item.chapters, url: item.url })}>
        <Card key={item.title} poster={item.poster} title={item.title} desc={item.desc} />
      </TouchableOpacity>
    )
  }

  return (
    <ScrollView vertical style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>RECOMMENDED...</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.section}>
          <View style={{width:20}}></View>
          {recommended.map((item, index) =>
            <TouchableOpacity key={item.title} onPress={() => navigation.navigate('Details',
              { title: item.title, poster: item.poster, desc: item.desc, chapters: item.chapters, url: item.url })}>
              <Card key={item.title} poster={item.poster} title={item.title} desc={item.desc} />
            </TouchableOpacity>
          )}
          <View style={{width:220}}></View>
        </ScrollView>

      <View style={styles.container}>
        <Text style={styles.sectionTitle}>POPULAR</Text>
            {console.log(pop)}
        {loading ? (
            <View style={{height:'100%',alignItems:'center',justifyContent:'center'}}>
                <ActivityIndicator size='large' color='red'/>
                <Text>Please wait ...</Text>
            </View>
            ) : (
          <FlatList
            data={pop}
            renderItem={renderCard}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapperStyle}
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

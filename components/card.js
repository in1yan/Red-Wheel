 import react from 'react';
 import {Image, View, Text, StyleSheet} from 'react-native'
 const Card=({poster,title,desc})=>{
          return(
          <View style={styles.comicContainer}>
            <Image
              source={{ uri: poster }}
              style={styles.comicImage}
            />
            <Text style={styles.comicTitle}>{title}</Text>
            <Text style={styles.comicDesc} numberOfLines={2}>{desc}</Text>
          </View>
          )
}
const styles = StyleSheet.create({
    comicImage: {
    width: 150,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius:10,
  },
  comicTitle: {
    fontSize: 17,
    textAlign: 'center',
    color:'#000',
    fontWeight:'bold',
    fontFamily:'Arial'
  },
  comicDesc: {
    fontSize: 15,
    color: '#fff',
  },  
  comicContainer: {
    marginRight: '3%',
    marginLeft:'1%',
    marginBottom:10,
    marginTop:10,
    alignItems: 'center',
    backgroundColor:'red',
    borderRadius:10,
    paddingTop:5,
    paddingBottom:5,
    width:155
  },
})

export default Card;
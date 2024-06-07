import react from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome5'
import Home from './screens/Home.js';
import Details from './screens/Details.js';
import Viewer from './screens/Viewer.js'
import Library from './screens/Library.js'
const Stack = createNativeStackNavigator();

const App =()=>{
    return (
        <NavigationContainer>
            <Stack.Navigator
                                screenOptions={{
                        headerStyle:{
                            backgroundColor:'#fff',
                        }
                    }}
>
                <Stack.Screen 
                    name='Home'
                    component={Home}
                    options={({navigation})=>({
                            headerTitle:()=>(<TitleComponent/>),
                            headerRight:()=><LibraryButton navigation={navigation}/>,
                    })
                }
                    />
                <Stack.Screen 
                    name='Details'
                    component={Details}
                    options = {{
                        title:'Start reading',
                        headerTintColor: '#fff',
                        headerStyle:{
                            backgroundColor:'red',
                            color:'white'
                        }}}
                    />
                <Stack.Screen 
                    name='Viewer'
                    component={Viewer}
                    options={{title:'Start reading',headerShown:true}}
                    />
                <Stack.Screen 
                    name='Library'
                    component={Library}
                    options = {{
                        title:'Library',
                        headerTintColor: '#fff',
                        headerStyle:{
                            backgroundColor:'red',
                            color:'white'
                        }}}
                    />



            </Stack.Navigator>
        </NavigationContainer>
    );
}
const TitleComponent = () =>{
    return (
        <View style={{flexDirection:'row'}}>
            <Text style={{color:'red',fontSize:20,fontWeight:'bold'}}>Red</Text>
            <Text style={{color:'#000',fontSize:20}}> Wheel</Text>
        </View>
        );
}
const LibraryButton=({navigation})=>{
    return (
        <TouchableOpacity style={{backgroundColor:'red',width:40,height:40,alignItems:'center',justifyContent:'center',borderRadius:50}} onPress={()=>navigation.navigate('Library')}>
            <Icon name="book-dead" size={25} color='white'/>
        </TouchableOpacity>
        )
}
export default App;
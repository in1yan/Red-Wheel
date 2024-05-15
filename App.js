import react from 'react';
import {View,Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home.js';
import Details from './screens/Details.js';
import Viewer from './screens/Viewer.js'
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
                    options={
                        {
                            headerTitle:()=>(<TitleComponent/>)
                        }
                    }
                    />
                <Stack.Screen 
                    name='Details'
                    component={Details}
                    options={{title:'Start reading'}}
                    screenOptions={{
                        headerStyle:{
                            backgroundColor:'red',
                        }
                    }}
                    />
                <Stack.Screen 
                    name='Viewer'
                    component={Viewer}
                    options={{title:'Start reading',headerShown:false}}
                    screenOptions={{
                        headerStyle:{
                            backgroundColor:'red',
                        }
                    }}
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
export default App;
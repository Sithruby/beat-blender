import {View,Text,Image,TouchableOpacity,StyleSheet} from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
const logoImg=require("../assets/music.jpg");
export default function WelcomeScreen(){
    const navigation=useNavigation();
    return(
        <SafeAreaView  style={styles.container}>
              <LinearGradient colors={['rgba(0,0,0,0.9)', 'transparent']} style={styles.background} />
            <View>
                <View style={styles.align}>
                <Image  style={styles.logo}source={logoImg}/>
                </View>
                 <Text  style={styles.text1}>
                    The Best Music Collections
                 </Text>
               
            <View >


                    
                    <TouchableOpacity  style={styles.button1} onPress={()=>navigation.navigate('SignUp')}>
                    <Text style={styles.signuptext}>Let's Get Started</Text> 
                    </TouchableOpacity>
                  
                 </View>
                
               
            </View>
        </SafeAreaView>
    )
}
const styles=StyleSheet.create(
    {
        background: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 300,
            
          },
          container: {
            flex:1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgb(165,55,253)',
          },
        align:{
            alignItems:'center',
            margin:'20px',
            
        },
        text1:{
            fontFamily:'cursive',
            color:'#fff',
            fontWeight:'bold',
           fontSize:27,
           },
        
        button1:{
            width:'50%',
            padding:10,
            borderRadius:40,
             borderWidth: 1,
            backgroundColor:'rgba(0,0,255,0.1)',
            alignItems: 'center',
            marginLeft:'25%',
            
        },
        logo: {
          height: 300,
          width: 300,
        
            
        }
    }
);
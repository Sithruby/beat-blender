import * as React from 'react';
import  { useState } from 'react';
import {  TextInput, View, Text, StyleSheet,TouchableOpacity,Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
const logoImg=require("../assets/4.png");


export default function SignUp({props}) {
  const navigation=useNavigation();
  const [username, setUsername] = useState('');
  const[nameVerify,setNameVerify]=useState(false);
  const [email, setEmail] = useState('');
  const[emailVerify,setEmailVerify]=useState(false);
  const [password, setPassword] = useState('');
  const[pwVerify,setPwVerify]=useState(false);


  function handleName(nameVar) {
    setUsername(nameVar);
    if (nameVar.length > 1) {
      setNameVerify(true);
    } else {
      setNameVerify(false);
    }
  }
  function handleEmail(emailVar) {
    setEmail(emailVar);
    if (/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{1,}$/.test(emailVar)) {
      setEmail(emailVar);
      setEmailVerify(true);
    } else {
      setEmailVerify(false);
    }
  }
  return (
    <SafeAreaView  style={styles.container}>
           <LinearGradient
        colors={['rgba(0,0,0,0.9)', 'transparent']}
        style={styles.background}
      />
  
      <View style={styles.logoContainer}>
        <Image  style={styles.logo}source={logoImg}/>
      </View>
    
     
        <Text style={styles.headerText}>Sign Up</Text>
        <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={handleName}
          autoCapitalize="none"
          placeholderTextColor="#fff"
      />
         {username.length > 0 && (
          <Feather
            name={nameVerify ? 'check-circle' : 'x-circle'}
            color={nameVerify ? 'green' : 'rgb(139, 0, 0)'}
            size={20}
            style={styles.icon}
          />
        )}
      </View>
      {username.length <1 ? null: nameVerify ? null:  (
          <Text  style={{marginLeft:20,color:'rgb(149, 0, 0)',}}>
           Name should be more than  1 character </Text>
        )}
        <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={handleEmail}
          autoCapitalize="none"
          placeholderTextColor="#fff"
        />
        {email.length > 0 && (
          <Feather
            name={emailVerify ? 'check-circle' : 'x-circle'}
            color={emailVerify ? 'green' : 'rgb(139, 0, 0)'}
            size={20}
            style={styles.icon}
          />
        )}
      </View>
      {email.length < 1 ? null : !emailVerify && (
        <Text style={{  color: 'rgb(149, 0, 0)' }}>
          Invalid email address
        </Text>
      )}
      <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#fff"
       
      />
      </View>
      <TouchableOpacity style={styles.button} >
                    <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      
     
      <TouchableOpacity>
          <Text style={styles.buttonText} onPress={()=>navigation.navigate('Login')}> already have an account?Login</Text>
      </TouchableOpacity>
     
        
   
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(165,55,253)',
    color:'#ccc',

  },
  logoContainer: {
    padding:20,
    
    justifyContent: 'top',
    alignItems: 'left',
   
},
inputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 15,
  position: 'relative',
},
input: {
  width: 250,
  height: 40,
  color:'#ccc',
  backgroundColor:'rgba(0,0,0,0.1)',
  borderRadius: 15,
  paddingHorizontal: 10,
  paddingRight: 30, // Make space for the icon
},
icon: {
  position: 'absolute',
  right: 10,
},
logo: {
  height: 90,
  width: 90,
    borderRadius:70,
},

  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
    
  },
button:{
  backgroundColor:'rgba(75,0,130,0.6)',
  padding:10,
  borderRadius:15,
  borderColor:'rgb(0,0,0)',
   borderWidth: 1,
},
buttonText:{
  fontFamily:'Cochin',
  color: '#fff',
},
  text: {
    backgroundColor: 'transparent',
    fontSize: 15,
    color: '#fff',
  },
  headerText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bolda',
    marginBottom: 20,
  },
  
});




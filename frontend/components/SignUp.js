import * as React from 'react';
import  { useState } from 'react';
import {  TextInput, View, Text, StyleSheet,TouchableOpacity,Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
const logoImg=require("../assets/4.png");
export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    
  
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image  style={styles.logo}source={logoImg}/>
      </View>
    
      <LinearGradient
        // Background Linear Gradient
        colors={['rgba(0,0,0,0.9)', 'transparent']}
        style={styles.background}
      />
        <Text style={styles.headerText}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
       
      />
      <TouchableOpacity style={styles.button} >
                    <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      
     
      <TouchableOpacity>
          <Text style={styles.buttonText}> already have an account?Login</Text>
      </TouchableOpacity>
     
        
    </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    width:500,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(165,55,253)',
  },
  logoContainer: {
    padding:20,
    
    justifyContent: 'top',
    alignItems: 'left',
   
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
},
  text: {
    backgroundColor: 'transparent',
    fontSize: 15,
    color: '#fff',
  },
  headerText: {
   
    fontSize: 28,
    fontWeight: 'bolda',
    marginBottom: 20,
  },
  input: {
   
    borderRadius:15,
    width:'40%',
   padding: 10,
    marginBottom: 10,
    backgroundColor:'rgba(0,0,0,0.1)',
  },
});




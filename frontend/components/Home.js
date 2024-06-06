import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from 'react';
import { auth,db } from "../firebase.config";
import { collection,getDoc,getDocs,query,where} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
export default function Home() {
  const navigation=useNavigation();
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const currentUser=auth.currentUser
        if(currentUser){
          console.log(currentUser)
          
          const q = query(collection(db, "users"), where("userID", "==", currentUser.uid));
          const querySnapshot=await getDocs(q)
          
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.data().userID, " => ", doc.data());
            setName(doc.data().username)
          });
         
        }
       
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchUserName();
  }, []);

  const handleLogOut = async () => {
		await signOut(auth);
		navigation.navigate('Login');
	};

  return (
    <SafeAreaView>
      <View>
        <Text>
          Hello, {name}
        </Text>
        <TouchableOpacity onPress={handleLogOut}>
          <Text>
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

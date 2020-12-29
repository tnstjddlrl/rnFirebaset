import React,{useEffect} from 'react';
import { View,Text,Alert } from 'react-native';
import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';

const App = ()=>{
  test()
  signin('tnstjd@naver.com','zxcv0903')
  alive()
  return (
    <View>
      <Text>{auth().currentUser.email} 님 안녕하세요</Text>

    </View>
  )
}

function test() {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('새 알림이 도착했어요!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
}
function signup(email,pass){
  auth()
  .createUserWithEmailAndPassword(email, pass)
  .then(() => {
    console.log('User account created & signed in!');
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });
}

function signin(email,pass){
  auth()
  .signInWithEmailAndPassword(email, pass)
  .then(() => {
    console.log('User account signed in!');
  })
}

function alive() {
  useEffect(() => {
    // Assuming user is logged in
    const userId = auth().currentUser.uid;

    const reference = database().ref(`/online/${userId}`);

    // Set the /users/:userId value to true
    reference.set(true).then(() => console.log('Online presence set'));

    // Remove the node whenever the client disconnects
    reference
      .onDisconnect()
      .remove()
      .then(() => console.log('On disconnect function configured.'));
  }, []);
}

export default App;
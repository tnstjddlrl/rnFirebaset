import React,{useEffect} from 'react';
import { View,Text,Alert } from 'react-native';
import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';

const App = ()=>{
  test()
  return (
    <View>
      <Text>님 안녕하세요</Text>

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

export default App;
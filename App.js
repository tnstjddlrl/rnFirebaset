import React,{useEffect} from 'react';
import { View,Text } from 'react-native';
import database from '@react-native-firebase/database';

const App = ()=>{
  // database()
  // .ref('/users/1234')
  // .set({
  //   name: '권순순',
  //   age: 23,
  // })
  // .then(() => console.log('Data set.'));

  // var result;
  // var reference = database()
  // .ref('/users/123')
  // .once('value')
  // .then(snapshot => {
  //   result = String(snapshot.val())
  //   console.log(snapshot.val())
  // });
  // console.log('레퍼런스',reference);
  // console.log('리절트',result);
  // // reference = JSON.stringify(reference)
  // // reference = JSON.parse(reference) 

  // var reference = database()
  // .ref('/users/123').once('value')
  // .then(snapshot=>{
    
  // })

  // console.log('레퍼런스',reference);

  // database()
  // .ref('/users/123')
  // .on('value', snapshot => {
  //   result = snapshot.val()
  // });
  // console.log('리절트',result);

  // const scores = database()
  // .ref('/users/123')
  // .orderByValue()
  // .once('value');

  // database()
  // .ref('/users/123')
  // .update({
  //   age: 32,
  // })
  // .then(() => console.log('Data updated.'));

  User(123);
  var test = data('/users/123')
  console.log(test)
  return (
    <View>
      <Text> 님 안녕하세요</Text>

    </View>
  )
}

function User({ userId }) {
  useEffect(() => {
    const onValueChange = database()
      .ref(`/users/${userId}`)
      .on('value', snapshot => {
        console.log('User data: ', snapshot.val());
      });

    // Stop listening for updates when no longer required
    return () =>
      database()
        .ref(`/users/${userId}`)
        .off('value', onValueChange);
  }, [userId]);
}

async function data(params) {
  const ref = database().ref();
  let data = await (await fetch(ref + params + '.json')).json();
  console.log(data)
  return data;
}

export default App;
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';

import Index from './index';


const Start = () => {
  const [ready, setReady] = useState(false);
  const [name, setName] = useState('');


  return !ready ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        style={{ marginBottom: 10, width: '80%', height: 40, borderWidth: 0.7, borderColor: '#ddd' }}
        placeholder='Digite seu nome'
        onChangeText={text => setName(text)}
        value={name}
      />
      <TouchableOpacity
        disabled={name.length > 1 ? false : true}
        onPress={() => setReady(true)}
        style={{ alignItems: 'center', justifyContent: 'center', width: '80%', padding: 10, backgroundColor: 'green' }}
      >
        <Text style={{ color: '#fff' }}>Entrar</Text>
      </TouchableOpacity>
    </View>
  ) : <Index username={name} />
}

export default Start;
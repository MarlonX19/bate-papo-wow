import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import Index from './src/index';
import Start from './src/Start';

const App = () => {
  const [ready, setReady] = useState(false);
  const [name, setName] = useState('');

  return <Start />
}

export default App;

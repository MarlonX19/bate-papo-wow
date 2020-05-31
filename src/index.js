import React, { useState, useEffect, useMemo } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert
} from 'react-native';
import io from 'socket.io-client';


const Index = ({ username }) => {
  const [value, setValue] = useState('');
  const [num, setNum] = useState(0);
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);


  useEffect(() => {
    let skt = io('http://192.168.15.13:3000/')
    setSocket(skt);

  }, [])

  useEffect(() => {
    if (socket) {
      socket.on('msg', (data, name) => {
        let temp = messages;
        temp.push({ msg: data, name: name })
        setMessages([...temp])

      })

      socket.on('connected', data => {
        setNum(String(data))
      })

      socket.on('disconnect', data => {
        setNum(String(data))
      })

      socket.on('types', () => {
        setTyping(true)
      })

      socket.on('blur', () => {
        setTyping(false)
      })
    }


  }, [socket])

  useEffect(() => {
    console.log('messages')
    console.log(messages)
  }, [messages])


  function handleSend() {
    socket.emit('msg', value, username)
    setValue('');
  }

  function handleTyping() {
    socket.emit('types')
  }

  function handleBlur() {
    socket.emit('blur')
  }


  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView
          ref={ref => scrollView = ref}
          onContentSizeChange={() => scrollView.scrollToEnd({ animated: true })}>
          {messages?.map((msg, index) => <Text style={{ padding: 10, fontSize: 24, backgroundColor: index % 2 ? '#ddd' : '#fff' }} key={msg.name} >{msg.name} diz: {msg.msg}</Text>)}
        </ScrollView>
        {typing ? <Text style={{ color: 'grey', fontSize: 18 }}>Usuário digitando...</Text> : <View></View>}
        <Text style={{ alignSelf: 'flex-end', paddingRight: 20}}>{num} usuários online</Text>
        <View style={styles.bottomView}>
          <TextInput
            onFocus={() => handleTyping()}
            onBlur={() => handleBlur()}
            style={styles.txtInput}
            placeholder='Digite algo...'
            onChangeText={text => setValue(text)}
            value={value}

          />
          <TouchableOpacity
            onPress={() => handleSend()}
            style={styles.btn}
          >
            <Text style={styles.btnTxt}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  bottomView: {
    flexDirection: "row",
    padding: 5,
    marginBottom: 20
  },

  txtInput: {
    flex: 3,
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    padding: 10,
  },

  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green'
  },

  btnTxt: {
    color: '#fff'
  }
});

export default Index;

import io from 'socket.io-client';
import feathers from '@feathersjs/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const socket = io('http://10.0.2.2:3031');
// const client = feathers();

// client.configure(feathers.socketio(socket));
// client.configure(feathers.authentication({
//   storage: AsyncStorage
// }));


export const getClient = (endpoint) => {

  const socket = io(endpoint);
  const client = feathers();
  
  client.configure(feathers.socketio(socket));
  client.configure(feathers.authentication({
    storage: AsyncStorage
  }));

    return client;

};

//export default client;
import React, { useState } from 'react';
import { Image, Alert, Pressable, Dimensions } from 'react-native';
import { Layout, Input, Button, Icon, StyleService, useStyleSheet } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import users from '../../assets/data/users';

const { width, height } = Dimensions.get('window');

const MailIcon = (props) => <Icon {...props} name='email-outline' />;
const LockIcon = (props) => <Icon {...props} name='lock-outline' />;
const EyeIcon = (props) => <Icon {...props} name='eye-outline' />;
const EyeOffIcon = (props) => <Icon {...props} name='eye-off-outline' />;

const LoginScreen = ({ onLogin }) => {
  const styles = useStyleSheet(themedStyles);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleLogin = async () => {
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      try {
        await AsyncStorage.setItem('isLoggedIn', 'true');
        await AsyncStorage.setItem('user', JSON.stringify(user));
        onLogin();
        Alert.alert('Login Success', `Welcome, ${user.nama}!`);
      } catch (error) {
        console.error(error);
      }
    } else {
      Alert.alert('Login Failed', 'Invalid email or password.');
    }
  };

  return (
    <Layout style={styles.container}>
      <Image source={require('../../assets/images/logo/logo.png')} style={styles.logo} />
      <Input
        style={styles.input}
        placeholder='E-Mail'
        accessoryLeft={MailIcon}
        value={email}
        onChangeText={setEmail}
      />
      <Input
        style={styles.input}
        placeholder='Password'
        accessoryLeft={LockIcon}
        accessoryRight={(props) => (
          <Pressable onPress={() => setSecureTextEntry(!secureTextEntry)}>
            {secureTextEntry ? <EyeOffIcon {...props} /> : <EyeIcon {...props} />}
          </Pressable>
        )}
        secureTextEntry={secureTextEntry}
        value={password}
        onChangeText={setPassword}
      />
      <Button style={styles.button} onPress={handleLogin}>
        Masuk
      </Button>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
  },
  logo: {
    width: width * 0.75,
    height: height * 0.3,
    resizeMode: 'contain',
    marginBottom: height * 0.05,
  },
  input: {
    marginBottom: height * 0.02,
    width: '100%',
  },
  button: {
    backgroundColor: 'background-basic-color-4',
    borderColor: 'background-basic-color-4',
    width: '100%',
  },
});

export default LoginScreen;

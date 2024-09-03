import React, { useState, useEffect } from 'react';
import { Image, Alert, Pressable, Dimensions } from 'react-native';
import { Text,Input, Layout, Button, Icon, StyleService, useStyleSheet } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://66d28529184dce1713cdbda8.mockapi.io/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

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
      <Image source={require('../../assets/images/logo/logo-header.png')} style={styles.logo} />
      <Text category="h6" style={styles.logoText}>JC CORPORATED</Text>
      
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
    width: width * 0.65,
    height: height * 0.3,
    resizeMode: 'contain',
  },
  logoText: {
    marginBottom: height * 0.05,
  },
  input: {
    marginBottom: height * 0.02,
    width: '100%',
    fontSize: width * 0.04,
    backgroundColor: 'background-card-color',
    borderColor: 'border-input-color',
    color: 'text-primary-color',
  },
  button: {
    backgroundColor: 'background-basic-color-4',
    borderColor: 'background-basic-color-4',
    width: '100%',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
});

export default LoginScreen;

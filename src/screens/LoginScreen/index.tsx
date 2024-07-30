import React, { useState } from 'react';
import { Image, Alert, TouchableOpacity } from 'react-native';
import { Layout, Input, Button, Icon, StyleService, useStyleSheet } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import users from '../../assets/data/users';

const MailIcon = (props) => (
  <Icon {...props} name='email-outline' />
);

const LockIcon = (props) => (
  <Icon {...props} name='lock-outline' />
);

const EyeIcon = (props) => (
  <Icon {...props} name='eye-outline' />
);

const EyeOffIcon = (props) => (
  <Icon {...props} name='eye-off-outline' />
);

const LoginScreen = ({ onLogin }) => {
  const styles = useStyleSheet(themedStyles);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const navigation = useNavigation();

  const handleLogin = () => {
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      onLogin();
      Alert.alert('Login Success', `Welcome, ${user.nama}!`);
    } else {
      Alert.alert('Login Failed', 'Invalid email or password.');
    }
  };

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
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
        accessoryRight={() => (
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
            {secureTextEntry ? <EyeOffIcon style={styles.icon} /> : <EyeIcon style={styles.icon} />}
          </TouchableOpacity>
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
    paddingHorizontal: 16,
  },
  logo: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  input: {
    marginBottom: 16,
    width: '100%',
  },
  button: {
    width: '100%',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
  },
  icon: {
    color: 'color-basic-600',
    width: 24,
    height: 24,
  },
});

export default LoginScreen;

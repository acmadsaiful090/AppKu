import React, { useState, useEffect } from 'react';
import { View, Dimensions, Image, Modal, Alert, Pressable } from 'react-native';
import { Input, Layout, Text, Button, StyleService, useStyleSheet, Icon, useTheme } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const EyeIcon = (props) => <Icon {...props} name='eye-outline' />;
const EyeOffIcon = (props) => <Icon {...props} name='eye-off-outline' />;

const ProfileDetail = () => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [passwords, setPasswords] = useState({ old: '', new: '', confirm: '' });
  const [passwordVisibility, setPasswordVisibility] = useState({ old: true, new: true, confirm: true });
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) setUser(JSON.parse(userData));
    };
    fetchUserData();
  }, []);

  const handleChangePassword = async () => {
    const { old, new: newPassword, confirm } = passwords;

    if (newPassword !== confirm) {
      return Alert.alert('Error', 'New password and confirmation do not match.');
    }

    if (old !== user.password) {
      return Alert.alert('Error', 'Old password is incorrect.');
    }

    try {
      const response = await fetch(`https://66d28529184dce1713cdbda8.mockapi.io/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword }),
      });

      if (!response.ok) throw new Error('Failed to update password on server.');

      const updatedUser = { ...user, password: newPassword };
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setModalVisible(false);
      Alert.alert('Success', 'Password changed successfully.');
    } catch (error) {
      Alert.alert('Error', 'Failed to change password.');
    }
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const renderUserInfo = (label, value) => (
    <View style={styles.card}>
      <Text style={styles.info}>{`${label}: ${value}`}</Text>
    </View>
  );

  return (
    <Layout style={styles.container}>
      <View style={styles.header}>
        <Button
          appearance='ghost'
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          accessoryLeft={(props) => <Icon {...props} name='arrow-back' />}
          textStyle={{ color: 'white' }}
        >
          Back
        </Button>
        <Text category='h6' style={styles.title}>Profile</Text>
      </View>
      <View style={styles.profileContainer}>
        <Text category='h5' style={styles.name}>{user?.nama}</Text>
        <Image
          style={styles.profileImage}
          source={{ uri: 'https://t3.ftcdn.net/jpg/03/02/88/46/240_F_302884605_actpipOdPOQHDTnFtp4zg4RtlWzhOASp.jpg' }}
        />
        <Text style={styles.info}>Jabatan: {user?.role}</Text>

        {renderUserInfo('Tanggal Lahir', user?.tanggal_lahir)}
        {renderUserInfo('Alamat', user?.address)}
        {renderUserInfo('Email', user?.email)}
        {renderUserInfo('Agama', user?.agama)}
        {renderUserInfo('Jenis Kelamin', user?.jenis_kelamin)}

        <View style={styles.card}>
          <Pressable style={styles.passwordButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.passwordButtonText}>Ganti Password</Text>
            <Icon name='sync-outline' fill={theme['text-primary-color']} style={styles.syncIcon} />
          </Pressable>
        </View>
      </View>

   <Modal visible={modalVisible} transparent animationType="slide">
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text category='h6' style={styles.modalTitle}>Ganti Password</Text>
      {['old', 'new', 'confirm'].map((field) => (
        <Input
          key={field}
          label={field === 'old' ? 'Old Password' : field === 'new' ? 'New Password' : 'Confirm New Password'}
          value={passwords[field]}
          secureTextEntry={passwordVisibility[field]} 
          onChangeText={(text) => setPasswords((prev) => ({ ...prev, [field]: text }))}
          style={styles.input}
          accessoryRight={(props) => (
            <Pressable onPress={() => togglePasswordVisibility(field)}>
              {passwordVisibility[field] ? <EyeOffIcon {...props} /> : <EyeIcon {...props} />}
            </Pressable>
          )}
        />
      ))}
      <View style={styles.buttonContainer}>
        <Button
          style={styles.cancelButton}
          onPress={() => setModalVisible(false)}
          textStyle={{ color: 'white' }}
        >
          Back
        </Button>
        <Button style={styles.saveButton} onPress={handleChangePassword}>
          Simpan
        </Button>
      </View>
    </View>
  </View>
</Modal>

    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: '$background-header-color',
  },
  header: {
    paddingHorizontal: screenWidth * 0.02,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'background-header-color',
    position: 'relative',
  },
  title: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -10 }],
    textAlign: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 0,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: screenHeight * 0.02,
  },
  profileImage: {
    width: screenWidth * 0.3,
    height: screenWidth * 0.3,
    borderRadius: screenWidth * 0.15,
    marginBottom: screenHeight * 0.03,
  },
  card: {
    marginBottom: screenHeight * 0.02,
    width: screenWidth * 0.9,
    padding: screenHeight * 0.02,
    borderRadius: screenWidth * 0.05,
    backgroundColor: 'background-card-color',
    borderWidth: 1,
    borderColor: 'border-input-color',
  },
  name: {
    fontWeight: 'bold',
    marginBottom: screenHeight * 0.01,
  },
  info: {
    fontSize: 16,
    marginBottom: screenHeight * 0.01,
  },
  passwordButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  syncIcon: {
    alignSelf: 'right',
    marginRight: screenWidth * 0.02,
    width: 20,
    height: 20,
  },
  passwordButtonText: {
    color: 'text-primary-color',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: screenWidth * 0.8,
    padding: screenHeight * 0.02,
    backgroundColor: 'background-basic-color-1',
    borderRadius: screenWidth * 0.05,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: screenHeight * 0.02,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: screenHeight * 0.0,
  },
  input: {
    height: screenHeight * 0.06,
    marginBottom: screenHeight * 0.04,
    width: '100%',
    fontSize: screenWidth * 0.04,
    backgroundColor: 'background-card-color',
    borderColor: 'border-input-color',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: 'red',
    marginRight: screenWidth * 0.05,
  },
  saveButton: {
    backgroundColor: 'color-primary-default',
  },
});

export default ProfileDetail;

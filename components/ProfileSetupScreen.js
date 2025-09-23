import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Image, StatusBar, Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ProfileSetupScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Required",
        "We need access to your media library to choose an avatar."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleContinue = () => {
    if (!username) {
      Alert.alert("Username Required", "Please enter a username to continue.");
      return;
    }

    navigation.navigate('Preview', { username, avatar });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Text style={styles.title}>Set Your Identity</Text>
      <Text style={styles.subtitle}>Let silence speak through your name and face</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#666"
        value={username}
        onChangeText={setUsername}
      />

      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <Text style={styles.uploadText}>Choose Avatar</Text>
      </TouchableOpacity>

      {avatar && (
        <Image source={{ uri: avatar }} style={styles.avatarPreview} />
      )}

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#111',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: '#0ff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  uploadText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  avatarPreview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#0ff',
    padding: 12,
    borderRadius: 8,
  },
  continueText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ProfileSetupScreen;
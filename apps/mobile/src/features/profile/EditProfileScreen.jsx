import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
// src/features/profile/ -> src/shared/ is 2 levels up.
import { apiRequest } from '../../shared/api';
import styles from './EditProfileScreen.styles';

// Same Cloudinary approach used in AddNewItemScreen — there's no dedicated
// upload endpoint, and PUT /profile's "avatar" field expects a real URL
// string, not a file. Swap this for your team's real image host if
// different from AddNewItemScreen's.
const CLOUDINARY_CLOUD_NAME = 'pcan1aet';
const CLOUDINARY_UPLOAD_PRESET = 'profile_avatars_uploads';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const userDataFromRoute = route.params?.userData || {};

  const [saving, setSaving] = useState(false);
  const [profileImage, setProfileImage] = useState(userDataFromRoute?.avatar || null);
  const [imageChanged, setImageChanged] = useState(false);
  const [formData, setFormData] = useState({
    fullName: userDataFromRoute.name || '',
    email: userDataFromRoute.email || '',
    phoneNumber: userDataFromRoute.phone || '',
    bio: userDataFromRoute.bio || '',
  });

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to upload a photo.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
        setImageChanged(true);
      }
    } catch (error) {
      console.log('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  // Uploads the picked image to Cloudinary and returns the hosted URL.
  const uploadImageToCloudinary = async (uri) => {
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];

    const form = new FormData();
    form.append('file', {
      uri,
      name: `avatar.${fileType}`,
      type: `image/${fileType}`,
    });
    form.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: 'POST', body: form }
    );
    const data = await res.json();

    if (!res.ok || !data.secure_url) {
      throw new Error(data.error?.message || 'Image upload failed');
    }

    return data.secure_url;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!formData.fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }
    if (!formData.email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    if (!formData.phoneNumber.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }

    try {
      setSaving(true);

      // Only upload if the user actually picked a new local image — no
      // point re-uploading an existing remote URL.
      let avatarUrl = profileImage;
      if (imageChanged && profileImage && !profileImage.startsWith('http')) {
        avatarUrl = await uploadImageToCloudinary(profileImage);
      }

      // Confirmed schema: PUT /profile body ->
      // { name, phone, bio, avatar, location: { lat, lng } }
      const response = await apiRequest('/profile', {
        method: 'PUT',
        data: {
          name: formData.fullName,
          phone: formData.phoneNumber,
          bio: formData.bio,
          avatar: avatarUrl || '',
          // NOTE: this screen doesn't collect lat/lng, so we're not sending
          // "location" — omit it unless your backend requires the field on
          // every PUT (in which case send the previously-saved location).
        },
      });

      const updatedUser = response?.user || {};
      const updatedUserData = {
        name: updatedUser.name ?? formData.fullName,
        email: updatedUser.email ?? formData.email,
        phone: updatedUser.phone ?? formData.phoneNumber,
        bio: updatedUser.bio ?? formData.bio,
        avatar: updatedUser.avatar ?? avatarUrl ?? '',
      };
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));

      Alert.alert('Success', 'Profile updated successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.log('Error updating profile:', error);
      Alert.alert('Error', error.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return '?';
    const nameParts = name.split(' ');
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={24} color="#1C1C1E" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <View style={styles.headerPlaceholder} />
        </View>

        {/* Profile Picture Section */}
        <View style={styles.profilePictureContainer}>
          <TouchableOpacity
            style={styles.avatarWrapper}
            onPress={pickImage}
            activeOpacity={0.8}
          >
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.avatar}
              />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarPlaceholderText}>
                  {getInitials(formData.fullName)}
                </Text>
              </View>
            )}
            <View style={styles.editIconContainer}>
              <Feather name="edit-2" size={14} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
          <Text style={styles.changePhotoText}>Change Profile Photo</Text>
        </View>

        {/* Edit Form Card */}
        <View style={styles.formCard}>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>FULL NAME</Text>
            <TextInput
              style={styles.formInput}
              value={formData.fullName}
              onChangeText={(text) => handleChange('fullName', text)}
              placeholder="Enter your full name"
              placeholderTextColor="#C7C7CC"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>EMAIL</Text>
            <TextInput
              style={styles.formInput}
              value={formData.email}
              onChangeText={(text) => handleChange('email', text)}
              placeholder="Enter your email"
              placeholderTextColor="#C7C7CC"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>PHONE NUMBER</Text>
            <TextInput
              style={styles.formInput}
              value={formData.phoneNumber}
              onChangeText={(text) => handleChange('phoneNumber', text)}
              placeholder="Enter your phone number"
              placeholderTextColor="#C7C7CC"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>BIO</Text>
            <TextInput
              style={[styles.formInput, styles.bioInput]}
              value={formData.bio}
              onChangeText={(text) => handleChange('bio', text)}
              placeholder="Enter your bio"
              placeholderTextColor="#C7C7CC"
              multiline={true}
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.saveButton, saving && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.saveButtonText}>SAVE</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
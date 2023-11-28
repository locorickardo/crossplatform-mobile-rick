import React, { useState } from 'react';
import { Input, Button } from '@rneui/themed';
import { useUpdateUserMutation, useDeleteUserMutation, useCreateUserMutation } from '../../store/api/usersApi';
import { Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

export const UserForm = ({ navigation, route }) => {
  const { user } = route.params;
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const toast = useToast();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [createUser] = useCreateUserMutation();

  // Function to delete a user
  const handleDelete = () => {
    deleteUser({ id: user.id })
      .then(() => {
        toast.show(`User ${firstName} ${lastName} deleted successfully`, {
          type: 'success',
          placement: 'top',
          duration: 4000,
          animationType: 'slide-in',
        });
        navigation.navigate('UserList');
      })
      .catch((error) => {
        toast.show(error.message, { type: 'danger' });
      });
  };

  // Function to update a user
  const handleUpdate = () => {
    updateUser({
      user: {
        id: user.id,
        firstName,
        lastName,
      },
    })
      .then(() => {
        navigation.navigate('UserList');
        toast.show(`User ${firstName} ${lastName} updated successfully!`, {
          type: 'success',
          placement: 'top',
          duration: 4000,
          animationType: 'slide-in',
        });
      })
      .catch((error) => {
        toast.show(error.message, { type: 'danger' });
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.parentContainer}>
        <View style={styles.container}>
          <Text>Edit user details</Text>
          <Input
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            placeholder="First name"
          />
          <Input
            value={lastName}
            onChangeText={(text) => setLastName(text)}
            placeholder="Last name"
          />
          <Button title="Update" onPress={handleUpdate} />
          <Button title="Delete" onPress={handleDelete} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 16,
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
});

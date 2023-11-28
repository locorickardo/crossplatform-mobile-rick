import React, { useState } from 'react';
import { ListItem } from "@rneui/themed";
import { View, Text, FlatList, RefreshControl } from "react-native";
import { useToast } from 'react-native-toast-notifications';
import { Toast } from 'react-native-toast-notifications';
import { Modal, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native';
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
} from "../../store/api/usersApi";

const UserList = ({ navigation }) => {
  const { data, isLoading, refetch } = useGetUsersQuery({});
  const [createUser] = useCreateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // To control the modal visibility

  const handleDelete = (id) => {
    deleteUser({ id })
      .then(() => {
        Toast.show(`User ${id.firstName} ${id.lastName} deleted successfully`, {
          type: 'success',
          placement: 'top',
          duration: 4000,
          animationType: 'slide-in',
        });
        navigation.navigate('UserList');
      })
      .catch((error) => {
        Toast.show(error.message, { type: 'danger' });
      });
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  // Function to create a user
  const handleCreate = () => {
    createUser({ user: { firstName: newFirstName, lastName: newLastName } })
      .then(() => {
        setIsCreating(false);
        setNewFirstName('');
        setNewLastName('');
        refetch(); // Refresh the list after user creation
        toggleModal(); // Close the modal after creation
      })
      .then(() => {
        navigation.navigate('UserList');
        Toast.show(`User ${newFirstName} ${newLastName} created successfully!`, {
          type: 'success',
          placement: 'top',
          duration: 4000,
          animationType: 'slide-in',
        });
      })
      .catch((error) => {
        Toast.show(error.message, { type: 'danger' });
      });
  };

  return (
    <View>
      {/* Button to toggle the modal */}
      <Button title="Create" onPress={toggleModal} />

      {/* Modal for creating a new user */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          toggleModal(); // Close the modal when requested
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Enter First Name</Text>
            <TextInput
              value={newFirstName}
              onChangeText={(text) => setNewFirstName(text)}
              placeholder="First name"
            />
            <Text>Enter Last Name</Text>
            <TextInput
              value={newLastName}
              onChangeText={(text) => setNewLastName(text)}
              placeholder="Last name"
            />
            <Button title="Create" onPress={handleCreate} />
            <Button title="Cancel" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16 }}>

      </View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={data}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }
          renderItem={({ item }) => (
            <ListItem
              key={item.id}
              onPress={() => {
                navigation.navigate("UserInfo", { user: item });
              }}
            >
              <ListItem.Content>
                <ListItem.Title>{`${item.firstName} ${item.lastName}`}</ListItem.Title>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Button
                    title="Edit"
                    onPress={() => {
                      navigation.navigate("UserForm", { user: item });
                    }}
                  />
                  <Button
                    title="Delete"
                    onPress={() => handleDelete(item.id)}
                  />
                </View>
              </ListItem.Content>
            </ListItem>
          )}
        />
      )}
    </View>
  );
};

export default UserList;


function createUser(arg0: { user: { firstName: any; lastName: any; }; }) {
  throw new Error('Function not implemented.');
}

// Styles for the modal
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
import React from 'react';
import { Input, Button } from "@rneui/themed";
import { useRef, useState } from "react";
import { useUpdateUserMutation } from "../../store/api/usersApi";
import { useTranslation } from "react-i18next";
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useToast } from "react-native-toast-notifications";
import { useDeleteUserMutation } from '../../store/api/usersApi';

import { useCreateUserMutation } from "../../store/api/usersApi";

export const UserForm = ({ navigation, route }) => {
  const { user } = route.params; // Fetch user data passed from navigation
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [deleteUser] = useDeleteUserMutation(); // Use the deleteUser mutation
  const [updateUser, { isLoading }] = useCreateUserMutation(); // Fixed the function name
  const toast = useToast();

  const handleDelete = () => {
    deleteUser({ id: user.id }) // Assuming the API accepts an object with an 'id' field for deletion
      .then(() => {
        toast.show(`User ${firstName} ${lastName} deleted successfully`, {
          type: "success",
          placement: "top",
          duration: 4000,
          animationType: "slide-in",
        });
        navigation.navigate("UserList");
      })
      .catch((error) => {
        toast.show(error.message, { type: "danger" });
      });
  };

  const handleSubmit = () => {
    if (user.id) {
      updateUser({
        id: user.id,
        user: {
          firstName,
          lastName,
        },
      })

        .then(() => {
          navigation.navigate("UserList");
          toast.show(`User ${firstName} ${lastName} updated successfully!`, {
            type: "success",
            placement: "top",
            duration: 4000,
            animationType: "slide-in",
          });
          navigation.navigate("UserList");
        })
        .catch((error) => {
          toast.show(error, { type: "danger" });
        });
    } else {
      useCreateUserMutation({

      })
    }

    if (firstName === "" || lastName === "") {
      // show toast, must fill all inputs
      console.log("Invalid form!");
      toast.show("Please fill out all inputs", {
        type: "warning",
        placement: "top",
        duration: 4000,
        animationType: "slide-in",
      });
      return;
    }

    updateUser({
      user: {
        firstName,
        lastName,
      },
    })
      .then(() => {
        navigation.navigate("UserList");
        toast.show(`Användaren ${firstName} ${lastName} har skapats!`, {
          type: "success",
          placement: "top",
          duration: 4000,
          animationType: "slide-in",
        });
        setFirstName("");
        setLastName("");
      })
      .catch((error) => {
        toast.show(error, { type: "danger" });
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
            {/* Add buttons for Update and Delete */}
            <Button
              title="Update"
              disabled={isLoading}
              onPress={() => updateUser({
                id: user.id,
                user: {
                  firstName,
                  lastName,
                },
              })}
            />
            <Button
              title="Delete"
              disabled={isLoading}
              onPress={() => handleDelete()}
            />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.parentContainer}>
        <View style={styles.container}>
          <Text>Create your user</Text>
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
          <Button
            title={("createUser")}
            disabled={isLoading}
            loading={isLoading}
            onPress={() => handleSubmit()}
          />
          <Button
            title={("Delete")}
            disabled={isLoading}
            loading={isLoading}
            onPress={() => handleSubmit()}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: "white",
    // margin: 36,
    // marginTop: 84,
    // border: 1px solid black
    borderColor: "#eee",
    borderWidth: 1,
    borderRadius: 16,
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
});
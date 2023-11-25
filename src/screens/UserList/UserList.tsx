import React from 'react';
import { ListItem } from "@rneui/themed";
import { View, Text, FlatList, RefreshControl } from "react-native";
import { Button } from 'react-native';

import { useGetUsersQuery } from "../../store/api/usersApi";

const UserList = ({ navigation }) => {
  const { data, isLoading, refetch } = useGetUsersQuery({});
  return (
    <View>
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
                <Button
                  title="Edit"
                  onPress={() => {
                    // Logic to handle edit action, e.g., navigate to edit screen
                    // Pass the user ID or necessary details to the edit screen
                    navigation.navigate("UserForm", { user: item });
                  }}
                />
              </ListItem.Content>
            </ListItem>
          )}
        />
      )}
    </View>
  );
};

export default UserList;

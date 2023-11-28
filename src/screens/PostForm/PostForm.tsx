import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button } from "react-native";
import { useSelector } from "react-redux";
import { useCreatePostMutation } from "../../store/api/postsApi";
import { RootState } from "../../store/store";

const PostForm = ({ navigation }) => {
  const [createPost, { isLoading }] = useCreatePostMutation();
  const userOnline = useSelector((state: RootState) => state.auth.loggedInAs);
  const [text, setText] = useState("");

  const onSubmit = async () => {
    const createdDate = new Date().toLocaleDateString();
    const userName = `${userOnline.firstName} ${userOnline.lastName}`;

    createPost({
      post: {
        text,
        createdDate,
        userName,
      },
    });
    navigation.navigate("PostList");
};

return (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Enter post text"
      onChangeText={(text) => setText(text)}
      value={text}
    />
    <Button title="Submit" onPress={onSubmit} disabled={isLoading} />
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 20,
    padding: 10,
  },
});

export default PostForm;
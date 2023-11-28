import React from "react";
import { View, StyleSheet, Text, FlatList, Button } from "react-native";

import { useGetPostsQuery, useDeletePostMutation } from "../../store/api/postsApi";

const PostList = ({ navigation }) => {
    const { data, isFetching } = useGetPostsQuery({});
    const [deletePost, { isLoading }] = useDeletePostMutation();
    
    const handleDelete = (id) => {
        deletePost( id );
    };

    const showItem = ({item}) => {
        return (
            <View style={styles.post}>
                <Text style={styles.postText}>{item.text}</Text>
                <Text style={styles.postDate}>{item.createdDate}</Text>
                <Text style={styles.postAuthor}>{item.userName}</Text>
                <Button
                    title="Delete"
                    onPress={() => handleDelete(item.id)}
                />
            </View>
        )
    };
    
    return (
        <View style={styles.container}>
        {isFetching ? (
            <Text>Loading...</Text>
        ) : (
            <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.post}>
                <Text style={styles.postText}>{item.text}</Text>
                <Text style={styles.postDate}>{item.createdDate}</Text>
                <Text style={styles.postAuthor}>{item.userName}</Text>
                <Button
                    title="Delete"
                    onPress={() => handleDelete(item.id)}
                    disabled={isLoading}
                />
                </View>
            )}
            />
        )}
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
    post: {
        marginBottom: 30,
    },
    postText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    postDate: {
        fontSize: 12,
        color: "gray",
    },
    postAuthor: {
        fontSize: 12,
        color: "gray",
    },
});

export default PostList;
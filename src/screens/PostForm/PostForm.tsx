import React from 'react';
import {
    useCreatePostMutation,
    useGetPostsQuery,
    useDeletePostMutation,
    useUpdatePostMutation,
} from '../../store/api/postsApi';
  
  // Example usage in a component or function
  const MyComponent = () => {
    const { data: posts, isLoading, isError } = useGetPostsQuery(undefined, {});
    const [createPost] = useCreatePostMutation();
    const [deletePost] = useDeletePostMutation();
    const [updatePost] = useUpdatePostMutation();

    // Use these functions as needed in your application logic
    const handleCreatePost = (newPostData) => {
        createPost({ post: newPostData })
            .then((response) => {
                // Handle successful creation
            })
            .catch((error) => {
                // Handle error
            });
    };
  
    const handleDeletePost = (postId) => {
      deletePost(postId)
        .then((response) => {
          // Handle successful deletion
        })
        .catch((error) => {
          // Handle error
        });
    };
  
    const handleUpdatePost = (postId, updatedPostData) => {
      updatePost({ post: { id: postId, ...updatedPostData } })
        .then((response) => {
          // Handle successful update
        })
        .catch((error) => {
          // Handle error
        });
    };
  
    // Render the component using the fetched posts data, isLoading, isError, etc.
  };
  
  const PostForm = () => {
    return <PostForm />;
  }

  export default PostForm;
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  addDoc,
  doc,
  deleteDoc,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../../firebase-config";

const firebaseBaseQuery = async ({ baseUrl, url, method, body }) => {
  switch (method) {
    case "GET": {
      const snapshot = await getDocs(collection(db, url));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return { data };
    }

    case "POST": {
      const docRef = await addDoc(collection(db, url), body);
      return { data: { id: docRef.id, ...body } };
    }

    case "DELETE": {
      const docRef = doc(db, `${url}/${body.id}`); // Get reference to the document
      await deleteDoc(docRef); // Delete the document
      return { data: { id: body.id } };
    }

    case "PUT": {
      await updateDoc(doc(db, url, body.id), body);
      return { data: { ...body } };
    }

    default:
      throw new Error(`Unhandled method ${method}`);
  }
};

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: firebaseBaseQuery,
  tagTypes: ["posts"],
  endpoints: (builder) => ({
    // To create a new post.
    createPost: builder.mutation({
      query: ({ post }) => ({
        baseUrl: "",
        url: "posts", // Adjust the URL as per your database structure
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["posts"],
    }),
    // To get all existing posts.
    getPosts: builder.query({
      query: () => ({
        baseUrl: "",
        url: "posts", // Adjust the URL as per your database structure
        method: "GET",
        body: "",
      }),
      providesTags: ["posts"],
    }),
    // To delete a post based on its ID.
    deletePost: builder.mutation({
      query: (id) => ({
        baseUrl: "",
        url: "posts", // Adjust the URL as per your database structure
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["posts"],
    }),
    // To update a post.
    updatePost: builder.mutation({
      query: ({ post }) => ({
        baseUrl: "",
        url: "posts", // Adjust the URL as per your database structure
        method: "PUT",
        body: post,
      }),
      invalidatesTags: ["posts"],
    }),
  }),
});

// Export Queries and Mutations.
export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
} = postsApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Contact } from "../models/contact.model";

// Define a service using a base URL and expected endpoints
export const contactsApi = createApi({
  reducerPath: "contactsApi",
  tagTypes: ["Contact"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3006/" }),
  endpoints: (builder) => ({
    getContacts: builder.query<Contact[], void>({
      query: () => "/contacts",
      providesTags: ["Contact"],
    }),
    getContact: builder.query<Contact, string>({
      query: (id) => `/contacts/${id}`,
      providesTags: ["Contact"],
    }),
    addContact: builder.mutation<void, Contact>({
      query: (contact) => ({
        url: "/contacts/",
        method: "POST",
        body: contact,
      }),
      invalidatesTags: ["Contact"],
    }),
    updateContact: builder.mutation<void, Contact>({
      query: ({ id, ...rest }) => ({
        url: `/contacts/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Contact"],
    }),
    deleteContact: builder.mutation<void, string>({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

// add hook to use the query
export const {
  useGetContactsQuery,
  useGetContactQuery,
  useAddContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactsApi;

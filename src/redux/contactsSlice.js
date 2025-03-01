import { createSelector, createSlice } from "@reduxjs/toolkit"
import {deleteContact,fetchContacts, addContact } from "./contactsOps"
import { selectNameFilter } from "./filtersSlice"

const initialState = {
    items: [],
    isLoading: false,
    isError:false
}

const slice = createSlice({
    name: 'contacts',
    initialState, 
    extraReducers: builder => {
        builder.addCase(fetchContacts.fulfilled, (state, action) => {
            state.items = action.payload;
            state.isLoading = false

        }),
        builder.addCase(fetchContacts.pending, (state, action) => {
        state.isLoading = true
        })
        builder.addCase(fetchContacts.rejected, (state, action) => {
            state.isError = action.payload;
            state.isLoading = false;
        })
        builder.addCase(deleteContact.fulfilled, (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload )
        }) 
        builder.addCase(addContact.fulfilled, (state, action) => {
            state.items.push(action.payload)
        })

    }
})

export const contactsReducer = slice.reducer

export const selectContacts = (state) => state.contacts.items;
export const selectLoading = (state) => state.contacts.isLoading;
export const selectError = (state) => state.contacts.isError;

export const selectFilteredContacts = createSelector(
    [selectContacts, selectNameFilter],
    (contacts, filter) => {
        const normalizedFilter = (filter || "").toLowerCase();
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(normalizedFilter)
        );
    }
);
import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = 'https://67c1934861d8935867e38128.mockapi.io/'

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async (body, thunkAPI) => {
try {
    const { data } = await axios.get("/contacts")
    return data;
} catch (error) {
    return thunkAPI.rejectWithValue(error.message)
}
})

export const deleteContact = createAsyncThunk('contacts/deleteContact', async(id, thunkAPI) => {
try {
    await axios.delete(`/contacts/${id}`)
    return id;
} catch (error) {
    return thunkAPI.rejectWithValue(error.message)
}
})

export const addContact = createAsyncThunk('contacts/addContact', async (body, thunkAPI) => {
    try {
        const {data} = await axios.post(`/contacts`, body)
        return data;
} catch (error) {
    return thunkAPI.rejectWithValue(error.message)
}
})


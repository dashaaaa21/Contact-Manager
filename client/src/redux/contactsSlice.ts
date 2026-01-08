import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Contact, ContactStatuses } from '../types';

interface ContactsState {
  contacts: Contact[];
  contactStatuses: ContactStatuses;
  search: string;
  loading: boolean;
  error: string | null;
}

const initialState: ContactsState = {
  contacts: [],
  contactStatuses: {
    work: { count: 0, bg: '#3b82f6' },
    family: { count: 0, bg: '#22c55e' },
    private: { count: 0, bg: '#a855f7' },
    friends: { count: 0, bg: '#eab308' },
    others: { count: 0, bg: '#ef4444' }
  },
  search: '',
  loading: false,
  error: null
};

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const response = await fetch('/api/contacts', {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch contacts');
    const data = await response.json();
    return data.map((contact: { _id: string; [key: string]: unknown }) => ({ ...contact, id: contact._id }));
  }
);

export const createContact = createAsyncThunk(
  'contacts/createContact',
  async (contact: Omit<Contact, 'id'>) => {
    const response = await fetch('/api/contacts', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(contact)
    });
    if (!response.ok) throw new Error('Failed to create contact');
    const data = await response.json();
    return { ...data, id: data._id };
  }
);

export const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async ({ id, contact }: { id: string; contact: Contact }) => {
    const response = await fetch(`/api/contacts/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(contact)
    });
    if (!response.ok) throw new Error('Failed to update contact');
    const data = await response.json();
    return { ...data, id: data._id };
  }
);

export const removeContact = createAsyncThunk(
  'contacts/removeContact',
  async (id: string) => {
    const response = await fetch(`/api/contacts/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to delete contact');
    return id;
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    addStatus: (state, action: PayloadAction<{ statusName: string; bg: string }>) => {
      if (!state.contactStatuses[action.payload.statusName]) {
        state.contactStatuses[action.payload.statusName] = {
          count: 0,
          bg: action.payload.bg
        };
      }
    },
    editStatus: (state, action: PayloadAction<{ oldStatus: string; newStatus: string; newBg: string }>) => {
      const oldStatusData = state.contactStatuses[action.payload.oldStatus];
      if (oldStatusData) {
        delete state.contactStatuses[action.payload.oldStatus];
        state.contactStatuses[action.payload.newStatus] = {
          count: oldStatusData.count,
          bg: action.payload.newBg
        };
        state.contacts.forEach(contact => {
          if (contact.status === action.payload.oldStatus) {
            contact.status = action.payload.newStatus;
          }
        });
      }
    },
    deleteStatus: (state, action: PayloadAction<string>) => {
      if (state.contactStatuses[action.payload] && action.payload !== 'others') {
        delete state.contactStatuses[action.payload];
        state.contacts.forEach(contact => {
          if (contact.status === action.payload) {
            contact.status = 'others';
          }
        });
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch contacts';
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const index = state.contacts.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.contacts[index] = action.payload;
        }
      })
      .addCase(removeContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(c => c.id !== action.payload);
      });
  }
});

export const {
  setSearch,
  addStatus,
  editStatus,
  deleteStatus
} = contactsSlice.actions;

export default contactsSlice.reducer;

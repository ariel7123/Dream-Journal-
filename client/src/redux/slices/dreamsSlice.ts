import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { dreamsAPI } from '../../services/api';
import { Dream } from '../../types';

interface DreamsState {
  dreams: Dream[];
  isLoading: boolean;
  error: string | null;
}

const initialState: DreamsState = {
  dreams: [],
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchDreams = createAsyncThunk(
  'dreams/fetchDreams',
  async () => {
    const response = await dreamsAPI.getAll();
    const dreamsData = (response as { data?: Dream[] }).data || (response as Dream[]);
    return Array.isArray(dreamsData) ? dreamsData : [];
  }
);

export const createDream = createAsyncThunk(
  'dreams/createDream',
  async (dreamData: {
    title: string;
    content: string;
    date?: string;
    mood?: string;
    tags?: string[];
    isLucid?: boolean;
  }) => {
    const response = await dreamsAPI.create(dreamData);
    return response as Dream;
  }
);

// Slice
const dreamsSlice = createSlice({
  name: 'dreams',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Dreams
    builder
      .addCase(fetchDreams.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDreams.fulfilled, (state, action: PayloadAction<Dream[]>) => {
        state.isLoading = false;
        state.dreams = action.payload;
      })
      .addCase(fetchDreams.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch dreams';
      });

    // Create Dream
    builder
      .addCase(createDream.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createDream.fulfilled, (state, action: PayloadAction<Dream>) => {
        state.isLoading = false;
        state.dreams = [action.payload, ...state.dreams];
      })
      .addCase(createDream.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to create dream';
      });
  },
});

export default dreamsSlice.reducer;
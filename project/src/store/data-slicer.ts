import {createSlice} from '@reduxjs/toolkit';
import { DataStore } from '../types/state';
import { StoreSliceName } from '../utils/consts';
import { fetchBookingInfo, fetchQuest, fetchQuests, fetchReservedQuests } from './action';


const initialState: DataStore = {
  quests: [],
  isQuestsLoading: false,
  quest: null,
  isQuestLoading: false,
  reservedQuests: [],
  isReservedQuestsLoading: false,
  bookingsInfo: [],
  isBookingsInfoLoading: false
};

export const dataSlicer = createSlice({
  name: StoreSliceName.DataProcess,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // загрузка всех квестов
    builder
      .addCase(fetchQuests.fulfilled, (state, action) => {
        state.quests = action.payload;
        state.isQuestsLoading = false;
      })
      .addCase(fetchQuests.pending, (state) => {
        state.isQuestsLoading = true;
      })
      .addCase(fetchQuests.rejected, (state) => {
        state.isQuestsLoading = false;
      })
      //загрузка подробной инфы о квесте
      .addCase(fetchQuest.fulfilled, (state, action) => {
        state.quest = action.payload;
        state.isQuestLoading = false;
      })
      .addCase(fetchQuest.pending, (state) => {
        state.isQuestLoading = true;
      })
      .addCase(fetchQuest.rejected, (state) => {
        state.isQuestLoading = false;
      })
      //Мои брони
      .addCase(fetchReservedQuests.fulfilled, (state, action) => {
        state.reservedQuests = action.payload;
        state.isReservedQuestsLoading = false;
      })
      .addCase(fetchReservedQuests.pending, (state) => {
        state.isReservedQuestsLoading = true;
      })
      .addCase(fetchReservedQuests.rejected, (state) => {
        state.isReservedQuestsLoading = false;
      })
      // инфа о брони
      .addCase(fetchBookingInfo.fulfilled, (state, action) => {
        state.bookingsInfo = action.payload;
        state.isReservedQuestsLoading = false;
      })
      .addCase(fetchBookingInfo.pending, (state) => {
        state.isReservedQuestsLoading = true;
      })
      .addCase(fetchBookingInfo.rejected, (state) => {
        state.isReservedQuestsLoading = false;
      });
  }
});

import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance, AxiosError } from 'axios';
import { saveToken } from '../services/token';
import type {
  BookingData, QuestCardData, QuestDetails,
  BookingQuestData, ReservedQuests, User, BookingQuest, userAuth
} from '../types/types';
import { ApiRoute, RequestStatus, AppRoutes } from '../utils/consts';
import { AppDispatch } from '../types/state';
import type { History } from 'history';

type Extra = {
  api: AxiosInstance;
  history: History;
}


export const Action = {
  FETCH_QUESTS: 'quests/fetch',
  FETCH_QUSET: 'quest/fetch',
  FETCH_BOOKING_INFO: 'bookingInfo/fetch',
  POST_BOOKING_QUEST: 'bookingQuest/post',
  FETCH_RESERVED_QUESTS: 'ReservedQuests/fetch',
  CHEK_USER_STATUS: 'chekUser/get',
  LOGIN: 'login/get'

};

//запросы по квестам
export const fetchQuests = createAsyncThunk<QuestCardData[], undefined, { extra: Extra }>(
  Action.FETCH_QUESTS,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<QuestCardData[]>(ApiRoute.GetQuests);

    return data;
  }
);

export const fetchQuest = createAsyncThunk<QuestDetails, QuestCardData['id'], { extra: Extra; dispatch: AppDispatch }>(
  Action.FETCH_QUSET,
  async (id, { extra }) => {
    const { api, history } = extra;

    try {
      const { data } = await api.get<QuestDetails>(`${ApiRoute.GetQuests}/${id}`);
      return data;

    } catch (err) {
      const axiosError = err as AxiosError;

      if (axiosError.response?.status === RequestStatus.NotFound) {
        history.push(AppRoutes.NotFound);
      }

      return Promise.reject(err);
    }
  }
);

// запросы по бронированию
export const fetchBookingInfo = createAsyncThunk<BookingData[], QuestCardData['id'], { extra: Extra }>(
  Action.FETCH_BOOKING_INFO,
  async (id, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<BookingData[]>(`${ApiRoute.GetQuests}/${id}${ApiRoute.Booking}`);

    return data;
  }
);

//Скорее всего тут есть ошибка
export const postBookingQuest = createAsyncThunk<BookingQuestData, BookingQuest, { extra: Extra }>(
  Action.POST_BOOKING_QUEST,
  async ({ id, contactPerson, date, peopleCount, phone, placeId, time, withChildren }, { extra }) => {

    const bookingData: BookingQuestData = { contactPerson, date, peopleCount, phone, placeId, time, withChildren };
    const { api, history } = extra;
    try {
      const { data } = await api.post<BookingQuestData>(`${ApiRoute.GetQuests}/${id}${ApiRoute.Booking}1`, bookingData);
      history.push(AppRoutes.MyQusets);
      return data;

    } catch (err) {

      err && history.push(AppRoutes.Error);
      return Promise.reject(err);
    }

  }
);

export const fetchReservedQuests = createAsyncThunk<ReservedQuests[], undefined, { extra: Extra }>(
  Action.FETCH_RESERVED_QUESTS,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<ReservedQuests[]>(`${ApiRoute.Reservation}`);

    return data;
  }
);

//User -запросы
export const checkUserAuth = createAsyncThunk<User['email'], undefined, { extra: Extra }>(
  Action.CHEK_USER_STATUS,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<User>(ApiRoute.Login);

    return data.email;
  }
);

export const loginUser = createAsyncThunk<User['email'], userAuth, { extra: Extra }>(
  Action.LOGIN,
  async ({ email, password }, { extra }) => {
    const { api, history } = extra;
    const { data } = await api.post<User>(ApiRoute.Login, { email, password });
    const { token } = data;

    saveToken(token);
    history.push(AppRoutes.Main);

    return email;
  });

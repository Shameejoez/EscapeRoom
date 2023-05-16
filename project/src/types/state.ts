import type { QuestCardData, QuestDetails, User, BookingData, ReservedQuests, QuestName } from './types';
import { ActivePlaceName, Authorization, } from '../utils/consts';
import { store } from '../store';

export type State = ReturnType <typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type DataStore = {
    quests: QuestCardData[];
    isQuestsLoading: boolean;
    quest: QuestDetails | null;
    isQuestLoading: boolean;
    reservedQuests: ReservedQuests[];
    isReservedQuestsLoading: boolean;
    bookingsInfo: BookingData[];
    isBookingsInfoLoading: boolean;
};

export type UserStore = {
    authorizationStatus: Authorization;
    email: User['email'];
}

export type SiteStore = {
    type: QuestName;
    level: string;
    activePage: ActivePlaceName;
}


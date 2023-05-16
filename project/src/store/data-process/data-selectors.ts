import { State } from '../../types/state';
import { StoreSliceName, filters } from '../../utils/consts';
import type { QuestCardData, QuestDetails, BookingData, ReservedQuests } from '../../types/types';
import { createSelector } from '@reduxjs/toolkit';
import { getLevel, getType } from '../site-procces/site-selectors';

export const getQuests = ({[StoreSliceName.DataProcess]: SITE_DATA}: State): QuestCardData[] => SITE_DATA.quests;
export const getIsQuestsLoading = ({[StoreSliceName.DataProcess]: SITE_DATA}: State): boolean => SITE_DATA.isQuestsLoading;

export const getQuest = ({[StoreSliceName.DataProcess]: SITE_DATA}: State): QuestDetails | null => SITE_DATA.quest;
export const getIsQuestLoading = ({[StoreSliceName.DataProcess]: SITE_DATA}: State): boolean => SITE_DATA.isQuestLoading;

export const getBookingsInfo = ({[StoreSliceName.DataProcess]: SITE_DATA}: State): BookingData[] => SITE_DATA.bookingsInfo;
export const getIsBookingsInfoLoading = ({[StoreSliceName.DataProcess]: SITE_DATA}: State): boolean => SITE_DATA.isBookingsInfoLoading;

export const getReservedQuests = ({[StoreSliceName.DataProcess]: SITE_DATA}: State):ReservedQuests[] => SITE_DATA.reservedQuests;
export const getIsReservedQuestsLoading = ({[StoreSliceName.DataProcess]: SITE_DATA}: State): QuestCardData[] => SITE_DATA.quests;

export const questsSelector = createSelector(
  [getQuests, getLevel, getType],
  (quests, LevelMode, Type) =>{
    const preFilter = filters[Type](quests);
    return filters[LevelMode](preFilter);
  }
);



import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SiteStore } from '../../types/state';
import { FilterThemesIcon, FilterItemComplexity, StoreSliceName } from '../../utils/consts';
import { QuestName } from '../../types/types';

const initialState: SiteStore = {
  type: FilterThemesIcon[0]['name'],
  level: FilterItemComplexity[0]
};


export const siteSlicer = createSlice({
  name: StoreSliceName.SiteProcess,
  initialState,
  reducers: {
    setType:( state, action: PayloadAction<QuestName>) => {
      state.type = action.payload;
    },
    setLevel:(state, action: PayloadAction<string>) => {
      state.level = action.payload;
    }
  }
});

export const {setType, setLevel} = siteSlicer.actions;

import { combineReducers} from '@reduxjs/toolkit';
import { dataSlicer } from './data-slicer';
import { StoreSliceName } from '../utils/consts';
import { siteSlicer } from './site-procces/site-slicer';
import { userSlicer } from './user-process/user-slicer';


export const rootReducer = combineReducers({
  [StoreSliceName.DataProcess]: dataSlicer.reducer,
  [StoreSliceName.SiteProcess]: siteSlicer.reducer,
  [StoreSliceName.UserProcess]: userSlicer.reducer,
});

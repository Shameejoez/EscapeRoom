import { StoreSliceName, Authorization } from '../../utils/consts';
import { State } from '../../types/state';
import type { User } from '../../types/types';


export const getUserStatus = ({[StoreSliceName.UserProcess]: USER_PROCESS}: State): Authorization => USER_PROCESS.authorizationStatus;
export const getUser = ({[StoreSliceName.UserProcess]: USER_PROCESS}: State): User['email'] => USER_PROCESS.email;

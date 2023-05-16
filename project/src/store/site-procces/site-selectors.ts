import { StoreSliceName } from '../../utils/consts';
import type { QuestName } from '../../types/types';
import { State } from '../../types/state';

export const getLevel = ({[StoreSliceName.SiteProcess]: SITE_PROCESS}: State): string => SITE_PROCESS.level;
export const getType = ({[StoreSliceName.SiteProcess]: SITE_PROCESS}: State): QuestName => SITE_PROCESS.type;

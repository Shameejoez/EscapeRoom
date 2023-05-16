import type { FilterItemData, QuestCardData, QuestName} from '../types/types';

export const MARK_MAIN = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';
export const MARK_DEFAULT = 	'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export enum StoreSliceName {
  DataProcess = 'DATA-PROCESS',
  SiteProcess = 'SITE-PROCESS',
  UserProcess = 'USER-PROCESS'
}


export const IconSize = {
  'Приключения': {
    width: 36,
    heigth: 30
  },
  'Ужасы': {
    width: 30 ,
    heigth: 30
  },
  'Мистика': {
    width: 30,
    heigth: 30
  },
  'Детектив': {
    width: 40,
    heigth: 30
  },
  'Все квесты': {
    width: 26,
    heigth: 30
  },
  'Sci-fi': {
    width: 28,
    heigth: 30
  }
};

export const DefaultCenterMap = [59.928925, 30.368903];


export const Office = [{
  id: 'Office',
  location: [59.9682769560675, 30.316415801789592]
}];

export enum RequestStatus {
  NotFound = 404,
  NoAuth = 401,
}

export enum Authorization {
  Auth = 'Auth',
  NoAuth = 'NoAuth',
  Unknown = 'Unknown'
}

export enum ApiRoute {
  RootRoute = '/v1/escape-room',
  GetQuests = '/quest',
  Booking = '/booking',
  Reservation = '/reservation',
  Login = '/login'
}

export enum AppRoutes {
    Main = '/',
    Quest = '/quest',
    Contacts = '/contacts',
    Login = '/login',
    Booking = '/booking',
    MyQusets = '/my-quests',
    NotFound = '/404',
    Error = '/Error',
    CancelQuest = '/CancelQuest'
}

// Констатны для FilterItem
export const FilterThemesIcon: FilterItemData[] = [
  {
    name: 'Все квесты',
    icon: '#icon-all-quests'
  },
  {
    name: 'Приключения',
    icon: '#icon-adventure'
  },
  {
    name: 'Ужасы',
    icon: '#icon-horror'
  },
  {
    name: 'Мистика',
    icon: '#icon-mystic'
  },
  {
    name: 'Детектив',
    icon: '#icon-detective'
  },
  {
    name: 'Sci-fi',
    icon: '#icon-sci-fi'
  }
];

export enum ActivePlaceName {
  MyQuests = 'my-quests',
  Contacts = 'contacts',
  Quests = 'quests',
}

export enum FilterItemType {
    Сomplexity = 'complexity',
    Thememes = 'themes'
}

export enum TypeQuest {
  'adventures', 'horror', 'mystic', 'detective', 'sci-fi', 'all quests'
}
export type Level =
  'easy'| 'medium' | 'hard' | 'any'


export const filters: {[key in QuestName | string]: (arg0: QuestCardData[]) => QuestCardData[]} = {
  'Все квесты' : ((quests) => quests),
  'Детектив' : (quests) => quests.filter((quest) => quest.type === 'detective'),
  'Мистика' : (quests) => quests.filter((quest) => quest.type === 'mystic'),
  'Приключения' : (quests) => quests.filter((quest) => quest.type === 'adventures'),
  'Ужасы' : (quests) => quests.filter((quest) => quest.type === 'horror'),
  'Sci-fi': (quests) => quests.filter((quest) => quest.type === 'sci-fi'),
  'Любой' : (quests) => quests,
  'Лёгкий' : (quests) => quests.filter((quest) => quest.level === 'easy'),
  'Средний' : (quests) => quests.filter((quest) => quest.level === 'medium'),
  'Сложный' : (quests) => quests.filter((quest) => quest.level === 'hard'),
};


export const FilterItemComplexity = [
  'Любой',
  'Лёгкий',
  'Средний',
  'Сложный',
];


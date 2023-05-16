import { Token } from '../services/token';
import { Level, TypeQuest } from '../utils/consts';

export type QuestCardData = {
    id: string;
    title: string;
    previewImg: string;
    previewImgWebp: string;
    level: Level | string;
    type: TypeQuest | string;
    peopleMinMax: number[];
}

export type QuestDetails = {
    id: string;
    title: string;
    previewImg: string;
    previewImgWebp: string;
    level: Level | string;
    type: Level | string;
    peopleMinMax: number[];
    description: string;
    coverImg: string;
    coverImgWebp: string;
}

export type FilterItemData = {
       name: QuestName;
       icon: string;
}


export type BookingData = {
    id: string;
    location: {
          address: string;
           coords: number[];
    };
    slots: {
         today: [{
             time: string;
             isAvailable: boolean;
         }];
           tomorrow: [{
              time: string;
              isAvailable: boolean;
           }];
    } ;
};

export type BookingQuestData = {
    date: string;
    time: string;
    contactPerson: string;
    phone: string;
    withChildren: boolean;
    peopleCount: number;
    placeId: string;
}

export type User = {
    email: string;
    token: Token;
}

export type QuestName = 'Все квесты' | 'Приключения' | 'Ужасы' | 'Мистика' | 'Детектив' | 'Sci-fi';
export type LevelType = 'Любой'| 'Лёгкий' | 'Средний' | 'Сложный';

export type BookingQuest = Pick<QuestCardData, 'id'> & BookingQuestData;
export type userAuth = Pick<User, 'email'> & {password: string};
export type ReservedQuests = Omit<BookingQuestData, 'placeId'> & Pick<BookingData, 'location'> & {quest : QuestCardData} & {id:string};


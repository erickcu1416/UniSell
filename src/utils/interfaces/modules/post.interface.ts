export interface IPost {
    _id?: string | number;
    idUser: string | number;
    title?: string;
    description?: string;
    idCategory?: string;
    isEvent?: boolean;
    created_at?: Date;
    username?: string;
    category?: string;
    myLike?: boolean;
}

export interface IPicture {
    _id?: string | number;
    idPost?: string | number;
    url?: string;
}

export interface IEvent {
    _id?: string |number;
    idPost?: string | number;
    ubication?: {
        lat: number,
        lng: number,
    };
    contact?: string;
    date?: Date;
    idCategory?: string | number;
    created_at?: Date;
}

export interface PostViewModel {
    title: string;
    username?: string;
    category?: string;
    idUser?: string | number;
    idCategory?: string | number;
    description?: string;
    ubication?: {
      lat: number,
      lng: number,
    };
    contact?: string;
    date: Date;
    isEvent?: boolean;
    imgs?: any[];
    selectSituationMarker?: boolean;
    idSituation?: string | number;
    dateEvent?: any;
}

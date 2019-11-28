export interface IProduct {
    _id?: string;
    idUser?: string;
    userName?: string;
    title: string;
    description: string;
    price: number;
    imageUrl?: string;
    type?: string;
    create_at?: Date;
    valid_to?: Date;
    timeRes?: any;
}

interface IBanner {
    _id?: string;
    image?: string | FileList;
    title?: string;
    isShow?: boolean | string;
}

export type { IBanner }
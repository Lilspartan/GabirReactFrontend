// Generated by https://quicktype.io

export interface Standing {
    points:       Array<number | string>;
    _id:          string;
    pos:          string;
    name:         string;
    team:         string;
    totalPoints:  number;
    seasonPoints: number;
    podiums:      number;
    wins:         number;
    __v:          number;
}

// Generated by https://quicktype.io

export interface UserData {
    name:      string;
    email:     string;
    password:  string;
    password2: string;
    errors:    Errors;
}

export interface Errors {

}

// Generated by https://quicktype.io

export interface Image {
    oldName: string;
    image:   string;
    data:    ImageData;
    user:    ImageUser;
    path?:   string;
}

export interface ImageData {
    likes:        any[];
    dislikes:     any[];
    dateUploaded: number;
    readableDate: string;
    checked:      boolean;
    description:  string;
    followsTheme: boolean;
}

export interface ImageUser {
    name: string;
    uuid: string;
}

// Generated by https://quicktype.io

export interface Haiku {
    haikuLines: string[];
    name:       string;
    url:        string;
    uuid:       string;
}

// Generated by https://quicktype.io

export interface User {
    alerts:       any[];
    uuid:         string;
    verfied:      boolean;
    racerProfile: Driver;
    profile:      Profile;
    roles:        string[];
    email:        string;
    name:         string;
}

export interface Profile {
    accounts?: Accounts;
    trophies?: Trophy[];
}

export interface Trophy {
    name: String;
    awardee: String;
    bodytext: String;
}

export interface Accounts {
    discord: DiscordAccount;
    iRacing: string;
}

export interface DiscordAccount {
    username: string;
    id: string;
    avatar: string;
    tag: string;
}

export interface Header {
    title: string;
    desc?: string;
    auth: any;
}

// Generated by https://quicktype.io

export interface File {
    path:      string;
    name:      string;
    fileSize:  number;
    ext:       string;
    size:      number;
}

// Generated by https://quicktype.io

export interface Folder {
    name:      string;
    children:  (GetFile | GetFolder)[];
    size:      number;
}

export interface GetFile {
    path: string;
    name: string;
    size: number;
    extension: string;
    type: string;
}

export interface GetFolder {
    path: string;
    name: string;
    children:(GetFile | GetFolder)[];
    size: Number;
    type: string;
}

// Generated by https://quicktype.io

export interface Race {
    id:        string;
    timestamp: number;
    date:      string;
    track:     string;
    tags:      Tags;
    car:       any[];
}

export interface Tags {
    notes:  null;
    winner: null;
    theme:  null;
    paid:   Paid;
    tags:   string[];
}

export interface Paid {
    track: boolean;
    car:   any[];
}

// Generated by https://quicktype.io

export interface Team {
    drivers:     Driver[];
    _id:         string;
    abbr:        string;
    name:        string;
    team_leader: string;
    logo:        string;
    social_media_links?: SocialMediaLink[];
}

export interface SocialMediaLink {
    type: string;
    link: string;
}

export interface Driver {
    car_number:     number | string;
    uuid?:          string;
    name:           string;
    username?:      string;
    team?:          Team;
}
export interface Player {
    id: number;
    username: string;
    emailAddress: string;
    phoneNumber: string;
    gold: bigint;
    createdDateTime: Date;
    lastUpdatedDateTime: Date;
    active: boolean;
}
import { DateValue } from "@nextui-org/react";

interface IEvent {
    _id?: string;
    name?: string;
    slug?: string;
    category?: string;
    isPublish?: boolean | string;
    isFeatured?: boolean | string;
    isOnline?: boolean | string;
    startDate?: string;
    endDate?: string;
    location?: {
        address?: string;
        region: string,
        coordinates: number[]
    };
    description?: string;
    banner?: string | FileList;
}

interface IEventForm extends IEvent {
    startDate?: DateValue;
    endDate?: DateValue;
    address?: string;
    latitude?: string;
    longitude?: string;
    region?: string;
}

interface IRegency {
    id: string,
    name: string,
}

export type { IEvent, IRegency, IEventForm }
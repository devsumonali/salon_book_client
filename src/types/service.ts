export type ServiceCategory =
    | 'hair-styling'
    | 'hair-color'
    | 'skin-care'
    | 'nail-care'
    | 'wellness';

export type AddServiceData = {
    name: string;
    category: ServiceCategory;
    price: number;
    duration: number;
    status: 'active' | 'inactive';
    description: string;
    image?: string;
};

export type ServiceData = AddServiceData & {
    _id: string;
};

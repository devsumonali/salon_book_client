export type ServiceCategory =
    | 'hair-styling'
    | 'hair-color'
    | 'skin-care'
    | 'nail-care'
    | 'wellness';

export type AddServiceData = {
    _id: string;
    name: string;
    category: ServiceCategory;
    price: number;
    duration: number;
    status: 'active' | 'inactive';
    description: string;
    image?: string;
};

export type UpdateServiceData = Omit<AddServiceData, '_id' | 'image'> & {
    image?: string;
};

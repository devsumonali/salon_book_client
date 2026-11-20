import type { ServiceCategory } from '@/types/service';

export const serviceCategories: Record<ServiceCategory, { label: string; badgeClass: string }> = {
    'hair-styling': {
        label: 'Haircut & Styling',
        badgeClass: 'bg-[#f3e4d5] text-[#77482d]',
    },
    'hair-color': {
        label: 'Hair Coloring & Balayage',
        badgeClass: 'bg-[#eae4f1] text-[#675477]',
    },
    'skin-care': {
        label: 'Facial & Skincare',
        badgeClass: 'bg-[#fae0d7] text-[#994a35]',
    },
    wellness: {
        label: 'Botanical Rituals',
        badgeClass: 'bg-[#e8eddf] text-[#596440]',
    },
    'nail-care': {
        label: 'Hand & Foot Care',
        badgeClass: 'bg-[#f2e6e8] text-[#815560]',
    },
};

export function formatServicePrice(price: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(price);
}

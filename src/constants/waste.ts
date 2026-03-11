import { WasteCategory } from '../types';

export const wasteCategories: WasteCategory[] = [
    {
        type: 'organic',
        name: 'Organic Waste',
        description: 'Food scraps, garden waste, biodegradable items',
        icon: 'leaf',
        color: 'bg-green-500'
    },
    {
        type: 'recyclable',
        name: 'Recyclable Materials',
        description: 'Paper, plastic, glass, metal containers',
        icon: 'recycle',
        color: 'bg-blue-500'
    },
    {
        type: 'electronic',
        name: 'Electronic Waste',
        description: 'Old phones, computers, batteries, appliances',
        icon: 'monitor',
        color: 'bg-orange-500'
    },
    {
        type: 'hazardous',
        name: 'Hazardous Waste',
        description: 'Chemicals, paint, cleaning products',
        icon: 'alert-triangle',
        color: 'bg-red-500'
    },
    {
        type: 'general',
        name: 'General Waste',
        description: 'Mixed waste, non-recyclable items',
        icon: 'trash-2',
        color: 'bg-gray-500'
    }
];

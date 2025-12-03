// filterUtilities.ts

// This file contains utility functions for filtering menus.

/**
 * Filters an array of menu items based on the provided criteria.
 * @param items - The array of menu items to filter.
 * @param criteria - The filtering criteria.
 * @returns Filtered array of menu items.
 */
function filterMenuItems(items: any[], criteria: any): any[] {
    return items.filter(item => {
        return Object.keys(criteria).every(key => item[key] === criteria[key]);
    });
}

/**
 * Searches menu items by a specific keyword.
 * @param items - The array of menu items to search.
 * @param keyword - The keyword to search for.
 * @returns Filtered array of menu items that match the keyword.
 */
function searchMenuItems(items: any[], keyword: string): any[] {
    return items.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()));
}

// Exporting the utility functions
export { filterMenuItems, searchMenuItems };
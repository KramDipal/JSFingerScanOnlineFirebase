import { create } from 'zustand';

const useStore = create((set) => ({
  label: 'Powered by : Zustand',
  counts: {}, // Object to store counts for each item by ID
  increment: (itemId) =>
    set((state) => ({
      counts: {
        ...state.counts,
        [itemId]: (state.counts[itemId] || 0) + 1, // Increment count for specific item
      },
    })),
  decrement: (itemId) =>
    set((state) => ({
      counts: {
        ...state.counts,
        [itemId]: Math.max((state.counts[itemId] || 0) - 1, 0), // Decrement, but not below 0
      },
    })),
  reset: (itemId) =>
    set((state) => ({
      counts: {
        ...state.counts,
        [itemId]: 0, // Reset count for specific item
      },
    })),
  resetAll: () => set({ counts: {} }), // Optional: Reset all counts
  
}));

export default useStore;
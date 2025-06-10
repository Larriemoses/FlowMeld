// frontend/src/utils/colors.ts
import type { AccentColor } from '../context/AuthContext'; // Using type-only import

// Helper to get a base Tailwind color class (e.g., 'bg-cyan-500', 'text-blue-400')
export const getBaseColorClass = (
  color: AccentColor,
  type: 'bg' | 'text' | 'border' | 'ring' | 'placeholder',
  shade: number
): string => {
  // CORRECTED: No <span> tags. Just a simple template literal.
  return `${type}-${color}-${shade}`;
};

// Helper to get a hover Tailwind color class (e.g., 'hover:bg-cyan-600', 'hover:text-blue-500')
// This function takes only TWO arguments: color and type. The shade is determined internally.
export const getHoverColorClass = (
  color: AccentColor,
  type: 'bg' | 'text' | 'border' | 'ring'
): string => {
  // Common hover shades relative to typical base (500)
  const shadeMap: { [key: string]: number } = {
    'bg': 600,     // e.g., bg-500 -> hover:bg-600
    'text': 600,   // e.g., text-500 -> hover:text-600
    'border': 600, // e.g., border-500 -> hover:border-600
    'ring': 400,   // e.g., ring-300 -> hover:ring-400
  };
  // CORRECTED: No <span> tags. Just a simple template literal.
  return `hover:${type}-${color}-${shadeMap[type] || 600}`;
};

// Helper to get text color for a button on a light accent background (like Update Persona button)
// This function takes only TWO arguments: color and theme. The shade is determined internally.
export const getLightAccentButtonTextColor = (
  color: AccentColor,
  theme: 'light' | 'dark'
): string => {
  // On light theme, lighter accent buttons need dark text (e.g., text-cyan-900)
  if (theme === 'light') return `text-${color}-900`;
  // On dark theme, lighter accent buttons need lighter text (e.g., text-cyan-100)
  return `text-${color}-100`;
};

// Helper to get common theme-specific classes
export const getThemeClasses = (theme: 'light' | 'dark') => {
  const bgPrimary = theme === 'light' ? 'bg-gray-50' : 'bg-slate-950';
  const textPrimary = theme === 'light' ? 'text-gray-800' : 'text-neutral-100';

  const bgHeader = theme === 'light' ? 'bg-white' : 'bg-slate-900';
  const borderHeader = theme === 'light' ? 'border-gray-200' : 'border-slate-800';

  const bgCard = theme === 'light' ? 'bg-white' : 'bg-slate-800';
  const borderCard = theme === 'light' ? 'border-gray-200' : 'border-slate-700';

  const textCardHeader = theme === 'light' ? 'text-gray-800' : 'text-neutral-100';
  const textCardContent = theme === 'light' ? 'text-gray-600' : 'text-slate-300';

  const bgInput = theme === 'light' ? 'bg-gray-100' : 'bg-slate-700';
  const borderInput = theme === 'light' ? 'border-gray-300' : 'border-slate-600';
  const placeholderInput = theme === 'light' ? 'placeholder-gray-500' : 'placeholder-slate-400';
  const textInput = theme === 'light' ? 'text-gray-800' : 'text-neutral-100';

  return {
    bgPrimary, textPrimary, bgHeader, borderHeader, bgCard, borderCard,
    textCardHeader, textCardContent, bgInput, borderInput, placeholderInput, textInput
  };
};

// SAFELIST for Tailwind JIT (important for dynamic classes)
export const accentColorSafelist: string[] = [
  'bg-cyan-50', 'bg-cyan-100', 'bg-cyan-200', 'bg-cyan-300', 'bg-cyan-400', 'bg-cyan-500', 'bg-cyan-600', 'bg-cyan-700', 'bg-cyan-800', 'bg-cyan-900',
  'text-cyan-50', 'text-cyan-100', 'text-cyan-200', 'text-cyan-300', 'text-cyan-400', 'text-cyan-500', 'text-cyan-600', 'text-cyan-700', 'text-cyan-800', 'text-cyan-900',
  'border-cyan-400', 'border-cyan-800', 'ring-cyan-300', 'ring-cyan-400',
  'hover:bg-cyan-50', 'hover:bg-cyan-100', 'hover:bg-cyan-200', 'hover:bg-cyan-300', 'hover:bg-cyan-400', 'hover:bg-cyan-500', 'hover:bg-cyan-600', 'hover:bg-cyan-700', 'hover:text-cyan-400', 'hover:text-cyan-500', 'hover:text-cyan-600', 'hover:text-cyan-700', 'hover:border-cyan-500',

  'bg-blue-500', 'bg-blue-600', 'text-blue-400', 'text-blue-500', 'text-blue-600', 'text-blue-700', 'text-blue-800', 'text-blue-900', 'ring-blue-300', 'ring-blue-400', 'border-blue-400', 'hover:bg-blue-50', 'hover:bg-blue-100', 'hover:bg-blue-200', 'hover:bg-blue-300', 'hover:bg-blue-400', 'hover:bg-blue-500', 'hover:bg-blue-600', 'hover:bg-blue-700', 'hover:text-blue-50', 'hover:text-blue-100', 'hover:text-blue-200', 'hover:text-blue-300', 'hover:text-blue-400', 'hover:text-blue-500', 'hover:text-blue-600', 'hover:text-blue-700', 'hover:border-blue-500',
  'bg-indigo-500', 'bg-indigo-600', 'text-indigo-400', 'text-indigo-500', 'text-indigo-600', 'text-indigo-700', 'text-indigo-800', 'text-indigo-900', 'ring-indigo-300', 'ring-indigo-400', 'border-indigo-400', 'hover:bg-indigo-50', 'hover:bg-indigo-100', 'hover:bg-indigo-200', 'hover:bg-indigo-300', 'hover:bg-indigo-400', 'hover:bg-indigo-500', 'hover:bg-indigo-600', 'hover:bg-indigo-700', 'hover:text-indigo-50', 'hover:text-indigo-100', 'hover:text-indigo-200', 'hover:text-indigo-300', 'hover:text-indigo-400', 'hover:text-indigo-500', 'hover:text-indigo-600', 'hover:text-indigo-700', 'hover:border-indigo-500',
  'bg-purple-500', 'bg-purple-600', 'text-purple-400', 'text-purple-500', 'text-purple-600', 'text-purple-700', 'text-purple-800', 'text-purple-900', 'ring-purple-300', 'ring-purple-400', 'border-purple-400', 'hover:bg-purple-50', 'hover:bg-purple-100', 'hover:bg-purple-200', 'hover:bg-purple-300', 'hover:bg-purple-400', 'hover:bg-purple-500', 'hover:bg-purple-600', 'hover:bg-purple-700', 'hover:text-purple-50', 'hover:text-purple-100', 'hover:text-purple-200', 'hover:text-purple-300', 'hover:text-purple-400', 'hover:text-purple-500', 'hover:text-purple-600', 'hover:text-purple-700', 'hover:border-purple-500',
  'bg-fuchsia-500', 'bg-fuchsia-600', 'text-fuchsia-400', 'text-fuchsia-500', 'text-fuchsia-600', 'text-fuchsia-700', 'text-fuchsia-800', 'text-fuchsia-900', 'ring-fuchsia-300', 'ring-fuchsia-400', 'border-fuchsia-400', 'hover:bg-fuchsia-50', 'hover:bg-fuchsia-100', 'hover:bg-fuchsia-200', 'hover:bg-fuchsia-300', 'hover:bg-fuchsia-400', 'hover:bg-fuchsia-500', 'hover:bg-fuchsia-600', 'hover:bg-fuchsia-700', 'hover:text-fuchsia-50', 'hover:text-fuchsia-100', 'hover:text-fuchsia-200', 'hover:text-fuchsia-300', 'hover:text-fuchsia-400', 'hover:text-fuchsia-500', 'hover:text-fuchsia-600', 'hover:text-fuchsia-700', 'hover:border-fuchsia-500',
  'bg-rose-500', 'bg-rose-600', 'text-rose-400', 'text-rose-500', 'text-rose-600', 'text-rose-700', 'text-rose-800', 'text-rose-900', 'ring-rose-300', 'ring-rose-400', 'border-rose-400', 'hover:bg-rose-50', 'hover:bg-rose-100', 'hover:bg-rose-200', 'hover:bg-rose-300', 'hover:bg-rose-400', 'hover:bg-rose-500', 'hover:bg-rose-600', 'hover:bg-rose-700', 'hover:text-rose-50', 'hover:text-rose-100', 'hover:text-rose-200', 'hover:text-rose-300', 'hover:text-rose-400', 'hover:text-rose-500', 'hover:text-rose-600', 'hover:text-rose-700', 'hover:border-rose-500',
  'bg-orange-500', 'bg-orange-600', 'text-orange-400', 'text-orange-500', 'text-orange-600', 'text-orange-700', 'text-orange-800', 'text-orange-900', 'ring-orange-300', 'ring-orange-400', 'border-orange-400', 'hover:bg-orange-50', 'hover:bg-orange-100', 'hover:bg-orange-200', 'hover:bg-orange-300', 'hover:bg-orange-400', 'hover:bg-orange-500', 'hover:bg-orange-600', 'hover:bg-orange-700', 'hover:text-orange-50', 'hover:text-orange-100', 'hover:text-orange-200', 'hover:text-orange-300', 'hover:text-orange-400', 'hover:text-orange-500', 'hover:text-orange-600', 'hover:text-orange-700', 'hover:border-orange-500',
  'bg-lime-500', 'bg-lime-600', 'text-lime-400', 'text-lime-500', 'text-lime-600', 'text-lime-700', 'text-lime-800', 'text-lime-900', 'ring-lime-300', 'ring-lime-400', 'border-lime-400', 'hover:bg-lime-50', 'hover:bg-lime-100', 'hover:bg-lime-200', 'hover:bg-lime-300', 'hover:bg-lime-400', 'hover:bg-lime-500', 'hover:bg-lime-600', 'hover:bg-lime-700', 'hover:text-lime-50', 'hover:text-lime-100', 'hover:text-lime-200', 'hover:text-lime-300', 'hover:text-lime-400', 'hover:text-lime-500', 'hover:text-lime-600', 'hover:text-lime-700', 'hover:border-lime-500',
  'bg-emerald-500', 'bg-emerald-600', 'text-emerald-400', 'text-emerald-500', 'text-emerald-600', 'text-emerald-700', 'text-emerald-800', 'text-emerald-900', 'ring-emerald-300', 'ring-emerald-400', 'border-emerald-400', 'hover:bg-emerald-50', 'hover:bg-emerald-100', 'hover:bg-emerald-200', 'hover:bg-emerald-300', 'hover:bg-emerald-400', 'hover:bg-emerald-500', 'hover:bg-emerald-600', 'hover:bg-emerald-700', 'hover:text-emerald-50', 'hover:text-emerald-100', 'hover:text-emerald-200', 'hover:text-emerald-300', 'hover:text-emerald-400', 'hover:text-emerald-500', 'hover:text-emerald-600', 'hover:text-emerald-700', 'hover:border-emerald-500',
  'bg-teal-500', 'bg-teal-600', 'text-teal-400', 'text-teal-500', 'text-teal-600', 'text-teal-700', 'text-teal-800', 'text-teal-900', 'ring-teal-300', 'ring-teal-400', 'border-teal-400', 'hover:bg-teal-50', 'hover:bg-teal-100', 'hover:bg-teal-200', 'hover:bg-teal-300', 'hover:bg-teal-400', 'hover:bg-teal-500', 'hover:bg-teal-600', 'hover:bg-teal-700', 'hover:text-teal-50', 'hover:text-teal-100', 'hover:text-teal-200', 'hover:text-teal-300', 'hover:text-teal-400', 'hover:text-teal-500', 'hover:text-teal-600', 'hover:text-teal-700', 'hover:border-teal-500',
];
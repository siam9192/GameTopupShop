import { AdministratorLevel, UserRole } from '@/types/user.type';

export const DEFAULT_PROFILE_PICTURE =
  'https://wallpapers.com/images/hd/cool-neon-blue-profile-picture-u9y9ydo971k9mdcf.jpg';

export const ALL_USERS_ROLE = Object.values(UserRole);

export const ALL_ADMINISTRATORS_LEVEL = Object.values(AdministratorLevel);

export const CURRENCIES = [
  {
    name: 'Bangladeshi Taka',
    code: 'BDT',
    symbol: '৳',
    status: 'Active',
  },
  {
    name: 'United States Dollar',
    code: 'USD',
    symbol: '$',
    status: 'Active',
  },
  {
    name: 'Indian Rupee',
    code: 'INR',
    symbol: '₹',
    status: 'Active',
  },
  {
    name: 'Euro',
    code: 'EUR',
    symbol: '€',
    status: 'Active',
  },
];
const defaultImages = [
  'https://i.ytimg.com/vi/WzwHXvjHTag/maxresdefault.jpg',
  'https://cdn-www.bluestacks.com/bs-images/Top-Free-Fire-Characters-of-2025-A-Comprehensive-Guide.png',
  'https://staticg.sportskeeda.com/editor/2021/12/606e9-16392154686721-1920.jpg?w=640',
];

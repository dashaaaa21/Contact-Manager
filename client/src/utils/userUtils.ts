import { User } from '../types';

export const getUserFirstLetterForAvatar = (userInformation: User): string => {
  return (userInformation.name || 'U').charAt(0).toUpperCase();
};

export const getUserNameForGreeting = (userInformation: User): string => {
  return userInformation.name || 'User';
};

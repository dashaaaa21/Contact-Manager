export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  avatar: string;
  gender: 'men' | 'women';
  status: string;
  favorite: boolean;
}

export interface ContactStatus {
  count: number;
  bg: string;
}

export interface ContactStatuses {
  [key: string]: ContactStatus;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
}

export interface RootState {
  contacts: Contact[];
  contactStatuses: ContactStatuses;
  search: string;
  auth: AuthState;
}

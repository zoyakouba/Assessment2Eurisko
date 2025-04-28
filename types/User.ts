export interface User {
    id: string;
    firstName: string;
    lastName?: string;
    email: string;
    dateOfBirth: string;
    status: 'active' | 'locked';
  }
  
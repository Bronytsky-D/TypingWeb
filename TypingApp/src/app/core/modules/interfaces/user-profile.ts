export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: string;
  level?: number;
  experiencePoints?: number;
  experienceToNextLevel?: number;
}

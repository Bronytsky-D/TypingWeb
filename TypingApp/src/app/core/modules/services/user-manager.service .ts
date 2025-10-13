import { Injectable } from "@angular/core";
import { UserProfile } from "../interfaces/user-profile";

@Injectable({
  providedIn: 'root'
})
export class UserManagerService{

     private userDatail: UserProfile |null = null; 
   setUser(user: UserProfile): void {
    this.userDatail = user;
  }
  getUser(): UserProfile | null {
    return this.userDatail;
  }
  
  clear(): void {
    this.userDatail = null;
  }
}
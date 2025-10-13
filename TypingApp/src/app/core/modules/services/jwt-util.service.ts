import { Injectable } from "@angular/core";
import { UserProfile } from "../interfaces/user-profile";
import { jwtDecode } from "jwt-decode";

@Injectable({ providedIn: 'root' })
export class JwtUtilService {
  decode(token: string): UserProfile {
    const decoded: any = jwtDecode(token);
    return {
      id: decoded.sub,
      fullName: decoded.name,
      email: decoded.email,
      role: decoded.role || [],
    };
  }
}

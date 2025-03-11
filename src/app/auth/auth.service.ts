import { Injectable } from "@angular/core"
import type { HttpClient } from "@angular/common/http"
import { BehaviorSubject, type Observable, of, throwError } from "rxjs"
import { catchError, tap } from "rxjs/operators"

interface User {
  id: string
  email: string
  name: string
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null)
  public currentUser$ = this.currentUserSubject.asObservable()
  private tokenKey = "auth_token"
  private userKey = "auth_user"

  constructor(private http: HttpClient) {
    this.loadStoredUser()
  }

  private loadStoredUser(): void {
    const storedUser = localStorage.getItem(this.userKey)
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)
        this.currentUserSubject.next(user)
      } catch (e) {
        localStorage.removeItem(this.userKey)
        localStorage.removeItem(this.tokenKey)
      }
    }
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value
  }

  public get isAuthenticated(): boolean {
    return !!this.currentUserSubject.value
  }

  login(email: string, password: string, rememberMe: boolean): Observable<User> {
    // In a real app, you would make an HTTP request to your backend
    // For demo purposes, we'll simulate a successful login with a mock user

    // Simulate API call
    return of({
      id: "1",
      email: email,
      name: "John Doe",
    }).pipe(
      tap((user) => {
        // Store authentication data
        const token = "mock_jwt_token"
        if (rememberMe) {
          localStorage.setItem(this.tokenKey, token)
          localStorage.setItem(this.userKey, JSON.stringify(user))
        } else {
          sessionStorage.setItem(this.tokenKey, token)
          sessionStorage.setItem(this.userKey, JSON.stringify(user))
        }

        this.currentUserSubject.next(user)
      }),
      catchError((error) => {
        return throwError(() => new Error("Invalid email or password"))
      }),
    )
  }

  logout(): void {
    // Remove user from local storage
    localStorage.removeItem(this.tokenKey)
    localStorage.removeItem(this.userKey)
    sessionStorage.removeItem(this.tokenKey)
    sessionStorage.removeItem(this.userKey)

    // Set current user to null
    this.currentUserSubject.next(null)
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey) || sessionStorage.getItem(this.tokenKey)
  }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpoint: string = 'http://localhost:3000/users';
  list$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { this.getAll() }

  /**
   * Get all users from the database.
   * @returns on observable with all users.
   */
  getAll(): void {
    this.http.get<User[]>(this.endpoint).subscribe((users) => this.list$.next(users));
  }

  /**
   * Get a specified user from the database by id.
   * @param id {number} user id.
   * @returns an observable with a user object.
   */
  get(id: number): Observable<User> {
    return this.http.get<User>(`${this.endpoint}/${id}`);
  }

  /**
   * Delete a user from the database.
   * The method is: this.http.delete
   */
  delete(user: User): void {
    if (!confirm('Are you sure?')) {
      return
    } else {
      this.http.delete(`${this.endpoint}/${user.id}`).subscribe(
        () => this.getAll()
      )
      this.toastr.warning('You have successfully deleted a user', 'Deleted', { timeOut: 3000 });
    }
  }


  /**
   * Create a user in the database.
   * The method is: this.http.post
   */
  create(user: User): Observable<User> {
    return this.http.post<User>(this.endpoint, user);
  }


  /**
   * Update a user in the database.
   * The method is: this.http.patch
   */

  update(user: User): Observable<User> {
    return this.http.patch<User>(`${this.endpoint}/${user.id}`, user);
  }
}

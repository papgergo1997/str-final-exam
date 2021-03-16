import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users$: BehaviorSubject<User[]> = this.userService.list$;
  phrase: string = '';
  filterKey: string = 'name';
  sortKey: string = '';
  cols: string[] = Object.keys(new User())

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  onChangeSort(data: string): void {
    this.sortKey = data;
  }

  onDelete(user: User): void {
    this.userService.delete(user);
  }

}

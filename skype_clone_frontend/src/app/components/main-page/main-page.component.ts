import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GetUserService } from 'src/app/services/get-user.service';
import { Person, User } from 'src/assets/user.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  public token!: string | null;
  public user!: Person | User | any;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private userService: GetUserService) { }

  ngOnInit(): void {

    this.token = this.route.snapshot.paramMap.get('id');
    this.user = {
      personId: 3,
      firstName: 'Ragul',
      lastName: 'Palani',
      skypeName: 'live:.uuid_skype_18ba06ec23e1cd0e',
      emailId: 'piccotvm30@gmail.com',
      password: '$2b$10$40ce1qIlheTTLxE89H0zl.u2sjbhemacxAVP7iUqyADUHkjhRA70S',
      location: null,
      birthday: '1995-02-18T18:30:00.000Z',
      profileImageId: null,
      statusId: null,
      mailVerified: 1,
      status: 'All are fine',
      profileImage: '../../../assets/logo.jpg',
      createdBy: null,
      createdDate: '',
      modifiedBy: null,
      modifiedDate: '',
      activeStatus: 0,
      deleteFlag: 0,
    }
    // this.userService.getUserByToken(this.token).subscribe((user) => {
    //   this.user = user.data
    // }, (error) => {
    //   if (error) {
    //     console.error(error)
    //   }
    // });

  }

}

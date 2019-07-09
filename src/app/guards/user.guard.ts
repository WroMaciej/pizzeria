import { UserService } from '../service/user.service';
import { Injectable } from '@angular/core';

import { CanActivate } from '@angular/router';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly userService: UserService) { }

  canActivate(): boolean {
    return (!this.userService.currentUser.isAdmin);
  }

}

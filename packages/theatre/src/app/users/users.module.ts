import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core/core.module';
import { StoreModule } from '../store/store.module';

import { UserListComponent } from './user/user-list.component';
import { UserPageComponent } from './user-page.container';

import { UserActions } from './users.actions';
import { UsersService } from './users.service';


@NgModule({
    declarations: [UserListComponent, UserPageComponent],
    exports: [UserListComponent, UserPageComponent],
    imports: [CoreModule, StoreModule, CommonModule],
    providers: [UserActions, UsersService]
})

export class UserModule {}

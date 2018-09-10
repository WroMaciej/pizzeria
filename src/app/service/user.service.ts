import { DatabaseService } from './database.service';
import { Injectable, OnDestroy} from '@angular/core';
import { ProductQuantity } from '../model/product.quantity.model';
import { User } from '../model/user.model';
import { Subscription, Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class UserService {

    currentUser: User;
    loginSubject: BehaviorSubject<User> = new BehaviorSubject<User>(undefined); //Subject<User> = new Subject<User>(); //
    loginSubscription: Subscription;

    constructor(private databaseService: DatabaseService) {
    }

    ngOnDestroy(){
        this.loginSubscription.unsubscribe();
    }

    login(userData) {
        console.log("Authenticating of user: " + userData.username);
        this.loginSubscription = this.databaseService
            .getUserByUsernameAndPassword(userData.username, userData.password)
            .subscribe(user => this.currentUser = user, () => { }
                , () => {
                    this.currentUser = this.currentUser[0];
                    this.authenticateUser(this.currentUser);
                });
    }

    logout(){
        this.loginSubject.next(undefined);
    }

    private authenticateUser(user: User) {
        if (user && user.id) {
            console.log("User " + user.username + " authenticated.");
            if (user.isAdmin) {
                console.log("User " + user.username + " has admin privileges.");
            } else {
                console.log("User " + user.username + " is a regular customer.");
            }
            this.loginSubject.next(user);
        }
        else {
            console.log("Wrong username or password.");
        }
    }

    getLoggedUser(): Observable<User> {
        return this.loginSubject.asObservable();
    }


}
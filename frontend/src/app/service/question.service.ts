import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { catchError } from 'rxjs/internal/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  endpoint: string = environment.apiUrl;
  // baseUrl: string = environment.baseUrl;
  // apiBaseUrl: string = environment.apiBaseUrl;
  constructor(private http : HttpClient) { }
  // private currentUserSubject: BehaviorSubject;

  getQuestionJson(){
    // return this.http.get<any>("assets/questions.json");

    // console.log("userData",userData)
    const data = { };
    return this.http.post<any>(this.endpoint + '/get-questions', data)
        .pipe(map(user => {           
            return user.data;
        }));
  }

  login(userData) {
    console.log("userData",userData)
    const data = {user_id: userData.username.value , password: userData.password.value };
    return this.http.post<any>(this.endpoint + '/sign-in', data)
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.data.token) {
              console.log('login ::');
                localStorage.setItem('BHTCurrentUser', JSON.stringify(user.data));
                
            }
            return user;
        }));
  } 
}

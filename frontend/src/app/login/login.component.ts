import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// import { AuthenticationService } from '../_services';
// import { UserTrailActivityService } from '../_services/usertrailactivity.service';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;
  submitted = false;
  loading = false;
  error = '';
  role_id;
  currentUserData;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: QuestionService,
    // private userTrailActivityService: UserTrailActivityService
  ) { }

  ngOnInit() {
   
    const currentUser = JSON.parse(localStorage.getItem('BHTCurrentUser'));
    this.loginForm = this.formBuilder.group({
      'username': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required])
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  signIn() {
    this.submitted = true;
    console.log("this.loginForm.invalid", this.loginForm.invalid)
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
   
    this.loading = true;
    this.authenticationService.login(this.f)
      .subscribe(
       
        data => {
          console.log("data", data)
          let user = "login"
          localStorage.setItem('url', JSON.stringify(user));
          if(data.length != 0 && data.status_code ==200){
              this.router.navigate(['/welcome']);
           
          }else{
            this.loading = false;
            this.error = "Email or Password Doesn't Exist!";
          }
        },
        error => this.handleError(error)
      );
  }

  handleError(errorData){
    console.log("error", errorData)
    this.error = errorData;
    this.loading = false;
  }

}

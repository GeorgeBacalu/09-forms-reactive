import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  signupForm: FormGroup;
  genders: string[] = ["male", "female"];
  forbiddenUsernames: string[] = ["Chris", "Anna"];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      "userData": new FormGroup({
        "username": new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        "email": new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      "gender": new FormControl("male"),
      "hobbies": new FormArray([])
    });
    // this.signupForm.valueChanges.subscribe(value => console.log(value));
    // this.signupForm.statusChanges.subscribe(status => console.log(status));
    // this.signupForm.setValue({ "userData": { "username": "George", "email": "george@email.com" }, "gender": "male", "hobbies": []})
    this.signupForm.patchValue({ "userData": { "username": "George" }});
  }

  onSubmit(): void {
    console.log(this.signupForm);
    (<FormArray>this.signupForm.get("hobbies")).clear();
    this.signupForm.reset();
  }

  getUsernameControl(): AbstractControl<any, any> { return this.signupForm.get("userData.username"); }

  getEmailControl(): AbstractControl<any, any> { return this.signupForm.get("userData.email"); }

  getHobbyControls(): AbstractControl<any, any>[] { return (<FormArray>this.signupForm.get("hobbies")).controls; }

  onAddHobby(): void { (<FormArray>this.signupForm.get("hobbies")).push(new FormControl(null, Validators.required)); }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    return this.forbiddenUsernames.indexOf(control.value) !== -1 ? { isNameForbidden: true } : null;
  }

  forbiddenEmails(control: FormControl): Promise<{[s: string]: boolean}> | Observable<{[s: string]: boolean}> {
    return new Promise<{[s: string]: boolean}>((resolve, reject) => setTimeout(() => resolve(control.value === "test@test.com" ? { isEmailForbidden: true } : null), 1000));
  }
}

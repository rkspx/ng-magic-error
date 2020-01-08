import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'dang-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form: FormGroup;
  control: FormControl;
  customErrors = { required: 'Please accept the terms' };

  title = 'Magic error message!';
  subtitle = 'from Netanel Basal tutorial';

  constructor(private builder: FormBuilder) { }

  ngOnInit() {
    this.control = this.builder.control('', Validators.required);

    this.form = this.builder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      terms: ['', [Validators.requiredTrue]],
      address: this.builder.group({
        city: ['', Validators.required],
        country: ['', Validators.required]
      })
    })
  }

}

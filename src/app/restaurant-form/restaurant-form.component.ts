import { Component,OnInit, Inject} from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButton } from '@angular/material/button';


@Component({
  selector: 'app-restaurant-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButton,
    MatButtonModule
  ],
  templateUrl: './restaurant-form.component.html',
  styleUrl: './restaurant-form.component.scss'
})
export class RestaurantFormComponent{
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RestaurantFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      id: [data?.id || null],
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      additionalInfo: ['']
    });

    if (data) {
      this.form.patchValue(data);
    }
  }

onSubmit(): void {
  if (this.form.valid) {
    this.dialogRef.close(this.form.value);
  }
}

onCancel(): void {
  this.dialogRef.close();
}

}

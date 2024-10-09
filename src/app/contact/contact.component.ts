import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    InputTextModule,
    ButtonModule,
    InputTextareaModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  contact = { name: '', email: '', message: '' };

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('contact form data: ', this.contact);
      // send data to backend

      alert('Thank You For Your Message!');
      form.reset();
    }
  }
}

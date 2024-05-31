import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateService } from '../services/translate.service';

@Component({
  selector: 'app-translation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss']
})
export class TranslationComponent {
  textInArabic = new FormControl('',  [Validators.required]);
  translatedText:any;
  constructor(private translateService:TranslateService) {

  }

  translate() {
    const text = {
      text:this.textInArabic.value
    };
    this.translateService.gettrans(text).subscribe({
      next:(res) => {
        this.translatedText = res.translated_text;
      },
      error:(err) => console.log(err)
    })
  }
}

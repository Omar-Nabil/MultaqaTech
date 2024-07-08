import { Component, OnInit } from '@angular/core';
import { TranscriptionService } from '../../../services/transcription.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  constructor(private _TranscriptionService:TranscriptionService) { }
  ngOnInit(): void {
    this._TranscriptionService.summaryBool.subscribe({
      next: () => {
        let bool: boolean = this._TranscriptionService.summaryBool.getValue()
        if (bool) {
          this.isloadingBool = false;
          this.summaryTxt=this._TranscriptionService.summaryTxt.getValue()
        }
        else {
          this.isloadingBool = true;
        }
      }
    })
    this._TranscriptionService.translationBool.subscribe({
      next: () => {
        let bool: boolean = this._TranscriptionService.translationBool.getValue()
        if (bool) {
          this.translateLoadingBool = false;
          this.translationTxt=this._TranscriptionService.translationTxt.getValue()
        }
        else {
          this.translateLoadingBool = true;
        }
      }
    })

  }

  isloadingBool: boolean = true;
  summaryTxt: string = ''
  translateLoadingBool: boolean = true;
  translationTxt: string = ''



}

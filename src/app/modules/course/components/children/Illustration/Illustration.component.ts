import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ApiService } from '../../../services/api.service';
declare const mermaid: any;

//import mermaid from 'mermaid';
@Component({
  selector: 'app-Illustration',
  templateUrl: './Illustration.component.html',
  styleUrls: ['./Illustration.component.css']
})
export class IllustrationComponent {
  response: any;


  responseBool:boolean =false;
  spinner:boolean =false;
  chartDefinition:any;
  inputValue: string = '';
  firstPart: string = '';
  code: string = '';
  explenation: string = '';
  mermaidChart = `
    graph TD;
      A-->B;
      A-->C;
      B-->D;
      C-->D;
  `;

  constructor(private apiService: ApiService) { }
  onSubmit(): void {
    this.spinner = true;
    this.processInput(this.inputValue);

  }

  processInput(value: string): void {
    this.apiService.getExplanation(value)
      .subscribe(response => {
        this.response = response;
        const parts = response.response.split('```mermaid');
        const preText = parts[0].trim();
        const postText = parts[1].split('```')[1].trim();
        let mermaidCode = parts[1].split('```')[0].trim();

                // Replace literal "\n" with actual newlines in Mermaid code
        mermaidCode = mermaidCode.replace(/\\n/g, '\n');


        this.chartDefinition= mermaidCode;
        console.log(mermaidCode);
        console.log(this.chartDefinition);
        this.processParagraph(response.response)
        this.responseBool=true;
        console.log(document.getElementById("mermaid"));
        console.log(document.getElementById("mermaid2"));
        setTimeout(()=>{console.log(document.getElementById("mermaid"));
          document.getElementById("mermaid")?.classList.add("mermaid")
          this.run();
        },500)
        document.getElementById("mermaid")?.classList.add("mermaid")
        this.run();
        this.spinner=false;



      }, error => {
        console.error("hehe");
        console.error(error);

      });
    console.log(value);

  }

  run(){
    mermaid.run();
  }
  processParagraph(paragraph: string){
    // Split the paragraph by ```
    const parts = paragraph.split('```');

    // Ensure we have exactly 3 parts

    // Replace \n with <br> in each part
    this.firstPart = parts[0].replace(/\n/g, '<br>');
    this.code = parts[1];
    this.explenation = parts[2].replace(/\n/g, '<br>');

  }



}

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { TranscriptionService } from '../../../services/transcription.service';

@Component({
  selector: 'app-quizgenerator',
  templateUrl: './quizgenerator.component.html',
  styleUrls: ['./quizgenerator.component.scss']
})
export class QuizgeneratorComponent implements OnInit {
  loading:boolean = true;
  firstTime:boolean = true;
  constructor(private apiService:ApiService, private transcriptionService:TranscriptionService) { }

  // textWithAnswers: string = `1. Question: Which of the following is NOT a common type of cyber attack?\n     Choices:\n     A) Phishing\n     B) Malware\n     C) Denial of Service (DoS)\n     D) Man-in-the-Middle (MitM)\n     Answer: C\n     Explanation: A phishing attack attempts to trick users into giving away sensitive information, B malware is a type of software designed to harm a computer system, and D Man-in-the-Middle (MitM) is a type of attack where an attacker intercepts and alters communication between two parties. However, a Denial of Service (DoS) attack aims to make a website or service unavailable to users by overwhelming it with traffic or requests.\n\n    2. Question: Which encryption algorithm is considered the most secure for protecting sensitive data?\n     Choices:\n     A) AES\n     B) RSA\n     C) Blowfish\n     D) DES\n     Answer: A\n     Explanation: Advanced Encryption Standard (AES) is currently the most widely used and considered the most secure encryption algorithm for protecting sensitive data. RSA is a public-key encryption algorithm, Blowfish is a symmetric encryption algorithm, and Data Encryption Standard (DES) is an older symmetric encryption algorithm that has been largely replaced by more secure alternatives.\n\n    3. Question: Which of the following is a best practice for securing a Wi-Fi network?\n     Choices:\n     A) Using a weak password\n     B) Using WPA2 encryption\n     C) Leaving the network open\n     D) Disabling the firewall\n     Answer: B\n     Explanation: Using a strong, unique password is a best practice for securing a Wi-Fi network. WPA2 encryption is also important for securing the network, as it provides strong encryption for data transmitted over the network. Leaving the network open and disabling the firewall are not recommended practices for securing a Wi-Fi network.\n\n    4. Question: Which of the following is a common method used by attackers to gain unauthorized access to a computer system?\n     Choices:\n     A) Phishing\n     B) Brute force\n     C) Social engineering\n     D) Malware\n     Answer: C\n     Explanation: Social engineering is a common method used by attackers to gain unauthorized access to a computer system. It involves manipulating people into revealing sensitive information or performing actions that compromise the security of the system. Phishing is a type of social engineering attack that uses email or websites to trick users into giving away sensitive information. Brute force is a method of guessing passwords by trying many combinations, and malware is a type of software designed to harm a computer system.\n\n    5. Question: Which of the following is a type of malware that is designed to steal sensitive information?\n     Choices:\n     A) Ransomware\n     B) Adware\n     C) Spyware\n     D) Virus\n     Answer: C\n     Explanation: Spyware is a type of malware that is designed to steal sensitive information, such as passwords, credit card numbers, and other personal data. Ransomware is a type of malware that encrypts files on a computer and demands a ransom to decrypt them. Adware is a type of software that displays unwanted advertisements, and a virus is a type of malware that replicates itself and spreads to other computers.\n\n    6. Question: Which of the following is a best practice for protecting against phishing attacks?\n     Choices:\n     A) Clicking on links in unsolicited emails\n     B) Installing antivirus software\n     C) Using a strong, unique password\n     D) Verifying the sender's email address\n     Answer: D\n     Explanation: Verifying the sender's email address is a best practice for protecting against phishing attacks. Phishing emails often appear to be from trusted sources, such as banks or other organizations, but the email address may not be authentic. Installing antivirus software and using a strong, unique password are also important practices for protecting against cyber attacks, but they do not specifically address phishing attacks. Clicking on links in unsolicited emails is a risky behavior that can lead to phishing attacks or other types of cyber attacks.`;

  ngOnInit(): void {



        if(this.transcriptionService.transcriptionTxt.getValue()) {
          let data = {
          context: this.transcriptionService.transcriptionTxt.getValue()
        };
        this.apiService.generateQuiz(data).subscribe({
          next:(res) => {
            console.log(res);
            const quizTextElement = document.getElementById('quizText') as HTMLTextAreaElement | null;
            console.log(quizTextElement);

            if (quizTextElement) {
              quizTextElement.value = res;
              this.generateQuiz();
              this.loading = false;
              this.firstTime = false;
            }

          },
          error:(err) => {
            console.log(err);

          }

        })
        }





  }

  handletext(text: string): { filteredText: string, answersAndExplanations: { Answer: string, Explanation?: string }[] } {
    let lines = text.split(/\n+/);
    let filteredLines: string[] = [];
    let answersAndExplanations: { Answer: string, Explanation?: string }[] = [];

    lines.forEach(line => {
      line = line.trim();
      if (line.startsWith("Question:")) {
        filteredLines.push(line);
      } else if (line.startsWith("Choices:")) {
        filteredLines.push(line);
      } else if (line.startsWith("Answer:")) {
        let answer = line.split(":")[1].trim();
        answersAndExplanations.push({ Answer: answer });
      } else if (line.startsWith("Explanation:")) {
        let explanation = line.split(":")[1].trim();
        answersAndExplanations[answersAndExplanations.length - 1].Explanation = explanation;
      } else if (line.match(/^[A-D]\)\s*/)) {
        filteredLines.push(line);
      } else if (line.startsWith("    ")) {
      } else {
        filteredLines.push(line);
      }
    });

    let filteredText = filteredLines.join("\n");

    return {
      filteredText: filteredText,
      answersAndExplanations: answersAndExplanations
    };
  }

  generateQuiz() {
    const quizTextElement = document.getElementById('quizText') as HTMLTextAreaElement | null;
    if (!quizTextElement) {
      console.error('Quiz text element not found');
      return;
    }

    const quizText = quizTextElement.value;
    let { filteredText, answersAndExplanations } = this.handletext(quizText);

    const inputSection = document.getElementById('inputSection') as HTMLElement | null;
    if (inputSection) {
      inputSection.style.display = 'none';
    } else {
      console.error('Input section element not found');
      return;
    }

    const quizSection = document.getElementById('quizSection') as HTMLElement | null;
    if (!quizSection) {
      console.error('Quiz section element not found');
      return;
    }
    quizSection.innerHTML = '';

    const questions = filteredText.split(/\d+\.\s+/).filter(q => q.trim() !== '');

    questions.forEach((question, index) => {
      const parts = question.split('Choices:');
      const questionText = parts[0].replace('Question:', '').trim();
      const choicesText = parts[1].trim();

      const div = document.createElement('div');
      div.className = 'quiz-question';
      div.innerHTML = `<strong>${index + 1}: ${questionText}</strong>`;

      const choices = choicesText.split(/\s*[A-D]\)\s*/).filter(choice => choice.trim() !== '');
      const labels = choicesText.match(/\s*[A-D]\)\s*/g);
      if (labels) {
        choices.forEach((choice, i) => {
          const label = labels[i].trim().charAt(0);

          const choiceDiv = document.createElement('div');

          const input = document.createElement('input');
          input.type = 'radio';
          input.name = `question_${index + 1}`;
          input.value = label;
          input.id = `q${index + 1}_${label}`;
          input.setAttribute('data-answered', 'false');

          const choiceLabel = document.createElement('label');
          choiceLabel.setAttribute('for', `q${index + 1}_${label}`);
          choiceLabel.textContent = `${label}) ${choice}`;

          choiceDiv.appendChild(input);
          choiceDiv.appendChild(choiceLabel);

          div.appendChild(choiceDiv);

          input.addEventListener('change', function() {
            input.setAttribute('data-answered', 'true');
          });
        });
      }

      const answerDiv = document.createElement('div');
      answerDiv.className = 'quiz-answer';
      answerDiv.style.display = 'none';
      div.appendChild(answerDiv);

      const explanationDiv = document.createElement('div');
      explanationDiv.className = 'quiz-answer';
      explanationDiv.style.display = 'none';
      div.appendChild(explanationDiv);

      quizSection.appendChild(div);
    });

    const submitQuizSection = document.getElementById('submitQuiz') as HTMLElement | null;
    if (submitQuizSection) {
      submitQuizSection.style.display = 'block';
    } else {
      console.error('Submit quiz section element not found');
    }
  }

  validateQuiz(): boolean {
    const quizSection = document.getElementById('quizSection') as HTMLElement | null;
    if (!quizSection) {
      console.error('Quiz section element not found');
      return false;
    }

    const questions = quizSection.getElementsByClassName('quiz-question');
    for (let i = 0; i < questions.length; i++) {
      const inputs = (questions[i] as HTMLElement).getElementsByTagName('input');
      let answered = false;
      for (let j = 0; j < inputs.length; j++) {
        if ((inputs[j] as HTMLInputElement).checked) {
          answered = true;
          break;
        }
      }
      if (!answered) {
        return false;
      }
    }
    return true;
  }

  submitQuiz() {
    if (!this.validateQuiz()) {
      alert('Please answer all questions before submitting.');
      return;
    }

    const quizSection = document.getElementById('quizSection') as HTMLElement | null;
    if (!quizSection) {
      console.error('Quiz section element not found');
      return;
    }

    const answerDivs = quizSection.getElementsByClassName('quiz-answer');
    const quizTextElement = document.getElementById('quizText') as HTMLTextAreaElement | null;
    if (!quizTextElement) {
      console.error('Quiz text element not found');
      return;
    }

    const quizText = quizTextElement.value;
    const { filteredText, answersAndExplanations } = this.handletext(quizText);

    for (let i = 0; i < answerDivs.length; i += 2) {
      const answer = answersAndExplanations[i / 2]?.Answer || '';
      const explanation = answersAndExplanations[i / 2]?.Explanation || '';

      (answerDivs[i] as HTMLElement).style.display = 'block';
      (answerDivs[i] as HTMLElement).innerHTML = `Answer: ${answer}`;

      (answerDivs[i + 1] as HTMLElement).style.display = 'block';
      (answerDivs[i + 1] as HTMLElement).innerHTML = `Explanation: ${explanation}`;
    }

    const submitQuizSection = document.getElementById('submitQuiz') as HTMLElement | null;
    if (submitQuizSection) {
      submitQuizSection.style.display = 'none';
    } else {
      console.error('Submit quiz section element not found');
    }
  }

}

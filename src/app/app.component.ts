import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'hangman-angular';
  word = 'AGUACATE';
  hideWord = '';
  attempts = 0;
  attemptsLimit = 9;

  losser = false;
  winner = false;

  constructor() {
    this.hideWord = '_ '.repeat(this.word.length).trim();
    console.log('se acaba de crear el app component');
  }

  genCharArray(charA = 'A', charZ = 'Z') {
    const a = [];
    let i = charA.charCodeAt(0);
    const j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
      a.push(String.fromCharCode(i));
    }
    return a;
  }

  check(letterToCheck: string) {
    const hideWordLetterList = this.hideWord.split(' ');

    let lettersIndex = this.letterExists(letterToCheck, hideWordLetterList);

    if (lettersIndex.length === 0) this.attempts++;

    lettersIndex.forEach(
      (value) => (hideWordLetterList[value] = letterToCheck)
    );

    this.hideWord = hideWordLetterList.join(' ');
    this.checkGameOver();
  }

  letterExists(letterToCheck: string, hideWordLetterList: string[]) {
    let lettersIndex: number[] = [];
    for (const key in hideWordLetterList) {
      const letter = this.word[key];
      if (letter === letterToCheck)
        lettersIndex = [...lettersIndex, parseInt(key)];
    }

    return lettersIndex;
  }

  checkGameOver() {
    const hideWord = this.hideWord.split(' ').join('');

    if (this.attempts < this.attemptsLimit && hideWord === this.word) {
      this.winner = true;
    } else if (this.attempts === this.attemptsLimit) this.losser = true;
  }
}

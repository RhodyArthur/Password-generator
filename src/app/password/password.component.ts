import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './password.component.html',
  styleUrl: './password.component.css'
})
export class PasswordComponent{

// Define arrays for character sets
uppercaseLetters: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
lowercaseLetters: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');
numbers: string[] = '0123456789'.split('');
symbols: string[] = '!@#$%^&*()_-+=[]{}|;:,.<>?'.split('');

password:string = '';
characterLength: number = 8;
copiedMessage: string = '';
includeUppercase: boolean = false;
includeLowercase: boolean = false;
includeNumbers: boolean = false;
includeSymbols: boolean = false;
strengthValue:string = ''
indicator:string = ''


constructor(){}

// generate random password
generatePassword(){
  let validCharacters: string[] = []

  if(this.includeUppercase){
    validCharacters = validCharacters.concat(this.uppercaseLetters);
  }
  if(this.includeLowercase){
    validCharacters = validCharacters.concat(this.lowercaseLetters);
  }
  if(this.includeNumbers){
    validCharacters = validCharacters.concat(this.numbers);
  }
  if(this.includeSymbols){
    validCharacters = validCharacters.concat(this.symbols);
  }

  let generatedPassword = '';
  const validCharsLength = validCharacters.length;

  for (let i = 0; i < this.characterLength; i++) {
    const randomIndex = Math.floor(Math.random() * validCharsLength);
    generatedPassword += validCharacters[randomIndex];
  }

  this.password = generatedPassword;

  this.calculateStrength()
}

areAnyCheckboxesSelected(): boolean {
  return this.includeUppercase || this.includeLowercase || this.includeNumbers || this.includeSymbols;
}


// calculate strength
calculateStrength(){
  const length = this.password.length
  let typecount = 0

  //count characters based on type
  if(this.includeUppercase) typecount++
  if(this.includeLowercase) typecount++
  if(this.includeNumbers) typecount++
  if(this.includeSymbols) typecount++

  // determine strength value
  if(length < 8){
    this.strengthValue = 'TOO WEAK!';
    this.indicator = 'tooWeak';
  }
  else if(length >= 8 && typecount === 1){
    this.strengthValue = 'WEAK';
    this.indicator = 'weak';

  }
  else if(length >= 8 && typecount === 2){
    this.strengthValue = 'MEDIUM';
    this.indicator = 'medium';

  }
  else if(length >= 12 && typecount === 3){
    this.strengthValue = 'STRONG';
    this.indicator = 'strong';

  }


}
// Copy generated password to clipboard
copyPassword() {
  navigator.clipboard.writeText(this.password);
   this.copiedMessage = 'COPIED';
  setTimeout(()=> {
    this.copiedMessage = ''
  }, 2000)
}
}

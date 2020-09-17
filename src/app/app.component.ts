import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  faktor1: number;
  faktor2: number;
  richtigeLoesung: number;

  moeglicheLoesungen: number[];

  richtigGerechnet: boolean;
  hatAntwortAbgegeben: boolean;

  textRichtigeAntwort: string;
  textFalscheAntwort: string;

  rechenMatrix: number[];


  neueAufgabe(): void {
    this.faktor1 = Math.round(Math.random() * 9) + 1;
    this.faktor2 = Math.round(Math.random() * 9) + 1;

    this.richtigeLoesung = this.faktor1 * this.faktor2;

    this.mglLoesungenBerechnen();

    this.textRichtigeAntwort = RICHTIGE_ANTWORTEN_POOL[Math.floor(Math.random() * RICHTIGE_ANTWORTEN_POOL.length)];
    this.textFalscheAntwort = FALSCHE_ANTWORTEN_POOL[Math.floor(Math.random() * RICHTIGE_ANTWORTEN_POOL.length)];

    this.hatAntwortAbgegeben = false;
  }

  private berechneRechenMatrix(): void {
    this.rechenMatrix = [];
    for (let i = 1; i <= this.faktor1; i++) {
      this.rechenMatrix.push(i);
    }
  }

  private mglLoesungenBerechnen(): void {
    this.moeglicheLoesungen = [];

    this.moeglicheLoesungen.push(this.richtigeLoesung);

    const radius = 20;

    while (this.moeglicheLoesungen.length < 10) {
      const kandidat = this.richtigeLoesung - radius + Math.round(2 * radius * Math.random());
      if (kandidat > 0 && kandidat <= 100 && !this.moeglicheLoesungen.includes(kandidat)) {
        this.moeglicheLoesungen.push(kandidat);
      }
    }


    shuffle(this.moeglicheLoesungen);
  }

  ngOnInit(): void {
    this.neueAufgabe();
  }

  loesungAbgeben(lsgMglk: number): void {
    this.hatAntwortAbgegeben = true;
    if (lsgMglk === this.richtigeLoesung) {
      this.richtigGerechnet = true;
    } else {
      this.richtigGerechnet = false;
      this.berechneRechenMatrix();
    }
  }
}


// source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

function shuffle(array: number[]): void {
  let currentIndex = array.length;
  let temporaryValue: number;
  let randomIndex: number;

  // While there remain elements to shuffle.
  while (0 !== currentIndex) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
}

const RICHTIGE_ANTWORTEN_POOL: string[] = [
  'Ehre gewonnen!',
  'Richtig!',
  'Superstar!',
  'Rechen-Ass!',
  'So sehen Sieger aus!',
  'Dir macht keiner so schnell was vor!',
  'Richtig gut!',
  'Abgefahren!',
  'Beste!',
  'Klasse!',
  'Das hast du toll gemacht!',
  'Weiter so!',
  'Yeah!',
  'Mega!',
  'Du bist großartig!',
  '#läuftbeidir!'
];

const FALSCHE_ANTWORTEN_POOL: string[] = [
  'Mist, nächstes Mal!',
  'Schade...',
  'Nah dran?',
  'War das geraten?',
  'Du schaffst das schon!',
  'Ich glaube an Dich!',
  'Ehre genommen.',
  'Beim nächsten Mal klappt es bestimmt!',
  'Lass dich nicht unterkriegen.',
  'Jeder fängt mal klein an.',
  'Aller Anfang ist schwer.',
  'Das war leider nicht richtig, probiere die nächste Aufgabe.',
  'Das klappt schon noch.',
  'Eieieieieieiei...'
];

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    FormsModule,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonInput,
    IonTitle,
    IonToolbar,
  ],
})
export class Tab1Page {
  counterName = '';
  count = 0;
  step = 1;

  increment(): void {
    const s = Number(this.step) || 1;
    this.count += s;
  }

  decrement(): void {
    const s = Number(this.step) || 1;
    if (this.count >= s) {
      this.count -= s;
    } else {
      this.count = 0;
    }
  }

  incrementByFive(): void {
  this.count += 5;
  }

  decrementByFive(): void {
    if (this.count >= 5) {
      this.count -= 5;
    } else {
      this.count = 0;
    }
  }

  reset(): void {
    this.count = 0;
  }

  resetAll(): void {
    this.count = 0;
    this.counterName = '';
  }
}
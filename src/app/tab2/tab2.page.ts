import { Component, inject, OnInit, computed, signal } from '@angular/core'; // === BONUS 1: computed | BONUS 2 & 3: signal ===
import { DatePipe } from '@angular/common';
import {
  AlertController,
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonSpinner,
  IonTitle,
  IonToolbar,
  IonSelect,
  ToastController,
  IonSelectOption,
  IonSearchbar,
} from '@ionic/angular';
import { CounterService } from '../services/counter.service';

export type SortOption = 'newest' | 'name' | 'value-asc' | 'value-desc';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    DatePipe,
    IonButton,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonNote,
    IonSpinner,
    IonTitle,
    IonToolbar,
    IonSelect,
    IonSelectOption,
    IonSearchbar,
  ],
})
export class Tab2Page implements OnInit {
  readonly counterService = inject(CounterService);
  readonly alertController = inject(AlertController);
  readonly toastController = inject(ToastController);

  readonly totalSum = computed(() =>
    this.counterService.counters().reduce((acc, c) => acc + c.value, 0),
  );

  readonly sortBy = signal<SortOption>('newest');

  onSortChange(event: CustomEvent): void {
    this.sortBy.set(event.detail.value as SortOption);
  }
  readonly searchQuery = signal<string>('');

  onSearchChange(event: CustomEvent): void {
    this.searchQuery.set(event.detail.value ?? '');
  }

  readonly displayedCounters = computed(() => {
    let list = [...this.counterService.counters()];
    const query = this.searchQuery().trim().toLowerCase();

    if (query) {
      list = list.filter((item) => item.name.toLowerCase().includes(query));
    }

    const sort = this.sortBy();
    switch (sort) {
      case 'name':
        return list.sort((a, b) => a.name.localeCompare(b.name, 'cs'));
      case 'value-asc':
        return list.sort((a, b) => a.value - b.value);
      case 'value-desc':
        return list.sort((a, b) => b.value - a.value);
      case 'newest':
      default:
        return list.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
    }
  });

  async ngOnInit(): Promise<void> {
    await this.counterService.initialize();
  }

  async remove(id: string): Promise<void> {
    await this.counterService.remove(id);

    const toast = await this.toastController.create({
      message: 'Záznam byl odstraněn.',
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }

  async clear(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Vymazat historii',
      message: 'Opravdu si přejete smazat všechna uložená počítadla? Tato akce je nevratná.',
      buttons: [
        {
          text: 'Zrušit',
          role: 'cancel',
        },
        {
          text: 'Vymazat',
          role: 'destructive',
          handler: async () => {
            await this.counterService.clear();

            const toast = await this.toastController.create({
              message: 'Historie byla kompletně vymazána.',
              duration: 2000,
              position: 'bottom',
            });
            await toast.present();
          },
        },
      ],
    });

    await alert.present();
  }
}
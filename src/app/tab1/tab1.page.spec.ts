import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Tab1Page } from './tab1.page';
import { CounterService } from '../services/counter.service';
import { SavedCounter } from '../models/saved-counter';
import { ToastController } from '@ionic/angular';

describe('Tab1Page', () => {
  let component: Tab1Page;
  let fixture: ComponentFixture<Tab1Page>;
  let counterServiceMock: { add: ReturnType<typeof vi.fn> };
  let toastControllerMock: { create: ReturnType<typeof vi.fn> };
  const sampleCounter: SavedCounter = {
    id: 'test-1',
    name: 'Návštěvníci',
    value: 5,
    createdAt: '2026-10-12T07:00:00.000Z',
  };

  beforeEach(async () => {
    counterServiceMock = {
      add: vi.fn().mockResolvedValue(undefined),
    };
    toastControllerMock = {
      create: vi.fn().mockResolvedValue({
        present: vi.fn().mockResolvedValue(undefined),
      }),
    };

    await TestBed.configureTestingModule({
      imports: [Tab1Page],
      providers: [
        { provide: CounterService, useValue: counterServiceMock },
        { provide: ToastController, useValue: toastControllerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Tab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delegate saving to CounterService', async () => {
    await component.onSaved(sampleCounter);
    expect(counterServiceMock.add).toHaveBeenCalledWith(sampleCounter);
  });
});
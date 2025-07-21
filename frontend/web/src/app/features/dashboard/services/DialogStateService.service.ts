import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogStateService {
  private modalOpenSubject = new BehaviorSubject<boolean>(false);
  modalOpen$ = this.modalOpenSubject.asObservable();

  setModalOpen(state: boolean) {
    this.modalOpenSubject.next(state);
  }

  getModalOpenValue(): boolean {
    return this.modalOpenSubject.value;
  }

}

import { Component } from '@angular/core';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';
import { AddResourceDialogComponent } from "./components/add-resource-dialog/add-resource-dialog.component";
import { DialogStateService } from './services/DialogStateService.service';

@Component({
  selector: 'dtp-dashboard',
  imports: [SidebarComponent, RouterOutlet, AddResourceDialogComponent],
  templateUrl: './dashboard.component.html',
})
export default class DashboardComponent { 
  visible = false;

  constructor(private modalService: DialogStateService) {}

  ngOnInit() {
    this.modalService.modalOpen$.subscribe(state => {
      this.visible = state;
    });
  }

  close() {
    this.modalService.setModalOpen(false);
  }
}

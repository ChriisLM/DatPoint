import { Component } from '@angular/core';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'dtp-dashboard',
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
})
export default class DashboardComponent { }

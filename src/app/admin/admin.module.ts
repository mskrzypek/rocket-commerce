import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import {
  NbLayoutModule,
  NbIconModule,
  NbMenuModule,
  NbSidebarModule,
  NbButtonModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';


@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NbLayoutModule,
    NbIconModule,
    NbEvaIconsModule,
    NbLayoutModule,
    NbSidebarModule,
    NbMenuModule,
    NbButtonModule
  ]
})
export class AdminModule {

  title = 'Rocket Commerce';

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title);
  }

}

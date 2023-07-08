import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoadingService } from './_shared/components/loading/loading.service';
import { LoadingComponent } from "./_shared/components/loading/loading.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, RouterOutlet, LoadingComponent]
})
export class AppComponent {
  loadingService = inject(LoadingService);
}

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UNIVERSES } from '../../core/models/character.model';
@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  readonly universes = UNIVERSES;
  broken: boolean[] = [];
  markBroken(i: number): void {
    this.broken[i] = true;
  }
}

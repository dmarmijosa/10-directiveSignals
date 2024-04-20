import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { User } from '../../interfaces/user.interface';

@Component({
  templateUrl: './user-info-page.component.html',
  styleUrl: './user-info-page.component.css',
})
export class UserInfoPageComponent implements OnInit {
  ngOnInit(): void {
    this.loadUser(this.userId());
  }
  private userService = inject(UserServiceService);
  userId = signal(1);
  currentUser = signal<User | undefined>(undefined);
  userWasFound = signal(true);
  fullName = computed<string>(() => {
    if (!this.currentUser()) return 'Usuario no encontrado';
    return `${this.currentUser()?.first_name} ${this.currentUser()?.last_name}`;
  });

  loadUser(id: number) {
    if (id <= 0) return;
    this.userId.set(id);
    this.userService.getUserById(id).subscribe({
      next: (user) => {
        this.currentUser.set(user);
        this.userWasFound.set(true);
      },
      error: ()=> {
        this.userWasFound.set(false);
        this.currentUser.set(undefined)
      }
    });
  }
}

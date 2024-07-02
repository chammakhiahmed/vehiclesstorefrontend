import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  userForm: FormGroup;
  editingUserId: number | null = null;

  constructor(private fb: FormBuilder, private UserService: UserService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['client', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.UserService.getUsers().subscribe(
      (data: any[]) => {
        this.users = data;
      },
      (error) => {
        console.error('Error loading users', error);
      }
    );
  }

  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.UserService.deleteUser(userId).subscribe(
        () => {
          this.users = this.users.filter(user => user.id !== userId);
        },
        (error) => {
          console.error('Error deleting user', error);
        }
      );
    }
  }
 

  addUser(): void {
    if (this.userForm.invalid) {
      return;
    }

    const userData = this.userForm.value;

    this.UserService.addUser(userData).subscribe(
      () => {
        this.loadUsers();
        this.userForm.reset();
      },
      (error) => {
        console.error('Error adding user', error);
      }
    );
  }

  editUser(userId: number): void {
    this.editingUserId = userId;
    const user = this.users.find(u => u.id === userId);
    if (user) {
      this.userForm.patchValue(user);
    }
  }

  updateUser(): void {
    if (this.userForm.invalid || this.editingUserId === null) {
      return;
    }

    const userData = this.userForm.value;

    this.UserService.updateUser(this.editingUserId, userData).subscribe(
      () => {
        this.loadUsers();
        this.userForm.reset();
        this.editingUserId = null;
      },
      (error) => {
        console.error('Error updating user', error);
      }
    );
  }

  
}
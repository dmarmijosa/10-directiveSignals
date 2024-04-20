import { Component, signal } from '@angular/core';
interface MenuItem {
  title: string;
  router: string;
}

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
})
export class SideMenuComponent {
  public menuItems = signal<MenuItem[]>([
    { title: 'Contador', router: 'counter' },
    { title: 'Información', router: 'user-info' },
    { title: 'Mutaciones', router: 'properties' },
  ]);
  // menuItems:MenuItem[]=[
  //   {title: 'Contador',router:'counter'},
  //   {title: 'user-info',router:'user-info'},
  //   {title: 'Mutaciones',router:'properties'}
  // ];
}

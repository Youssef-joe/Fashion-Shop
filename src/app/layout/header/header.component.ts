import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  items?: MenuItem[];

  ngOnInit() {
    this.items = [
        {label: 'Home', icon:'pi pi-fw pi-home', routerLink:'/'},
        {label: 'shop', icon:'pi pi-fw pi-shopping-bag', routerLink:'/shop'},
        {
          label:'categories', icon:'pi pi-fw pi-list', 
          items: [
            {label: 'electronics', routerLink:'categories/electronics'},
            {label: 'fashion', routerLink:'categories/fashion'},
            {label:'home & garten', routerLink:'categories/home-garten'}
          ]
        },
        {label:'contact', icon:'pi pi-fw pi-phone', routerLink:'/contact'}
    ]
  }

}

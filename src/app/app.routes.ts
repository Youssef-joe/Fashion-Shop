import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ShopComponent } from './shop/shop.component';
import { RegisterComponent } from './register/register.component';



export const routes: Routes = [
    { path: '', component: HomeComponent },
    {path: 'contact', component: ContactComponent},
    {path: 'shop', component: ShopComponent},
    {path: 'register', component:RegisterComponent}
    
    
];

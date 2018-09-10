import { CartService } from './service/cart.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {HttpClientModule} from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { ContactComponent } from './contact/contact.component';
import { CollectingComponent } from './collecting/collecting.component';
import { CartComponent } from './cart/cart.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UserService } from './service/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { DetailsComponent } from './details/details.component'; 


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'cart', component: CartComponent },
  { path: 'pizza', component: CollectingComponent },
  { path: 'pasta', component: CollectingComponent },
  { path: 'drink', component: CollectingComponent },
  { path: 'confirmation/:totalPrice', component: ConfirmationComponent },
  { path: 'details/:productId', component: DetailsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    ContactComponent,
    CollectingComponent,
    CartComponent,
    HomeComponent,
    AboutComponent,
    ConfirmationComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule  
  ],
  providers: [UserService, CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }

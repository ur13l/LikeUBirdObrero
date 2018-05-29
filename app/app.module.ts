import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule, routes } from "~/app.routing";
import { AppComponent } from "~/app.component";
import { StartComponent } from "~/components/start/start.component";
import { SignUpComponent } from "~/components/sign-up/sign-up.component";
import { SignInComponent } from "~/components/sign-in/sign-in.component";
import { ServiceDetailComponent } from "~/components/service-detail/service-detail.component";
import { HomeComponent } from "~/components/home/home.component";
import { DrawerComponent } from "~/components/drawer/drawer.component";
import { WorkerItemComponent } from "~/components/worker-item/worker-item.component";
import { WorkerDetailComponent } from "~/components/worker-detail/worker-detail.component";
import { MyOrdersComponent } from "~/components/my-orders/my-orders.component";
import { NativeScriptLocalizeModule } from "nativescript-localize/angular";
import {NativeScriptFormsModule} from "nativescript-angular/forms"
import { AuthService } from "~/services/auth.service";
import { JsonService } from "~/services/json.service";
import { RedirectAuthGuard } from "~/guards/redirect-auth.guard";
import { AuthGuard } from "~/guards/auth.guard";
import { CustomFormsModule } from 'ng4-validators'
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";
import { Drawer2Component } from "~/components/drawer2/drawer2.component";
import { ServiceService } from "~/services/service.service";
import { WorkersService } from "~/services/workers.service";
import { PaymentService } from "~/services/payment.service";
import { OrderDetailComponent } from "~/components/order-detail/order-detail.component";
import { OrdersService } from "~/services/orders.service";
import { ConfirmOrderComponent } from "~/components/confirm-order/confirm-order.component";
import { DropDownModule } from "nativescript-drop-down/angular";
import { Drawer3Component } from "~/components/drawer3/drawer3.component";
import { TitleService } from "~/services/title.service";
import { OrderComponent } from "~/components/order/order.component";
import { HelpComponent } from "~/components/help/help.component";
import { OrderTrackingComponent } from "~/components/order-tracking/order-tracking.component";
import { SettingsComponent } from "~/components/settings/settings.component";
import { MarketPlaceComponent } from "~/components/market-place/market-place.component";
import { PaymentMethodsComponent } from "~/components/payment-methods/payment-methods.component";
import { AddPaymentMethodComponent } from "~/components/add-payment-method/add-payment-method.component";
import * as platform from "platform";
import { MapService } from "~/services/map.service";
import { RatingComponent } from "~/components/rating/rating.component";
import { ConfirmServiceComponent } from "~/components/confirm-service/confirm-service.component";
import { HistoryComponent } from "~/components/history/history.component";
import { PaymentsComponent } from "~/components/payments/payments.component";
import { ServiceConfirmedComponent } from "~/components/service-confirmed/service-confirmed.component";
declare var GMSServices: any;

if (platform.isIOS) { 
    GMSServices.provideAPIKey("AIzaSyAtAvECmuThQGOKF9jkL06wKsuakRtZTcc");
  }
// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from "nativescript-angular/http";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule, 
        //AppRoutingModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(routes),
        DropDownModule,
        CustomFormsModule,
        NativeScriptUISideDrawerModule
    ],
    declarations: [
        AppComponent,
        StartComponent,
        SignUpComponent,
        SignInComponent,
        HomeComponent,
        ServiceDetailComponent,
        DrawerComponent,
        Drawer2Component,
        Drawer3Component,
        WorkerItemComponent,
        WorkerDetailComponent,
        OrderDetailComponent,
        ConfirmOrderComponent,
        MyOrdersComponent,
        OrderComponent,
        HelpComponent,
        OrderTrackingComponent,
        SettingsComponent,
        MarketPlaceComponent,
        PaymentMethodsComponent,
        AddPaymentMethodComponent,
        RatingComponent,
        ConfirmServiceComponent,
        HistoryComponent,
        PaymentsComponent,
        ServiceConfirmedComponent
    ],
    providers: [
        AuthService,
        JsonService,
        ServiceService,
        WorkersService,
        OrdersService,
        TitleService,
        MapService,
        PaymentService,
        //Guards
        RedirectAuthGuard,
        AuthGuard
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})


/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {
    
 }

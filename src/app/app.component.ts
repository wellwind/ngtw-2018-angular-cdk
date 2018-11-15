import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Component, Injector } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private overlay: Overlay, private injector: Injector) {}

  showDialog() {
    const strategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const config = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
      positionStrategy: strategy
    });

    const overlayRef = this.overlay.create(config);

    const injector = new PortalInjector(
      this.injector,
      new WeakMap<any, any>([[OverlayRef, overlayRef]])
    );

    overlayRef.attach(new ComponentPortal(DialogComponent, null, injector));
  }
}

import {
  Component,
  HostBinding,
  ViewEncapsulation,
  ViewChild,
  AfterViewInit
} from "@angular/core";

import {
  SohoPersonalizeDirective,
  SohoRenderLoopService,
  SohoApplicationMenuComponent,
  SohoModalDialogService
} from "ids-enterprise-ng";

import { IdmModalComponent } from './idm-modal/idm-modal.component';

@Component({
  selector: "body", // tslint:disable-line
  templateUrl: "app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
  /**
   * Local Storage Key
   */
  private static IS_APPLICATION_MENU_OPEN_KEY = "is-application-menu-open";

  @ViewChild(SohoApplicationMenuComponent, { static: true })
  public applicationMenu: SohoApplicationMenuComponent;

  @ViewChild(SohoPersonalizeDirective, { static: true })
  personalize: SohoPersonalizeDirective;

  @HostBinding("class.no-scroll") get isNoScroll() {
    return true;
  }

  /**
   * Include the uplift icons only if required by the current theme, this
   * is not quite perfect, as we need to listen for the theme change here.
   * Maybe wrap all the icons into their own component?
   */
  public useUpliftIcons = true;

  public personalizeOptions: SohoPersonalizeOptions = {};

  constructor(
    private readonly renderLoop: SohoRenderLoopService,
    private modalService: SohoModalDialogService
  ) {
    // Init render loop manually for Angular applications
    // Ensures requestAnimationFrame is running outside of Angular Zone
    this.renderLoop.start();
  }

  ngAfterViewInit(): void {
    /**
     * Note: If using an input like [triggers]="[ '.application-menu-trigger' ]"
     * hookup the app menu trigger once the afterViewInit is called. This will
     * ensure that the toolbar has had a chance to create the application-menu-trugger
     * button.
     * this.applicationMenu.triggers = [ '.application-menu-trigger' ];
     */
    if (this.isApplicationMenuOpen) {
      this.applicationMenu.openMenu(true, true);
    } else {
      this.applicationMenu.closeMenu();
    }
  }

  public get isApplicationMenuOpen(): boolean {
    const valueString = localStorage.getItem(
      AppComponent.IS_APPLICATION_MENU_OPEN_KEY
    );
    return valueString ? valueString === "true" : true;
  }

  public set isApplicationMenuOpen(open: boolean) {
    localStorage.setItem(
      AppComponent.IS_APPLICATION_MENU_OPEN_KEY,
      open ? "true" : "false"
    );
  }

  onChangeTheme(ev: SohoPersonalizeEvent) {
    this.useUpliftIcons =
      ev.data.theme === "theme-uplift-light" ||
      ev.data.theme === "theme-uplift-dark" ||
      ev.data.theme === "theme-uplift-contrast";
  }

  public onMenuVisibility(visible: boolean): void {
    if (this.isApplicationMenuOpen !== visible) {
      this.isApplicationMenuOpen = visible;
    }
  }

  public onClick(): void {
    const dialogRef = this.modalService
      .modal<IdmModalComponent>(IdmModalComponent)
      .apply(
        (idmModalComponent): void => {
          idmModalComponent.images = [
            "https://i.pinimg.com/originals/cc/18/8c/cc188c604e58cffd36e1d183c7198d21.jpg",
            "https://i.pinimg.com/originals/6c/70/53/6c7053f176c9e1ed8d8b25bd588ce070.jpg",
            "https://i.pinimg.com/originals/09/d2/8f/09d28f2ea24e8aadca6f17ab90e4ee19.jpg"
          ]
        }
      )
      .cssClass("idm-modal")
      .buttons([
        {
          text: "Close",
          click: (): void => {
            dialogRef.close("CLOSE");
          },
          isDefault: true
        }
      ])
      .open();
  }
}

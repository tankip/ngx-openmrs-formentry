/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { EncounterAdapter } from '../../form-entry/value-adapters/encounter.adapter';
import { EncounterPdfViewerService } from '../encounter-pdf-viewer.service';
export class EncounterContainerComponent {
    /**
     * @param {?} encAdapter
     * @param {?} encounterPdfViewerService
     */
    constructor(encAdapter, encounterPdfViewerService) {
        this.encAdapter = encAdapter;
        this.encounterPdfViewerService = encounterPdfViewerService;
    }
    /**
     * @param {?} form
     * @return {?}
     */
    set form(form) {
        this.$form = form;
    }
    /**
     * @param {?} enc
     * @return {?}
     */
    set encounter(enc) {
        this.$enc = enc;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    displayPdf() {
        this.encounterPdfViewerService.displayPdf(this.$form);
    }
}
EncounterContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'encounter-renderer',
                template: `<a type="button" style="display: block; font-size: 28px; cursor: pointer" class="text-right" (click)="displayPdf()">
  <span class="glyphicon text-primary glyphicon-print"></span>
</a>
<encounter-viewer class="card" [form]="$form" [encounter]="$enc"></encounter-viewer>`,
                styles: [`.card{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12)}`]
            },] },
];
/** @nocollapse */
EncounterContainerComponent.ctorParameters = () => [
    { type: EncounterAdapter, },
    { type: EncounterPdfViewerService, },
];
EncounterContainerComponent.propDecorators = {
    "form": [{ type: Input },],
    "encounter": [{ type: Input },],
};
function EncounterContainerComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    EncounterContainerComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    EncounterContainerComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    EncounterContainerComponent.propDecorators;
    /** @type {?} */
    EncounterContainerComponent.prototype.$form;
    /** @type {?} */
    EncounterContainerComponent.prototype.$enc;
    /** @type {?} */
    EncounterContainerComponent.prototype.encAdapter;
    /** @type {?} */
    EncounterContainerComponent.prototype.encounterPdfViewerService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJlbmNvdW50ZXItdmlld2VyL2VuY291bnRlci1jb250YWluZXIvZW5jb3VudGVyLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBRXJGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBVTVFLE1BQU07Ozs7O0lBV0YsWUFDWSxZQUNBO1FBREEsZUFBVSxHQUFWLFVBQVU7UUFDViw4QkFBeUIsR0FBekIseUJBQXlCO0tBQWdDOzs7OztRQVRqRCxJQUFJLENBQUMsSUFBSTtRQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQzs7Ozs7O1FBRUYsU0FBUyxDQUFDLEdBQUc7UUFDN0IsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7Ozs7O0lBT3BCLFFBQVE7S0FDUDs7OztJQUVELFVBQVU7UUFDTixJQUFJLENBQUMseUJBQXlCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN6RDs7O1lBNUJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixRQUFRLEVBQUU7OztxRkFHdUU7Z0JBQ2pGLE1BQU0sRUFBRSxDQUFDLDRFQUE0RSxDQUFDO2FBQ3pGOzs7O1lBWFEsZ0JBQWdCO1lBRWhCLHlCQUF5Qjs7O3FCQWM3QixLQUFLOzBCQUdMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9mb3JtJztcbmltcG9ydCB7IE5vZGVCYXNlIH0gZnJvbSAnLi4vLi4vZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlJztcbmltcG9ydCB7IEVuY291bnRlckFkYXB0ZXIgfSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L3ZhbHVlLWFkYXB0ZXJzL2VuY291bnRlci5hZGFwdGVyJztcblxuaW1wb3J0IHsgRW5jb3VudGVyUGRmVmlld2VyU2VydmljZSB9IGZyb20gJy4uL2VuY291bnRlci1wZGYtdmlld2VyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2VuY291bnRlci1yZW5kZXJlcicsXG4gICAgdGVtcGxhdGU6IGA8YSB0eXBlPVwiYnV0dG9uXCIgc3R5bGU9XCJkaXNwbGF5OiBibG9jazsgZm9udC1zaXplOiAyOHB4OyBjdXJzb3I6IHBvaW50ZXJcIiBjbGFzcz1cInRleHQtcmlnaHRcIiAoY2xpY2spPVwiZGlzcGxheVBkZigpXCI+XG4gIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIHRleHQtcHJpbWFyeSBnbHlwaGljb24tcHJpbnRcIj48L3NwYW4+XG48L2E+XG48ZW5jb3VudGVyLXZpZXdlciBjbGFzcz1cImNhcmRcIiBbZm9ybV09XCIkZm9ybVwiIFtlbmNvdW50ZXJdPVwiJGVuY1wiPjwvZW5jb3VudGVyLXZpZXdlcj5gLFxuICAgIHN0eWxlczogW2AuY2FyZHtib3gtc2hhZG93OjAgMnB4IDVweCAwIHJnYmEoMCwwLDAsLjE2KSwwIDJweCAxMHB4IDAgcmdiYSgwLDAsMCwuMTIpfWBdXG59KVxuZXhwb3J0IGNsYXNzIEVuY291bnRlckNvbnRhaW5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgcHVibGljICRmb3JtOiBGb3JtO1xuICAgIHB1YmxpYyAkZW5jOiBhbnk7XG5cbiAgICBASW5wdXQoKSBwdWJsaWMgc2V0IGZvcm0oZm9ybSkge1xuICAgICAgICB0aGlzLiRmb3JtID0gZm9ybTtcbiAgICB9XG4gICAgQElucHV0KCkgcHVibGljIHNldCBlbmNvdW50ZXIoZW5jKSB7XG4gICAgICAgIHRoaXMuJGVuYyA9IGVuYztcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlbmNBZGFwdGVyOiBFbmNvdW50ZXJBZGFwdGVyLFxuICAgICAgICBwcml2YXRlIGVuY291bnRlclBkZlZpZXdlclNlcnZpY2U6IEVuY291bnRlclBkZlZpZXdlclNlcnZpY2UpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgfVxuXG4gICAgZGlzcGxheVBkZigpIHtcbiAgICAgICAgdGhpcy5lbmNvdW50ZXJQZGZWaWV3ZXJTZXJ2aWNlLmRpc3BsYXlQZGYodGhpcy4kZm9ybSk7XG4gICAgfVxufVxuIl19
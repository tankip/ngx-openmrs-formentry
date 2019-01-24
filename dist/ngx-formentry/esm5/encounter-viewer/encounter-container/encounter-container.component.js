/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { EncounterAdapter } from '../../form-entry/value-adapters/encounter.adapter';
import { EncounterPdfViewerService } from '../encounter-pdf-viewer.service';
var EncounterContainerComponent = /** @class */ (function () {
    function EncounterContainerComponent(encAdapter, encounterPdfViewerService) {
        this.encAdapter = encAdapter;
        this.encounterPdfViewerService = encounterPdfViewerService;
    }
    Object.defineProperty(EncounterContainerComponent.prototype, "form", {
        set: /**
         * @param {?} form
         * @return {?}
         */
        function (form) {
            this.$form = form;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EncounterContainerComponent.prototype, "encounter", {
        set: /**
         * @param {?} enc
         * @return {?}
         */
        function (enc) {
            this.$enc = enc;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    EncounterContainerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    EncounterContainerComponent.prototype.displayPdf = /**
     * @return {?}
     */
    function () {
        this.encounterPdfViewerService.displayPdf(this.$form);
    };
    EncounterContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'encounter-renderer',
                    template: "<a type=\"button\" style=\"display: block; font-size: 28px; cursor: pointer\" class=\"text-right\" (click)=\"displayPdf()\">\n  <span class=\"glyphicon text-primary glyphicon-print\"></span>\n</a>\n<encounter-viewer class=\"card\" [form]=\"$form\" [encounter]=\"$enc\"></encounter-viewer>",
                    styles: [".card{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12)}"]
                },] },
    ];
    /** @nocollapse */
    EncounterContainerComponent.ctorParameters = function () { return [
        { type: EncounterAdapter, },
        { type: EncounterPdfViewerService, },
    ]; };
    EncounterContainerComponent.propDecorators = {
        "form": [{ type: Input },],
        "encounter": [{ type: Input },],
    };
    return EncounterContainerComponent;
}());
export { EncounterContainerComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJlbmNvdW50ZXItdmlld2VyL2VuY291bnRlci1jb250YWluZXIvZW5jb3VudGVyLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBRXJGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOztJQXFCeEUscUNBQ1ksWUFDQTtRQURBLGVBQVUsR0FBVixVQUFVO1FBQ1YsOEJBQXlCLEdBQXpCLHlCQUF5QjtLQUFnQzswQkFUakQsNkNBQUk7Ozs7O2tCQUFDLElBQUk7WUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7Ozs7OzBCQUVGLGtEQUFTOzs7OztrQkFBQyxHQUFHO1lBQzdCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDOzs7Ozs7OztJQU9wQiw4Q0FBUTs7O0lBQVI7S0FDQzs7OztJQUVELGdEQUFVOzs7SUFBVjtRQUNJLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3pEOztnQkE1QkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRSxrU0FHdUU7b0JBQ2pGLE1BQU0sRUFBRSxDQUFDLDRFQUE0RSxDQUFDO2lCQUN6Rjs7OztnQkFYUSxnQkFBZ0I7Z0JBRWhCLHlCQUF5Qjs7O3lCQWM3QixLQUFLOzhCQUdMLEtBQUs7O3NDQXRCVjs7U0FlYSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9mb3JtJztcbmltcG9ydCB7IE5vZGVCYXNlIH0gZnJvbSAnLi4vLi4vZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlJztcbmltcG9ydCB7IEVuY291bnRlckFkYXB0ZXIgfSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L3ZhbHVlLWFkYXB0ZXJzL2VuY291bnRlci5hZGFwdGVyJztcblxuaW1wb3J0IHsgRW5jb3VudGVyUGRmVmlld2VyU2VydmljZSB9IGZyb20gJy4uL2VuY291bnRlci1wZGYtdmlld2VyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2VuY291bnRlci1yZW5kZXJlcicsXG4gICAgdGVtcGxhdGU6IGA8YSB0eXBlPVwiYnV0dG9uXCIgc3R5bGU9XCJkaXNwbGF5OiBibG9jazsgZm9udC1zaXplOiAyOHB4OyBjdXJzb3I6IHBvaW50ZXJcIiBjbGFzcz1cInRleHQtcmlnaHRcIiAoY2xpY2spPVwiZGlzcGxheVBkZigpXCI+XG4gIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIHRleHQtcHJpbWFyeSBnbHlwaGljb24tcHJpbnRcIj48L3NwYW4+XG48L2E+XG48ZW5jb3VudGVyLXZpZXdlciBjbGFzcz1cImNhcmRcIiBbZm9ybV09XCIkZm9ybVwiIFtlbmNvdW50ZXJdPVwiJGVuY1wiPjwvZW5jb3VudGVyLXZpZXdlcj5gLFxuICAgIHN0eWxlczogW2AuY2FyZHtib3gtc2hhZG93OjAgMnB4IDVweCAwIHJnYmEoMCwwLDAsLjE2KSwwIDJweCAxMHB4IDAgcmdiYSgwLDAsMCwuMTIpfWBdXG59KVxuZXhwb3J0IGNsYXNzIEVuY291bnRlckNvbnRhaW5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgcHVibGljICRmb3JtOiBGb3JtO1xuICAgIHB1YmxpYyAkZW5jOiBhbnk7XG5cbiAgICBASW5wdXQoKSBwdWJsaWMgc2V0IGZvcm0oZm9ybSkge1xuICAgICAgICB0aGlzLiRmb3JtID0gZm9ybTtcbiAgICB9XG4gICAgQElucHV0KCkgcHVibGljIHNldCBlbmNvdW50ZXIoZW5jKSB7XG4gICAgICAgIHRoaXMuJGVuYyA9IGVuYztcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlbmNBZGFwdGVyOiBFbmNvdW50ZXJBZGFwdGVyLFxuICAgICAgICBwcml2YXRlIGVuY291bnRlclBkZlZpZXdlclNlcnZpY2U6IEVuY291bnRlclBkZlZpZXdlclNlcnZpY2UpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgfVxuXG4gICAgZGlzcGxheVBkZigpIHtcbiAgICAgICAgdGhpcy5lbmNvdW50ZXJQZGZWaWV3ZXJTZXJ2aWNlLmRpc3BsYXlQZGYodGhpcy4kZm9ybSk7XG4gICAgfVxufVxuIl19
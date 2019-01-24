/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncounterViewerComponent } from './encounter-view/encounter-viewer.component';
import { EncounterContainerComponent } from './encounter-container/encounter-container.component';
import { EncounterViewerService } from './encounter-viewer.service';
import { EncounterPdfViewerService } from './encounter-pdf-viewer.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionControlComponent } from './display-controls/question-control.component';
import { FilePreviewComponent } from './display-controls/file-preview.component';
import { RemoteAnswerComponent } from './display-controls/remote-answer.component';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../shared.module';
var EncounterViewerModule = /** @class */ (function () {
    function EncounterViewerModule() {
    }
    EncounterViewerModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        EncounterViewerComponent,
                        EncounterContainerComponent,
                        QuestionControlComponent,
                        FilePreviewComponent,
                        RemoteAnswerComponent
                    ],
                    imports: [
                        FormsModule,
                        ReactiveFormsModule,
                        CommonModule,
                        HttpModule,
                        SharedModule
                    ],
                    providers: [
                        EncounterViewerService,
                        EncounterPdfViewerService
                    ],
                    exports: [
                        EncounterContainerComponent,
                        HttpModule
                    ],
                },] },
    ];
    return EncounterViewerModule;
}());
export { EncounterViewerModule };
function EncounterViewerModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    EncounterViewerModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    EncounterViewerModule.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXZpZXdlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJlbmNvdW50ZXItdmlld2VyL2VuY291bnRlci12aWV3ZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN2RixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUNsRyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDekYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDakYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDbkYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7O2dCQUMvQyxRQUFRLFNBQUM7b0JBQ04sWUFBWSxFQUFFO3dCQUNWLHdCQUF3Qjt3QkFDeEIsMkJBQTJCO3dCQUMzQix3QkFBd0I7d0JBQ3hCLG9CQUFvQjt3QkFDcEIscUJBQXFCO3FCQUN4QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsV0FBVzt3QkFDWCxtQkFBbUI7d0JBQ25CLFlBQVk7d0JBQ1osVUFBVTt3QkFDVixZQUFZO3FCQUNmO29CQUNELFNBQVMsRUFBRTt3QkFDUCxzQkFBc0I7d0JBQ3RCLHlCQUF5QjtxQkFDNUI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLDJCQUEyQjt3QkFDM0IsVUFBVTtxQkFDYjtpQkFDSjs7Z0NBbkNEOztTQW9DYSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEVuY291bnRlclZpZXdlckNvbXBvbmVudCB9IGZyb20gJy4vZW5jb3VudGVyLXZpZXcvZW5jb3VudGVyLXZpZXdlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRW5jb3VudGVyQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9lbmNvdW50ZXItY29udGFpbmVyL2VuY291bnRlci1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEVuY291bnRlclZpZXdlclNlcnZpY2UgfSBmcm9tICcuL2VuY291bnRlci12aWV3ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBFbmNvdW50ZXJQZGZWaWV3ZXJTZXJ2aWNlIH0gZnJvbSAnLi9lbmNvdW50ZXItcGRmLXZpZXdlci5zZXJ2aWNlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUXVlc3Rpb25Db250cm9sQ29tcG9uZW50IH0gZnJvbSAnLi9kaXNwbGF5LWNvbnRyb2xzL3F1ZXN0aW9uLWNvbnRyb2wuY29tcG9uZW50JztcbmltcG9ydCB7IEZpbGVQcmV2aWV3Q29tcG9uZW50IH0gZnJvbSAnLi9kaXNwbGF5LWNvbnRyb2xzL2ZpbGUtcHJldmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgUmVtb3RlQW5zd2VyQ29tcG9uZW50IH0gZnJvbSAnLi9kaXNwbGF5LWNvbnRyb2xzL3JlbW90ZS1hbnN3ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEh0dHBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC5tb2R1bGUnO1xuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgRW5jb3VudGVyVmlld2VyQ29tcG9uZW50LFxuICAgICAgICBFbmNvdW50ZXJDb250YWluZXJDb21wb25lbnQsXG4gICAgICAgIFF1ZXN0aW9uQ29udHJvbENvbXBvbmVudCxcbiAgICAgICAgRmlsZVByZXZpZXdDb21wb25lbnQsXG4gICAgICAgIFJlbW90ZUFuc3dlckNvbXBvbmVudFxuICAgIF0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBIdHRwTW9kdWxlLFxuICAgICAgICBTaGFyZWRNb2R1bGVcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBFbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlLFxuICAgICAgICBFbmNvdW50ZXJQZGZWaWV3ZXJTZXJ2aWNlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIEVuY291bnRlckNvbnRhaW5lckNvbXBvbmVudCxcbiAgICAgICAgSHR0cE1vZHVsZVxuICAgIF0sXG59KVxuZXhwb3J0IGNsYXNzIEVuY291bnRlclZpZXdlck1vZHVsZSB7fVxuIl19
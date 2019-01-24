/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, Inject } from '@angular/core';
import 'hammerjs';
import { DEFAULT_STYLES } from './form-renderer.component.css';
import { DOCUMENT } from '@angular/common';
import { DataSources } from '../data-sources/data-sources';
import { NodeBase, GroupNode } from '../form-factory/form-node';
import { AfeFormGroup } from '../../abstract-controls-extension/afe-form-group';
import { ValidationFactory } from '../form-factory/validation.factory';
import { FormErrorsService } from '../services/form-errors.service';
export class FormRendererComponent {
    /**
     * @param {?} validationFactory
     * @param {?} dataSources
     * @param {?} formErrorsService
     * @param {?} document
     */
    constructor(validationFactory, dataSources, formErrorsService, document) {
        this.validationFactory = validationFactory;
        this.dataSources = dataSources;
        this.formErrorsService = formErrorsService;
        this.document = document;
        this.childComponents = [];
        this.isCollapsed = false;
        this.activeTab = 0;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.setUpRemoteSelect();
        this.setUpFileUpload();
        if (this.node && this.node.form) {
            const /** @type {?} */ tab = this.node.form.valueProcessingInfo.lastFormTab;
            if (tab && tab !== this.activeTab) {
                this.activeTab = tab;
            }
        }
        if (this.node && this.node.question.renderingType === 'form') {
            this.formErrorsService.announceErrorField$.subscribe((error) => {
                this.scrollToControl(error);
            });
        }
        if (this.node && this.node.question.renderingType === 'section') {
            this.isCollapsed = !(/** @type {?} */ (this.node.question)).isExpanded;
        }
        if (this.parentComponent) {
            this.parentComponent.addChildComponent(this);
        }
    }
    /**
     * @param {?} child
     * @return {?}
     */
    addChildComponent(child) {
        this.childComponents.push(child);
    }
    /**
     * @return {?}
     */
    setUpRemoteSelect() {
        if (this.node && this.node.question.extras &&
            this.node.question.renderingType === 'remote-select') {
            this.dataSource = this.dataSources.dataSources[this.node.question.dataSource];
            if (this.dataSource && this.node.question.dataSourceOptions) {
                this.dataSource.dataSourceOptions = this.node.question.dataSourceOptions;
            }
        }
    }
    /**
     * @return {?}
     */
    setUpFileUpload() {
        if (this.node && this.node.question.extras && this.node.question.renderingType === 'file') {
            this.dataSource = this.dataSources.dataSources[this.node.question.dataSource];
            // console.log('Key', this.node.question);
            // console.log('Data source', this.dataSource);
        }
    }
    /**
     * @param {?} node
     * @return {?}
     */
    checkSection(node) {
        if (node.question.renderingType === 'section') {
            let /** @type {?} */ groupChildrenHidden = false;
            const /** @type {?} */ allSectionControlsHidden = Object.keys(node.children).every((k) => {
                const /** @type {?} */ innerNode = node.children[k];
                if (innerNode instanceof GroupNode) {
                    groupChildrenHidden = Object.keys(innerNode.children).every((i) => innerNode.children[i].control.hidden);
                }
                return node.children[k].control.hidden || groupChildrenHidden;
            });
            return !allSectionControlsHidden;
        }
        return true;
    }
    /**
     * @param {?} tabNumber
     * @return {?}
     */
    clickTab(tabNumber) {
        this.activeTab = tabNumber;
    }
    /**
     * @return {?}
     */
    loadPreviousTab() {
        if (!this.isCurrentTabFirst()) {
            this.clickTab(this.activeTab - 1);
            document.body.scrollTop = 0;
        }
    }
    /**
     * @return {?}
     */
    isCurrentTabFirst() {
        return this.activeTab === 0;
    }
    /**
     * @return {?}
     */
    isCurrentTabLast() {
        return this.activeTab === this.node.question['questions'].length - 1;
    }
    /**
     * @return {?}
     */
    loadNextTab() {
        if (!this.isCurrentTabLast()) {
            this.clickTab(this.activeTab + 1);
            document.body.scrollTop = 0;
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    tabSelected($event) {
        this.activeTab = $event;
        this.setPreviousTab();
    }
    /**
     * @return {?}
     */
    setPreviousTab() {
        if (this.node && this.node.form) {
            this.node.form.valueProcessingInfo['lastFormTab'] = this.activeTab;
        }
    }
    /**
     * @return {?}
     */
    hasErrors() {
        return this.node.control.touched && !this.node.control.valid;
    }
    /**
     * @return {?}
     */
    errors() {
        return this.getErrors(this.node);
    }
    /**
     * @param {?} error
     * @return {?}
     */
    scrollToControl(error) {
        const /** @type {?} */ tab = +error.split(',')[0];
        const /** @type {?} */ elSelector = error.split(',')[1] + 'id';
        // the tab components
        const /** @type {?} */ tabComponent = this.childComponents[tab];
        this.clickTab(tab);
        setTimeout(() => {
            // expand all sections
            tabComponent.childComponents.forEach((section) => {
                section.isCollapsed = false;
                setTimeout(() => {
                    const /** @type {?} */ element = this.document.getElementById(elSelector);
                    if (element !== null && element.focus) {
                        element.focus();
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 100);
            });
        }, 200);
    }
    /**
     * @param {?} node
     * @return {?}
     */
    onDateChanged(node) {
        // console.log('Node', node);
        this.node = node;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    upload(event) {
        // console.log('Event', event);
        // console.log('Data', this.dataSource);
    }
    /**
     * @param {?} infoId
     * @return {?}
     */
    toggleInformation(infoId) {
        const /** @type {?} */ e = document.getElementById(infoId);
        if (e.style.display === 'block') {
            e.style.display = 'none';
        }
        else {
            e.style.display = 'block';
        }
        console.log('InfoId', infoId);
    }
    /**
     * @param {?} node
     * @return {?}
     */
    getErrors(node) {
        const /** @type {?} */ errors = node.control.errors;
        if (errors) {
            return this.validationFactory.errors(errors, node.question);
        }
        return [];
    }
}
FormRendererComponent.decorators = [
    { type: Component, args: [{
                selector: 'form-renderer',
                template: `<!--CONTAINERS-->
<div *ngIf="node.question.renderingType === 'form'">
  <div class="dropdown dropdown-tabs forms-dropdown">
    <a class="btn dropdown-toggle" data-toggle="dropdown">
      <i class="fa fa-angle-double-down"></i>
    </a>
    <ul class="dropdown-menu dropdown-menu-right forms-dropdown-menu" role="menu" aria-labelledby="dropdownMenu">
      <li *ngFor="let question of node.question.questions; let i = index;" (click)="clickTab(i)">
        {{question.label}}
      </li>
    </ul>
  </div>
  <mat-tab-group (selectedIndexChange)='tabSelected($event)' [selectedIndex]='activeTab'>
    <mat-tab [label]='question.label' *ngFor="let question of node.question.questions; let i = index;">
        <div (swipeLeft)='loadNextTab()' (swipeRight)='loadPreviousTab()'>
          <form-renderer [node]="node.children[question.key]" [parentComponent]="this" [parentGroup]="node.control"></form-renderer>
        </div>
    </mat-tab>
  </mat-tab-group>

  <div style="text-align: center;">
    <button type="button" class="btn btn-default" (click)="loadPreviousTab()" [ngClass]="{disabled: isCurrentTabFirst()}">&lt;&lt;</button>
    <button type="button" class="btn btn-default" (click)="loadNextTab()" [ngClass]="{disabled: isCurrentTabLast()}">
      &gt;&gt;</button>
  </div>
</div>
<div *ngIf="node.question.renderingType === 'page'">
  <!--<h2>{{node.question.label}}</h2>-->
  <form-renderer *ngFor="let question of node.question.questions" [parentComponent]="this" [node]="node.children[question.key]"
    [parentGroup]="parentGroup"></form-renderer>
</div>
<div *ngIf="node.question.renderingType === 'section' && checkSection(node)"> 
  <div class="panel  panel-primary">
    <div class="panel-heading">
      <button type="button" class="btn btn-primary pull-right" (click)="isCollapsed = !isCollapsed">
        {{isCollapsed ? 'Show' : 'Hide'}}
      </button> {{node.question.label}}
    </div>
    <div class="panel-body" [collapse]="isCollapsed">
      <form-renderer *ngFor="let question of node.question.questions" [parentComponent]="this" [node]="node.children[question.key]"
        [parentGroup]="parentGroup"></form-renderer>
    </div>
  </div>
</div>

<!-- MESSAGES -->
<div *ngIf="node.control && node.control.alert && node.control.alert !== ''" class="alert alert-warning">
  <a class="close" data-dismiss="alert">&times;</a> {{node.control.alert}}
</div>

<!--CONTROLS-->

<div *ngIf="node.question.controlType === 0" class="form-group" [formGroup]="parentGroup" [hidden]="node.control.hidden"
  [ngClass]="{disabled: node.control.disabled}">
  <!--LEAF CONTROL-->
  <div class="question-area">
    <a class="form-tooltip pull-right" (click)="toggleInformation(node.question.extras.id)" data-placement="right" *ngIf="node.question && node.question.extras.questionInfo  && node.question.extras.questionInfo !== ''  && node.question.extras.questionInfo !== ' '">
      <i class="glyphicon glyphicon-question-sign" aria-hidden="true"></i>
    </a>

    <label *ngIf="node.question.label" [style.color]="hasErrors()? 'red' :''" class="control-label" [attr.for]="node.question.key">
      {{node.question.required ? '*':''}} {{node.question.label}}
    </label>
    <div [ngSwitch]="node.question.renderingType">
      <select class="form-control" *ngSwitchCase="'select'" [formControlName]="node.question.key" [id]="node.question.key + 'id'">
        <option *ngFor="let o of node.question.options" [ngValue]="o.value">{{o.label}}
        </option>
      </select>
      <remote-file-upload *ngSwitchCase="'file'" [dataSource]="dataSource" [formControlName]="node.question.key" [id]="node.question.key + 'id'"
        (fileChanged)="upload($event)">
      </remote-file-upload>
      <textarea [placeholder]="node.question.placeholder" [rows]="node.question.rows" class="form-control" *ngSwitchCase="'textarea'"
        [formControlName]="node.question.key" [id]="node.question.key + 'id'">
      </textarea>
      <remote-select *ngSwitchCase="'remote-select'" [placeholder]="node.question.placeholder" tabindex="0" [dataSource]="dataSource"
        [componentID]="node.question.key + 'id'" [formControlName]="node.question.key" [id]="node.question.key + 'id'"></remote-select>
  <!--  
      <date-time-picker *ngSwitchCase="'date'" [showTime]="node.question.showTime" tabindex="0" [weeks]='node.question.extras.questionOptions.weeksList'
        (onDateChange)="onDateChanged(node)" [showWeeks]="node.question.showWeeksAdder" [formControlName]="node.question.key"
        [id]="node.question.key + 'id'"></date-time-picker>
  -->

      <ngx-date-time-picker *ngSwitchCase="'date'" [showTime]="node.question.showTime" [id]="node.question.key + 'id'" 
            [formControlName]="node.question.key" [weeks]='node.question.extras.questionOptions.weeksList'
            (onDateChange)="onDateChanged(node)" [showWeeks]="node.question.showWeeksAdder" ></ngx-date-time-picker>
      <ng-select *ngSwitchCase="'multi-select'" [style.height]="'auto'"  [style.overflow-x]="'hidden'" tabindex="0" [formControlName]="node.question.key"
        [id]="node.question.key + 'id'" [options]="node.question.options" [multiple]="true">
      </ng-select>
      <ng-select *ngSwitchCase="'single-select'" [style.height]='auto' tabindex="0" [formControlName]="node.question.key"
      [id]="node.question.key + 'id'" [options]="node.question.options" [multiple]="false">
      </ng-select>
      <input class="form-control" *ngSwitchCase="'number'" [formControlName]="node.question.key " [attr.placeholder]="node.question.placeholder "
        [type]="'number'" [id]="node.question.key + 'id' " [step]="'any'" [min]="node.question.extras.questionOptions.min"
        [max]="node.question.extras.questionOptions.max">
      <input class="form-control" *ngSwitchDefault [formControlName]="node.question.key " [attr.placeholder]="node.question.placeholder "
        [type]="node.question.renderingType" [id]="node.question.key + 'id' ">

      <div *ngSwitchCase="'radio'">
        <div *ngFor="let o of node.question.options">
          <label class="form-control no-border">
            <input type="radio" [formControlName]="node.question.key" [id]="node.question.key + 'id'" [value]="o.value"> {{ o.label }}
          </label>
        </div>
      </div>

      <div *ngSwitchCase="'checkbox'">
        <checkbox [id]="node.question.key + 'id'" [formControlName]="node.question.key" [options]="node.question.options"></checkbox>
      </div>

      <div *ngIf="node.question.enableHistoricalValue && node.question.historicalDisplay" style="margin-top: 2px;">
        <div class="container-fluid">
          <div class="row">
            <div class="col-xs-9">
              <span class="text-warning">Previous Value: </span>
              <strong>{{node.question.historicalDisplay?.text}}</strong>
              <span *ngIf="node.question.showHistoricalValueDate">
                <span> | </span>
                <strong class="text-primary">{{node.question.historicalDisplay?._date}} </strong>
                <span class="text-primary" *ngIf="node.question.historicalDisplay && node.question.historicalDisplay._date "> ({{node.question.historicalDisplay._date | timeAgo}})</span>
              </span>

            </div>
            <button type="button" [node]="node" [name]="'historyValue'" class="btn btn-primary btn-small col-xs-3">Use Value
            </button>
          </div>
        </div>
      </div>
      <appointments-overview [node]="node"></appointments-overview>
      <div *ngIf="hasErrors() ">
        <p *ngFor="let e of errors() ">
          <span class="text-danger ">{{e}}</span>
        </p>
      </div>
    </div>

    <div class="question-info col-md-12 col-lg-12 col-sm-12" id="{{node.question.extras.id}}" *ngIf="node.question && node.question.extras.questionInfo  && node.question.extras.questionInfo !== ''  && node.question.extras.questionInfo !== ' '">
      {{node.question.extras.questionInfo}}
    </div>

  </div>
</div>
<div *ngIf="node.question.controlType === 1" [hidden]="node.control.hidden" [ngClass]="{disabled: node.control.disabled}">


  <!--ARRAY CONTROL-->
  <div [ngSwitch]="node.question.renderingType ">
    <div class='well' style="padding: 2px; " *ngSwitchCase=" 'repeating' ">
      <h4 style="margin: 2px; font-weight: bold;">{{node.question.label}}</h4>
      <hr style="margin-left:-2px; margin-right:-2px; margin-bottom:4px; margin-top:8px; border-width:2px;" />
      <div [ngSwitch]="node.question.extras.type">
        <div *ngSwitchCase="'testOrder'">
          <div *ngFor="let child of node.children; let i=index ">
            <form-renderer *ngFor="let question of child.question.questions " [parentComponent]="this" [node]="child.children[question.key]
            " [parentGroup]="child.control "></form-renderer>
            <div>{{child.orderNumber}}</div>
            <button type="button " class='btn btn-sm btn-danger' (click)="node.removeAt(i) ">Remove</button>
            <br/>
            <hr style="margin-left:-2px; margin-right:-2px; margin-bottom:4px; margin-top:8px; border-width:1px;" />
          </div>
        </div>

        <div *ngSwitchCase="'obsGroup'" style="margin-bottom:20px;">
          <div *ngFor="let child of node.children; let i=index ">
            <form-renderer *ngFor="let question of child.question.questions " [parentComponent]="this" [node]="child.children[question.key]
            " [parentGroup]="child.control "></form-renderer>
            <button type="button " class='btn btn-sm btn-danger' (click)="node.removeAt(i) ">Remove</button>
            <br/>
            <hr style="margin-left:-2px; margin-right:-2px; margin-bottom:4px; margin-top:8px; border-width:1px;" />
          </div>
        </div>
      </div>
      <button type="button " class='btn btn-primary' (click)="node.createChildNode() ">Add</button>
    </div>
  </div>

</div>
<div *ngIf="node.question.controlType === 2" [hidden]="node.control.hidden" [ngClass]="{disabled: node.control.disabled}">

  <!--GROUP-->
  <div [ngSwitch]="node.question.renderingType ">
    <div *ngSwitchCase=" 'group' ">
      <form-renderer *ngFor="let question of node.question.questions " [parentComponent]="this" [node]="node.children[question.key]
            " [parentGroup]="node.control "></form-renderer>
    </div>
    <div *ngSwitchCase=" 'field-set' " style="border: 1px solid #eeeeee; padding: 2px; margin: 2px;">
      <form-renderer *ngFor="let question of node.question.questions " [parentComponent]="this" [node]="node.children[question.key]
            " [parentGroup]="node.control "></form-renderer>
    </div>
  </div>

</div>
`,
                styles: ['../../style/app.css', DEFAULT_STYLES]
            },] },
];
/** @nocollapse */
FormRendererComponent.ctorParameters = () => [
    { type: ValidationFactory, },
    { type: DataSources, },
    { type: FormErrorsService, },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
];
FormRendererComponent.propDecorators = {
    "parentComponent": [{ type: Input },],
    "node": [{ type: Input },],
    "parentGroup": [{ type: Input },],
};
function FormRendererComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FormRendererComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FormRendererComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    FormRendererComponent.propDecorators;
    /** @type {?} */
    FormRendererComponent.prototype.parentComponent;
    /** @type {?} */
    FormRendererComponent.prototype.node;
    /** @type {?} */
    FormRendererComponent.prototype.parentGroup;
    /** @type {?} */
    FormRendererComponent.prototype.childComponents;
    /** @type {?} */
    FormRendererComponent.prototype.showTime;
    /** @type {?} */
    FormRendererComponent.prototype.showWeeks;
    /** @type {?} */
    FormRendererComponent.prototype.activeTab;
    /** @type {?} */
    FormRendererComponent.prototype.dataSource;
    /** @type {?} */
    FormRendererComponent.prototype.isCollapsed;
    /** @type {?} */
    FormRendererComponent.prototype.auto;
    /** @type {?} */
    FormRendererComponent.prototype.validationFactory;
    /** @type {?} */
    FormRendererComponent.prototype.dataSources;
    /** @type {?} */
    FormRendererComponent.prototype.formErrorsService;
    /** @type {?} */
    FormRendererComponent.prototype.document;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1yZW5kZXJlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2Zvcm0tcmVuZGVyZXIvZm9ybS1yZW5kZXJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFDakMsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxVQUFVLENBQUM7QUFDbEIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBWSxTQUFTLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDaEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFdkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUF1TXBFLE1BQU07Ozs7Ozs7SUFjSixZQUNRLG1CQUNBLGFBQ0EsbUJBQ2tCO1FBSGxCLHNCQUFpQixHQUFqQixpQkFBaUI7UUFDakIsZ0JBQVcsR0FBWCxXQUFXO1FBQ1gsc0JBQWlCLEdBQWpCLGlCQUFpQjtRQUNDLGFBQVEsR0FBUixRQUFROytCQVpnQixFQUFFOzJCQUsvQixLQUFLO1FBUXhCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0tBQ3BCOzs7O0lBRU0sUUFBUTtRQUNiLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJ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LFNBQVMsQ0FBQyxJQUFjO1FBQy9CLHVCQUFNLE1BQU0sR0FBUSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUV4QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBRVgsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM3RDtRQUVELE1BQU0sQ0FBQyxFQUFFLENBQUM7Ozs7WUFuWWIsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2dCQUN6QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBK0xYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLHFCQUFxQixFQUFFLGNBQWMsQ0FBQzthQUNoRDs7OztZQXhNUSxpQkFBaUI7WUFIakIsV0FBVztZQUtYLGlCQUFpQjs0Q0F5TnZCLE1BQU0sU0FBQyxRQUFROzs7Z0NBZmYsS0FBSztxQkFDTCxLQUFLOzRCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEluamVjdCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICdoYW1tZXJqcyc7XG5pbXBvcnQgeyBERUZBVUxUX1NUWUxFUyB9IGZyb20gJy4vZm9ybS1yZW5kZXJlci5jb21wb25lbnQuY3NzJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERhdGFTb3VyY2VzIH0gZnJvbSAnLi4vZGF0YS1zb3VyY2VzL2RhdGEtc291cmNlcyc7XG5pbXBvcnQgeyBOb2RlQmFzZSwgTGVhZk5vZGUsIEdyb3VwTm9kZSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuaW1wb3J0IHsgQWZlRm9ybUdyb3VwIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1mb3JtLWdyb3VwJztcbmltcG9ydCB7IFZhbGlkYXRpb25GYWN0b3J5IH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L3ZhbGlkYXRpb24uZmFjdG9yeSc7XG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvZGF0YS1zb3VyY2UnO1xuaW1wb3J0IHsgRm9ybUVycm9yc1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9mb3JtLWVycm9ycy5zZXJ2aWNlJztcbmltcG9ydCB7IFF1ZXN0aW9uR3JvdXAgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvZ3JvdXAtcXVlc3Rpb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmb3JtLXJlbmRlcmVyJyxcbiAgdGVtcGxhdGU6IGA8IS0tQ09OVEFJTkVSUy0tPlxuPGRpdiAqbmdJZj1cIm5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ2Zvcm0nXCI+XG4gIDxkaXYgY2xhc3M9XCJkcm9wZG93biBkcm9wZG93bi10YWJzIGZvcm1zLWRyb3Bkb3duXCI+XG4gICAgPGEgY2xhc3M9XCJidG4gZHJvcGRvd24tdG9nZ2xlXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiPlxuICAgICAgPGkgY2xhc3M9XCJmYSBmYS1hbmdsZS1kb3VibGUtZG93blwiPjwvaT5cbiAgICA8L2E+XG4gICAgPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudSBkcm9wZG93bi1tZW51LXJpZ2h0IGZvcm1zLWRyb3Bkb3duLW1lbnVcIiByb2xlPVwibWVudVwiIGFyaWEtbGFiZWxsZWRieT1cImRyb3Bkb3duTWVudVwiPlxuICAgICAgPGxpICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiBub2RlLnF1ZXN0aW9uLnF1ZXN0aW9uczsgbGV0IGkgPSBpbmRleDtcIiAoY2xpY2spPVwiY2xpY2tUYWIoaSlcIj5cbiAgICAgICAge3txdWVzdGlvbi5sYWJlbH19XG4gICAgICA8L2xpPlxuICAgIDwvdWw+XG4gIDwvZGl2PlxuICA8bWF0LXRhYi1ncm91cCAoc2VsZWN0ZWRJbmRleENoYW5nZSk9J3RhYlNlbGVjdGVkKCRldmVudCknIFtzZWxlY3RlZEluZGV4XT0nYWN0aXZlVGFiJz5cbiAgICA8bWF0LXRhYiBbbGFiZWxdPSdxdWVzdGlvbi5sYWJlbCcgKm5nRm9yPVwibGV0IHF1ZXN0aW9uIG9mIG5vZGUucXVlc3Rpb24ucXVlc3Rpb25zOyBsZXQgaSA9IGluZGV4O1wiPlxuICAgICAgICA8ZGl2IChzd2lwZUxlZnQpPSdsb2FkTmV4dFRhYigpJyAoc3dpcGVSaWdodCk9J2xvYWRQcmV2aW91c1RhYigpJz5cbiAgICAgICAgICA8Zm9ybS1yZW5kZXJlciBbbm9kZV09XCJub2RlLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV1cIiBbcGFyZW50Q29tcG9uZW50XT1cInRoaXNcIiBbcGFyZW50R3JvdXBdPVwibm9kZS5jb250cm9sXCI+PC9mb3JtLXJlbmRlcmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L21hdC10YWI+XG4gIDwvbWF0LXRhYi1ncm91cD5cblxuICA8ZGl2IHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyO1wiPlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgKGNsaWNrKT1cImxvYWRQcmV2aW91c1RhYigpXCIgW25nQ2xhc3NdPVwie2Rpc2FibGVkOiBpc0N1cnJlbnRUYWJGaXJzdCgpfVwiPiZsdDsmbHQ7PC9idXR0b24+XG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiAoY2xpY2spPVwibG9hZE5leHRUYWIoKVwiIFtuZ0NsYXNzXT1cIntkaXNhYmxlZDogaXNDdXJyZW50VGFiTGFzdCgpfVwiPlxuICAgICAgJmd0OyZndDs8L2J1dHRvbj5cbiAgPC9kaXY+XG48L2Rpdj5cbjxkaXYgKm5nSWY9XCJub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdwYWdlJ1wiPlxuICA8IS0tPGgyPnt7bm9kZS5xdWVzdGlvbi5sYWJlbH19PC9oMj4tLT5cbiAgPGZvcm0tcmVuZGVyZXIgKm5nRm9yPVwibGV0IHF1ZXN0aW9uIG9mIG5vZGUucXVlc3Rpb24ucXVlc3Rpb25zXCIgW3BhcmVudENvbXBvbmVudF09XCJ0aGlzXCIgW25vZGVdPVwibm9kZS5jaGlsZHJlbltxdWVzdGlvbi5rZXldXCJcbiAgICBbcGFyZW50R3JvdXBdPVwicGFyZW50R3JvdXBcIj48L2Zvcm0tcmVuZGVyZXI+XG48L2Rpdj5cbjxkaXYgKm5nSWY9XCJub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdzZWN0aW9uJyAmJiBjaGVja1NlY3Rpb24obm9kZSlcIj4gXG4gIDxkaXYgY2xhc3M9XCJwYW5lbCAgcGFuZWwtcHJpbWFyeVwiPlxuICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1oZWFkaW5nXCI+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCIgKGNsaWNrKT1cImlzQ29sbGFwc2VkID0gIWlzQ29sbGFwc2VkXCI+XG4gICAgICAgIHt7aXNDb2xsYXBzZWQgPyAnU2hvdycgOiAnSGlkZSd9fVxuICAgICAgPC9idXR0b24+IHt7bm9kZS5xdWVzdGlvbi5sYWJlbH19XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIiBbY29sbGFwc2VdPVwiaXNDb2xsYXBzZWRcIj5cbiAgICAgIDxmb3JtLXJlbmRlcmVyICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiBub2RlLnF1ZXN0aW9uLnF1ZXN0aW9uc1wiIFtwYXJlbnRDb21wb25lbnRdPVwidGhpc1wiIFtub2RlXT1cIm5vZGUuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XVwiXG4gICAgICAgIFtwYXJlbnRHcm91cF09XCJwYXJlbnRHcm91cFwiPjwvZm9ybS1yZW5kZXJlcj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cblxuPCEtLSBNRVNTQUdFUyAtLT5cbjxkaXYgKm5nSWY9XCJub2RlLmNvbnRyb2wgJiYgbm9kZS5jb250cm9sLmFsZXJ0ICYmIG5vZGUuY29udHJvbC5hbGVydCAhPT0gJydcIiBjbGFzcz1cImFsZXJ0IGFsZXJ0LXdhcm5pbmdcIj5cbiAgPGEgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCI+JnRpbWVzOzwvYT4ge3tub2RlLmNvbnRyb2wuYWxlcnR9fVxuPC9kaXY+XG5cbjwhLS1DT05UUk9MUy0tPlxuXG48ZGl2ICpuZ0lmPVwibm9kZS5xdWVzdGlvbi5jb250cm9sVHlwZSA9PT0gMFwiIGNsYXNzPVwiZm9ybS1ncm91cFwiIFtmb3JtR3JvdXBdPVwicGFyZW50R3JvdXBcIiBbaGlkZGVuXT1cIm5vZGUuY29udHJvbC5oaWRkZW5cIlxuICBbbmdDbGFzc109XCJ7ZGlzYWJsZWQ6IG5vZGUuY29udHJvbC5kaXNhYmxlZH1cIj5cbiAgPCEtLUxFQUYgQ09OVFJPTC0tPlxuICA8ZGl2IGNsYXNzPVwicXVlc3Rpb24tYXJlYVwiPlxuICAgIDxhIGNsYXNzPVwiZm9ybS10b29sdGlwIHB1bGwtcmlnaHRcIiAoY2xpY2spPVwidG9nZ2xlSW5mb3JtYXRpb24obm9kZS5xdWVzdGlvbi5leHRyYXMuaWQpXCIgZGF0YS1wbGFjZW1lbnQ9XCJyaWdodFwiICpuZ0lmPVwibm9kZS5xdWVzdGlvbiAmJiBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbkluZm8gICYmIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uSW5mbyAhPT0gJycgICYmIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uSW5mbyAhPT0gJyAnXCI+XG4gICAgICA8aSBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tcXVlc3Rpb24tc2lnblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICA8L2E+XG5cbiAgICA8bGFiZWwgKm5nSWY9XCJub2RlLnF1ZXN0aW9uLmxhYmVsXCIgW3N0eWxlLmNvbG9yXT1cImhhc0Vycm9ycygpPyAncmVkJyA6JydcIiBjbGFzcz1cImNvbnRyb2wtbGFiZWxcIiBbYXR0ci5mb3JdPVwibm9kZS5xdWVzdGlvbi5rZXlcIj5cbiAgICAgIHt7bm9kZS5xdWVzdGlvbi5yZXF1aXJlZCA/ICcqJzonJ319IHt7bm9kZS5xdWVzdGlvbi5sYWJlbH19XG4gICAgPC9sYWJlbD5cbiAgICA8ZGl2IFtuZ1N3aXRjaF09XCJub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGVcIj5cbiAgICAgIDxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiAqbmdTd2l0Y2hDYXNlPVwiJ3NlbGVjdCdcIiBbZm9ybUNvbnRyb2xOYW1lXT1cIm5vZGUucXVlc3Rpb24ua2V5XCIgW2lkXT1cIm5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJ1wiPlxuICAgICAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCBvIG9mIG5vZGUucXVlc3Rpb24ub3B0aW9uc1wiIFtuZ1ZhbHVlXT1cIm8udmFsdWVcIj57e28ubGFiZWx9fVxuICAgICAgICA8L29wdGlvbj5cbiAgICAgIDwvc2VsZWN0PlxuICAgICAgPHJlbW90ZS1maWxlLXVwbG9hZCAqbmdTd2l0Y2hDYXNlPVwiJ2ZpbGUnXCIgW2RhdGFTb3VyY2VdPVwiZGF0YVNvdXJjZVwiIFtmb3JtQ29udHJvbE5hbWVdPVwibm9kZS5xdWVzdGlvbi5rZXlcIiBbaWRdPVwibm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnXCJcbiAgICAgICAgKGZpbGVDaGFuZ2VkKT1cInVwbG9hZCgkZXZlbnQpXCI+XG4gICAgICA8L3JlbW90ZS1maWxlLXVwbG9hZD5cbiAgICAgIDx0ZXh0YXJlYSBbcGxhY2Vob2xkZXJdPVwibm9kZS5xdWVzdGlvbi5wbGFjZWhvbGRlclwiIFtyb3dzXT1cIm5vZGUucXVlc3Rpb24ucm93c1wiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgKm5nU3dpdGNoQ2FzZT1cIid0ZXh0YXJlYSdcIlxuICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cIm5vZGUucXVlc3Rpb24ua2V5XCIgW2lkXT1cIm5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJ1wiPlxuICAgICAgPC90ZXh0YXJlYT5cbiAgICAgIDxyZW1vdGUtc2VsZWN0ICpuZ1N3aXRjaENhc2U9XCIncmVtb3RlLXNlbGVjdCdcIiBbcGxhY2Vob2xkZXJdPVwibm9kZS5xdWVzdGlvbi5wbGFjZWhvbGRlclwiIHRhYmluZGV4PVwiMFwiIFtkYXRhU291cmNlXT1cImRhdGFTb3VyY2VcIlxuICAgICAgICBbY29tcG9uZW50SURdPVwibm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnXCIgW2Zvcm1Db250cm9sTmFtZV09XCJub2RlLnF1ZXN0aW9uLmtleVwiIFtpZF09XCJub2RlLnF1ZXN0aW9uLmtleSArICdpZCdcIj48L3JlbW90ZS1zZWxlY3Q+XG4gIDwhLS0gIFxuICAgICAgPGRhdGUtdGltZS1waWNrZXIgKm5nU3dpdGNoQ2FzZT1cIidkYXRlJ1wiIFtzaG93VGltZV09XCJub2RlLnF1ZXN0aW9uLnNob3dUaW1lXCIgdGFiaW5kZXg9XCIwXCIgW3dlZWtzXT0nbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLndlZWtzTGlzdCdcbiAgICAgICAgKG9uRGF0ZUNoYW5nZSk9XCJvbkRhdGVDaGFuZ2VkKG5vZGUpXCIgW3Nob3dXZWVrc109XCJub2RlLnF1ZXN0aW9uLnNob3dXZWVrc0FkZGVyXCIgW2Zvcm1Db250cm9sTmFtZV09XCJub2RlLnF1ZXN0aW9uLmtleVwiXG4gICAgICAgIFtpZF09XCJub2RlLnF1ZXN0aW9uLmtleSArICdpZCdcIj48L2RhdGUtdGltZS1waWNrZXI+XG4gIC0tPlxuXG4gICAgICA8bmd4LWRhdGUtdGltZS1waWNrZXIgKm5nU3dpdGNoQ2FzZT1cIidkYXRlJ1wiIFtzaG93VGltZV09XCJub2RlLnF1ZXN0aW9uLnNob3dUaW1lXCIgW2lkXT1cIm5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJ1wiIFxuICAgICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJub2RlLnF1ZXN0aW9uLmtleVwiIFt3ZWVrc109J25vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy53ZWVrc0xpc3QnXG4gICAgICAgICAgICAob25EYXRlQ2hhbmdlKT1cIm9uRGF0ZUNoYW5nZWQobm9kZSlcIiBbc2hvd1dlZWtzXT1cIm5vZGUucXVlc3Rpb24uc2hvd1dlZWtzQWRkZXJcIiA+PC9uZ3gtZGF0ZS10aW1lLXBpY2tlcj5cbiAgICAgIDxuZy1zZWxlY3QgKm5nU3dpdGNoQ2FzZT1cIidtdWx0aS1zZWxlY3QnXCIgW3N0eWxlLmhlaWdodF09XCInYXV0bydcIiAgW3N0eWxlLm92ZXJmbG93LXhdPVwiJ2hpZGRlbidcIiB0YWJpbmRleD1cIjBcIiBbZm9ybUNvbnRyb2xOYW1lXT1cIm5vZGUucXVlc3Rpb24ua2V5XCJcbiAgICAgICAgW2lkXT1cIm5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJ1wiIFtvcHRpb25zXT1cIm5vZGUucXVlc3Rpb24ub3B0aW9uc1wiIFttdWx0aXBsZV09XCJ0cnVlXCI+XG4gICAgICA8L25nLXNlbGVjdD5cbiAgICAgIDxuZy1zZWxlY3QgKm5nU3dpdGNoQ2FzZT1cIidzaW5nbGUtc2VsZWN0J1wiIFtzdHlsZS5oZWlnaHRdPSdhdXRvJyB0YWJpbmRleD1cIjBcIiBbZm9ybUNvbnRyb2xOYW1lXT1cIm5vZGUucXVlc3Rpb24ua2V5XCJcbiAgICAgIFtpZF09XCJub2RlLnF1ZXN0aW9uLmtleSArICdpZCdcIiBbb3B0aW9uc109XCJub2RlLnF1ZXN0aW9uLm9wdGlvbnNcIiBbbXVsdGlwbGVdPVwiZmFsc2VcIj5cbiAgICAgIDwvbmctc2VsZWN0PlxuICAgICAgPGlucHV0IGNsYXNzPVwiZm9ybS1jb250cm9sXCIgKm5nU3dpdGNoQ2FzZT1cIidudW1iZXInXCIgW2Zvcm1Db250cm9sTmFtZV09XCJub2RlLnF1ZXN0aW9uLmtleSBcIiBbYXR0ci5wbGFjZWhvbGRlcl09XCJub2RlLnF1ZXN0aW9uLnBsYWNlaG9sZGVyIFwiXG4gICAgICAgIFt0eXBlXT1cIidudW1iZXInXCIgW2lkXT1cIm5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJyBcIiBbc3RlcF09XCInYW55J1wiIFttaW5dPVwibm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLm1pblwiXG4gICAgICAgIFttYXhdPVwibm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLm1heFwiPlxuICAgICAgPGlucHV0IGNsYXNzPVwiZm9ybS1jb250cm9sXCIgKm5nU3dpdGNoRGVmYXVsdCBbZm9ybUNvbnRyb2xOYW1lXT1cIm5vZGUucXVlc3Rpb24ua2V5IFwiIFthdHRyLnBsYWNlaG9sZGVyXT1cIm5vZGUucXVlc3Rpb24ucGxhY2Vob2xkZXIgXCJcbiAgICAgICAgW3R5cGVdPVwibm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlXCIgW2lkXT1cIm5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJyBcIj5cblxuICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3JhZGlvJ1wiPlxuICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBvIG9mIG5vZGUucXVlc3Rpb24ub3B0aW9uc1wiPlxuICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImZvcm0tY29udHJvbCBuby1ib3JkZXJcIj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBbZm9ybUNvbnRyb2xOYW1lXT1cIm5vZGUucXVlc3Rpb24ua2V5XCIgW2lkXT1cIm5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJ1wiIFt2YWx1ZV09XCJvLnZhbHVlXCI+IHt7IG8ubGFiZWwgfX1cbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInY2hlY2tib3gnXCI+XG4gICAgICAgIDxjaGVja2JveCBbaWRdPVwibm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnXCIgW2Zvcm1Db250cm9sTmFtZV09XCJub2RlLnF1ZXN0aW9uLmtleVwiIFtvcHRpb25zXT1cIm5vZGUucXVlc3Rpb24ub3B0aW9uc1wiPjwvY2hlY2tib3g+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiAqbmdJZj1cIm5vZGUucXVlc3Rpb24uZW5hYmxlSGlzdG9yaWNhbFZhbHVlICYmIG5vZGUucXVlc3Rpb24uaGlzdG9yaWNhbERpc3BsYXlcIiBzdHlsZT1cIm1hcmdpbi10b3A6IDJweDtcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtOVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtd2FybmluZ1wiPlByZXZpb3VzIFZhbHVlOiA8L3NwYW4+XG4gICAgICAgICAgICAgIDxzdHJvbmc+e3tub2RlLnF1ZXN0aW9uLmhpc3RvcmljYWxEaXNwbGF5Py50ZXh0fX08L3N0cm9uZz5cbiAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJub2RlLnF1ZXN0aW9uLnNob3dIaXN0b3JpY2FsVmFsdWVEYXRlXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+IHwgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzdHJvbmcgY2xhc3M9XCJ0ZXh0LXByaW1hcnlcIj57e25vZGUucXVlc3Rpb24uaGlzdG9yaWNhbERpc3BsYXk/Ll9kYXRlfX0gPC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LXByaW1hcnlcIiAqbmdJZj1cIm5vZGUucXVlc3Rpb24uaGlzdG9yaWNhbERpc3BsYXkgJiYgbm9kZS5xdWVzdGlvbi5oaXN0b3JpY2FsRGlzcGxheS5fZGF0ZSBcIj4gKHt7bm9kZS5xdWVzdGlvbi5oaXN0b3JpY2FsRGlzcGxheS5fZGF0ZSB8IHRpbWVBZ299fSk8L3NwYW4+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBbbm9kZV09XCJub2RlXCIgW25hbWVdPVwiJ2hpc3RvcnlWYWx1ZSdcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBidG4tc21hbGwgY29sLXhzLTNcIj5Vc2UgVmFsdWVcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGFwcG9pbnRtZW50cy1vdmVydmlldyBbbm9kZV09XCJub2RlXCI+PC9hcHBvaW50bWVudHMtb3ZlcnZpZXc+XG4gICAgICA8ZGl2ICpuZ0lmPVwiaGFzRXJyb3JzKCkgXCI+XG4gICAgICAgIDxwICpuZ0Zvcj1cImxldCBlIG9mIGVycm9ycygpIFwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXIgXCI+e3tlfX08L3NwYW4+XG4gICAgICAgIDwvcD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInF1ZXN0aW9uLWluZm8gY29sLW1kLTEyIGNvbC1sZy0xMiBjb2wtc20tMTJcIiBpZD1cInt7bm9kZS5xdWVzdGlvbi5leHRyYXMuaWR9fVwiICpuZ0lmPVwibm9kZS5xdWVzdGlvbiAmJiBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbkluZm8gICYmIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uSW5mbyAhPT0gJycgICYmIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uSW5mbyAhPT0gJyAnXCI+XG4gICAgICB7e25vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uSW5mb319XG4gICAgPC9kaXY+XG5cbiAgPC9kaXY+XG48L2Rpdj5cbjxkaXYgKm5nSWY9XCJub2RlLnF1ZXN0aW9uLmNvbnRyb2xUeXBlID09PSAxXCIgW2hpZGRlbl09XCJub2RlLmNvbnRyb2wuaGlkZGVuXCIgW25nQ2xhc3NdPVwie2Rpc2FibGVkOiBub2RlLmNvbnRyb2wuZGlzYWJsZWR9XCI+XG5cblxuICA8IS0tQVJSQVkgQ09OVFJPTC0tPlxuICA8ZGl2IFtuZ1N3aXRjaF09XCJub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgXCI+XG4gICAgPGRpdiBjbGFzcz0nd2VsbCcgc3R5bGU9XCJwYWRkaW5nOiAycHg7IFwiICpuZ1N3aXRjaENhc2U9XCIgJ3JlcGVhdGluZycgXCI+XG4gICAgICA8aDQgc3R5bGU9XCJtYXJnaW46IDJweDsgZm9udC13ZWlnaHQ6IGJvbGQ7XCI+e3tub2RlLnF1ZXN0aW9uLmxhYmVsfX08L2g0PlxuICAgICAgPGhyIHN0eWxlPVwibWFyZ2luLWxlZnQ6LTJweDsgbWFyZ2luLXJpZ2h0Oi0ycHg7IG1hcmdpbi1ib3R0b206NHB4OyBtYXJnaW4tdG9wOjhweDsgYm9yZGVyLXdpZHRoOjJweDtcIiAvPlxuICAgICAgPGRpdiBbbmdTd2l0Y2hdPVwibm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZVwiPlxuICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIndGVzdE9yZGVyJ1wiPlxuICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGNoaWxkIG9mIG5vZGUuY2hpbGRyZW47IGxldCBpPWluZGV4IFwiPlxuICAgICAgICAgICAgPGZvcm0tcmVuZGVyZXIgKm5nRm9yPVwibGV0IHF1ZXN0aW9uIG9mIGNoaWxkLnF1ZXN0aW9uLnF1ZXN0aW9ucyBcIiBbcGFyZW50Q29tcG9uZW50XT1cInRoaXNcIiBbbm9kZV09XCJjaGlsZC5jaGlsZHJlbltxdWVzdGlvbi5rZXldXG4gICAgICAgICAgICBcIiBbcGFyZW50R3JvdXBdPVwiY2hpbGQuY29udHJvbCBcIj48L2Zvcm0tcmVuZGVyZXI+XG4gICAgICAgICAgICA8ZGl2Pnt7Y2hpbGQub3JkZXJOdW1iZXJ9fTwvZGl2PlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uIFwiIGNsYXNzPSdidG4gYnRuLXNtIGJ0bi1kYW5nZXInIChjbGljayk9XCJub2RlLnJlbW92ZUF0KGkpIFwiPlJlbW92ZTwvYnV0dG9uPlxuICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgIDxociBzdHlsZT1cIm1hcmdpbi1sZWZ0Oi0ycHg7IG1hcmdpbi1yaWdodDotMnB4OyBtYXJnaW4tYm90dG9tOjRweDsgbWFyZ2luLXRvcDo4cHg7IGJvcmRlci13aWR0aDoxcHg7XCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ29ic0dyb3VwJ1wiIHN0eWxlPVwibWFyZ2luLWJvdHRvbToyMHB4O1wiPlxuICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGNoaWxkIG9mIG5vZGUuY2hpbGRyZW47IGxldCBpPWluZGV4IFwiPlxuICAgICAgICAgICAgPGZvcm0tcmVuZGVyZXIgKm5nRm9yPVwibGV0IHF1ZXN0aW9uIG9mIGNoaWxkLnF1ZXN0aW9uLnF1ZXN0aW9ucyBcIiBbcGFyZW50Q29tcG9uZW50XT1cInRoaXNcIiBbbm9kZV09XCJjaGlsZC5jaGlsZHJlbltxdWVzdGlvbi5rZXldXG4gICAgICAgICAgICBcIiBbcGFyZW50R3JvdXBdPVwiY2hpbGQuY29udHJvbCBcIj48L2Zvcm0tcmVuZGVyZXI+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b24gXCIgY2xhc3M9J2J0biBidG4tc20gYnRuLWRhbmdlcicgKGNsaWNrKT1cIm5vZGUucmVtb3ZlQXQoaSkgXCI+UmVtb3ZlPC9idXR0b24+XG4gICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgPGhyIHN0eWxlPVwibWFyZ2luLWxlZnQ6LTJweDsgbWFyZ2luLXJpZ2h0Oi0ycHg7IG1hcmdpbi1ib3R0b206NHB4OyBtYXJnaW4tdG9wOjhweDsgYm9yZGVyLXdpZHRoOjFweDtcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uIFwiIGNsYXNzPSdidG4gYnRuLXByaW1hcnknIChjbGljayk9XCJub2RlLmNyZWF0ZUNoaWxkTm9kZSgpIFwiPkFkZDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuPC9kaXY+XG48ZGl2ICpuZ0lmPVwibm9kZS5xdWVzdGlvbi5jb250cm9sVHlwZSA9PT0gMlwiIFtoaWRkZW5dPVwibm9kZS5jb250cm9sLmhpZGRlblwiIFtuZ0NsYXNzXT1cIntkaXNhYmxlZDogbm9kZS5jb250cm9sLmRpc2FibGVkfVwiPlxuXG4gIDwhLS1HUk9VUC0tPlxuICA8ZGl2IFtuZ1N3aXRjaF09XCJub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgXCI+XG4gICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiICdncm91cCcgXCI+XG4gICAgICA8Zm9ybS1yZW5kZXJlciAqbmdGb3I9XCJsZXQgcXVlc3Rpb24gb2Ygbm9kZS5xdWVzdGlvbi5xdWVzdGlvbnMgXCIgW3BhcmVudENvbXBvbmVudF09XCJ0aGlzXCIgW25vZGVdPVwibm9kZS5jaGlsZHJlbltxdWVzdGlvbi5rZXldXG4gICAgICAgICAgICBcIiBbcGFyZW50R3JvdXBdPVwibm9kZS5jb250cm9sIFwiPjwvZm9ybS1yZW5kZXJlcj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIgJ2ZpZWxkLXNldCcgXCIgc3R5bGU9XCJib3JkZXI6IDFweCBzb2xpZCAjZWVlZWVlOyBwYWRkaW5nOiAycHg7IG1hcmdpbjogMnB4O1wiPlxuICAgICAgPGZvcm0tcmVuZGVyZXIgKm5nRm9yPVwibGV0IHF1ZXN0aW9uIG9mIG5vZGUucXVlc3Rpb24ucXVlc3Rpb25zIFwiIFtwYXJlbnRDb21wb25lbnRdPVwidGhpc1wiIFtub2RlXT1cIm5vZGUuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XVxuICAgICAgICAgICAgXCIgW3BhcmVudEdyb3VwXT1cIm5vZGUuY29udHJvbCBcIj48L2Zvcm0tcmVuZGVyZXI+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG48L2Rpdj5cbmAsXG4gIHN0eWxlczogWycuLi8uLi9zdHlsZS9hcHAuY3NzJywgREVGQVVMVF9TVFlMRVNdXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1SZW5kZXJlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cblxuICBASW5wdXQoKSBwdWJsaWMgcGFyZW50Q29tcG9uZW50OiBGb3JtUmVuZGVyZXJDb21wb25lbnQ7XG4gIEBJbnB1dCgpIHB1YmxpYyBub2RlOiBOb2RlQmFzZTtcbiAgQElucHV0KCkgcHVibGljIHBhcmVudEdyb3VwOiBBZmVGb3JtR3JvdXA7XG4gIHB1YmxpYyBjaGlsZENvbXBvbmVudHM6IEZvcm1SZW5kZXJlckNvbXBvbmVudFtdID0gW107XG4gIHB1YmxpYyBzaG93VGltZTogYm9vbGVhbjtcbiAgcHVibGljIHNob3dXZWVrczogYm9vbGVhbjtcbiAgcHVibGljIGFjdGl2ZVRhYjogbnVtYmVyO1xuICBwdWJsaWMgZGF0YVNvdXJjZTogRGF0YVNvdXJjZTtcbiAgcHVibGljIGlzQ29sbGFwc2VkID0gZmFsc2U7XG4gIHB1YmxpYyBhdXRvOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoXG4gIHByaXZhdGUgdmFsaWRhdGlvbkZhY3Rvcnk6IFZhbGlkYXRpb25GYWN0b3J5LFxuICBwcml2YXRlIGRhdGFTb3VyY2VzOiBEYXRhU291cmNlcyxcbiAgcHJpdmF0ZSBmb3JtRXJyb3JzU2VydmljZTogRm9ybUVycm9yc1NlcnZpY2UsXG4gIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSkge1xuICAgIHRoaXMuYWN0aXZlVGFiID0gMDtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnNldFVwUmVtb3RlU2VsZWN0KCk7XG4gICAgdGhpcy5zZXRVcEZpbGVVcGxvYWQoKTtcbiAgICBpZiAodGhpcy5ub2RlICYmIHRoaXMubm9kZS5mb3JtKSB7XG4gICAgICBjb25zdCB0YWIgPSB0aGlzLm5vZGUuZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLmxhc3RGb3JtVGFiO1xuICAgICAgaWYgKHRhYiAmJiB0YWIgIT09IHRoaXMuYWN0aXZlVGFiKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlVGFiID0gdGFiO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5ub2RlICYmIHRoaXMubm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnZm9ybScpIHtcbiAgICAgIHRoaXMuZm9ybUVycm9yc1NlcnZpY2UuYW5ub3VuY2VFcnJvckZpZWxkJC5zdWJzY3JpYmUoXG4gICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgIHRoaXMuc2Nyb2xsVG9Db250cm9sKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubm9kZSAmJiB0aGlzLm5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3NlY3Rpb24nKSB7XG4gICAgICB0aGlzLmlzQ29sbGFwc2VkID0gISh0aGlzLm5vZGUucXVlc3Rpb24gYXMgUXVlc3Rpb25Hcm91cCkuaXNFeHBhbmRlZDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wYXJlbnRDb21wb25lbnQpIHtcbiAgICAgIHRoaXMucGFyZW50Q29tcG9uZW50LmFkZENoaWxkQ29tcG9uZW50KHRoaXMpO1xuICAgIH1cbiAgfVxuXG5cblxuICBwdWJsaWMgYWRkQ2hpbGRDb21wb25lbnQoY2hpbGQ6IEZvcm1SZW5kZXJlckNvbXBvbmVudCkge1xuICAgIHRoaXMuY2hpbGRDb21wb25lbnRzLnB1c2goY2hpbGQpO1xuICB9XG5cbiAgcHVibGljIHNldFVwUmVtb3RlU2VsZWN0KCkge1xuICAgIGlmICh0aGlzLm5vZGUgJiYgdGhpcy5ub2RlLnF1ZXN0aW9uLmV4dHJhcyAmJlxuICAgIHRoaXMubm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAncmVtb3RlLXNlbGVjdCcpIHtcbiAgICAgIHRoaXMuZGF0YVNvdXJjZSA9IHRoaXMuZGF0YVNvdXJjZXMuZGF0YVNvdXJjZXNbdGhpcy5ub2RlLnF1ZXN0aW9uLmRhdGFTb3VyY2VdO1xuICAgICAgaWYgKHRoaXMuZGF0YVNvdXJjZSAmJiB0aGlzLm5vZGUucXVlc3Rpb24uZGF0YVNvdXJjZU9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5kYXRhU291cmNlLmRhdGFTb3VyY2VPcHRpb25zID0gdGhpcy5ub2RlLnF1ZXN0aW9uLmRhdGFTb3VyY2VPcHRpb25zO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXRVcEZpbGVVcGxvYWQoKSB7XG4gICAgaWYgKHRoaXMubm9kZSAmJiB0aGlzLm5vZGUucXVlc3Rpb24uZXh0cmFzICYmIHRoaXMubm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnZmlsZScpIHtcbiAgICAgIHRoaXMuZGF0YVNvdXJjZSA9IHRoaXMuZGF0YVNvdXJjZXMuZGF0YVNvdXJjZXNbdGhpcy5ub2RlLnF1ZXN0aW9uLmRhdGFTb3VyY2VdO1xuICAgICAgLy8gY29uc29sZS5sb2coJ0tleScsIHRoaXMubm9kZS5xdWVzdGlvbik7XG4gICAgICAvLyBjb25zb2xlLmxvZygnRGF0YSBzb3VyY2UnLCB0aGlzLmRhdGFTb3VyY2UpO1xuICAgIH1cblxuICB9XG5cbiAgY2hlY2tTZWN0aW9uKG5vZGU6IE5vZGVCYXNlKSB7XG4gICAgaWYgKG5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3NlY3Rpb24nKSB7XG4gICAgICBsZXQgZ3JvdXBDaGlsZHJlbkhpZGRlbiA9IGZhbHNlO1xuICAgICAgY29uc3QgYWxsU2VjdGlvbkNvbnRyb2xzSGlkZGVuID0gT2JqZWN0LmtleXMobm9kZS5jaGlsZHJlbikuZXZlcnkoKGspID0+IHtcbiAgICAgICAgY29uc3QgaW5uZXJOb2RlID0gbm9kZS5jaGlsZHJlbltrXTtcbiAgICAgICAgaWYgKGlubmVyTm9kZSBpbnN0YW5jZW9mIEdyb3VwTm9kZSkge1xuICAgICAgICAgIGdyb3VwQ2hpbGRyZW5IaWRkZW4gPSBPYmplY3Qua2V5cyhpbm5lck5vZGUuY2hpbGRyZW4pLmV2ZXJ5KChpKSA9PiBpbm5lck5vZGUuY2hpbGRyZW5baV0uY29udHJvbC5oaWRkZW4pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlLmNoaWxkcmVuW2tdLmNvbnRyb2wuaGlkZGVuIHx8IGdyb3VwQ2hpbGRyZW5IaWRkZW47XG4gICAgICB9KTtcbiAgICAgIHJldHVybiAhYWxsU2VjdGlvbkNvbnRyb2xzSGlkZGVuO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gcHVibGljIGNsaWNrVGFiKHRhYk51bWJlcikge1xuICAgIHRoaXMuYWN0aXZlVGFiID0gdGFiTnVtYmVyO1xuICB9XG5cbiAgcHVibGljIGxvYWRQcmV2aW91c1RhYigpIHtcbiAgICBpZiAoIXRoaXMuaXNDdXJyZW50VGFiRmlyc3QoKSkge1xuICAgICAgdGhpcy5jbGlja1RhYih0aGlzLmFjdGl2ZVRhYiAtIDEpO1xuICAgICAgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSAwO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyAgaXNDdXJyZW50VGFiRmlyc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlVGFiID09PSAwO1xuICB9XG5cbiAgcHVibGljICBpc0N1cnJlbnRUYWJMYXN0KCkge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZVRhYiA9PT0gdGhpcy5ub2RlLnF1ZXN0aW9uWydxdWVzdGlvbnMnXS5sZW5ndGggLSAxO1xuICB9XG5cbiAgcHVibGljICBsb2FkTmV4dFRhYigpIHtcbiAgICBpZiAoIXRoaXMuaXNDdXJyZW50VGFiTGFzdCgpKSB7XG4gICAgICB0aGlzLmNsaWNrVGFiKHRoaXMuYWN0aXZlVGFiICsgMSk7XG4gICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IDA7XG4gICAgfVxuICB9XG4gIHB1YmxpYyB0YWJTZWxlY3RlZCgkZXZlbnQpIHtcbiAgICB0aGlzLmFjdGl2ZVRhYiA9ICRldmVudDtcbiAgICB0aGlzLnNldFByZXZpb3VzVGFiKCk7XG4gIH1cbiAgcHVibGljICBzZXRQcmV2aW91c1RhYigpIHtcbiAgICBpZiAodGhpcy5ub2RlICYmIHRoaXMubm9kZS5mb3JtKSB7XG4gICAgICB0aGlzLm5vZGUuZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvWydsYXN0Rm9ybVRhYiddID0gdGhpcy5hY3RpdmVUYWI7XG4gICAgfVxuXG4gIH1cbiBwdWJsaWMgICBoYXNFcnJvcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMubm9kZS5jb250cm9sLnRvdWNoZWQgJiYgIXRoaXMubm9kZS5jb250cm9sLnZhbGlkO1xuICB9XG5cbiAgcHVibGljICBlcnJvcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RXJyb3JzKHRoaXMubm9kZSk7XG4gIH1cblxuXG4gIHB1YmxpYyBzY3JvbGxUb0NvbnRyb2woZXJyb3I6IHN0cmluZykge1xuXG4gICAgY29uc3QgdGFiOiBudW1iZXIgPSArZXJyb3Iuc3BsaXQoJywnKVswXTtcbiAgICBjb25zdCBlbFNlbGVjdG9yID0gZXJyb3Iuc3BsaXQoJywnKVsxXSArICdpZCc7XG5cbiAgICAvLyB0aGUgdGFiIGNvbXBvbmVudHNcbiAgICBjb25zdCB0YWJDb21wb25lbnQ6IEZvcm1SZW5kZXJlckNvbXBvbmVudCA9IHRoaXMuY2hpbGRDb21wb25lbnRzW3RhYl07XG5cbiAgICB0aGlzLmNsaWNrVGFiKHRhYik7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgLy8gZXhwYW5kIGFsbCBzZWN0aW9uc1xuICAgICAgdGFiQ29tcG9uZW50LmNoaWxkQ29tcG9uZW50cy5mb3JFYWNoKChzZWN0aW9uKSA9PiB7XG4gICAgICAgIHNlY3Rpb24uaXNDb2xsYXBzZWQgPSBmYWxzZTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBjb25zdCBlbGVtZW50OiBhbnkgPSB0aGlzLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsU2VsZWN0b3IpO1xuICAgICAgICAgIGlmIChlbGVtZW50ICE9PSBudWxsICYmIGVsZW1lbnQuZm9jdXMpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgIGVsZW1lbnQuc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogJ3Ntb290aCcsIGJsb2NrOiAnY2VudGVyJyB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDEwMCk7XG4gICAgICB9KTtcblxuICAgIH0sIDIwMCk7XG4gIH1cblxuICBwdWJsaWMgb25EYXRlQ2hhbmdlZChub2RlOiBMZWFmTm9kZSkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdOb2RlJywgbm9kZSk7XG4gICAgdGhpcy5ub2RlID0gbm9kZTtcbiAgfVxuXG4gIHB1YmxpYyB1cGxvYWQoZXZlbnQpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnRXZlbnQnLCBldmVudCk7XG4gICAgLy8gY29uc29sZS5sb2coJ0RhdGEnLCB0aGlzLmRhdGFTb3VyY2UpO1xuICB9XG5cbiAgcHVibGljIHRvZ2dsZUluZm9ybWF0aW9uKGluZm9JZCkge1xuICAgIGNvbnN0IGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpbmZvSWQpO1xuXG4gICAgaWYgKGUuc3R5bGUuZGlzcGxheSA9PT0gJ2Jsb2NrJykge1xuICAgICAgICBlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgIH0gZWxzZSB7XG4gICAgICAgIGUuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgIH1cblxuXG4gICAgY29uc29sZS5sb2coJ0luZm9JZCcsIGluZm9JZCk7XG4gIH1cblxuXG4gICBwcml2YXRlIGdldEVycm9ycyhub2RlOiBOb2RlQmFzZSkge1xuICAgIGNvbnN0IGVycm9yczogYW55ID0gbm9kZS5jb250cm9sLmVycm9ycztcblxuICAgIGlmIChlcnJvcnMpIHtcblxuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGlvbkZhY3RvcnkuZXJyb3JzKGVycm9ycywgbm9kZS5xdWVzdGlvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtdO1xuICB9XG59XG4iXX0=
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ObsValueAdapter } from '../form-entry/value-adapters/obs.adapter';
import { EncounterViewerService } from './encounter-viewer.service';
import { DataSources } from '../form-entry/data-sources/data-sources';
import { combineLatest, BehaviorSubject } from 'rxjs';
import * as moment_ from 'moment';
import * as _ from 'lodash';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import 'pdfmake/build/vfs_fonts.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as i0 from "@angular/core";
import * as i1 from "./encounter-viewer.service";
import * as i2 from "../form-entry/value-adapters/obs.adapter";
import * as i3 from "../form-entry/data-sources/data-sources";
const /** @type {?} */ moment = moment_;
export class EncounterPdfViewerService {
    /**
     * @param {?} encounterViewerService
     * @param {?} obsValueAdapter
     * @param {?} dataSources
     */
    constructor(encounterViewerService, obsValueAdapter, dataSources) {
        this.encounterViewerService = encounterViewerService;
        this.obsValueAdapter = obsValueAdapter;
        this.dataSources = dataSources;
        this.subscribedAnswers = {
            questions: {
                stack: []
            },
            answers: []
        };
    }
    /**
     * @param {?} pages
     * @param {?} form
     * @param {?=} remoteSelectsOnly
     * @param {?=} remoteAns
     * @return {?}
     */
    getPages(pages, form, remoteSelectsOnly, remoteAns) {
        const /** @type {?} */ content = [];
        let /** @type {?} */ remoteQuestions = [];
        for (const /** @type {?} */ page of pages) {
            if (remoteSelectsOnly) {
                remoteQuestions = remoteQuestions.concat(this.getSections(page.page, form, false, remoteAns));
            }
            else {
                for (const /** @type {?} */ question of form.rootNode.question.questions) {
                    if (page.label === form.rootNode.children[question.key].question.label &&
                        this.encounterViewerService.questionsAnswered(form.rootNode.children[question.key])) {
                        content.push({
                            style: 'tableExample',
                            table: {
                                widths: ['*'],
                                headerRows: 1,
                                keepWithHeaderRows: 1,
                                body: [
                                    [{ text: page.label, style: 'tableHeader' }],
                                    [
                                        {
                                            style: 'tableExample',
                                            table: {
                                                widths: ['*'],
                                                body: this.getSections(page.page, form, true, remoteAns)
                                            },
                                            layout: 'noBorders',
                                            margin: [5, 0, 0, 0]
                                        }
                                    ]
                                ]
                            },
                            layout: {
                                hLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 0.5 : 0.5;
                                },
                                vLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 0.5 : 0.5;
                                },
                                hLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? '#ddd' : '#ddd';
                                },
                                vLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? '#ddd' : '#ddd';
                                }
                            }
                        });
                    }
                }
            }
        }
        return remoteSelectsOnly ? remoteQuestions : content;
    }
    /**
     * @param {?} sections
     * @param {?} form
     * @param {?} resolve
     * @param {?} remoteAns
     * @return {?}
     */
    getSections(sections, form, resolve, remoteAns) {
        const /** @type {?} */ content = [];
        const /** @type {?} */ answeredSections = [];
        let /** @type {?} */ questions = [];
        sections.map(s => {
            if (this.encounterViewerService.questionsAnswered(s.node)) {
                answeredSections.push(s);
            }
        });
        for (const /** @type {?} */ section of answeredSections) {
            questions = questions.concat(this.getRemoteSectionData(section.section));
        }
        if (resolve && remoteAns) {
            for (const /** @type {?} */ section of answeredSections) {
                content.push([
                    {
                        table: {
                            widths: ['*'],
                            body: [
                                [{ text: section.label, style: 'tableSubheader' }],
                                [this.getSectionData(section.section, remoteAns, form)]
                            ]
                        },
                        layout: 'noBorders'
                    }
                ]);
            }
            return content;
        }
        else {
            return questions;
        }
    }
    /**
     * @param {?} resolvedAnswer
     * @param {?} questions
     * @param {?=} node
     * @return {?}
     */
    appendResolvedAnswer(resolvedAnswer, questions, node) {
        if (resolvedAnswer) {
            questions.stack.push({
                text: [
                    `${(node) ? node.question.label : 'Question label'}${(node) ? (node.question.label.indexOf(':') > 1 ? '' : ':') : ''} `,
                    { text: `${resolvedAnswer}`, bold: true }
                ], style: 'answers'
            });
        }
    }
    /**
     * @param {?} section
     * @return {?}
     */
    getRemoteSectionData(section) {
        const /** @type {?} */ questions = [];
        this.subscribedAnswers.questions.stack = [];
        for (const /** @type {?} */ node of section) {
            if (node.question.renderingType === 'remote-select') {
                this.remoteDataSource = this.dataSources.dataSources[node.question.dataSource];
                if (node.control.value !== '') {
                    if (this.remoteDataSource) {
                        questions.push(this.remoteDataSource.resolveSelectedValue(node.control.value));
                    }
                }
            }
        }
        return questions;
    }
    /**
     * @param {?} section
     * @param {?} remoteAns
     * @param {?} form
     * @return {?}
     */
    getSectionData(section, remoteAns, form) {
        const /** @type {?} */ questions = {
            stack: []
        };
        let /** @type {?} */ resolvedAnswer = '';
        for (const /** @type {?} */ node of section) {
            switch (node.question.renderingType) {
                case 'group':
                    if (node.groupMembers) {
                        questions.stack.push(this.getSectionData(node.groupMembers, remoteAns, form));
                    }
                    break;
                case 'field-set':
                    if (node.children) {
                        const /** @type {?} */ groupMembers = [];
                        const /** @type {?} */ result = Object.keys(node.children).map((key) => node.children[key]);
                        if (result) {
                            groupMembers.push(result);
                            questions.stack.push(this.getSectionData(groupMembers[0], remoteAns, form));
                        }
                    }
                    break;
                case 'repeating':
                    if (node.groupMembers) {
                        questions.stack.push(this.getSectionData(node.groupMembers, remoteAns, form));
                    }
                    break;
                case 'remote-select':
                    this.remoteDataSource = this.dataSources.dataSources[node.question.dataSource];
                    for (const /** @type {?} */ ans of remoteAns) {
                        if (ans.value === node.control.value) {
                            this.appendResolvedAnswer(ans.label, questions, node);
                        }
                    }
                    break;
                default:
                    const /** @type {?} */ answer = node.control.value;
                    resolvedAnswer = this.resolveValue(answer, form);
                    this.appendResolvedAnswer(resolvedAnswer, questions, node);
            }
        }
        return questions;
    }
    /**
     * @param {?} answer
     * @param {?} form
     * @param {?=} arrayElement
     * @return {?}
     */
    resolveValue(answer, form, arrayElement) {
        if (answer !== '') {
            if (this.isUuid(answer)) {
                const /** @type {?} */ val = this.encounterViewerService.resolveSelectedValueFromSchema(answer, form.schema);
                if (!arrayElement) {
                    if (val) {
                        return val.toUpperCase();
                    }
                    else {
                        return answer;
                    }
                }
                else {
                    return val;
                }
            }
            else if (_.isArray(answer)) {
                const /** @type {?} */ arr = [];
                _.forEach(answer, elem => {
                    arr.push(this.resolveValue(elem, form, true));
                });
                return arr.toString();
            }
            else if (this.isDate(answer)) {
                if (!arrayElement) {
                    return this.encounterViewerService.convertTime(answer);
                }
                else {
                    return this.encounterViewerService.convertTime(answer);
                }
            }
            else if (typeof answer === 'object') {
                const /** @type {?} */ values = [];
                const /** @type {?} */ result = Object.keys(answer).map((key) => [key, answer[key]]);
                values.push(result);
                return values;
            }
            else {
                return answer;
            }
        }
    }
    /**
     * @param {?} form
     * @return {?}
     */
    generatePdfDefinition(form) {
        const /** @type {?} */ docDefinition$ = new BehaviorSubject({});
        const /** @type {?} */ remoteSelects = this.getPages((this.obsValueAdapter.traverse(form.rootNode)), form, true);
        combineLatest(remoteSelects).subscribe(remoteAns => {
            if (remoteAns) {
                const /** @type {?} */ docDefinition = {
                    content: this.getPages(this.obsValueAdapter.traverse(form.rootNode), form, false, remoteAns),
                    styles: {
                        answers: {
                            fontSize: 8
                        },
                        confidential: {
                            color: 'red',
                            fontSize: 8,
                            bold: true,
                            margin: [60, 0, 0, 0]
                        },
                        header: {
                            fontSize: 9,
                            bold: true,
                            margin: [5, 5, 5, 5]
                        },
                        tableExample: {
                            fontSize: 10,
                            margin: [5, 0, 0, 5]
                        },
                        tableHeader: {
                            fillColor: '#f5f5f5',
                            width: ['100%'],
                            borderColor: '#333',
                            fontSize: 9,
                            bold: true,
                            margin: [5, 0, 5, 0]
                        },
                        tableSubheader: {
                            fillColor: '#337ab7',
                            width: ['100%'],
                            fontSize: 9,
                            color: 'white',
                            margin: [5, 0, 5, 0]
                        },
                        banner: {
                            fillColor: '#d9edf7',
                            fontSize: 9,
                            bold: true,
                            margin: [45, 20, 20, 20]
                        },
                        bannerLabel: {
                            color: '#a9a9a9'
                        },
                        bannerItem: {
                            margin: [20, 0, 10, 0]
                        },
                        timestamp: {
                            alignment: 'center',
                            bold: true
                        },
                        pageNumber: {
                            alignment: 'right',
                            margin: [0, 0, 5, 5]
                        }
                    },
                    defaultStyle: {
                        fontSize: 7
                    }
                };
                docDefinition$.next(docDefinition);
            }
        });
        return docDefinition$;
    }
    /**
     * @param {?} form
     * @return {?}
     */
    displayPdf(form) {
        const /** @type {?} */ pdf = pdfMake;
        let /** @type {?} */ patient;
        pdf.vfs = pdfFonts.pdfMake.vfs;
        if (form.dataSourcesContainer.dataSources._dataSources) {
            patient = form.dataSourcesContainer.dataSources._dataSources['patientInfo'];
        }
        this.generatePdfDefinition(form).subscribe(docDefinition => {
            if (!(_.isEmpty(docDefinition))) {
                if (typeof patient !== 'undefined') {
                    const /** @type {?} */ banner = [];
                    if (patient.name) {
                        banner.push({
                            text: [
                                { text: 'Name: ', style: 'bannerLabel' },
                                { text: `${this.titleize(patient.name)}` }
                            ],
                            style: 'bannerItem'
                        });
                    }
                    if (patient.nid) {
                        banner.push({
                            text: [
                                { text: 'NID: ', style: 'bannerLabel' },
                                { text: `${patient.nid}` }
                            ],
                            style: 'bannerItem'
                        });
                    }
                    if (patient.mui) {
                        banner.push({
                            text: [
                                { text: 'MUI: ', style: 'bannerLabel' },
                                { text: `${patient.mui}` }
                            ],
                            style: 'bannerItem'
                        });
                    }
                    if (patient.birthdate) {
                        banner.push({
                            text: [
                                { text: 'YOB: ', style: 'bannerLabel' },
                                { text: `${moment(patient.birthdate).format('l')} (${patient.age} yo)` }
                            ],
                            style: 'bannerItem'
                        });
                    }
                    docDefinition.header = {
                        style: 'banner',
                        table: {
                            body: [banner]
                        },
                        layout: 'noBorders'
                    };
                }
                docDefinition.footer = (currentPage, pageCount) => {
                    return {
                        columns: [
                            {
                                widths: ['*', '*', '*'],
                                stack: [
                                    {
                                        text: `Note: Confidentiality is one of the core duties of all medical practitioners. Patients' personal health information should be kept private.`,
                                        style: 'confidential'
                                    }, {
                                        text: currentPage.toString() + ' of ' + pageCount,
                                        style: 'pageNumber'
                                    }, {
                                        text: `Generated on ` + new Date(),
                                        style: 'timestamp'
                                    }
                                ]
                            }
                        ]
                    };
                };
                const /** @type {?} */ win = window.open('', '_blank');
                pdf.createPdf(docDefinition).open({}, win);
            }
        }, (error) => {
            console.log('Error: ', error);
        });
    }
    /**
     * @param {?} val
     * @return {?}
     */
    isDate(val) {
        return moment(val, moment.ISO_8601, true).isValid();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    isUuid(value) {
        return (value.length === 36 && value.indexOf(' ') === -1 && value.indexOf('.') === -1);
    }
    /**
     * @param {?} str
     * @return {?}
     */
    titleize(str) {
        return str.replace(/\w\S*/g, s => s.charAt(0).toUpperCase() + s.substr(1).toLowerCase());
    }
}
EncounterPdfViewerService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
EncounterPdfViewerService.ctorParameters = () => [
    { type: EncounterViewerService, },
    { type: ObsValueAdapter, },
    { type: DataSources, },
];
/** @nocollapse */ EncounterPdfViewerService.ngInjectableDef = i0.defineInjectable({ factory: function EncounterPdfViewerService_Factory() { return new EncounterPdfViewerService(i0.inject(i1.EncounterViewerService), i0.inject(i2.ObsValueAdapter), i0.inject(i3.DataSources)); }, token: EncounterPdfViewerService, providedIn: "root" });
function EncounterPdfViewerService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    EncounterPdfViewerService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    EncounterPdfViewerService.ctorParameters;
    /** @type {?} */
    EncounterPdfViewerService.prototype.remoteDataSource;
    /** @type {?} */
    EncounterPdfViewerService.prototype.error;
    /** @type {?} */
    EncounterPdfViewerService.prototype.errorMessage;
    /** @type {?} */
    EncounterPdfViewerService.prototype.showLoader;
    /** @type {?} */
    EncounterPdfViewerService.prototype.subscribedAnswers;
    /** @type {?} */
    EncounterPdfViewerService.prototype.encounterViewerService;
    /** @type {?} */
    EncounterPdfViewerService.prototype.obsValueAdapter;
    /** @type {?} */
    EncounterPdfViewerService.prototype.dataSources;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXBkZi12aWV3ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImVuY291bnRlci12aWV3ZXIvZW5jb3VudGVyLXBkZi12aWV3ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDM0UsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBR3RFLE9BQU8sRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBR3RELE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sS0FBSyxPQUFPLE1BQU0sMEJBQTBCLENBQUM7QUFDcEQsT0FBTyw0QkFBNEIsQ0FBQztBQUNwQyxPQUFPLEtBQUssUUFBUSxNQUFNLHlCQUF5QixDQUFDOzs7OztBQUVwRCx1QkFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBTXZCLE1BQU07Ozs7OztJQVlKLFlBQ1Usd0JBQ0EsaUJBQ0E7UUFGQSwyQkFBc0IsR0FBdEIsc0JBQXNCO1FBQ3RCLG9CQUFlLEdBQWYsZUFBZTtRQUNmLGdCQUFXLEdBQVgsV0FBVztpQ0FWVztZQUM5QixTQUFTLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLEVBQUU7YUFDVjtZQUNELE9BQU8sRUFBRSxFQUFFO1NBQ1o7S0FNRzs7Ozs7Ozs7SUFFSixRQUFRLENBQUMsS0FBVSxFQUFFLElBQVUsRUFBRSxpQkFBMkIsRUFBRSxTQUFlO1FBQzNFLHVCQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbkIscUJB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LENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxFQUFFLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDeEY7Ozs7O0lBRUQsUUFBUSxDQUFDLEdBQUc7UUFDVixNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztLQUMxRjs7O1lBNVpGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQWpCUSxzQkFBc0I7WUFEdEIsZUFBZTtZQUVmLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuLi9mb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9mb3JtJztcbmltcG9ydCB7IE9ic1ZhbHVlQWRhcHRlciB9IGZyb20gJy4uL2Zvcm0tZW50cnkvdmFsdWUtYWRhcHRlcnMvb2JzLmFkYXB0ZXInO1xuaW1wb3J0IHsgRW5jb3VudGVyVmlld2VyU2VydmljZSB9IGZyb20gJy4vZW5jb3VudGVyLXZpZXdlci5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFTb3VyY2VzIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9kYXRhLXNvdXJjZXMvZGF0YS1zb3VyY2VzJztcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuLi9mb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9pbnRlcmZhY2VzL2RhdGEtc291cmNlJztcblxuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0ICogYXMgcGRmTWFrZSBmcm9tICdwZGZtYWtlL2J1aWxkL3BkZm1ha2UuanMnO1xuaW1wb3J0ICdwZGZtYWtlL2J1aWxkL3Zmc19mb250cy5qcyc7XG5pbXBvcnQgKiBhcyBwZGZGb250cyBmcm9tICdwZGZtYWtlL2J1aWxkL3Zmc19mb250cyc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuXG5leHBvcnQgY2xhc3MgRW5jb3VudGVyUGRmVmlld2VyU2VydmljZSB7XG4gIHByaXZhdGUgcmVtb3RlRGF0YVNvdXJjZTogRGF0YVNvdXJjZTtcbiAgcHVibGljIGVycm9yOiBib29sZWFuO1xuICBwdWJsaWMgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XG4gIHB1YmxpYyBzaG93TG9hZGVyOiBib29sZWFuO1xuICBwdWJsaWMgc3Vic2NyaWJlZEFuc3dlcnM6IGFueSA9IHtcbiAgICBxdWVzdGlvbnM6IHtcbiAgICAgIHN0YWNrOiBbXVxuICAgIH0sXG4gICAgYW5zd2VyczogW11cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVuY291bnRlclZpZXdlclNlcnZpY2U6IEVuY291bnRlclZpZXdlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBvYnNWYWx1ZUFkYXB0ZXI6IE9ic1ZhbHVlQWRhcHRlcixcbiAgICBwcml2YXRlIGRhdGFTb3VyY2VzOiBEYXRhU291cmNlc1xuICApIHt9XG5cbiAgZ2V0UGFnZXMocGFnZXM6IGFueSwgZm9ybTogRm9ybSwgcmVtb3RlU2VsZWN0c09ubHk/OiBib29sZWFuLCByZW1vdGVBbnM/OiBhbnkpOiBhbnlbXSB7XG4gICAgY29uc3QgY29udGVudCA9IFtdO1xuICAgIGxldCByZW1vdGVRdWVzdGlvbnMgPSBbXTtcblxuICAgIGZvciAoY29uc3QgcGFnZSBvZiBwYWdlcykge1xuICAgICAgaWYgKHJlbW90ZVNlbGVjdHNPbmx5KSB7XG4gICAgICAgIHJlbW90ZVF1ZXN0aW9ucyA9IHJlbW90ZVF1ZXN0aW9ucy5jb25jYXQodGhpcy5nZXRTZWN0aW9ucyhwYWdlLnBhZ2UsIGZvcm0sIGZhbHNlLCByZW1vdGVBbnMpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAoY29uc3QgcXVlc3Rpb24gb2YgZm9ybS5yb290Tm9kZS5xdWVzdGlvbi5xdWVzdGlvbnMpIHtcbiAgICAgICAgICBpZiAocGFnZS5sYWJlbCA9PT0gZm9ybS5yb290Tm9kZS5jaGlsZHJlbltxdWVzdGlvbi5rZXldLnF1ZXN0aW9uLmxhYmVsICYmXG4gICAgICAgICAgICB0aGlzLmVuY291bnRlclZpZXdlclNlcnZpY2UucXVlc3Rpb25zQW5zd2VyZWQoZm9ybS5yb290Tm9kZS5jaGlsZHJlbltxdWVzdGlvbi5rZXldKSkge1xuICAgICAgICAgICAgY29udGVudC5wdXNoKHtcbiAgICAgICAgICAgICAgc3R5bGU6ICd0YWJsZUV4YW1wbGUnLFxuICAgICAgICAgICAgICB0YWJsZToge1xuICAgICAgICAgICAgICAgIHdpZHRoczogWycqJ10sXG4gICAgICAgICAgICAgICAgaGVhZGVyUm93czogMSxcbiAgICAgICAgICAgICAgICBrZWVwV2l0aEhlYWRlclJvd3M6IDEsXG4gICAgICAgICAgICAgICAgYm9keTogW1xuICAgICAgICAgICAgICAgICAgW3sgdGV4dDogcGFnZS5sYWJlbCwgc3R5bGU6ICd0YWJsZUhlYWRlcicgfV0sXG4gICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogJ3RhYmxlRXhhbXBsZScsXG4gICAgICAgICAgICAgICAgICAgICAgdGFibGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoczogWycqJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5OiB0aGlzLmdldFNlY3Rpb25zKHBhZ2UucGFnZSwgZm9ybSwgdHJ1ZSwgcmVtb3RlQW5zKVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgbGF5b3V0OiAnbm9Cb3JkZXJzJyxcbiAgICAgICAgICAgICAgICAgICAgICBtYXJnaW46IFs1LCAwLCAwLCAwXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBsYXlvdXQ6IHtcbiAgICAgICAgICAgICAgICBoTGluZVdpZHRoOiBmdW5jdGlvbihpLCBub2RlKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gKGkgPT09IDAgfHwgaSA9PT0gbm9kZS50YWJsZS5ib2R5Lmxlbmd0aCkgPyAwLjUgOiAwLjU7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2TGluZVdpZHRoOiBmdW5jdGlvbihpLCBub2RlKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gKGkgPT09IDAgfHwgaSA9PT0gbm9kZS50YWJsZS53aWR0aHMubGVuZ3RoKSA/IDAuNSA6IDAuNTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGhMaW5lQ29sb3I6IGZ1bmN0aW9uKGksIG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoaSA9PT0gMCB8fCBpID09PSBub2RlLnRhYmxlLmJvZHkubGVuZ3RoKSA/ICcjZGRkJyA6ICcjZGRkJztcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZMaW5lQ29sb3I6IGZ1bmN0aW9uKGksIG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoaSA9PT0gMCB8fCBpID09PSBub2RlLnRhYmxlLmJvZHkubGVuZ3RoKSA/ICcjZGRkJyA6ICcjZGRkJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVtb3RlU2VsZWN0c09ubHkgPyByZW1vdGVRdWVzdGlvbnMgOiBjb250ZW50O1xuICB9XG5cbiAgZ2V0U2VjdGlvbnMoc2VjdGlvbnM6IGFueSwgZm9ybTogRm9ybSwgcmVzb2x2ZTogYW55LCByZW1vdGVBbnM6IGFueSk6IGFueVtdIHtcbiAgICBjb25zdCBjb250ZW50ID0gW107XG4gICAgY29uc3QgYW5zd2VyZWRTZWN0aW9ucyA9IFtdO1xuICAgIGxldCBxdWVzdGlvbnM6IEFycmF5PE9ic2VydmFibGU8YW55Pj4gPSBbXTtcblxuICAgIHNlY3Rpb25zLm1hcChzID0+IHtcbiAgICAgIGlmICh0aGlzLmVuY291bnRlclZpZXdlclNlcnZpY2UucXVlc3Rpb25zQW5zd2VyZWQocy5ub2RlKSkge1xuICAgICAgICBhbnN3ZXJlZFNlY3Rpb25zLnB1c2gocyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBmb3IgKGNvbnN0IHNlY3Rpb24gb2YgYW5zd2VyZWRTZWN0aW9ucykge1xuICAgICAgcXVlc3Rpb25zID0gcXVlc3Rpb25zLmNvbmNhdCh0aGlzLmdldFJlbW90ZVNlY3Rpb25EYXRhKHNlY3Rpb24uc2VjdGlvbikpO1xuICAgIH1cblxuICAgIGlmIChyZXNvbHZlICYmIHJlbW90ZUFucykge1xuICAgICAgZm9yIChjb25zdCBzZWN0aW9uIG9mIGFuc3dlcmVkU2VjdGlvbnMpIHtcbiAgICAgICAgY29udGVudC5wdXNoKFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0YWJsZToge1xuICAgICAgICAgICAgICB3aWR0aHM6IFsnKiddLFxuICAgICAgICAgICAgICBib2R5OiBbXG4gICAgICAgICAgICAgICAgW3sgdGV4dDogc2VjdGlvbi5sYWJlbCwgc3R5bGU6ICd0YWJsZVN1YmhlYWRlcicgfV0sXG4gICAgICAgICAgICAgICAgWyB0aGlzLmdldFNlY3Rpb25EYXRhKHNlY3Rpb24uc2VjdGlvbiwgcmVtb3RlQW5zLCBmb3JtKSBdXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsYXlvdXQ6ICdub0JvcmRlcnMnXG4gICAgICAgICAgfVxuICAgICAgICBdKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcXVlc3Rpb25zO1xuICAgIH1cbiAgfVxuXG4gIGFwcGVuZFJlc29sdmVkQW5zd2VyKHJlc29sdmVkQW5zd2VyOiBhbnksIHF1ZXN0aW9uczogYW55LCBub2RlPzogYW55KSB7XG4gICAgaWYgKHJlc29sdmVkQW5zd2VyKSB7XG4gICAgICBxdWVzdGlvbnMuc3RhY2sucHVzaCh7XG4gICAgICAgIHRleHQ6IFtcbiAgICAgICAgICBgJHsobm9kZSkgPyBub2RlLnF1ZXN0aW9uLmxhYmVsIDogJ1F1ZXN0aW9uIGxhYmVsJyB9JHtcbiAgICAgICAgICAgIChub2RlKSA/IChub2RlLnF1ZXN0aW9uLmxhYmVsLmluZGV4T2YoJzonKSA+IDEgPyAnJyA6ICc6JykgOiAnJ1xuICAgICAgICAgIH0gYCxcbiAgICAgICAgICB7IHRleHQ6IGAke3Jlc29sdmVkQW5zd2VyfWAsIGJvbGQ6IHRydWUgfVxuICAgICAgICBdLCBzdHlsZTogJ2Fuc3dlcnMnXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvLyBnZXQgcmVtb3RlIHNlbGVjdHMgb25seVxuICBnZXRSZW1vdGVTZWN0aW9uRGF0YShzZWN0aW9uOiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IHF1ZXN0aW9uczogQXJyYXk8T2JzZXJ2YWJsZTxhbnk+PiA9IFtdO1xuICAgIHRoaXMuc3Vic2NyaWJlZEFuc3dlcnMucXVlc3Rpb25zLnN0YWNrID0gW107XG5cbiAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygc2VjdGlvbikge1xuICAgICAgaWYgKG5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3JlbW90ZS1zZWxlY3QnKSB7XG4gICAgICAgIHRoaXMucmVtb3RlRGF0YVNvdXJjZSA9IHRoaXMuZGF0YVNvdXJjZXMuZGF0YVNvdXJjZXNbbm9kZS5xdWVzdGlvbi5kYXRhU291cmNlXTtcbiAgICAgICAgaWYgKG5vZGUuY29udHJvbC52YWx1ZSAhPT0gJycpIHtcbiAgICAgICAgICBpZiAodGhpcy5yZW1vdGVEYXRhU291cmNlKSB7XG4gICAgICAgICAgICBxdWVzdGlvbnMucHVzaCh0aGlzLnJlbW90ZURhdGFTb3VyY2UucmVzb2x2ZVNlbGVjdGVkVmFsdWUobm9kZS5jb250cm9sLnZhbHVlKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBxdWVzdGlvbnM7XG4gIH1cblxuICAvLyBtZXJnZSByZW1vdGUgc2VsZWN0c1xuICBnZXRTZWN0aW9uRGF0YShzZWN0aW9uOiBhbnksIHJlbW90ZUFuczogYW55W10sIGZvcm06IEZvcm0pOiBhbnkge1xuICAgIGNvbnN0IHF1ZXN0aW9ucyA9IHtcbiAgICAgIHN0YWNrOiBbXVxuICAgIH07XG5cbiAgICBsZXQgcmVzb2x2ZWRBbnN3ZXIgPSAnJztcblxuICAgIGZvciAoY29uc3Qgbm9kZSBvZiBzZWN0aW9uKSB7XG4gICAgICBzd2l0Y2ggKG5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSkge1xuICAgICAgICBjYXNlICdncm91cCc6XG4gICAgICAgICAgaWYgKG5vZGUuZ3JvdXBNZW1iZXJzKSB7XG4gICAgICAgICAgICBxdWVzdGlvbnMuc3RhY2sucHVzaCh0aGlzLmdldFNlY3Rpb25EYXRhKG5vZGUuZ3JvdXBNZW1iZXJzLCByZW1vdGVBbnMsIGZvcm0pKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnZmllbGQtc2V0JzpcbiAgICAgICAgICBpZiAobm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgY29uc3QgZ3JvdXBNZW1iZXJzID0gW107XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBPYmplY3Qua2V5cyhub2RlLmNoaWxkcmVuKS5tYXAoKGtleSkgPT4gbm9kZS5jaGlsZHJlbltrZXldKTtcblxuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICBncm91cE1lbWJlcnMucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgICBxdWVzdGlvbnMuc3RhY2sucHVzaCh0aGlzLmdldFNlY3Rpb25EYXRhKGdyb3VwTWVtYmVyc1swXSwgcmVtb3RlQW5zLCBmb3JtKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3JlcGVhdGluZyc6XG4gICAgICAgICAgaWYgKG5vZGUuZ3JvdXBNZW1iZXJzKSB7XG4gICAgICAgICAgICBxdWVzdGlvbnMuc3RhY2sucHVzaCh0aGlzLmdldFNlY3Rpb25EYXRhKG5vZGUuZ3JvdXBNZW1iZXJzLCByZW1vdGVBbnMsIGZvcm0pKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAncmVtb3RlLXNlbGVjdCc6XG4gICAgICAgICAgdGhpcy5yZW1vdGVEYXRhU291cmNlID0gdGhpcy5kYXRhU291cmNlcy5kYXRhU291cmNlc1tub2RlLnF1ZXN0aW9uLmRhdGFTb3VyY2VdO1xuICAgICAgICAgIGZvciAoY29uc3QgYW5zIG9mIHJlbW90ZUFucykge1xuICAgICAgICAgICAgaWYgKGFucy52YWx1ZSA9PT0gbm9kZS5jb250cm9sLnZhbHVlKSB7XG4gICAgICAgICAgICAgIHRoaXMuYXBwZW5kUmVzb2x2ZWRBbnN3ZXIoYW5zLmxhYmVsLCBxdWVzdGlvbnMsIG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGNvbnN0IGFuc3dlciA9IG5vZGUuY29udHJvbC52YWx1ZTtcbiAgICAgICAgICByZXNvbHZlZEFuc3dlciA9IHRoaXMucmVzb2x2ZVZhbHVlKGFuc3dlciwgZm9ybSk7XG4gICAgICAgICAgdGhpcy5hcHBlbmRSZXNvbHZlZEFuc3dlcihyZXNvbHZlZEFuc3dlciwgcXVlc3Rpb25zLCBub2RlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcXVlc3Rpb25zO1xuICB9XG5cbiAgcmVzb2x2ZVZhbHVlKGFuc3dlcjogYW55LCBmb3JtOiBGb3JtLCBhcnJheUVsZW1lbnQ/OiBib29sZWFuKTogYW55IHtcbiAgICBpZiAoYW5zd2VyICE9PSAnJykge1xuICAgICAgaWYgKHRoaXMuaXNVdWlkKGFuc3dlcikpIHtcbiAgICAgICAgY29uc3QgdmFsID0gdGhpcy5lbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlLnJlc29sdmVTZWxlY3RlZFZhbHVlRnJvbVNjaGVtYShhbnN3ZXIsIGZvcm0uc2NoZW1hKTtcbiAgICAgICAgaWYgKCFhcnJheUVsZW1lbnQpIHtcbiAgICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBhbnN3ZXI7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoXy5pc0FycmF5KGFuc3dlcikpIHtcbiAgICAgICAgY29uc3QgYXJyID0gW107XG4gICAgICAgIF8uZm9yRWFjaChhbnN3ZXIsIGVsZW0gPT4ge1xuICAgICAgICAgIGFyci5wdXNoKHRoaXMucmVzb2x2ZVZhbHVlKGVsZW0sIGZvcm0sIHRydWUpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBhcnIudG9TdHJpbmcoKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0RhdGUoYW5zd2VyKSkge1xuICAgICAgICBpZiAoIWFycmF5RWxlbWVudCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmVuY291bnRlclZpZXdlclNlcnZpY2UuY29udmVydFRpbWUoYW5zd2VyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5lbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlLmNvbnZlcnRUaW1lKGFuc3dlcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFuc3dlciA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gW107XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IE9iamVjdC5rZXlzKGFuc3dlcikubWFwKChrZXkpID0+IFtrZXksIGFuc3dlcltrZXldXSk7XG5cbiAgICAgICAgdmFsdWVzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgcmV0dXJuIGFuc3dlcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZW5lcmF0ZVBkZkRlZmluaXRpb24oZm9ybTogRm9ybSk6IGFueSB7XG4gICAgY29uc3QgZG9jRGVmaW5pdGlvbiQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4oe30pO1xuICAgIGNvbnN0IHJlbW90ZVNlbGVjdHMgPSB0aGlzLmdldFBhZ2VzKCh0aGlzLm9ic1ZhbHVlQWRhcHRlci50cmF2ZXJzZShmb3JtLnJvb3ROb2RlKSksIGZvcm0sIHRydWUpO1xuXG4gICAgY29tYmluZUxhdGVzdChyZW1vdGVTZWxlY3RzKS5zdWJzY3JpYmUocmVtb3RlQW5zID0+IHtcbiAgICAgIGlmIChyZW1vdGVBbnMpIHtcbiAgICAgICAgY29uc3QgZG9jRGVmaW5pdGlvbiA9IHtcbiAgICAgICAgICBjb250ZW50OiB0aGlzLmdldFBhZ2VzKHRoaXMub2JzVmFsdWVBZGFwdGVyLnRyYXZlcnNlKGZvcm0ucm9vdE5vZGUpLCBmb3JtLCBmYWxzZSwgcmVtb3RlQW5zKSxcbiAgICAgICAgICBzdHlsZXM6IHtcbiAgICAgICAgICAgIGFuc3dlcnM6IHtcbiAgICAgICAgICAgICAgZm9udFNpemU6IDhcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb25maWRlbnRpYWw6IHtcbiAgICAgICAgICAgICAgY29sb3I6ICdyZWQnLFxuICAgICAgICAgICAgICBmb250U2l6ZTogOCxcbiAgICAgICAgICAgICAgYm9sZDogdHJ1ZSxcbiAgICAgICAgICAgICAgbWFyZ2luOiBbNjAsIDAsIDAsIDBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgIGZvbnRTaXplOiA5LFxuICAgICAgICAgICAgICBib2xkOiB0cnVlLFxuICAgICAgICAgICAgICBtYXJnaW46IFs1LCA1LCA1LCA1XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRhYmxlRXhhbXBsZToge1xuICAgICAgICAgICAgICBmb250U2l6ZTogMTAsXG4gICAgICAgICAgICAgIG1hcmdpbjogWzUsIDAsIDAsIDVdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGFibGVIZWFkZXI6IHtcbiAgICAgICAgICAgICAgZmlsbENvbG9yOiAnI2Y1ZjVmNScsXG4gICAgICAgICAgICAgIHdpZHRoOiBbJzEwMCUnXSxcbiAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6ICcjMzMzJyxcbiAgICAgICAgICAgICAgZm9udFNpemU6IDksXG4gICAgICAgICAgICAgIGJvbGQ6IHRydWUsXG4gICAgICAgICAgICAgIG1hcmdpbjogWzUsIDAsIDUsIDBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGFibGVTdWJoZWFkZXI6IHtcbiAgICAgICAgICAgICAgZmlsbENvbG9yOiAnIzMzN2FiNycsXG4gICAgICAgICAgICAgIHdpZHRoOiBbJzEwMCUnXSxcbiAgICAgICAgICAgICAgZm9udFNpemU6IDksXG4gICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgICAgICBtYXJnaW46IFs1LCAwLCA1LCAwXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhbm5lcjoge1xuICAgICAgICAgICAgICBmaWxsQ29sb3I6ICcjZDllZGY3JyxcbiAgICAgICAgICAgICAgZm9udFNpemU6IDksXG4gICAgICAgICAgICAgIGJvbGQ6IHRydWUsXG4gICAgICAgICAgICAgIG1hcmdpbjogWzQ1LCAyMCwgMjAsIDIwXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhbm5lckxhYmVsOiB7XG4gICAgICAgICAgICAgIGNvbG9yOiAnI2E5YTlhOSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYW5uZXJJdGVtOiB7XG4gICAgICAgICAgICAgIG1hcmdpbjogWzIwLCAwLCAxMCwgMF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aW1lc3RhbXA6IHtcbiAgICAgICAgICAgICAgYWxpZ25tZW50OiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgYm9sZDogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBhZ2VOdW1iZXI6IHtcbiAgICAgICAgICAgICAgYWxpZ25tZW50OiAncmlnaHQnLFxuICAgICAgICAgICAgICBtYXJnaW46IFswLCAwLCA1LCA1XVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZGVmYXVsdFN0eWxlOiB7XG4gICAgICAgICAgICBmb250U2l6ZTogN1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZG9jRGVmaW5pdGlvbiQubmV4dChkb2NEZWZpbml0aW9uKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBkb2NEZWZpbml0aW9uJDtcbiAgfVxuXG4gIGRpc3BsYXlQZGYoZm9ybSkge1xuICAgIGNvbnN0IHBkZiA9IHBkZk1ha2U7XG4gICAgbGV0IHBhdGllbnQ7XG4gICAgcGRmLnZmcyA9IHBkZkZvbnRzLnBkZk1ha2UudmZzO1xuICAgIFxuICAgIGlmIChmb3JtLmRhdGFTb3VyY2VzQ29udGFpbmVyLmRhdGFTb3VyY2VzLl9kYXRhU291cmNlcykge1xuICAgICAgcGF0aWVudCA9IGZvcm0uZGF0YVNvdXJjZXNDb250YWluZXIuZGF0YVNvdXJjZXMuX2RhdGFTb3VyY2VzWydwYXRpZW50SW5mbyddO1xuICAgIH1cblxuICAgIHRoaXMuZ2VuZXJhdGVQZGZEZWZpbml0aW9uKGZvcm0pLnN1YnNjcmliZShkb2NEZWZpbml0aW9uID0+IHtcbiAgICAgIGlmICghKF8uaXNFbXB0eShkb2NEZWZpbml0aW9uKSkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBwYXRpZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGNvbnN0IGJhbm5lciA9IFtdO1xuXG4gICAgICAgICAgaWYgKHBhdGllbnQubmFtZSkge1xuICAgICAgICAgICAgYmFubmVyLnB1c2goe1xuICAgICAgICAgICAgICB0ZXh0OiBbXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnTmFtZTogJywgc3R5bGU6ICdiYW5uZXJMYWJlbCcgfSxcbiAgICAgICAgICAgICAgICB7IHRleHQ6IGAke3RoaXMudGl0bGVpemUocGF0aWVudC5uYW1lKX1gIH1cbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgc3R5bGU6ICdiYW5uZXJJdGVtJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICBcbiAgICAgICAgICBpZiAocGF0aWVudC5uaWQpIHtcbiAgICAgICAgICAgIGJhbm5lci5wdXNoKHtcbiAgICAgICAgICAgICAgdGV4dDogW1xuICAgICAgICAgICAgICAgIHsgdGV4dDogJ05JRDogJywgc3R5bGU6ICdiYW5uZXJMYWJlbCcgfSxcbiAgICAgICAgICAgICAgICB7IHRleHQ6IGAke3BhdGllbnQubmlkfWAgfVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBzdHlsZTogJ2Jhbm5lckl0ZW0nXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gIFxuICAgICAgICAgIGlmIChwYXRpZW50Lm11aSkge1xuICAgICAgICAgICAgYmFubmVyLnB1c2goe1xuICAgICAgICAgICAgICB0ZXh0OiBbXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnTVVJOiAnLCBzdHlsZTogJ2Jhbm5lckxhYmVsJyB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogYCR7cGF0aWVudC5tdWl9YCB9XG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIHN0eWxlOiAnYmFubmVySXRlbSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgXG4gICAgICAgICAgaWYgKHBhdGllbnQuYmlydGhkYXRlKSB7XG4gICAgICAgICAgICBiYW5uZXIucHVzaCh7XG4gICAgICAgICAgICB0ZXh0OiBbXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1lPQjogJywgc3R5bGU6ICdiYW5uZXJMYWJlbCcgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiBgJHttb21lbnQocGF0aWVudC5iaXJ0aGRhdGUpLmZvcm1hdCgnbCcpfSAoJHtwYXRpZW50LmFnZX0geW8pYCB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgc3R5bGU6ICdiYW5uZXJJdGVtJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICBcbiAgICAgICAgICBkb2NEZWZpbml0aW9uLmhlYWRlciA9IHtcbiAgICAgICAgICAgIHN0eWxlOiAnYmFubmVyJyxcbiAgICAgICAgICAgIHRhYmxlOiB7XG4gICAgICAgICAgICAgIGJvZHk6IFsgYmFubmVyIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsYXlvdXQ6ICdub0JvcmRlcnMnXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY0RlZmluaXRpb24uZm9vdGVyID0gKGN1cnJlbnRQYWdlLCBwYWdlQ291bnQpID0+IHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29sdW1uczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgd2lkdGhzOiBbJyonLCAnKicsICcqJ10sXG4gICAgICAgICAgICAgICAgc3RhY2s6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDpcbiAgICAgICAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgYE5vdGU6IENvbmZpZGVudGlhbGl0eSBpcyBvbmUgb2YgdGhlIGNvcmUgZHV0aWVzIG9mIGFsbCBtZWRpY2FsIHByYWN0aXRpb25lcnMuIFBhdGllbnRzJyBwZXJzb25hbCBoZWFsdGggaW5mb3JtYXRpb24gc2hvdWxkIGJlIGtlcHQgcHJpdmF0ZS5gLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZTogJ2NvbmZpZGVudGlhbCdcbiAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogY3VycmVudFBhZ2UudG9TdHJpbmcoKSArICcgb2YgJyArIHBhZ2VDb3VudCxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6ICdwYWdlTnVtYmVyJ1xuICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBgR2VuZXJhdGVkIG9uIGAgKyBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZTogJ3RpbWVzdGFtcCdcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9O1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHdpbiA9IHdpbmRvdy5vcGVuKCcnLCAnX2JsYW5rJyk7XG4gICAgICAgIHBkZi5jcmVhdGVQZGYoZG9jRGVmaW5pdGlvbikub3Blbih7fSwgd2luKTtcbiAgICAgIH1cbiAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdFcnJvcjogJywgZXJyb3IpO1xuICAgIH0pO1xuICB9XG5cbiAgaXNEYXRlKHZhbDogYW55KSB7XG4gICAgcmV0dXJuIG1vbWVudCh2YWwsIG1vbWVudC5JU09fODYwMSwgdHJ1ZSkuaXNWYWxpZCgpO1xuICB9XG5cbiAgaXNVdWlkKHZhbHVlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gKHZhbHVlLmxlbmd0aCA9PT0gMzYgJiYgdmFsdWUuaW5kZXhPZignICcpID09PSAtMSAmJiB2YWx1ZS5pbmRleE9mKCcuJykgPT09IC0xKTtcbiAgfVxuXG4gIHRpdGxlaXplKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvXFx3XFxTKi9nLCBzID0+IHMuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzLnN1YnN0cigxKS50b0xvd2VyQ2FzZSgpKTtcbiAgfVxufVxuIl19
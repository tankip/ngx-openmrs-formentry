/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as _ from 'lodash';
import * as moment_ from 'moment';
var /** @type {?} */ moment = moment_;
import { TextInputQuestion } from '../question-models/text-input-question';
import { TextAreaInputQuestion } from '../question-models/text-area-input-question';
import { SelectQuestion } from '../question-models/select-question';
import { UiSelectQuestion } from '../question-models/ui-select-question';
import { DateQuestion } from '../question-models/date-question';
import { MultiSelectQuestion } from '../question-models/multi-select-question';
import { QuestionGroup } from '../question-models/group-question';
import { RepeatingQuestion } from '../question-models/repeating-question';
import { FileUploadQuestion } from '../question-models/file-upload-question';
import { TestOrderQuestion } from '../question-models/test-order-question';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
import { ValidationModel } from '../question-models/validation.model';
import { DateValidationModel } from '../question-models/date-validation.model';
import { MaxValidationModel } from '../question-models/max-validation.model';
import { MinValidationModel } from '../question-models/min-validation.model';
import { JsExpressionValidationModel } from '../question-models/js-expression-validation.model';
import { ConditionalValidationModel } from '../question-models/conditional-validation.model';
import { DummyDataSource } from '../data-sources/dummy-data-source';
import { HistoricalHelperService } from '../helpers/historical-expression-helper-service';
import { CheckBoxQuestion } from '../question-models/models';
var QuestionFactory = /** @class */ (function () {
    function QuestionFactory() {
        this.dataSources = {};
        this.historicalHelperService = new HistoricalHelperService();
    }
    /**
     * @param {?} formSchema
     * @param {?=} form
     * @return {?}
     */
    QuestionFactory.prototype.createQuestionModel = /**
     * @param {?} formSchema
     * @param {?=} form
     * @return {?}
     */
    function (formSchema, form) {
        if (form) {
            var /** @type {?} */ dataSources = form.dataSourcesContainer.dataSources;
            this.dataSources = dataSources;
        }
        return this.toFormQuestionModel(formSchema);
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toSelectQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ question = new SelectQuestion({ options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.options = schemaQuestion.questionOptions.answers.map(function (obj) {
            return {
                label: obj.label,
                value: obj.concept
            };
        });
        var /** @type {?} */ options = question.options;
        options.splice(0, 0, {
            label: '',
            value: ''
        });
        question.renderingType = schemaQuestion.questionOptions.rendering;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        var /** @type {?} */ mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toNumericQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ question = new TextInputQuestion({ placeholder: '', type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'number';
        question.placeholder = schemaQuestion.questionOptions.placeholder;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.placeholder = schemaQuestion.questionOptions.placeholder || '';
        var /** @type {?} */ mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toNumberQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ question = new TextInputQuestion({ placeholder: '', type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'number';
        question.placeholder = schemaQuestion.questionOptions.placeholder || '';
        question.extras = schemaQuestion;
        var /** @type {?} */ mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        question.validators = this.addValidators(schemaQuestion);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toDateQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        if (schemaQuestion.type === 'encounterDatetime') {
            return this.toEncounterDatetimeQuestion(schemaQuestion);
        }
        var /** @type {?} */ question = new DateQuestion({ type: '', key: '' });
        question.renderingType = 'date';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.showTime = /** @type {?} */ (schemaQuestion.questionOptions.showTime);
        question.showWeeksAdder = schemaQuestion.questionOptions.weeksList ? true : false;
        var /** @type {?} */ mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toEncounterDatetimeQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ question = new DateQuestion({ type: '', key: '' });
        question.label = schemaQuestion.label;
        question.renderingType = 'date';
        question.key = schemaQuestion.id;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.showWeeksAdder = schemaQuestion.questionOptions.weeksList ? true : false;
        var /** @type {?} */ mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        question.showTime = true;
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toCheckBoxQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ question = new CheckBoxQuestion({ options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.extras = schemaQuestion;
        question.options = schemaQuestion.questionOptions.answers.map(function (obj) {
            return {
                label: obj.label,
                value: obj.concept
            };
        });
        question.options.splice(0, 0);
        question.renderingType = schemaQuestion.questionOptions.rendering;
        var /** @type {?} */ mappings = {
            label: 'label',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toMultiCheckboxQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ question = new MultiSelectQuestion({ renderType: '', options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.options = schemaQuestion.questionOptions.answers.map(function (obj) {
            return {
                label: obj.label,
                value: obj.concept
            };
        });
        question.validators = this.addValidators(schemaQuestion);
        question.dataSource = new DummyDataSource();
        question.extras = schemaQuestion;
        var /** @type {?} */ mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toTextAreaQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ question = new TextAreaInputQuestion({
            isExpanded: false, rows: 18,
            placeholder: '', type: '', key: ''
        });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.placeholder = schemaQuestion.questionOptions.placeholder;
        question.isExpanded = schemaQuestion.isExpanded;
        question.rows = schemaQuestion.questionOptions.rows;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.placeholder = schemaQuestion.questionOptions.placeholder || '';
        var /** @type {?} */ mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toTextQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ question = new TextInputQuestion({ placeholder: '', type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'text';
        question.placeholder = schemaQuestion.questionOptions.placeholder;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.placeholder = schemaQuestion.questionOptions.placeholder || '';
        var /** @type {?} */ mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toFileUploadQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ question = new FileUploadQuestion({ type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'file';
        question.dataSource = 'file';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        var /** @type {?} */ mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toDrugQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ question = new SelectQuestion({ options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'remote-select';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.dataSource = 'drug';
        var /** @type {?} */ mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toProblemQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ question = new SelectQuestion({ options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'remote-select';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.dataSource = 'problem';
        var /** @type {?} */ mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toConceptAnswerSelect = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ question = new SelectQuestion({ options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'remote-select';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.dataSource = schemaQuestion.questionOptions.dataSource || 'conceptAnswers';
        question.dataSourceOptions = {
            concept: schemaQuestion.questionOptions.concept
        };
        var /** @type {?} */ mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toRepeatingQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ question = new RepeatingQuestion({ questions: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.questions = this.getChildrenQuestionModels(schemaQuestion.questions);
        question.key = schemaQuestion.id;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        if (schemaQuestion.type === 'testOrder') {
            var /** @type {?} */ testOrder = this.toTestOrderQuestion(schemaQuestion);
            var /** @type {?} */ orders = [];
            orders.push(testOrder);
            question.questions = orders;
        }
        var /** @type {?} */ mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toGroupQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ question = new QuestionGroup({ questions: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.questions = this.getChildrenQuestionModels(schemaQuestion.questions);
        question.key = schemaQuestion.id;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        var /** @type {?} */ mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toPageQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var _this = this;
        var /** @type {?} */ question = new QuestionGroup({ questions: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.label;
        question.renderingType = 'page';
        question.controlType = AfeControlType.None;
        question.questions = [];
        schemaQuestion.sections.forEach(function (element) {
            question.questions.push(_this.toSectionQuestion(element));
        });
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toFormQuestionModel = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var _this = this;
        var /** @type {?} */ question = new QuestionGroup({ questions: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.label;
        question.renderingType = 'form';
        question.controlType = AfeControlType.AfeFormGroup;
        question.extras = schemaQuestion;
        question.questions = [];
        schemaQuestion.pages.forEach(function (element) {
            question.questions.push(_this.toPageQuestion(element));
        });
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toSectionQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ question = new QuestionGroup({ questions: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.label;
        question.renderingType = 'section';
        question.controlType = AfeControlType.None;
        question.isExpanded = schemaQuestion.isExpanded === 'true' ? true : false;
        question.questions = this.getSchemaQuestions(schemaQuestion.questions);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toPersonAttributeQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ question = new UiSelectQuestion({
            options: [], type: '', key: '', searchFunction: function () { },
            resolveFunction: function () {
            }
        });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'remote-select';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.dataSource = 'personAttribute';
        var /** @type {?} */ mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toEncounterProviderQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ question = new UiSelectQuestion({
            options: [], type: '', key: '', searchFunction: function () { },
            resolveFunction: function () {
            }
        });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'remote-select';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.dataSource = 'provider';
        var /** @type {?} */ mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toFieldSetQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ toReturn = this.toGroupQuestion(schemaQuestion);
        toReturn.renderingType = 'field-set';
        return toReturn;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toEncounterLocationQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ question = new UiSelectQuestion({
            options: [], type: '', key: '', searchFunction: function () { },
            resolveFunction: function () {
            }
        });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = schemaQuestion.type;
        question.renderingType = 'remote-select';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.dataSource = 'location';
        var /** @type {?} */ mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toTestOrderQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ question = new TestOrderQuestion({
            type: '', key: '', orderType: '', selectableOrders: [],
            orderSettingUuid: '', label: '', rendering: ''
        });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.options = schemaQuestion.questionOptions.selectableOrders.map(function (obj) {
            return {
                label: obj.label,
                value: obj.concept
            };
        });
        var /** @type {?} */ mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schema
     * @return {?}
     */
    QuestionFactory.prototype.getSchemaQuestions = /**
     * @param {?} schema
     * @return {?}
     */
    function (schema) {
        var /** @type {?} */ listQuestions = new Array();
        this.getQuestions(schema, listQuestions);
        return listQuestions;
    };
    /**
     * @param {?} schema
     * @param {?} foundArray
     * @return {?}
     */
    QuestionFactory.prototype.getQuestions = /**
     * @param {?} schema
     * @param {?} foundArray
     * @return {?}
     */
    function (schema, foundArray) {
        if (!Array.isArray(foundArray)) {
            foundArray = [];
        }
        if (Array.isArray(schema)) {
            for (var /** @type {?} */ property in schema) {
                if (schema.hasOwnProperty(property)) {
                    this.getQuestions(schema[property], foundArray);
                }
            }
        }
        if (schema && !Array.isArray(schema) && typeof schema === 'object') {
            if (schema.questionOptions) {
                if (schema.questionOptions.rendering === 'group' ||
                    schema.questionOptions.rendering === 'repeating') {
                    // schema.questions = this.getGroupMembers(schema.questions);
                    foundArray.push(this.toModel(schema, schema.questionOptions.rendering));
                }
                else if (schema.questionOptions.rendering === 'field-set') {
                }
                else {
                    foundArray.push(this.toModel(schema, schema.questionOptions.rendering));
                }
            }
            else {
                for (var /** @type {?} */ o in schema) {
                    if (schema.hasOwnProperty(o)) {
                        this.getQuestions(schema[o], foundArray);
                    }
                }
            }
        }
    };
    /**
     * @param {?} schema
     * @return {?}
     */
    QuestionFactory.prototype.getChildrenQuestionModels = /**
     * @param {?} schema
     * @return {?}
     */
    function (schema) {
        var /** @type {?} */ children = [];
        this.getQuestions(schema, children);
        return children;
    };
    /**
     * @param {?} schema
     * @param {?} renderType
     * @return {?}
     */
    QuestionFactory.prototype.toModel = /**
     * @param {?} schema
     * @param {?} renderType
     * @return {?}
     */
    function (schema, renderType) {
        if (renderType === 'ui-select-extended') {
            renderType = schema.type;
        }
        if (!schema.id) {
            schema['id'] = this.generateId(10);
        }
        if (schema.questionOptions &&
            (schema.questionOptions.showDate === true ||
                schema.questionOptions.showDate === 'true')) {
            schema = this.convertOldVersionComplexObsQuestionToNewVersion(schema);
            renderType = 'field-set';
        }
        switch (renderType) {
            case 'select':
                return this.toSelectQuestion(schema);
            case 'single-select':
                return this.toSelectQuestion(schema);
            case 'multi-select':
                return this.toSelectQuestion(schema);
            case 'numeric':
                return this.toNumericQuestion(schema);
            case 'number':
                return this.toNumberQuestion(schema);
            case 'encounterDatetime':
                return this.toEncounterDatetimeQuestion(schema);
            case 'date':
                return this.toDateQuestion(schema);
            case 'multiCheckbox':
                return this.toMultiCheckboxQuestion(schema);
            case 'drug':
                return this.toDrugQuestion(schema);
            case 'problem':
                return this.toProblemQuestion(schema);
            case 'group':
                return this.toGroupQuestion(schema);
            case 'field-set':
                return this.toFieldSetQuestion(schema);
            case 'repeating':
                return this.toRepeatingQuestion(schema);
            case 'personAttribute':
                return this.toPersonAttributeQuestion(schema);
            case 'text':
                return this.toTextQuestion(schema);
            case 'textarea':
                return this.toTextAreaQuestion(schema);
            case 'textarea':
                return this.toTextAreaQuestion(schema);
            case 'select-concept-answers':
                return this.toConceptAnswerSelect(schema);
            case 'encounterLocation':
                return this.toEncounterLocationQuestion(schema);
            case 'encounterDatetime':
                return this.toEncounterDatetimeQuestion(schema);
            case 'encounterProvider':
                return this.toEncounterProviderQuestion(schema);
            case 'radio':
                return this.toCheckBoxQuestion(schema);
            case 'checkbox':
                return this.toCheckBoxQuestion(schema);
            case 'encounterProvider':
                return this.toEncounterProviderQuestion(schema);
            case 'file':
                return this.toFileUploadQuestion(schema);
            default:
                console.warn('New Schema Question Type found.........' + renderType);
                return this.toTextQuestion(schema);
        }
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.convertOldVersionComplexObsQuestionToNewVersion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ converted = {};
        converted.type = 'complex-obs';
        converted.label = schemaQuestion.label;
        converted.id = 'complex_' + schemaQuestion.id;
        converted.questionOptions = {};
        converted.questionOptions.concept = schemaQuestion.questionOptions.concept;
        converted.questionOptions.rendering = 'field-set';
        converted.questions = [];
        converted.validators = [];
        var /** @type {?} */ mainField = JSON.parse(JSON.stringify(schemaQuestion));
        mainField.type = 'complex-obs-child';
        delete mainField.questionOptions.showDate;
        delete mainField.questionOptions.shownDateOptions;
        mainField.questionOptions.obsField = 'value';
        var /** @type {?} */ dateField = {};
        dateField.type = 'complex-obs-child';
        dateField.label = 'Date of ' + mainField.label;
        dateField.id = 'date_' + mainField.id;
        dateField.questionOptions = {};
        dateField.questionOptions.concept = schemaQuestion.questionOptions.concept;
        dateField.questionOptions.rendering = 'date';
        dateField.questionOptions.obsField = 'obsDatetime';
        var /** @type {?} */ dateOptions = (/** @type {?} */ (Object)).assign({}, schemaQuestion.questionOptions.shownDateOptions);
        dateField.validators = dateOptions.validators;
        dateField.hide = dateOptions.hide;
        converted.questions.push(mainField);
        converted.questions.push(dateField);
        return converted;
    };
    /**
     * @param {?} mappings
     * @param {?} source
     * @param {?} destination
     * @return {?}
     */
    QuestionFactory.prototype.copyProperties = /**
     * @param {?} mappings
     * @param {?} source
     * @param {?} destination
     * @return {?}
     */
    function (mappings, source, destination) {
        for (var /** @type {?} */ property in source) {
            if (mappings.hasOwnProperty(property) && destination.hasOwnProperty(mappings[property])) {
                destination[mappings[property]] = source[property];
            }
        }
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.addValidators = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var /** @type {?} */ validators = [];
        if (schemaQuestion.validators) {
            // TODO - add more validator types
            _.forEach(schemaQuestion.validators, function (validator) {
                switch (validator.type) {
                    case 'date':
                        validators.push(new DateValidationModel(validator));
                        break;
                    case 'js_expression':
                        validators.push(new JsExpressionValidationModel(validator));
                        break;
                    case 'conditionalAnswered':
                        validators.push(new ConditionalValidationModel(validator));
                        break;
                    default:
                        validators.push(new ValidationModel(validator));
                        break;
                }
            });
        }
        var /** @type {?} */ questionOptions = schemaQuestion.questionOptions;
        var /** @type {?} */ renderingType = questionOptions ? questionOptions.rendering : '';
        switch (renderingType) {
            case 'number':
                if (questionOptions.max && questionOptions.min) {
                    validators.push(new MaxValidationModel({
                        type: 'max',
                        max: questionOptions.max
                    }));
                    validators.push(new MinValidationModel({
                        type: 'min',
                        min: questionOptions.min
                    }));
                }
                break;
            default:
                break;
        }
        // add conditional required validators
        if (typeof schemaQuestion.required === 'object') {
            var /** @type {?} */ required = schemaQuestion.required;
            if (required.type === 'conditionalRequired') {
                validators.push(new ConditionalValidationModel({
                    referenceQuestionId: required.referenceQuestionId,
                    referenceQuestionAnswers: required.referenceQuestionAnswers,
                    type: required.type,
                    message: required.message,
                }));
            }
        }
        return validators;
    };
    /**
     * @param {?} schemaQuestion
     * @param {?} question
     * @return {?}
     */
    QuestionFactory.prototype.addHistoricalExpressions = /**
     * @param {?} schemaQuestion
     * @param {?} question
     * @return {?}
     */
    function (schemaQuestion, question) {
        if (schemaQuestion.historicalExpression && schemaQuestion.historicalExpression.length > 0) {
            question.setHistoricalValue(true);
            if (schemaQuestion.showHistoricalEncounterDate !== undefined) {
                question.showHistoricalEncounterDate((schemaQuestion.showHistoricalEncounterDate === 'true'));
            }
            else {
                question.showHistoricalEncounterDate();
            }
            var /** @type {?} */ origValue = this.historicalHelperService.evaluate(schemaQuestion.historicalExpression, this.dataSources, undefined);
            question.historicalDataValue = origValue;
            // console.info('historical value', origValue);
            // console.info('historical data question :::', question);
            // console.info('schema data question :::', schemaQuestion);
            if (schemaQuestion.historicalPrepopulateCondition && origValue) {
                var /** @type {?} */ toPopulate = this.historicalHelperService.evaluatePrecondition(schemaQuestion.historicalPrepopulateCondition, this.dataSources, origValue);
                if (toPopulate) {
                    question.defaultValue = origValue.value;
                }
                return; // don't try to evaluate the other option
            }
            if (schemaQuestion.historicalPrepopulate && origValue) {
                // sample schema options for this branch
                // "historicalPrepopulate":true,
                // "allowedHistoricalValueAgeInDays": 40000,
                var /** @type {?} */ valDate = moment(origValue.valueDate);
                var /** @type {?} */ differenceInDays = moment().diff(valDate, 'days');
                if (Number.isInteger(schemaQuestion.allowedHistoricalValueAgeInDays)) {
                    if (differenceInDays <= schemaQuestion.allowedHistoricalValueAgeInDays) {
                        question.defaultValue = origValue.value;
                    }
                }
                else {
                    question.defaultValue = origValue.value;
                }
            }
        }
    };
    /**
     * @param {?} schemaQuestion
     * @param {?} question
     * @return {?}
     */
    QuestionFactory.prototype.addCalculatorProperty = /**
     * @param {?} schemaQuestion
     * @param {?} question
     * @return {?}
     */
    function (schemaQuestion, question) {
        if (schemaQuestion.questionOptions &&
            typeof schemaQuestion.questionOptions.calculate === 'object') {
            question.calculateExpression = schemaQuestion.questionOptions.calculate.calculateExpression;
        }
    };
    /**
     * @param {?} schemaQuestion
     * @param {?} question
     * @return {?}
     */
    QuestionFactory.prototype.addAlertProperty = /**
     * @param {?} schemaQuestion
     * @param {?} question
     * @return {?}
     */
    function (schemaQuestion, question) {
        if (schemaQuestion.alert) {
            question.alert = schemaQuestion.alert;
        }
        // if (typeof schemaQuestion.message === 'object') {
        //   if (schemaQuestion.message.alertWhenExpression) {
        //     question.message = schemaQuestion.message.alertWhenExpression;
        //   }
        // }
    };
    /**
     * @param {?} schemaQuestion
     * @param {?} question
     * @return {?}
     */
    QuestionFactory.prototype.addDisableOrHideProperty = /**
     * @param {?} schemaQuestion
     * @param {?} question
     * @return {?}
     */
    function (schemaQuestion, question) {
        if (!!schemaQuestion.disable) {
            question.disable = schemaQuestion.disable;
        }
        if (typeof schemaQuestion.disable === 'object') {
            question.disable = schemaQuestion.disable.disableWhenExpression;
        }
        if (!!schemaQuestion.hide) {
            question.hide = schemaQuestion.hide;
        }
        if (typeof schemaQuestion.hide === 'object') {
            if (schemaQuestion.hide.hideWhenExpression) {
                question.hide = schemaQuestion.hide.hideWhenExpression;
            }
        }
    };
    /**
     * @param {?} x
     * @return {?}
     */
    QuestionFactory.prototype.generateId = /**
     * @param {?} x
     * @return {?}
     */
    function (x) {
        var /** @type {?} */ s = '_';
        while (s.length < x && x > 0) {
            var /** @type {?} */ r = Math.random();
            s += (r < 0.1 ? Math.floor(r * 100) :
                String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65)));
        }
        return '_' + s;
    };
    return QuestionFactory;
}());
export { QuestionFactory };
function QuestionFactory_tsickle_Closure_declarations() {
    /** @type {?} */
    QuestionFactory.prototype.dataSources;
    /** @type {?} */
    QuestionFactory.prototype.historicalHelperService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24uZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvZm9ybS1mYWN0b3J5L3F1ZXN0aW9uLmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDO0FBRWxDLHFCQUFNLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFFdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDM0UsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDcEYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDbEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFFMUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDM0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBRXBGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUM3RSxP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Q0FBQztZQUMxQixRQUFRLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUM7U0FDckM7UUFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLGNBQWMsQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUU1QyxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztnQkFDM0MsUUFBUSxDQUFDLElBQUksR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDO2FBQ3hEO1NBQ0Y7S0FDRjs7Ozs7SUFDTyxvQ0FBVTs7OztjQUFDLENBQUM7UUFDbEIscUJBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNaLE9BQU8sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQzdCLHFCQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDeEIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDbkMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2xFO1FBQ0QsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7OzBCQXQ0Qm5CO0lBdzRCQyxDQUFBO0FBMzJCRCwyQkEyMkJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuXG5pbXBvcnQgeyBUZXh0SW5wdXRRdWVzdGlvbiB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy90ZXh0LWlucHV0LXF1ZXN0aW9uJztcbmltcG9ydCB7IFRleHRBcmVhSW5wdXRRdWVzdGlvbiB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy90ZXh0LWFyZWEtaW5wdXQtcXVlc3Rpb24nO1xuaW1wb3J0IHsgU2VsZWN0UXVlc3Rpb24gfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvc2VsZWN0LXF1ZXN0aW9uJztcbmltcG9ydCB7IFVpU2VsZWN0UXVlc3Rpb24gfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvdWktc2VsZWN0LXF1ZXN0aW9uJztcbmltcG9ydCB7IERhdGVRdWVzdGlvbiB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9kYXRlLXF1ZXN0aW9uJztcbmltcG9ydCB7IE11bHRpU2VsZWN0UXVlc3Rpb24gfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvbXVsdGktc2VsZWN0LXF1ZXN0aW9uJztcbmltcG9ydCB7IFF1ZXN0aW9uR3JvdXAgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvZ3JvdXAtcXVlc3Rpb24nO1xuaW1wb3J0IHsgUmVwZWF0aW5nUXVlc3Rpb24gfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvcmVwZWF0aW5nLXF1ZXN0aW9uJztcbmltcG9ydCB7IFF1ZXN0aW9uQmFzZSB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9xdWVzdGlvbi1iYXNlJztcbmltcG9ydCB7IEZpbGVVcGxvYWRRdWVzdGlvbiB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9maWxlLXVwbG9hZC1xdWVzdGlvbic7XG5pbXBvcnQgeyBUZXN0T3JkZXJRdWVzdGlvbiB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy90ZXN0LW9yZGVyLXF1ZXN0aW9uJztcbmltcG9ydCB7IEFmZUNvbnRyb2xUeXBlIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1jb250cm9sLXR5cGUnO1xuXG5pbXBvcnQgeyBWYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvdmFsaWRhdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBEYXRlVmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2RhdGUtdmFsaWRhdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBNYXhWYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvbWF4LXZhbGlkYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgTWluVmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL21pbi12YWxpZGF0aW9uLm1vZGVsJztcbmltcG9ydCB7IEpzRXhwcmVzc2lvblZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9qcy1leHByZXNzaW9uLXZhbGlkYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgQ29uZGl0aW9uYWxWYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvY29uZGl0aW9uYWwtdmFsaWRhdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBEdW1teURhdGFTb3VyY2UgfSBmcm9tICcuLi9kYXRhLXNvdXJjZXMvZHVtbXktZGF0YS1zb3VyY2UnO1xuaW1wb3J0IHsgSGlzdG9yaWNhbEhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi9oZWxwZXJzL2hpc3RvcmljYWwtZXhwcmVzc2lvbi1oZWxwZXItc2VydmljZSc7XG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi9mb3JtJztcbmltcG9ydCB7IENoZWNrQm94UXVlc3Rpb24gfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvbW9kZWxzJztcblxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uRmFjdG9yeSB7XG4gIGRhdGFTb3VyY2VzOiBhbnkgPSB7fTtcbiAgaGlzdG9yaWNhbEhlbHBlclNlcnZpY2U6IEhpc3RvcmljYWxIZWxwZXJTZXJ2aWNlID0gbmV3IEhpc3RvcmljYWxIZWxwZXJTZXJ2aWNlKCk7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgY3JlYXRlUXVlc3Rpb25Nb2RlbChmb3JtU2NoZW1hOiBhbnksIGZvcm0/OiBGb3JtKTogUXVlc3Rpb25CYXNlIHtcbiAgICBpZiAoZm9ybSkge1xuICAgICAgY29uc3QgZGF0YVNvdXJjZXMgPSBmb3JtLmRhdGFTb3VyY2VzQ29udGFpbmVyLmRhdGFTb3VyY2VzO1xuICAgICAgdGhpcy5kYXRhU291cmNlcyA9IGRhdGFTb3VyY2VzO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy50b0Zvcm1RdWVzdGlvbk1vZGVsKGZvcm1TY2hlbWEpO1xuICB9XG5cbiAgdG9TZWxlY3RRdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogU2VsZWN0UXVlc3Rpb24ge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IFNlbGVjdFF1ZXN0aW9uKHsgb3B0aW9uczogW10sIHR5cGU6ICcnLCBrZXk6ICcnIH0pO1xuICAgIHF1ZXN0aW9uLmxhYmVsID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XG4gICAgcXVlc3Rpb24ua2V5ID0gc2NoZW1hUXVlc3Rpb24uaWQ7XG4gICAgcXVlc3Rpb24ub3B0aW9ucyA9IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5hbnN3ZXJzLm1hcChmdW5jdGlvbiAob2JqKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsYWJlbDogb2JqLmxhYmVsLFxuICAgICAgICB2YWx1ZTogb2JqLmNvbmNlcHRcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICBjb25zdCBvcHRpb25zOiBhbnkgPSBxdWVzdGlvbi5vcHRpb25zO1xuICAgIG9wdGlvbnMuc3BsaWNlKDAsIDAsIHtcbiAgICAgIGxhYmVsOiAnJyxcbiAgICAgIHZhbHVlOiAnJ1xuICAgIH0pO1xuXG4gICAgcXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmc7XG4gICAgcXVlc3Rpb24udmFsaWRhdG9ycyA9IHRoaXMuYWRkVmFsaWRhdG9ycyhzY2hlbWFRdWVzdGlvbik7XG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XG5cbiAgICBjb25zdCBtYXBwaW5nczogYW55ID0ge1xuICAgICAgbGFiZWw6ICdsYWJlbCcsXG4gICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgICAgIGlkOiAna2V5J1xuICAgIH07XG5cbiAgICB0aGlzLmNvcHlQcm9wZXJ0aWVzKG1hcHBpbmdzLCBzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkRGlzYWJsZU9ySGlkZVByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRBbGVydFByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRIaXN0b3JpY2FsRXhwcmVzc2lvbnMoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZENhbGN1bGF0b3JQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIHRvTnVtZXJpY1F1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBUZXh0SW5wdXRRdWVzdGlvbiB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgVGV4dElucHV0UXVlc3Rpb24oeyBwbGFjZWhvbGRlcjogJycsIHR5cGU6ICcnLCBrZXk6ICcnIH0pO1xuICAgIHF1ZXN0aW9uLmxhYmVsID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XG4gICAgcXVlc3Rpb24ua2V5ID0gc2NoZW1hUXVlc3Rpb24uaWQ7XG4gICAgcXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9ICdudW1iZXInO1xuICAgIHF1ZXN0aW9uLnBsYWNlaG9sZGVyID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLnBsYWNlaG9sZGVyO1xuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xuICAgIHF1ZXN0aW9uLnBsYWNlaG9sZGVyID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLnBsYWNlaG9sZGVyIHx8ICcnO1xuICAgIGNvbnN0IG1hcHBpbmdzOiBhbnkgPSB7XG4gICAgICBsYWJlbDogJ2xhYmVsJyxcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgaWQ6ICdrZXknXG4gICAgfTtcblxuICAgIHRoaXMuY29weVByb3BlcnRpZXMobWFwcGluZ3MsIHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGREaXNhYmxlT3JIaWRlUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEhpc3RvcmljYWxFeHByZXNzaW9ucyhzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQ2FsY3VsYXRvclByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG5cbiAgdG9OdW1iZXJRdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogVGV4dElucHV0UXVlc3Rpb24ge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IFRleHRJbnB1dFF1ZXN0aW9uKHsgcGxhY2Vob2xkZXI6ICcnLCB0eXBlOiAnJywga2V5OiAnJyB9KTtcbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xuICAgIHF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPSAnbnVtYmVyJztcbiAgICBxdWVzdGlvbi5wbGFjZWhvbGRlciA9IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5wbGFjZWhvbGRlciB8fCAnJztcbiAgICBxdWVzdGlvbi5leHRyYXMgPSBzY2hlbWFRdWVzdGlvbjtcblxuICAgIGNvbnN0IG1hcHBpbmdzOiBhbnkgPSB7XG4gICAgICBsYWJlbDogJ2xhYmVsJyxcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgaWQ6ICdrZXknXG4gICAgfTtcblxuICAgIHRoaXMuY29weVByb3BlcnRpZXMobWFwcGluZ3MsIHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgcXVlc3Rpb24udmFsaWRhdG9ycyA9IHRoaXMuYWRkVmFsaWRhdG9ycyhzY2hlbWFRdWVzdGlvbik7XG4gICAgdGhpcy5hZGREaXNhYmxlT3JIaWRlUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEhpc3RvcmljYWxFeHByZXNzaW9ucyhzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQ2FsY3VsYXRvclByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG5cbiAgdG9EYXRlUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IERhdGVRdWVzdGlvbiB7XG4gICAgaWYgKHNjaGVtYVF1ZXN0aW9uLnR5cGUgPT09ICdlbmNvdW50ZXJEYXRldGltZScpIHtcbiAgICAgIHJldHVybiB0aGlzLnRvRW5jb3VudGVyRGF0ZXRpbWVRdWVzdGlvbihzY2hlbWFRdWVzdGlvbik7XG4gICAgfVxuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IERhdGVRdWVzdGlvbih7IHR5cGU6ICcnLCBrZXk6ICcnIH0pO1xuICAgIHF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPSAnZGF0ZSc7XG4gICAgcXVlc3Rpb24udmFsaWRhdG9ycyA9IHRoaXMuYWRkVmFsaWRhdG9ycyhzY2hlbWFRdWVzdGlvbik7XG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XG4gICAgcXVlc3Rpb24uc2hvd1RpbWUgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuc2hvd1RpbWUgYXMgYm9vbGVhbjtcbiAgICBxdWVzdGlvbi5zaG93V2Vla3NBZGRlciA9IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy53ZWVrc0xpc3QgPyB0cnVlIDogZmFsc2U7XG5cbiAgICBjb25zdCBtYXBwaW5nczogYW55ID0ge1xuICAgICAgbGFiZWw6ICdsYWJlbCcsXG4gICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgICAgIGlkOiAna2V5J1xuICAgIH07XG5cblxuICAgIHRoaXMuY29weVByb3BlcnRpZXMobWFwcGluZ3MsIHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGREaXNhYmxlT3JIaWRlUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEhpc3RvcmljYWxFeHByZXNzaW9ucyhzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQ2FsY3VsYXRvclByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG5cbiAgdG9FbmNvdW50ZXJEYXRldGltZVF1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBEYXRlUXVlc3Rpb24ge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IERhdGVRdWVzdGlvbih7IHR5cGU6ICcnLCBrZXk6ICcnIH0pO1xuICAgIHF1ZXN0aW9uLmxhYmVsID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XG4gICAgcXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9ICdkYXRlJztcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5pZDtcbiAgICBxdWVzdGlvbi52YWxpZGF0b3JzID0gdGhpcy5hZGRWYWxpZGF0b3JzKHNjaGVtYVF1ZXN0aW9uKTtcbiAgICBxdWVzdGlvbi5leHRyYXMgPSBzY2hlbWFRdWVzdGlvbjtcbiAgICBxdWVzdGlvbi5zaG93V2Vla3NBZGRlciA9IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy53ZWVrc0xpc3QgPyB0cnVlIDogZmFsc2U7XG5cbiAgICBjb25zdCBtYXBwaW5nczogYW55ID0ge1xuICAgICAgbGFiZWw6ICdsYWJlbCcsXG4gICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgICAgIGlkOiAna2V5J1xuICAgIH07XG4gICAgcXVlc3Rpb24uc2hvd1RpbWUgPSB0cnVlO1xuXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICB0b0NoZWNrQm94UXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IENoZWNrQm94UXVlc3Rpb24ge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IENoZWNrQm94UXVlc3Rpb24oeyBvcHRpb25zOiBbXSwgdHlwZTogJycsIGtleTogJycgfSk7XG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5pZDtcbiAgICBxdWVzdGlvbi5leHRyYXMgPSBzY2hlbWFRdWVzdGlvbjtcbiAgICBxdWVzdGlvbi5vcHRpb25zID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLmFuc3dlcnMubWFwKChvYmopID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxhYmVsOiBvYmoubGFiZWwsXG4gICAgICAgIHZhbHVlOiBvYmouY29uY2VwdFxuICAgICAgfTtcbiAgICB9KTtcbiAgICBxdWVzdGlvbi5vcHRpb25zLnNwbGljZSgwLCAwKTtcblxuICAgIHF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nO1xuICAgIGNvbnN0IG1hcHBpbmdzOiBhbnkgPSB7XG4gICAgICBsYWJlbDogJ2xhYmVsJyxcbiAgICAgIGlkOiAna2V5J1xuICAgIH07XG5cbiAgICB0aGlzLmNvcHlQcm9wZXJ0aWVzKG1hcHBpbmdzLCBzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkRGlzYWJsZU9ySGlkZVByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRBbGVydFByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRIaXN0b3JpY2FsRXhwcmVzc2lvbnMoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZENhbGN1bGF0b3JQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHJldHVybiBxdWVzdGlvbjtcblxuICB9XG5cbiAgdG9NdWx0aUNoZWNrYm94UXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IE11bHRpU2VsZWN0UXVlc3Rpb24ge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IE11bHRpU2VsZWN0UXVlc3Rpb24oeyByZW5kZXJUeXBlOiAnJywgb3B0aW9uczogW10sIHR5cGU6ICcnLCBrZXk6ICcnIH0pO1xuICAgIHF1ZXN0aW9uLmxhYmVsID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XG4gICAgcXVlc3Rpb24ua2V5ID0gc2NoZW1hUXVlc3Rpb24uaWQ7XG4gICAgcXVlc3Rpb24ub3B0aW9ucyA9IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5hbnN3ZXJzLm1hcChmdW5jdGlvbiAob2JqKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsYWJlbDogb2JqLmxhYmVsLFxuICAgICAgICB2YWx1ZTogb2JqLmNvbmNlcHRcbiAgICAgIH07XG4gICAgfSk7XG4gICAgcXVlc3Rpb24udmFsaWRhdG9ycyA9IHRoaXMuYWRkVmFsaWRhdG9ycyhzY2hlbWFRdWVzdGlvbik7XG4gICAgcXVlc3Rpb24uZGF0YVNvdXJjZSA9IG5ldyBEdW1teURhdGFTb3VyY2UoKTtcbiAgICBxdWVzdGlvbi5leHRyYXMgPSBzY2hlbWFRdWVzdGlvbjtcblxuICAgIGNvbnN0IG1hcHBpbmdzOiBhbnkgPSB7XG4gICAgICBsYWJlbDogJ2xhYmVsJyxcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgaWQ6ICdrZXknXG4gICAgfTtcblxuICAgIHRoaXMuY29weVByb3BlcnRpZXMobWFwcGluZ3MsIHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGREaXNhYmxlT3JIaWRlUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEhpc3RvcmljYWxFeHByZXNzaW9ucyhzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQ2FsY3VsYXRvclByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG5cbiAgdG9UZXh0QXJlYVF1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBUZXh0QXJlYUlucHV0UXVlc3Rpb24ge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IFRleHRBcmVhSW5wdXRRdWVzdGlvbih7XG4gICAgICBpc0V4cGFuZGVkOiBmYWxzZSwgcm93czogMTgsXG4gICAgICBwbGFjZWhvbGRlcjogJycsIHR5cGU6ICcnLCBrZXk6ICcnXG4gICAgfSk7XG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5pZDtcbiAgICBxdWVzdGlvbi5wbGFjZWhvbGRlciA9IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5wbGFjZWhvbGRlcjtcbiAgICBxdWVzdGlvbi5pc0V4cGFuZGVkID0gc2NoZW1hUXVlc3Rpb24uaXNFeHBhbmRlZDtcbiAgICBxdWVzdGlvbi5yb3dzID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLnJvd3M7XG4gICAgcXVlc3Rpb24udmFsaWRhdG9ycyA9IHRoaXMuYWRkVmFsaWRhdG9ycyhzY2hlbWFRdWVzdGlvbik7XG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XG4gICAgcXVlc3Rpb24ucGxhY2Vob2xkZXIgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMucGxhY2Vob2xkZXIgfHwgJyc7XG5cbiAgICBjb25zdCBtYXBwaW5nczogYW55ID0ge1xuICAgICAgbGFiZWw6ICdsYWJlbCcsXG4gICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgICAgIGlkOiAna2V5J1xuICAgIH07XG5cbiAgICB0aGlzLmNvcHlQcm9wZXJ0aWVzKG1hcHBpbmdzLCBzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkRGlzYWJsZU9ySGlkZVByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRBbGVydFByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRIaXN0b3JpY2FsRXhwcmVzc2lvbnMoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZENhbGN1bGF0b3JQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIHRvVGV4dFF1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBUZXh0SW5wdXRRdWVzdGlvbiB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgVGV4dElucHV0UXVlc3Rpb24oeyBwbGFjZWhvbGRlcjogJycsIHR5cGU6ICcnLCBrZXk6ICcnIH0pO1xuICAgIHF1ZXN0aW9uLmxhYmVsID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XG4gICAgcXVlc3Rpb24ua2V5ID0gc2NoZW1hUXVlc3Rpb24uaWQ7XG4gICAgcXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9ICd0ZXh0JztcbiAgICBxdWVzdGlvbi5wbGFjZWhvbGRlciA9IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5wbGFjZWhvbGRlcjtcbiAgICBxdWVzdGlvbi52YWxpZGF0b3JzID0gdGhpcy5hZGRWYWxpZGF0b3JzKHNjaGVtYVF1ZXN0aW9uKTtcbiAgICBxdWVzdGlvbi5leHRyYXMgPSBzY2hlbWFRdWVzdGlvbjtcbiAgICBxdWVzdGlvbi5wbGFjZWhvbGRlciA9IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5wbGFjZWhvbGRlciB8fCAnJztcbiAgICBjb25zdCBtYXBwaW5nczogYW55ID0ge1xuICAgICAgbGFiZWw6ICdsYWJlbCcsXG4gICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgICAgIGlkOiAna2V5J1xuICAgIH07XG5cbiAgICB0aGlzLmNvcHlQcm9wZXJ0aWVzKG1hcHBpbmdzLCBzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkRGlzYWJsZU9ySGlkZVByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRBbGVydFByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRIaXN0b3JpY2FsRXhwcmVzc2lvbnMoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZENhbGN1bGF0b3JQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIHRvRmlsZVVwbG9hZFF1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBGaWxlVXBsb2FkUXVlc3Rpb24ge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IEZpbGVVcGxvYWRRdWVzdGlvbih7IHR5cGU6ICcnLCBrZXk6ICcnIH0pO1xuICAgIHF1ZXN0aW9uLmxhYmVsID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XG4gICAgcXVlc3Rpb24ua2V5ID0gc2NoZW1hUXVlc3Rpb24uaWQ7XG4gICAgcXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9ICdmaWxlJztcbiAgICBxdWVzdGlvbi5kYXRhU291cmNlID0gJ2ZpbGUnO1xuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xuXG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcbiAgICAgIGxhYmVsOiAnbGFiZWwnLFxuICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICBpZDogJ2tleSdcbiAgICB9O1xuXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICB0b0RydWdRdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogU2VsZWN0UXVlc3Rpb24ge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IFNlbGVjdFF1ZXN0aW9uKHsgb3B0aW9uczogW10sIHR5cGU6ICcnLCBrZXk6ICcnIH0pO1xuICAgIHF1ZXN0aW9uLmxhYmVsID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XG4gICAgcXVlc3Rpb24ua2V5ID0gc2NoZW1hUXVlc3Rpb24uaWQ7XG4gICAgcXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9ICdyZW1vdGUtc2VsZWN0JztcbiAgICBxdWVzdGlvbi52YWxpZGF0b3JzID0gdGhpcy5hZGRWYWxpZGF0b3JzKHNjaGVtYVF1ZXN0aW9uKTtcbiAgICBxdWVzdGlvbi5leHRyYXMgPSBzY2hlbWFRdWVzdGlvbjtcbiAgICBxdWVzdGlvbi5kYXRhU291cmNlID0gJ2RydWcnO1xuICAgIGNvbnN0IG1hcHBpbmdzOiBhbnkgPSB7XG4gICAgICBsYWJlbDogJ2xhYmVsJyxcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgaWQ6ICdrZXknXG4gICAgfTtcblxuICAgIHRoaXMuY29weVByb3BlcnRpZXMobWFwcGluZ3MsIHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGREaXNhYmxlT3JIaWRlUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEhpc3RvcmljYWxFeHByZXNzaW9ucyhzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQ2FsY3VsYXRvclByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG5cbiAgdG9Qcm9ibGVtUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IFNlbGVjdFF1ZXN0aW9uIHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBTZWxlY3RRdWVzdGlvbih7IG9wdGlvbnM6IFtdLCB0eXBlOiAnJywga2V5OiAnJyB9KTtcbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xuICAgIHF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPSAncmVtb3RlLXNlbGVjdCc7XG4gICAgcXVlc3Rpb24udmFsaWRhdG9ycyA9IHRoaXMuYWRkVmFsaWRhdG9ycyhzY2hlbWFRdWVzdGlvbik7XG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XG4gICAgcXVlc3Rpb24uZGF0YVNvdXJjZSA9ICdwcm9ibGVtJztcbiAgICBjb25zdCBtYXBwaW5nczogYW55ID0ge1xuICAgICAgbGFiZWw6ICdsYWJlbCcsXG4gICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgICAgIGlkOiAna2V5J1xuICAgIH07XG5cbiAgICB0aGlzLmNvcHlQcm9wZXJ0aWVzKG1hcHBpbmdzLCBzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkRGlzYWJsZU9ySGlkZVByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRBbGVydFByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRIaXN0b3JpY2FsRXhwcmVzc2lvbnMoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZENhbGN1bGF0b3JQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIHRvQ29uY2VwdEFuc3dlclNlbGVjdChzY2hlbWFRdWVzdGlvbjogYW55KTogU2VsZWN0UXVlc3Rpb24ge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IFNlbGVjdFF1ZXN0aW9uKHsgb3B0aW9uczogW10sIHR5cGU6ICcnLCBrZXk6ICcnIH0pO1xuICAgIHF1ZXN0aW9uLmxhYmVsID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XG4gICAgcXVlc3Rpb24ua2V5ID0gc2NoZW1hUXVlc3Rpb24uaWQ7XG4gICAgcXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9ICdyZW1vdGUtc2VsZWN0JztcbiAgICBxdWVzdGlvbi52YWxpZGF0b3JzID0gdGhpcy5hZGRWYWxpZGF0b3JzKHNjaGVtYVF1ZXN0aW9uKTtcbiAgICBxdWVzdGlvbi5leHRyYXMgPSBzY2hlbWFRdWVzdGlvbjtcbiAgICBxdWVzdGlvbi5kYXRhU291cmNlID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLmRhdGFTb3VyY2UgfHwgJ2NvbmNlcHRBbnN3ZXJzJztcbiAgICBxdWVzdGlvbi5kYXRhU291cmNlT3B0aW9ucyA9IHtcbiAgICAgIGNvbmNlcHQ6IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0XG4gICAgfTtcbiAgICBjb25zdCBtYXBwaW5nczogYW55ID0ge1xuICAgICAgbGFiZWw6ICdsYWJlbCcsXG4gICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgICAgIGlkOiAna2V5J1xuICAgIH07XG5cbiAgICB0aGlzLmNvcHlQcm9wZXJ0aWVzKG1hcHBpbmdzLCBzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkRGlzYWJsZU9ySGlkZVByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRBbGVydFByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRIaXN0b3JpY2FsRXhwcmVzc2lvbnMoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZENhbGN1bGF0b3JQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIHRvUmVwZWF0aW5nUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IFJlcGVhdGluZ1F1ZXN0aW9uIHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBSZXBlYXRpbmdRdWVzdGlvbih7IHF1ZXN0aW9uczogW10sIHR5cGU6ICcnLCBrZXk6ICcnIH0pO1xuICAgIHF1ZXN0aW9uLmxhYmVsID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XG4gICAgcXVlc3Rpb24ucXVlc3Rpb25zID0gdGhpcy5nZXRDaGlsZHJlblF1ZXN0aW9uTW9kZWxzKHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9ucyk7XG4gICAgcXVlc3Rpb24ua2V5ID0gc2NoZW1hUXVlc3Rpb24uaWQ7XG4gICAgcXVlc3Rpb24udmFsaWRhdG9ycyA9IHRoaXMuYWRkVmFsaWRhdG9ycyhzY2hlbWFRdWVzdGlvbik7XG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XG5cbiAgICBpZiAoc2NoZW1hUXVlc3Rpb24udHlwZSA9PT0gJ3Rlc3RPcmRlcicpIHtcbiAgICAgIGNvbnN0IHRlc3RPcmRlciA9IHRoaXMudG9UZXN0T3JkZXJRdWVzdGlvbihzY2hlbWFRdWVzdGlvbik7XG4gICAgICBjb25zdCBvcmRlcnMgPSBbXTsgb3JkZXJzLnB1c2godGVzdE9yZGVyKTtcbiAgICAgIHF1ZXN0aW9uLnF1ZXN0aW9ucyA9IG9yZGVycztcbiAgICB9XG5cbiAgICBjb25zdCBtYXBwaW5nczogYW55ID0ge1xuICAgICAgbGFiZWw6ICdsYWJlbCcsXG4gICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgICAgIGlkOiAna2V5J1xuICAgIH07XG5cbiAgICB0aGlzLmNvcHlQcm9wZXJ0aWVzKG1hcHBpbmdzLCBzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkRGlzYWJsZU9ySGlkZVByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRBbGVydFByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRIaXN0b3JpY2FsRXhwcmVzc2lvbnMoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZENhbGN1bGF0b3JQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIHRvR3JvdXBRdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogUXVlc3Rpb25Hcm91cCB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgUXVlc3Rpb25Hcm91cCh7IHF1ZXN0aW9uczogW10sIHR5cGU6ICcnLCBrZXk6ICcnIH0pO1xuICAgIHF1ZXN0aW9uLmxhYmVsID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XG4gICAgcXVlc3Rpb24ucXVlc3Rpb25zID0gdGhpcy5nZXRDaGlsZHJlblF1ZXN0aW9uTW9kZWxzKHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9ucyk7XG4gICAgcXVlc3Rpb24ua2V5ID0gc2NoZW1hUXVlc3Rpb24uaWQ7XG4gICAgcXVlc3Rpb24udmFsaWRhdG9ycyA9IHRoaXMuYWRkVmFsaWRhdG9ycyhzY2hlbWFRdWVzdGlvbik7XG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XG5cbiAgICBjb25zdCBtYXBwaW5nczogYW55ID0ge1xuICAgICAgbGFiZWw6ICdsYWJlbCcsXG4gICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgICAgIGlkOiAna2V5J1xuICAgIH07XG5cbiAgICB0aGlzLmNvcHlQcm9wZXJ0aWVzKG1hcHBpbmdzLCBzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkRGlzYWJsZU9ySGlkZVByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRBbGVydFByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRIaXN0b3JpY2FsRXhwcmVzc2lvbnMoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZENhbGN1bGF0b3JQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIHRvUGFnZVF1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBRdWVzdGlvbkdyb3VwIHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBRdWVzdGlvbkdyb3VwKHsgcXVlc3Rpb25zOiBbXSwgdHlwZTogJycsIGtleTogJycgfSk7XG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5yZW5kZXJpbmdUeXBlID0gJ3BhZ2UnO1xuICAgIHF1ZXN0aW9uLmNvbnRyb2xUeXBlID0gQWZlQ29udHJvbFR5cGUuTm9uZTtcbiAgICBxdWVzdGlvbi5xdWVzdGlvbnMgPSBbXTtcbiAgICBzY2hlbWFRdWVzdGlvbi5zZWN0aW9ucy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgcXVlc3Rpb24ucXVlc3Rpb25zLnB1c2godGhpcy50b1NlY3Rpb25RdWVzdGlvbihlbGVtZW50KSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG5cbiAgdG9Gb3JtUXVlc3Rpb25Nb2RlbChzY2hlbWFRdWVzdGlvbjogYW55KTogUXVlc3Rpb25Hcm91cCB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgUXVlc3Rpb25Hcm91cCh7IHF1ZXN0aW9uczogW10sIHR5cGU6ICcnLCBrZXk6ICcnIH0pO1xuICAgIHF1ZXN0aW9uLmxhYmVsID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XG4gICAgcXVlc3Rpb24ua2V5ID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XG4gICAgcXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9ICdmb3JtJztcbiAgICBxdWVzdGlvbi5jb250cm9sVHlwZSA9IEFmZUNvbnRyb2xUeXBlLkFmZUZvcm1Hcm91cDtcbiAgICBxdWVzdGlvbi5leHRyYXMgPSBzY2hlbWFRdWVzdGlvbjtcbiAgICBxdWVzdGlvbi5xdWVzdGlvbnMgPSBbXTtcbiAgICBzY2hlbWFRdWVzdGlvbi5wYWdlcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgcXVlc3Rpb24ucXVlc3Rpb25zLnB1c2godGhpcy50b1BhZ2VRdWVzdGlvbihlbGVtZW50KSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICB0b1NlY3Rpb25RdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogUXVlc3Rpb25Hcm91cCB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgUXVlc3Rpb25Hcm91cCh7IHF1ZXN0aW9uczogW10sIHR5cGU6ICcnLCBrZXk6ICcnIH0pO1xuICAgIHF1ZXN0aW9uLmxhYmVsID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XG4gICAgcXVlc3Rpb24ua2V5ID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XG4gICAgcXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9ICdzZWN0aW9uJztcbiAgICBxdWVzdGlvbi5jb250cm9sVHlwZSA9IEFmZUNvbnRyb2xUeXBlLk5vbmU7XG4gICAgcXVlc3Rpb24uaXNFeHBhbmRlZCA9IHNjaGVtYVF1ZXN0aW9uLmlzRXhwYW5kZWQgPT09ICd0cnVlJyA/IHRydWUgOiBmYWxzZTtcbiAgICBxdWVzdGlvbi5xdWVzdGlvbnMgPSB0aGlzLmdldFNjaGVtYVF1ZXN0aW9ucyhzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbnMpO1xuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIHRvUGVyc29uQXR0cmlidXRlUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IFVpU2VsZWN0UXVlc3Rpb24ge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IFVpU2VsZWN0UXVlc3Rpb24oe1xuICAgICAgb3B0aW9uczogW10sIHR5cGU6ICcnLCBrZXk6ICcnLCBzZWFyY2hGdW5jdGlvbjogZnVuY3Rpb24gKCkgeyB9LFxuICAgICAgcmVzb2x2ZUZ1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIH1cbiAgICB9KTtcbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xuICAgIHF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPSAncmVtb3RlLXNlbGVjdCc7XG4gICAgcXVlc3Rpb24udmFsaWRhdG9ycyA9IHRoaXMuYWRkVmFsaWRhdG9ycyhzY2hlbWFRdWVzdGlvbik7XG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XG4gICAgcXVlc3Rpb24uZGF0YVNvdXJjZSA9ICdwZXJzb25BdHRyaWJ1dGUnO1xuXG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcbiAgICAgIGxhYmVsOiAnbGFiZWwnLFxuICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICBpZDogJ2tleSdcbiAgICB9O1xuXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEhpc3RvcmljYWxFeHByZXNzaW9ucyhzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkRGlzYWJsZU9ySGlkZVByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRBbGVydFByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRIaXN0b3JpY2FsRXhwcmVzc2lvbnMoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZENhbGN1bGF0b3JQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIHRvRW5jb3VudGVyUHJvdmlkZXJRdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogVWlTZWxlY3RRdWVzdGlvbiB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgVWlTZWxlY3RRdWVzdGlvbih7XG4gICAgICBvcHRpb25zOiBbXSwgdHlwZTogJycsIGtleTogJycsIHNlYXJjaEZ1bmN0aW9uOiBmdW5jdGlvbiAoKSB7IH0sXG4gICAgICByZXNvbHZlRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcblxuICAgICAgfVxuICAgIH0pO1xuICAgIHF1ZXN0aW9uLmxhYmVsID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XG4gICAgcXVlc3Rpb24ua2V5ID0gc2NoZW1hUXVlc3Rpb24uaWQ7XG4gICAgcXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9ICdyZW1vdGUtc2VsZWN0JztcbiAgICBxdWVzdGlvbi52YWxpZGF0b3JzID0gdGhpcy5hZGRWYWxpZGF0b3JzKHNjaGVtYVF1ZXN0aW9uKTtcbiAgICBxdWVzdGlvbi5leHRyYXMgPSBzY2hlbWFRdWVzdGlvbjtcbiAgICBxdWVzdGlvbi5kYXRhU291cmNlID0gJ3Byb3ZpZGVyJztcblxuICAgIGNvbnN0IG1hcHBpbmdzOiBhbnkgPSB7XG4gICAgICBsYWJlbDogJ2xhYmVsJyxcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgaWQ6ICdrZXknXG4gICAgfTtcblxuICAgIHRoaXMuY29weVByb3BlcnRpZXMobWFwcGluZ3MsIHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGREaXNhYmxlT3JIaWRlUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEhpc3RvcmljYWxFeHByZXNzaW9ucyhzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQ2FsY3VsYXRvclByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG5cbiAgdG9GaWVsZFNldFF1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBRdWVzdGlvbkdyb3VwIHtcbiAgICBjb25zdCB0b1JldHVybiA9IHRoaXMudG9Hcm91cFF1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uKTtcbiAgICB0b1JldHVybi5yZW5kZXJpbmdUeXBlID0gJ2ZpZWxkLXNldCc7XG4gICAgcmV0dXJuIHRvUmV0dXJuO1xuICB9XG5cbiAgdG9FbmNvdW50ZXJMb2NhdGlvblF1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBVaVNlbGVjdFF1ZXN0aW9uIHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBVaVNlbGVjdFF1ZXN0aW9uKHtcbiAgICAgIG9wdGlvbnM6IFtdLCB0eXBlOiAnJywga2V5OiAnJywgc2VhcmNoRnVuY3Rpb246IGZ1bmN0aW9uICgpIHsgfSxcbiAgICAgIHJlc29sdmVGdW5jdGlvbjogZnVuY3Rpb24gKCkge1xuXG4gICAgICB9XG4gICAgfSk7XG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5pZDtcbiAgICBxdWVzdGlvbi5yZW5kZXJpbmdUeXBlID0gc2NoZW1hUXVlc3Rpb24udHlwZTtcbiAgICBxdWVzdGlvbi5yZW5kZXJpbmdUeXBlID0gJ3JlbW90ZS1zZWxlY3QnO1xuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xuICAgIHF1ZXN0aW9uLmRhdGFTb3VyY2UgPSAnbG9jYXRpb24nO1xuXG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcbiAgICAgIGxhYmVsOiAnbGFiZWwnLFxuICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICBpZDogJ2tleSdcbiAgICB9O1xuXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICB0b1Rlc3RPcmRlclF1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBUZXN0T3JkZXJRdWVzdGlvbiB7XG5cbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBUZXN0T3JkZXJRdWVzdGlvbih7XG4gICAgICB0eXBlOiAnJywga2V5OiAnJywgb3JkZXJUeXBlOiAnJywgc2VsZWN0YWJsZU9yZGVyczogW10sXG4gICAgICBvcmRlclNldHRpbmdVdWlkOiAnJywgbGFiZWw6ICcnLCByZW5kZXJpbmc6ICcnXG4gICAgfSk7XG5cbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xuICAgIHF1ZXN0aW9uLm9wdGlvbnMgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuc2VsZWN0YWJsZU9yZGVycy5tYXAoZnVuY3Rpb24gKG9iaikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGFiZWw6IG9iai5sYWJlbCxcbiAgICAgICAgdmFsdWU6IG9iai5jb25jZXB0XG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcbiAgICAgIGxhYmVsOiAnbGFiZWwnLFxuICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICBpZDogJ2tleSdcbiAgICB9O1xuICAgIHRoaXMuY29weVByb3BlcnRpZXMobWFwcGluZ3MsIHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG5cbiAgZ2V0U2NoZW1hUXVlc3Rpb25zKHNjaGVtYTogYW55KTogYW55IHtcbiAgICBjb25zdCBsaXN0UXVlc3Rpb25zID0gbmV3IEFycmF5KCk7XG4gICAgdGhpcy5nZXRRdWVzdGlvbnMoc2NoZW1hLCBsaXN0UXVlc3Rpb25zKTtcbiAgICByZXR1cm4gbGlzdFF1ZXN0aW9ucztcbiAgfVxuXG4gIGdldFF1ZXN0aW9ucyhzY2hlbWE6IGFueSwgZm91bmRBcnJheTogYW55KTogYW55IHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZm91bmRBcnJheSkpIHtcbiAgICAgIGZvdW5kQXJyYXkgPSBbXTtcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc2NoZW1hKSkge1xuXG4gICAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIHNjaGVtYSkge1xuICAgICAgICBpZiAoc2NoZW1hLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xuICAgICAgICAgIHRoaXMuZ2V0UXVlc3Rpb25zKHNjaGVtYVtwcm9wZXJ0eV0sIGZvdW5kQXJyYXkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHNjaGVtYSAmJiAhQXJyYXkuaXNBcnJheShzY2hlbWEpICYmIHR5cGVvZiBzY2hlbWEgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAoc2NoZW1hLnF1ZXN0aW9uT3B0aW9ucykge1xuICAgICAgICBpZiAoc2NoZW1hLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdncm91cCcgfHxcbiAgICAgICAgICBzY2hlbWEucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9PT0gJ3JlcGVhdGluZycpIHtcbiAgICAgICAgICAvLyBzY2hlbWEucXVlc3Rpb25zID0gdGhpcy5nZXRHcm91cE1lbWJlcnMoc2NoZW1hLnF1ZXN0aW9ucyk7XG4gICAgICAgICAgZm91bmRBcnJheS5wdXNoKHRoaXMudG9Nb2RlbChzY2hlbWEsIHNjaGVtYS5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoc2NoZW1hLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdmaWVsZC1zZXQnKSB7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm91bmRBcnJheS5wdXNoKHRoaXMudG9Nb2RlbChzY2hlbWEsIHNjaGVtYS5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nKSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAoY29uc3QgbyBpbiBzY2hlbWEpIHtcbiAgICAgICAgICBpZiAoc2NoZW1hLmhhc093blByb3BlcnR5KG8pKSB7XG4gICAgICAgICAgICB0aGlzLmdldFF1ZXN0aW9ucyhzY2hlbWFbb10sIGZvdW5kQXJyYXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICB9XG5cbiAgZ2V0Q2hpbGRyZW5RdWVzdGlvbk1vZGVscyhzY2hlbWE6IGFueSk6IGFueSB7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBbXTtcbiAgICB0aGlzLmdldFF1ZXN0aW9ucyhzY2hlbWEsIGNoaWxkcmVuKTtcbiAgICByZXR1cm4gY2hpbGRyZW47XG5cbiAgfVxuXG4gIHRvTW9kZWwoc2NoZW1hOiBhbnksIHJlbmRlclR5cGU6IHN0cmluZyk6IGFueSB7XG4gICAgaWYgKHJlbmRlclR5cGUgPT09ICd1aS1zZWxlY3QtZXh0ZW5kZWQnKSB7XG4gICAgICByZW5kZXJUeXBlID0gc2NoZW1hLnR5cGU7XG4gICAgfVxuICAgIGlmICghc2NoZW1hLmlkKSB7XG4gICAgICBzY2hlbWFbJ2lkJ10gPSB0aGlzLmdlbmVyYXRlSWQoMTApO1xuICAgIH1cblxuICAgIGlmIChzY2hlbWEucXVlc3Rpb25PcHRpb25zICYmXG4gICAgICAoc2NoZW1hLnF1ZXN0aW9uT3B0aW9ucy5zaG93RGF0ZSA9PT0gdHJ1ZSB8fFxuICAgICAgICBzY2hlbWEucXVlc3Rpb25PcHRpb25zLnNob3dEYXRlID09PSAndHJ1ZScpKSB7XG4gICAgICBzY2hlbWEgPSB0aGlzLmNvbnZlcnRPbGRWZXJzaW9uQ29tcGxleE9ic1F1ZXN0aW9uVG9OZXdWZXJzaW9uKHNjaGVtYSk7XG4gICAgICByZW5kZXJUeXBlID0gJ2ZpZWxkLXNldCc7XG4gICAgfVxuXG4gICAgc3dpdGNoIChyZW5kZXJUeXBlKSB7XG4gICAgICBjYXNlICdzZWxlY3QnOlxuICAgICAgICByZXR1cm4gdGhpcy50b1NlbGVjdFF1ZXN0aW9uKHNjaGVtYSk7XG4gICAgICBjYXNlICdzaW5nbGUtc2VsZWN0JzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9TZWxlY3RRdWVzdGlvbihzY2hlbWEpO1xuICAgICAgY2FzZSAnbXVsdGktc2VsZWN0JzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9TZWxlY3RRdWVzdGlvbihzY2hlbWEpO1xuICAgICAgY2FzZSAnbnVtZXJpYyc6XG4gICAgICAgIHJldHVybiB0aGlzLnRvTnVtZXJpY1F1ZXN0aW9uKHNjaGVtYSk7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICByZXR1cm4gdGhpcy50b051bWJlclF1ZXN0aW9uKHNjaGVtYSk7XG4gICAgICBjYXNlICdlbmNvdW50ZXJEYXRldGltZSc6XG4gICAgICAgIHJldHVybiB0aGlzLnRvRW5jb3VudGVyRGF0ZXRpbWVRdWVzdGlvbihzY2hlbWEpO1xuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgIHJldHVybiB0aGlzLnRvRGF0ZVF1ZXN0aW9uKHNjaGVtYSk7XG4gICAgICBjYXNlICdtdWx0aUNoZWNrYm94JzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9NdWx0aUNoZWNrYm94UXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ2RydWcnOlxuICAgICAgICByZXR1cm4gdGhpcy50b0RydWdRdWVzdGlvbihzY2hlbWEpO1xuICAgICAgY2FzZSAncHJvYmxlbSc6XG4gICAgICAgIHJldHVybiB0aGlzLnRvUHJvYmxlbVF1ZXN0aW9uKHNjaGVtYSk7XG4gICAgICBjYXNlICdncm91cCc6XG4gICAgICAgIHJldHVybiB0aGlzLnRvR3JvdXBRdWVzdGlvbihzY2hlbWEpO1xuICAgICAgY2FzZSAnZmllbGQtc2V0JzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9GaWVsZFNldFF1ZXN0aW9uKHNjaGVtYSk7XG4gICAgICBjYXNlICdyZXBlYXRpbmcnOlxuICAgICAgICByZXR1cm4gdGhpcy50b1JlcGVhdGluZ1F1ZXN0aW9uKHNjaGVtYSk7XG4gICAgICBjYXNlICdwZXJzb25BdHRyaWJ1dGUnOlxuICAgICAgICByZXR1cm4gdGhpcy50b1BlcnNvbkF0dHJpYnV0ZVF1ZXN0aW9uKHNjaGVtYSk7XG4gICAgICBjYXNlICd0ZXh0JzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9UZXh0UXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ3RleHRhcmVhJzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9UZXh0QXJlYVF1ZXN0aW9uKHNjaGVtYSk7XG4gICAgICBjYXNlICd0ZXh0YXJlYSc6XG4gICAgICAgIHJldHVybiB0aGlzLnRvVGV4dEFyZWFRdWVzdGlvbihzY2hlbWEpO1xuICAgICAgY2FzZSAnc2VsZWN0LWNvbmNlcHQtYW5zd2Vycyc6XG4gICAgICAgIHJldHVybiB0aGlzLnRvQ29uY2VwdEFuc3dlclNlbGVjdChzY2hlbWEpO1xuICAgICAgY2FzZSAnZW5jb3VudGVyTG9jYXRpb24nOlxuICAgICAgICByZXR1cm4gdGhpcy50b0VuY291bnRlckxvY2F0aW9uUXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ2VuY291bnRlckRhdGV0aW1lJzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9FbmNvdW50ZXJEYXRldGltZVF1ZXN0aW9uKHNjaGVtYSk7XG4gICAgICBjYXNlICdlbmNvdW50ZXJQcm92aWRlcic6XG4gICAgICAgIHJldHVybiB0aGlzLnRvRW5jb3VudGVyUHJvdmlkZXJRdWVzdGlvbihzY2hlbWEpO1xuICAgICAgY2FzZSAncmFkaW8nOlxuICAgICAgICByZXR1cm4gdGhpcy50b0NoZWNrQm94UXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ2NoZWNrYm94JzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9DaGVja0JveFF1ZXN0aW9uKHNjaGVtYSk7XG4gICAgICBjYXNlICdlbmNvdW50ZXJQcm92aWRlcic6XG4gICAgICAgIHJldHVybiB0aGlzLnRvRW5jb3VudGVyUHJvdmlkZXJRdWVzdGlvbihzY2hlbWEpO1xuICAgICAgY2FzZSAnZmlsZSc6XG4gICAgICAgIHJldHVybiB0aGlzLnRvRmlsZVVwbG9hZFF1ZXN0aW9uKHNjaGVtYSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLndhcm4oJ05ldyBTY2hlbWEgUXVlc3Rpb24gVHlwZSBmb3VuZC4uLi4uLi4uLicgKyByZW5kZXJUeXBlKTtcbiAgICAgICAgcmV0dXJuIHRoaXMudG9UZXh0UXVlc3Rpb24oc2NoZW1hKTtcbiAgICB9XG5cbiAgfVxuXG4gIGNvbnZlcnRPbGRWZXJzaW9uQ29tcGxleE9ic1F1ZXN0aW9uVG9OZXdWZXJzaW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpIHtcbiAgICBjb25zdCBjb252ZXJ0ZWQ6IGFueSA9IHt9O1xuICAgIGNvbnZlcnRlZC50eXBlID0gJ2NvbXBsZXgtb2JzJztcbiAgICBjb252ZXJ0ZWQubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBjb252ZXJ0ZWQuaWQgPSAnY29tcGxleF8nICsgc2NoZW1hUXVlc3Rpb24uaWQ7XG4gICAgY29udmVydGVkLnF1ZXN0aW9uT3B0aW9ucyA9IHt9O1xuICAgIGNvbnZlcnRlZC5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCA9IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0O1xuICAgIGNvbnZlcnRlZC5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID0gJ2ZpZWxkLXNldCc7XG4gICAgY29udmVydGVkLnF1ZXN0aW9ucyA9IFtdO1xuICAgIGNvbnZlcnRlZC52YWxpZGF0b3JzID0gW107XG5cbiAgICBjb25zdCBtYWluRmllbGQ6IGFueSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoc2NoZW1hUXVlc3Rpb24pKTtcbiAgICBtYWluRmllbGQudHlwZSA9ICdjb21wbGV4LW9icy1jaGlsZCc7XG4gICAgZGVsZXRlIG1haW5GaWVsZC5xdWVzdGlvbk9wdGlvbnMuc2hvd0RhdGU7XG4gICAgZGVsZXRlIG1haW5GaWVsZC5xdWVzdGlvbk9wdGlvbnMuc2hvd25EYXRlT3B0aW9ucztcbiAgICBtYWluRmllbGQucXVlc3Rpb25PcHRpb25zLm9ic0ZpZWxkID0gJ3ZhbHVlJztcblxuICAgIGNvbnN0IGRhdGVGaWVsZDogYW55ID0ge307XG4gICAgZGF0ZUZpZWxkLnR5cGUgPSAnY29tcGxleC1vYnMtY2hpbGQnO1xuICAgIGRhdGVGaWVsZC5sYWJlbCA9ICdEYXRlIG9mICcgKyBtYWluRmllbGQubGFiZWw7XG4gICAgZGF0ZUZpZWxkLmlkID0gJ2RhdGVfJyArIG1haW5GaWVsZC5pZDtcbiAgICBkYXRlRmllbGQucXVlc3Rpb25PcHRpb25zID0ge307XG4gICAgZGF0ZUZpZWxkLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0ID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQ7XG4gICAgZGF0ZUZpZWxkLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPSAnZGF0ZSc7XG4gICAgZGF0ZUZpZWxkLnF1ZXN0aW9uT3B0aW9ucy5vYnNGaWVsZCA9ICdvYnNEYXRldGltZSc7XG4gICAgY29uc3QgZGF0ZU9wdGlvbnM6IGFueSA9IChPYmplY3QgYXMgYW55KS5hc3NpZ24oe30sXG4gICAgICBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuc2hvd25EYXRlT3B0aW9ucyk7XG4gICAgZGF0ZUZpZWxkLnZhbGlkYXRvcnMgPSBkYXRlT3B0aW9ucy52YWxpZGF0b3JzO1xuICAgIGRhdGVGaWVsZC5oaWRlID0gZGF0ZU9wdGlvbnMuaGlkZTtcblxuXG4gICAgY29udmVydGVkLnF1ZXN0aW9ucy5wdXNoKG1haW5GaWVsZCk7XG4gICAgY29udmVydGVkLnF1ZXN0aW9ucy5wdXNoKGRhdGVGaWVsZCk7XG5cbiAgICByZXR1cm4gY29udmVydGVkO1xuICB9XG5cbiAgY29weVByb3BlcnRpZXMobWFwcGluZ3M6IGFueSwgc291cmNlOiBhbnksIGRlc3RpbmF0aW9uOiBRdWVzdGlvbkJhc2UpIHtcblxuICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gc291cmNlKSB7XG4gICAgICBpZiAobWFwcGluZ3MuaGFzT3duUHJvcGVydHkocHJvcGVydHkpICYmIGRlc3RpbmF0aW9uLmhhc093blByb3BlcnR5KG1hcHBpbmdzW3Byb3BlcnR5XSkpIHtcbiAgICAgICAgZGVzdGluYXRpb25bbWFwcGluZ3NbcHJvcGVydHldXSA9IHNvdXJjZVtwcm9wZXJ0eV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYWRkVmFsaWRhdG9ycyhzY2hlbWFRdWVzdGlvbjogYW55KTogQXJyYXk8VmFsaWRhdGlvbk1vZGVsPiB7XG5cbiAgICBjb25zdCB2YWxpZGF0b3JzOiBBcnJheTxWYWxpZGF0aW9uTW9kZWw+ID0gW107XG5cbiAgICBpZiAoc2NoZW1hUXVlc3Rpb24udmFsaWRhdG9ycykge1xuXG4gICAgICAvLyBUT0RPIC0gYWRkIG1vcmUgdmFsaWRhdG9yIHR5cGVzXG4gICAgICBfLmZvckVhY2goc2NoZW1hUXVlc3Rpb24udmFsaWRhdG9ycywgKHZhbGlkYXRvcjogYW55KSA9PiB7XG4gICAgICAgIHN3aXRjaCAodmFsaWRhdG9yLnR5cGUpIHtcbiAgICAgICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgICAgIHZhbGlkYXRvcnMucHVzaChuZXcgRGF0ZVZhbGlkYXRpb25Nb2RlbCh2YWxpZGF0b3IpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2pzX2V4cHJlc3Npb24nOlxuICAgICAgICAgICAgdmFsaWRhdG9ycy5wdXNoKG5ldyBKc0V4cHJlc3Npb25WYWxpZGF0aW9uTW9kZWwodmFsaWRhdG9yKSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdjb25kaXRpb25hbEFuc3dlcmVkJzpcbiAgICAgICAgICAgIHZhbGlkYXRvcnMucHVzaChuZXcgQ29uZGl0aW9uYWxWYWxpZGF0aW9uTW9kZWwodmFsaWRhdG9yKSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdmFsaWRhdG9ycy5wdXNoKG5ldyBWYWxpZGF0aW9uTW9kZWwodmFsaWRhdG9yKSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgcXVlc3Rpb25PcHRpb25zID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zO1xuICAgIGNvbnN0IHJlbmRlcmluZ1R5cGUgPSBxdWVzdGlvbk9wdGlvbnMgPyBxdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nIDogJyc7XG4gICAgc3dpdGNoIChyZW5kZXJpbmdUeXBlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuXG4gICAgICAgIGlmIChxdWVzdGlvbk9wdGlvbnMubWF4ICYmIHF1ZXN0aW9uT3B0aW9ucy5taW4pIHtcbiAgICAgICAgICB2YWxpZGF0b3JzLnB1c2gobmV3IE1heFZhbGlkYXRpb25Nb2RlbCh7XG4gICAgICAgICAgICB0eXBlOiAnbWF4JyxcbiAgICAgICAgICAgIG1heDogcXVlc3Rpb25PcHRpb25zLm1heFxuICAgICAgICAgIH0pKTtcbiAgICAgICAgICB2YWxpZGF0b3JzLnB1c2gobmV3IE1pblZhbGlkYXRpb25Nb2RlbCh7XG4gICAgICAgICAgICB0eXBlOiAnbWluJyxcbiAgICAgICAgICAgIG1pbjogcXVlc3Rpb25PcHRpb25zLm1pblxuICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgLy8gYWRkIGNvbmRpdGlvbmFsIHJlcXVpcmVkIHZhbGlkYXRvcnNcbiAgICBpZiAodHlwZW9mIHNjaGVtYVF1ZXN0aW9uLnJlcXVpcmVkID09PSAnb2JqZWN0Jykge1xuXG4gICAgICBjb25zdCByZXF1aXJlZDogYW55ID0gc2NoZW1hUXVlc3Rpb24ucmVxdWlyZWQ7XG5cbiAgICAgIGlmIChyZXF1aXJlZC50eXBlID09PSAnY29uZGl0aW9uYWxSZXF1aXJlZCcpIHtcblxuICAgICAgICB2YWxpZGF0b3JzLnB1c2gobmV3IENvbmRpdGlvbmFsVmFsaWRhdGlvbk1vZGVsKHtcbiAgICAgICAgICByZWZlcmVuY2VRdWVzdGlvbklkOiByZXF1aXJlZC5yZWZlcmVuY2VRdWVzdGlvbklkLFxuICAgICAgICAgIHJlZmVyZW5jZVF1ZXN0aW9uQW5zd2VyczogcmVxdWlyZWQucmVmZXJlbmNlUXVlc3Rpb25BbnN3ZXJzLFxuICAgICAgICAgIHR5cGU6IHJlcXVpcmVkLnR5cGUsXG4gICAgICAgICAgbWVzc2FnZTogcmVxdWlyZWQubWVzc2FnZSxcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB2YWxpZGF0b3JzO1xuICB9XG5cbiAgYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uOiBhbnksIHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UpOiBhbnkge1xuICAgIGlmIChzY2hlbWFRdWVzdGlvbi5oaXN0b3JpY2FsRXhwcmVzc2lvbiAmJiBzY2hlbWFRdWVzdGlvbi5oaXN0b3JpY2FsRXhwcmVzc2lvbi5sZW5ndGggPiAwKSB7XG4gICAgICBxdWVzdGlvbi5zZXRIaXN0b3JpY2FsVmFsdWUodHJ1ZSk7XG4gICAgICBpZiAoc2NoZW1hUXVlc3Rpb24uc2hvd0hpc3RvcmljYWxFbmNvdW50ZXJEYXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcXVlc3Rpb24uc2hvd0hpc3RvcmljYWxFbmNvdW50ZXJEYXRlKFxuICAgICAgICAgIChzY2hlbWFRdWVzdGlvbi5zaG93SGlzdG9yaWNhbEVuY291bnRlckRhdGUgPT09ICd0cnVlJykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcXVlc3Rpb24uc2hvd0hpc3RvcmljYWxFbmNvdW50ZXJEYXRlKCk7XG4gICAgICB9XG4gICAgICBjb25zdCBvcmlnVmFsdWUgPSB0aGlzLmhpc3RvcmljYWxIZWxwZXJTZXJ2aWNlLmV2YWx1YXRlKHNjaGVtYVF1ZXN0aW9uLmhpc3RvcmljYWxFeHByZXNzaW9uLFxuICAgICAgICB0aGlzLmRhdGFTb3VyY2VzLCB1bmRlZmluZWQpO1xuICAgICAgcXVlc3Rpb24uaGlzdG9yaWNhbERhdGFWYWx1ZSA9IG9yaWdWYWx1ZTtcbiAgICAgIC8vIGNvbnNvbGUuaW5mbygnaGlzdG9yaWNhbCB2YWx1ZScsIG9yaWdWYWx1ZSk7XG4gICAgICAvLyBjb25zb2xlLmluZm8oJ2hpc3RvcmljYWwgZGF0YSBxdWVzdGlvbiA6OjonLCBxdWVzdGlvbik7XG4gICAgICAvLyBjb25zb2xlLmluZm8oJ3NjaGVtYSBkYXRhIHF1ZXN0aW9uIDo6OicsIHNjaGVtYVF1ZXN0aW9uKTtcblxuICAgICAgaWYgKHNjaGVtYVF1ZXN0aW9uLmhpc3RvcmljYWxQcmVwb3B1bGF0ZUNvbmRpdGlvbiAmJiBvcmlnVmFsdWUpIHtcbiAgICAgICAgY29uc3QgdG9Qb3B1bGF0ZSA9IHRoaXMuaGlzdG9yaWNhbEhlbHBlclNlcnZpY2UuZXZhbHVhdGVQcmVjb25kaXRpb24oc2NoZW1hUXVlc3Rpb24uaGlzdG9yaWNhbFByZXBvcHVsYXRlQ29uZGl0aW9uLFxuICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZXMsIG9yaWdWYWx1ZSk7XG5cbiAgICAgICAgaWYgKHRvUG9wdWxhdGUpIHtcbiAgICAgICAgICBxdWVzdGlvbi5kZWZhdWx0VmFsdWUgPSBvcmlnVmFsdWUudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuOyAvLyBkb24ndCB0cnkgdG8gZXZhbHVhdGUgdGhlIG90aGVyIG9wdGlvblxuICAgICAgfVxuXG4gICAgICBpZiAoc2NoZW1hUXVlc3Rpb24uaGlzdG9yaWNhbFByZXBvcHVsYXRlICYmIG9yaWdWYWx1ZSkge1xuICAgICAgICAvLyBzYW1wbGUgc2NoZW1hIG9wdGlvbnMgZm9yIHRoaXMgYnJhbmNoXG4gICAgICAgIC8vIFwiaGlzdG9yaWNhbFByZXBvcHVsYXRlXCI6dHJ1ZSxcbiAgICAgICAgLy8gXCJhbGxvd2VkSGlzdG9yaWNhbFZhbHVlQWdlSW5EYXlzXCI6IDQwMDAwLFxuICAgICAgICBjb25zdCB2YWxEYXRlID0gbW9tZW50KG9yaWdWYWx1ZS52YWx1ZURhdGUpO1xuICAgICAgICBjb25zdCBkaWZmZXJlbmNlSW5EYXlzID0gbW9tZW50KCkuZGlmZih2YWxEYXRlLCAnZGF5cycpO1xuICAgICAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcihzY2hlbWFRdWVzdGlvbi5hbGxvd2VkSGlzdG9yaWNhbFZhbHVlQWdlSW5EYXlzKSkge1xuICAgICAgICAgIGlmIChkaWZmZXJlbmNlSW5EYXlzIDw9IHNjaGVtYVF1ZXN0aW9uLmFsbG93ZWRIaXN0b3JpY2FsVmFsdWVBZ2VJbkRheXMpIHtcbiAgICAgICAgICAgIHF1ZXN0aW9uLmRlZmF1bHRWYWx1ZSA9IG9yaWdWYWx1ZS52YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcXVlc3Rpb24uZGVmYXVsdFZhbHVlID0gb3JpZ1ZhbHVlLnZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYWRkQ2FsY3VsYXRvclByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uOiBhbnksIHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UpOiBhbnkge1xuXG4gICAgaWYgKHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucyAmJlxuICAgICAgdHlwZW9mIHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5jYWxjdWxhdGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBxdWVzdGlvbi5jYWxjdWxhdGVFeHByZXNzaW9uID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLmNhbGN1bGF0ZS5jYWxjdWxhdGVFeHByZXNzaW9uO1xuICAgIH1cblxuICB9XG5cbiAgYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbjogYW55LCBxdWVzdGlvbjogUXVlc3Rpb25CYXNlKTogYW55IHtcbiAgICBpZiAoc2NoZW1hUXVlc3Rpb24uYWxlcnQpIHtcbiAgICAgIHF1ZXN0aW9uLmFsZXJ0ID0gc2NoZW1hUXVlc3Rpb24uYWxlcnQ7XG4gICAgfVxuICAgIC8vIGlmICh0eXBlb2Ygc2NoZW1hUXVlc3Rpb24ubWVzc2FnZSA9PT0gJ29iamVjdCcpIHtcbiAgICAvLyAgIGlmIChzY2hlbWFRdWVzdGlvbi5tZXNzYWdlLmFsZXJ0V2hlbkV4cHJlc3Npb24pIHtcbiAgICAvLyAgICAgcXVlc3Rpb24ubWVzc2FnZSA9IHNjaGVtYVF1ZXN0aW9uLm1lc3NhZ2UuYWxlcnRXaGVuRXhwcmVzc2lvbjtcbiAgICAvLyAgIH1cbiAgICAvLyB9XG4gIH1cblxuICBhZGREaXNhYmxlT3JIaWRlUHJvcGVydHkoc2NoZW1hUXVlc3Rpb246IGFueSwgcXVlc3Rpb246IFF1ZXN0aW9uQmFzZSk6IGFueSB7XG5cbiAgICBpZiAoISFzY2hlbWFRdWVzdGlvbi5kaXNhYmxlKSB7XG4gICAgICBxdWVzdGlvbi5kaXNhYmxlID0gc2NoZW1hUXVlc3Rpb24uZGlzYWJsZTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHNjaGVtYVF1ZXN0aW9uLmRpc2FibGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBxdWVzdGlvbi5kaXNhYmxlID0gc2NoZW1hUXVlc3Rpb24uZGlzYWJsZS5kaXNhYmxlV2hlbkV4cHJlc3Npb247XG4gICAgfVxuXG4gICAgaWYgKCEhc2NoZW1hUXVlc3Rpb24uaGlkZSkge1xuICAgICAgcXVlc3Rpb24uaGlkZSA9IHNjaGVtYVF1ZXN0aW9uLmhpZGU7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygc2NoZW1hUXVlc3Rpb24uaGlkZSA9PT0gJ29iamVjdCcpIHtcblxuICAgICAgaWYgKHNjaGVtYVF1ZXN0aW9uLmhpZGUuaGlkZVdoZW5FeHByZXNzaW9uKSB7XG4gICAgICAgIHF1ZXN0aW9uLmhpZGUgPSBzY2hlbWFRdWVzdGlvbi5oaWRlLmhpZGVXaGVuRXhwcmVzc2lvbjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBnZW5lcmF0ZUlkKHgpIHtcbiAgICBsZXQgcyA9ICdfJztcbiAgICB3aGlsZSAocy5sZW5ndGggPCB4ICYmIHggPiAwKSB7XG4gICAgICBjb25zdCByID0gTWF0aC5yYW5kb20oKTtcbiAgICAgIHMgKz0gKHIgPCAwLjEgPyBNYXRoLmZsb29yKHIgKiAxMDApIDpcbiAgICAgICAgU3RyaW5nLmZyb21DaGFyQ29kZShNYXRoLmZsb29yKHIgKiAyNikgKyAociA+IDAuNSA/IDk3IDogNjUpKSk7XG4gICAgfVxuICAgIHJldHVybiAnXycgKyBzO1xuICB9XG59XG4iXX0=
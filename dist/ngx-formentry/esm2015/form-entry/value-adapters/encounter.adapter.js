/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { NodeBase, GroupNode, ArrayNode } from '../form-factory/form-node';
import { ObsValueAdapter } from './obs.adapter';
import { OrderValueAdapter } from './order.adapter';
import * as moment_ from 'moment';
const /** @type {?} */ moment = moment_;
export class EncounterAdapter {
    /**
     * @param {?} ordersAdapter
     * @param {?} obsAdapter
     */
    constructor(ordersAdapter, obsAdapter) {
        this.ordersAdapter = ordersAdapter;
        this.obsAdapter = obsAdapter;
    }
    /**
     * @param {?} form
     * @param {?} payload
     * @return {?}
     */
    populateForm(form, payload) {
        this.populateNode(form.rootNode, payload);
        if (Array.isArray(payload.orders)) {
            this.ordersAdapter.populateForm(form, payload);
        }
        if (Array.isArray(payload.obs)) {
            this.obsAdapter.populateForm(form, payload.obs);
        }
    }
    /**
     * @param {?} rootNode
     * @param {?} payload
     * @return {?}
     */
    populateNode(rootNode, payload) {
        if (payload === undefined || payload === null) {
            throw new Error('Expected payload');
        }
        const /** @type {?} */ nodes = this.getEncounterNodes(rootNode);
        nodes.forEach(node => {
            switch (node.question.extras.type) {
                case 'encounterDatetime':
                    if (payload['encounterDatetime']) {
                        // console.log('date', payload['encounterDatetime']);
                        node.control.setValue(moment(payload['encounterDatetime']).toDate());
                        node.initialValue = moment(payload['encounterDatetime']).toDate();
                    }
                    break;
                case 'encounterProvider':
                    if (Array.isArray(payload['encounterProviders']) && payload['encounterProviders'].length > 0) {
                        const /** @type {?} */ firstProvider = payload['encounterProviders'][0].provider;
                        if (firstProvider && firstProvider.uuid) {
                            node.control.setValue(firstProvider.uuid);
                            node.initialValue = firstProvider.uuid;
                        }
                    }
                    break;
                case 'encounterLocation':
                    if (payload['location'] && payload['location'].uuid) {
                        node.control.setValue(payload['location'].uuid);
                        node.initialValue = payload['location'].uuid;
                    }
                    break;
                default:
                    break;
            }
        });
    }
    /**
     * @param {?} form
     * @return {?}
     */
    generateFormPayload(form) {
        const /** @type {?} */ payload = this.generateNodePayload(form.rootNode);
        this.setNonFilledPayloadMembers(form, payload);
        payload['obs'] = this.obsAdapter.generateFormPayload(form) || [];
        payload['orders'] = this.ordersAdapter.generateFormPayload(form) || [];
        return payload;
    }
    /**
     * @param {?} rootNode
     * @return {?}
     */
    generateNodePayload(rootNode) {
        const /** @type {?} */ nodes = this.getEncounterNodes(rootNode);
        const /** @type {?} */ payload = {};
        nodes.forEach(node => {
            if (node.control.value !== null &&
                node.control.value !== undefined &&
                node.control.value !== '') {
                switch (node.question.extras.type) {
                    case 'encounterDatetime':
                        const /** @type {?} */ dateValue = moment(node.control.value)
                            .utcOffset(rootNode.form.valueProcessingInfo.utcOffset || '+0300');
                        payload['encounterDatetime'] = dateValue.format('YYYY-MM-DD HH:mm:ss');
                        break;
                    case 'encounterProvider':
                        if (node.control.value && node.control.value !== '') {
                            const /** @type {?} */ providers = [];
                            providers.push({
                                provider: node.control.value,
                                encounterRole: 'a0b03050-c99b-11e0-9572-0800200c9a66' // unknown provider role in the encounter as default
                            });
                            payload['encounterProviders'] = providers;
                        }
                        break;
                    case 'encounterLocation':
                        payload['location'] = node.control.value;
                        break;
                    default:
                        break;
                }
            }
        });
        return payload;
    }
    /**
     * @param {?} rootNode
     * @return {?}
     */
    getEncounterNodes(rootNode) {
        const /** @type {?} */ results = [];
        this._getEncounterNodes(rootNode, results);
        return results;
    }
    /**
     * @param {?} form
     * @param {?} payload
     * @return {?}
     */
    setNonFilledPayloadMembers(form, payload) {
        if (form.valueProcessingInfo.patientUuid) {
            this.setPayloadPatientUuid(payload, form.valueProcessingInfo.patientUuid);
        }
        if (form.valueProcessingInfo.visitUuid) {
            this.setPayloadVisitUuid(payload, form.valueProcessingInfo.visitUuid);
        }
        if (form.valueProcessingInfo.encounterTypeUuid) {
            this.setPayloadEncounterTypeUuid(payload, form.valueProcessingInfo.encounterTypeUuid);
        }
        if (form.valueProcessingInfo.formUuid) {
            this.setPayloadFormUuid(payload, form.valueProcessingInfo.formUuid);
        }
        if (form.valueProcessingInfo.encounterUuid) {
            this.setPayloadEncounterUuid(payload, form.valueProcessingInfo.encounterUuid);
        }
    }
    /**
     * @param {?} payload
     * @param {?} patientUuid
     * @return {?}
     */
    setPayloadPatientUuid(payload, patientUuid) {
        payload['patient'] = patientUuid;
    }
    /**
     * @param {?} payload
     * @param {?} visitUuid
     * @return {?}
     */
    setPayloadVisitUuid(payload, visitUuid) {
        payload['visit'] = visitUuid;
    }
    /**
     * @param {?} payload
     * @param {?} encounterTypeUuid
     * @return {?}
     */
    setPayloadEncounterTypeUuid(payload, encounterTypeUuid) {
        payload['encounterType'] = encounterTypeUuid;
    }
    /**
     * @param {?} payload
     * @param {?} formUuid
     * @return {?}
     */
    setPayloadFormUuid(payload, formUuid) {
        payload['form'] = formUuid;
    }
    /**
     * @param {?} payload
     * @param {?} encounterUuid
     * @return {?}
     */
    setPayloadEncounterUuid(payload, encounterUuid) {
        payload['uuid'] = encounterUuid;
    }
    /**
     * @param {?} rootNode
     * @param {?} array
     * @return {?}
     */
    _getEncounterNodes(rootNode, array) {
        if (this._isEncounterNode(rootNode)) {
            array.push(rootNode);
        }
        if (rootNode instanceof GroupNode) {
            const /** @type {?} */ node = /** @type {?} */ (rootNode);
            // tslint:disable-next-line:forin
            for (const /** @type {?} */ o in node.children) {
                if (node.children[o] instanceof NodeBase) {
                    this._getEncounterNodes(node.children[o], array);
                }
            }
        }
        if (rootNode instanceof ArrayNode) {
            const /** @type {?} */ node = /** @type {?} */ (rootNode);
            node.children.forEach(child => {
                this._getEncounterNodes(child, array);
            });
        }
    }
    /**
     * @param {?} node
     * @return {?}
     */
    _isEncounterNode(node) {
        if (node.question.extras &&
            (node.question.extras.type === 'encounterDatetime' ||
                node.question.extras.type === 'encounterProvider' ||
                node.question.extras.type === 'encounterLocation')) {
            return true;
        }
        return false;
    }
}
EncounterAdapter.decorators = [
    { type: Injectable },
];
/** @nocollapse */
EncounterAdapter.ctorParameters = () => [
    { type: OrderValueAdapter, },
    { type: ObsValueAdapter, },
];
function EncounterAdapter_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    EncounterAdapter.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    EncounterAdapter.ctorParameters;
    /** @type {?} */
    EncounterAdapter.prototype.ordersAdapter;
    /** @type {?} */
    EncounterAdapter.prototype.obsAdapter;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLmFkYXB0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3ZhbHVlLWFkYXB0ZXJzL2VuY291bnRlci5hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBSTNFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFcEQsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFFbEMsdUJBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQztBQUd2QixNQUFNOzs7OztJQUVGLFlBQW1CLGFBQWdDLEVBQVMsVUFBMkI7UUFBcEUsa0JBQWEsR0FBYixhQUFhLENBQW1CO1FBQVMsZUFBVSxHQUFWLFVBQVUsQ0FBaUI7S0FBSzs7Ozs7O0lBRTVGLFlBQVksQ0FBQyxJQUFVLEVBQUUsT0FBTztRQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFMUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNsRDtRQUNELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsT0FBTyxD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UUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDNUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsWUFBWSxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUN2QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztpQkFDcEQ7YUFDSjtTQUNKO1FBRUQsRUFBRSxDQUFDLENBQUMsUUFBUSxZQUFZLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsdUJBQU0sSUFBSSxxQkFBRyxRQUFxQixDQUFBLENBQUM7WUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDekMsQ0FBQyxDQUFDO1NBQ047Ozs7OztJQUdHLGdCQUFnQixDQUFDLElBQWM7UUFDbkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNO1lBQ3BCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLG1CQUFtQjtnQkFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLG1CQUFtQjtnQkFDakQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pELE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDZjtRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7Ozs7WUFwTHBCLFVBQVU7Ozs7WUFORixpQkFBaUI7WUFEakIsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTm9kZUJhc2UsIEdyb3VwTm9kZSwgQXJyYXlOb2RlIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0tbm9kZSc7XG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0nO1xuXG5pbXBvcnQgeyBWYWx1ZUFkYXB0ZXIgfSBmcm9tICcuL3ZhbHVlLmFkYXB0ZXInO1xuaW1wb3J0IHsgT2JzVmFsdWVBZGFwdGVyIH0gZnJvbSAnLi9vYnMuYWRhcHRlcic7XG5pbXBvcnQgeyBPcmRlclZhbHVlQWRhcHRlciB9IGZyb20gJy4vb3JkZXIuYWRhcHRlcic7XG5cbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcblxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEVuY291bnRlckFkYXB0ZXIgaW1wbGVtZW50cyBWYWx1ZUFkYXB0ZXIge1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIG9yZGVyc0FkYXB0ZXI6IE9yZGVyVmFsdWVBZGFwdGVyLCBwdWJsaWMgb2JzQWRhcHRlcjogT2JzVmFsdWVBZGFwdGVyKSB7IH1cblxuICAgIHBvcHVsYXRlRm9ybShmb3JtOiBGb3JtLCBwYXlsb2FkKSB7XG4gICAgICAgIHRoaXMucG9wdWxhdGVOb2RlKGZvcm0ucm9vdE5vZGUsIHBheWxvYWQpO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBheWxvYWQub3JkZXJzKSkge1xuICAgICAgICAgICAgdGhpcy5vcmRlcnNBZGFwdGVyLnBvcHVsYXRlRm9ybShmb3JtLCBwYXlsb2FkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXlsb2FkLm9icykpIHtcbiAgICAgICAgICAgIHRoaXMub2JzQWRhcHRlci5wb3B1bGF0ZUZvcm0oZm9ybSwgcGF5bG9hZC5vYnMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcG9wdWxhdGVOb2RlKHJvb3ROb2RlOiBOb2RlQmFzZSwgcGF5bG9hZCkge1xuXG4gICAgICAgIGlmIChwYXlsb2FkID09PSB1bmRlZmluZWQgfHwgcGF5bG9hZCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBwYXlsb2FkJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBub2RlcyA9IHRoaXMuZ2V0RW5jb3VudGVyTm9kZXMocm9vdE5vZGUpO1xuXG4gICAgICAgIG5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdlbmNvdW50ZXJEYXRldGltZSc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkWydlbmNvdW50ZXJEYXRldGltZSddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnZGF0ZScsIHBheWxvYWRbJ2VuY291bnRlckRhdGV0aW1lJ10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5jb250cm9sLnNldFZhbHVlKG1vbWVudChwYXlsb2FkWydlbmNvdW50ZXJEYXRldGltZSddKS50b0RhdGUoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmluaXRpYWxWYWx1ZSA9IG1vbWVudChwYXlsb2FkWydlbmNvdW50ZXJEYXRldGltZSddKS50b0RhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdlbmNvdW50ZXJQcm92aWRlcic6XG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBheWxvYWRbJ2VuY291bnRlclByb3ZpZGVycyddKSAmJiBwYXlsb2FkWydlbmNvdW50ZXJQcm92aWRlcnMnXS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaXJzdFByb3ZpZGVyOiBhbnkgPSBwYXlsb2FkWydlbmNvdW50ZXJQcm92aWRlcnMnXVswXS5wcm92aWRlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaXJzdFByb3ZpZGVyICYmIGZpcnN0UHJvdmlkZXIudXVpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuY29udHJvbC5zZXRWYWx1ZShmaXJzdFByb3ZpZGVyLnV1aWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuaW5pdGlhbFZhbHVlID0gZmlyc3RQcm92aWRlci51dWlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2VuY291bnRlckxvY2F0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBheWxvYWRbJ2xvY2F0aW9uJ10gJiYgcGF5bG9hZFsnbG9jYXRpb24nXS51dWlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmNvbnRyb2wuc2V0VmFsdWUocGF5bG9hZFsnbG9jYXRpb24nXS51dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuaW5pdGlhbFZhbHVlID0gcGF5bG9hZFsnbG9jYXRpb24nXS51dWlkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUZvcm1QYXlsb2FkKGZvcm06IEZvcm0pIHtcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IHRoaXMuZ2VuZXJhdGVOb2RlUGF5bG9hZChmb3JtLnJvb3ROb2RlKTtcblxuICAgICAgICB0aGlzLnNldE5vbkZpbGxlZFBheWxvYWRNZW1iZXJzKGZvcm0sIHBheWxvYWQpO1xuXG4gICAgICAgIHBheWxvYWRbJ29icyddID0gdGhpcy5vYnNBZGFwdGVyLmdlbmVyYXRlRm9ybVBheWxvYWQoZm9ybSkgfHwgW107XG5cbiAgICAgICAgcGF5bG9hZFsnb3JkZXJzJ10gPSB0aGlzLm9yZGVyc0FkYXB0ZXIuZ2VuZXJhdGVGb3JtUGF5bG9hZChmb3JtKSB8fCBbXTtcblxuICAgICAgICByZXR1cm4gcGF5bG9hZDtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZU5vZGVQYXlsb2FkKHJvb3ROb2RlOiBOb2RlQmFzZSkge1xuICAgICAgICBjb25zdCBub2RlcyA9IHRoaXMuZ2V0RW5jb3VudGVyTm9kZXMocm9vdE5vZGUpO1xuICAgICAgICBjb25zdCBwYXlsb2FkID0ge307XG5cbiAgICAgICAgbm9kZXMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgICAgIGlmIChub2RlLmNvbnRyb2wudmFsdWUgIT09IG51bGwgJiZcbiAgICAgICAgICAgICAgICBub2RlLmNvbnRyb2wudmFsdWUgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICAgIG5vZGUuY29udHJvbC52YWx1ZSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZW5jb3VudGVyRGF0ZXRpbWUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0ZVZhbHVlID0gbW9tZW50KG5vZGUuY29udHJvbC52YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudXRjT2Zmc2V0KHJvb3ROb2RlLmZvcm0udmFsdWVQcm9jZXNzaW5nSW5mby51dGNPZmZzZXQgfHwgJyswMzAwJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkWydlbmNvdW50ZXJEYXRldGltZSddID0gZGF0ZVZhbHVlLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2VuY291bnRlclByb3ZpZGVyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChub2RlLmNvbnRyb2wudmFsdWUgJiYgbm9kZS5jb250cm9sLnZhbHVlICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVycyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVycy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXI6IG5vZGUuY29udHJvbC52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5jb3VudGVyUm9sZTogJ2EwYjAzMDUwLWM5OWItMTFlMC05NTcyLTA4MDAyMDBjOWE2NicgLy8gdW5rbm93biBwcm92aWRlciByb2xlIGluIHRoZSBlbmNvdW50ZXIgYXMgZGVmYXVsdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWRbJ2VuY291bnRlclByb3ZpZGVycyddID0gcHJvdmlkZXJzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2VuY291bnRlckxvY2F0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWRbJ2xvY2F0aW9uJ10gPSBub2RlLmNvbnRyb2wudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHBheWxvYWQ7XG4gICAgfVxuXG4gICAgZ2V0RW5jb3VudGVyTm9kZXMocm9vdE5vZGU6IE5vZGVCYXNlKTogQXJyYXk8Tm9kZUJhc2U+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0czogQXJyYXk8Tm9kZUJhc2U+ID0gW107XG4gICAgICAgIHRoaXMuX2dldEVuY291bnRlck5vZGVzKHJvb3ROb2RlLCByZXN1bHRzKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuXG4gICAgc2V0Tm9uRmlsbGVkUGF5bG9hZE1lbWJlcnMoZm9ybTogRm9ybSwgcGF5bG9hZCkge1xuICAgICAgICBpZiAoZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLnBhdGllbnRVdWlkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFBheWxvYWRQYXRpZW50VXVpZChwYXlsb2FkLCBmb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8ucGF0aWVudFV1aWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZvcm0udmFsdWVQcm9jZXNzaW5nSW5mby52aXNpdFV1aWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0UGF5bG9hZFZpc2l0VXVpZChwYXlsb2FkLCBmb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8udmlzaXRVdWlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8uZW5jb3VudGVyVHlwZVV1aWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0UGF5bG9hZEVuY291bnRlclR5cGVVdWlkKHBheWxvYWQsIGZvcm0udmFsdWVQcm9jZXNzaW5nSW5mby5lbmNvdW50ZXJUeXBlVXVpZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLmZvcm1VdWlkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFBheWxvYWRGb3JtVXVpZChwYXlsb2FkLCBmb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8uZm9ybVV1aWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZvcm0udmFsdWVQcm9jZXNzaW5nSW5mby5lbmNvdW50ZXJVdWlkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFBheWxvYWRFbmNvdW50ZXJVdWlkKHBheWxvYWQsIGZvcm0udmFsdWVQcm9jZXNzaW5nSW5mby5lbmNvdW50ZXJVdWlkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFBheWxvYWRQYXRpZW50VXVpZChwYXlsb2FkLCBwYXRpZW50VXVpZDogc3RyaW5nKSB7XG4gICAgICAgIHBheWxvYWRbJ3BhdGllbnQnXSA9IHBhdGllbnRVdWlkO1xuICAgIH1cblxuICAgIHNldFBheWxvYWRWaXNpdFV1aWQocGF5bG9hZCwgdmlzaXRVdWlkOiBzdHJpbmcpIHtcbiAgICAgICAgcGF5bG9hZFsndmlzaXQnXSA9IHZpc2l0VXVpZDtcbiAgICB9XG5cbiAgICBzZXRQYXlsb2FkRW5jb3VudGVyVHlwZVV1aWQocGF5bG9hZCwgZW5jb3VudGVyVHlwZVV1aWQ6IHN0cmluZykge1xuICAgICAgICBwYXlsb2FkWydlbmNvdW50ZXJUeXBlJ10gPSBlbmNvdW50ZXJUeXBlVXVpZDtcbiAgICB9XG5cbiAgICBzZXRQYXlsb2FkRm9ybVV1aWQocGF5bG9hZCwgZm9ybVV1aWQ6IHN0cmluZykge1xuICAgICAgICBwYXlsb2FkWydmb3JtJ10gPSBmb3JtVXVpZDtcbiAgICB9XG5cbiAgICBzZXRQYXlsb2FkRW5jb3VudGVyVXVpZChwYXlsb2FkLCBlbmNvdW50ZXJVdWlkOiBzdHJpbmcpIHtcbiAgICAgICAgcGF5bG9hZFsndXVpZCddID0gZW5jb3VudGVyVXVpZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRFbmNvdW50ZXJOb2Rlcyhyb290Tm9kZTogTm9kZUJhc2UsIGFycmF5OiBBcnJheTxOb2RlQmFzZT4pIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzRW5jb3VudGVyTm9kZShyb290Tm9kZSkpIHtcbiAgICAgICAgICAgIGFycmF5LnB1c2gocm9vdE5vZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJvb3ROb2RlIGluc3RhbmNlb2YgR3JvdXBOb2RlKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gcm9vdE5vZGUgYXMgR3JvdXBOb2RlO1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG8gaW4gbm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIGlmIChub2RlLmNoaWxkcmVuW29dIGluc3RhbmNlb2YgTm9kZUJhc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2V0RW5jb3VudGVyTm9kZXMobm9kZS5jaGlsZHJlbltvXSwgYXJyYXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyb290Tm9kZSBpbnN0YW5jZW9mIEFycmF5Tm9kZSkge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHJvb3ROb2RlIGFzIEFycmF5Tm9kZTtcbiAgICAgICAgICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZ2V0RW5jb3VudGVyTm9kZXMoY2hpbGQsIGFycmF5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaXNFbmNvdW50ZXJOb2RlKG5vZGU6IE5vZGVCYXNlKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChub2RlLnF1ZXN0aW9uLmV4dHJhcyAmJlxuICAgICAgICAgICAgKG5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGUgPT09ICdlbmNvdW50ZXJEYXRldGltZScgfHxcbiAgICAgICAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnZW5jb3VudGVyUHJvdmlkZXInIHx8XG4gICAgICAgICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMudHlwZSA9PT0gJ2VuY291bnRlckxvY2F0aW9uJykpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG4iXX0=
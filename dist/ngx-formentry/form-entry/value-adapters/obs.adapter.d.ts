import 'rxjs';
import { Form } from '../form-factory/form';
import { ValueAdapter } from './value.adapter';
import { ObsAdapterHelper } from './obs-adapter-helper';
export declare class ObsValueAdapter implements ValueAdapter {
    private helper;
    constructor(helper: ObsAdapterHelper);
    generateFormPayload(form: Form): any[];
    populateForm(form: Form, payload: any): void;
    setValues(nodes: any, payload?: any, forcegroup?: any): void;
    setObsValue(node: any, payload: any): void;
    setComplexObsValue(node: any, payload: any): void;
    getMultiselectValues(multiObs: any): any[];
    setRepeatingGroupValues(node: any, payload: any): void;
    getQuestionNodes(pages: any): any;
    repeatingGroup(nodes: any): any[];
    processGroup(obs: any, obsPayload: any): void;
    mapInitialGroup(group: any): {};
    mapModelGroup(node: any, value: any): {};
    processRepeatingGroups(node: any, obsPayload: any): void;
    leftOuterJoinArrays(first: any, second: any): any;
    createGroupNewObs(payload: any, groupConcept: any): any[];
    createGroupDeletedObs(payload: any): any[];
    getExactTime(datetime: string): string;
    processObs(obs: any, obsPayload: any): void;
    processComplexObs(node: any, obsPayload: any): void;
    processDeletedMultiSelectObs(values: any, obsPayload: any): void;
    processNewMultiSelectObs(values: any, obsPayload: any): void;
    updateOrVoidObs(obsValue: any, initialValue: any, obsPayload: any): void;
    isEmpty(value: any): boolean;
    traverse(o: any, type?: any): any[];
    processMultiSelect(concept: any, values: any): any[];
    isObs(node: any): boolean;
    getObsPayload(nodes: any): any[];
}

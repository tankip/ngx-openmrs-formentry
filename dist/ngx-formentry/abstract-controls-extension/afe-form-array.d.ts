import { FormArray, ValidatorFn, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { ControlRelations } from '../change-tracking/control-relations';
import { ValueChangeListener } from './value-change.listener';
import { CanHide, Hider } from '../form-entry/control-hiders-disablers/can-hide';
import { CanGenerateAlert, Alert } from '../form-entry/control-alerts/can-generate-alert';
import { CanDisable, Disabler } from '../form-entry/control-hiders-disablers/can-disable';
export declare class AfeFormArray extends FormArray implements CanHide, CanDisable, CanGenerateAlert, ValueChangeListener {
    private _controlRelations;
    private _valueChangeListener;
    private _previousValue;
    private _uuid;
    pathFromRoot: string;
    hidden: false;
    hiders: Hider[];
    alert: string;
    alerts: Alert[];
    disablers: Disabler[];
    private hiderHelper;
    private AlertHelper;
    private disablerHelper;
    constructor(controls: AbstractControl[], validator?: ValidatorFn, asyncValidator?: AsyncValidatorFn);
    uuid: string;
    readonly controlRelations: ControlRelations;
    hide(): void;
    show(): void;
    disable(param?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void;
    setHidingFn(newHider: Hider): void;
    clearHidingFns(): void;
    updateHiddenState(): void;
    setDisablingFn(newDisabler: Disabler): void;
    clearDisablingFns(): void;
    updateDisabledState(): void;
    setAlertFn(newHider: Alert): void;
    clearMessageFns(): void;
    updateAlert(): void;
    addValueChangeListener(func: any): void;
    fireValueChangeListener(value: any): void;
    setValue(value: any): void;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { DateValidator } from './date.validator';
var MinDateValidator = /** @class */ (function () {
    function MinDateValidator() {
    }
    /**
     * @param {?} min
     * @return {?}
     */
    MinDateValidator.prototype.validate = /**
     * @param {?} min
     * @return {?}
     */
    function (min) {
        return function (control) {
            if (control.hidden) {
                return null;
            }
            if (control.value && control.value.length !== 0) {
                if (!new DateValidator().validate(control.value)) {
                    var /** @type {?} */ newDate = new Date(control.value);
                    return newDate.getTime() < min.getTime() ? { 'mindate': { 'requiredDate': min, actualDate: newDate } } : null;
                }
                else {
                    return { 'mindate': { 'requiredDate': min } };
                }
            }
            return null;
        };
    };
    return MinDateValidator;
}());
export { MinDateValidator };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluLWRhdGUudmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS92YWxpZGF0b3JzL21pbi1kYXRlLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRWpELElBQUE7Ozs7Ozs7SUFFRSxtQ0FBUTs7OztJQUFSLFVBQVMsR0FBUztRQUVoQixNQUFNLENBQUMsVUFBQyxPQUF1QjtZQUU3QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQzthQUNiO1lBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVoRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksYUFBYSxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRWpELHFCQUFNLE9BQU8sR0FBUyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBRTlDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxFQUFFLGNBQWMsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztpQkFDL0c7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBRU4sTUFBTSxDQUFDLEVBQUUsU0FBUyxFQUFFLEVBQUUsY0FBYyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUM7aUJBQy9DO2FBQ0Y7WUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2IsQ0FBQztLQUNIOzJCQTVCSDtJQTZCQyxDQUFBO0FBMUJELDRCQTBCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmZUZvcm1Db250cm9sIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1mb3JtLWNvbnRyb2wnO1xuaW1wb3J0IHsgRGF0ZVZhbGlkYXRvciB9IGZyb20gJy4vZGF0ZS52YWxpZGF0b3InO1xuXG5leHBvcnQgY2xhc3MgTWluRGF0ZVZhbGlkYXRvciB7XG5cbiAgdmFsaWRhdGUobWluOiBEYXRlKSB7XG5cbiAgICByZXR1cm4gKGNvbnRyb2w6IEFmZUZvcm1Db250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9PiB7XG5cbiAgICAgIGlmIChjb250cm9sLmhpZGRlbikge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbnRyb2wudmFsdWUgJiYgY29udHJvbC52YWx1ZS5sZW5ndGggIT09IDApIHtcblxuICAgICAgICBpZiAoIW5ldyBEYXRlVmFsaWRhdG9yKCkudmFsaWRhdGUoY29udHJvbC52YWx1ZSkpIHtcblxuICAgICAgICAgIGNvbnN0IG5ld0RhdGU6IERhdGUgPSBuZXcgRGF0ZShjb250cm9sLnZhbHVlKTtcblxuICAgICAgICAgIHJldHVybiBuZXdEYXRlLmdldFRpbWUoKSA8IG1pbi5nZXRUaW1lKCkgPyB7ICdtaW5kYXRlJzogeyAncmVxdWlyZWREYXRlJzogbWluLCBhY3R1YWxEYXRlOiBuZXdEYXRlIH0gfSA6IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICByZXR1cm4geyAnbWluZGF0ZSc6IHsgJ3JlcXVpcmVkRGF0ZSc6IG1pbiB9IH07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgfVxufVxuIl19
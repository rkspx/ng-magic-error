import { Directive, Self, Inject, Optional, Host, ComponentRef, ComponentFactoryResolver, ViewContainerRef, Input } from "@angular/core";
import { NgControl } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { FORM_ERRORS } from '../form-errors';
import { merge, Observable, EMPTY } from 'rxjs';
import { FormSubmitDirective } from './form-submit.directive';
import { ControlErrorComponent } from '../components/control-error/control-error.component';
import { ControlErrorContainerDirective } from './control-error-container.directive';

@Directive({
    selector: '[formControl], [formControlName]'
})

export class ControlErrorsDirective {
    submit$: Observable<Event>;
    ref: ComponentRef<ControlErrorComponent>;
    container: ViewContainerRef;
    @Input() customErrors = {};

    constructor(
        private vcr: ViewContainerRef,
        private resolver: ComponentFactoryResolver,
        @Optional() controlErrorContainer: ControlErrorContainerDirective,
        @Inject(FORM_ERRORS) private errors,
        @Optional() @Host() private form: FormSubmitDirective,
        private controlDir: NgControl) {
        this.container = controlErrorContainer ? controlErrorContainer.vcr : this.vcr;
        this.submit$ = this.form ? this.form.submit$ : EMPTY;
    }

    ngOnInit() {
        merge(
            this.submit$,
            this.control.valueChanges
        ).pipe(
            untilDestroyed(this)
        ).subscribe(() => {
            const controlErrors = this.control.errors;
            if (controlErrors) {
                const firstKey = Object.keys(controlErrors)[0];
                const getError = this.errors[firstKey];
                const text = this.customErrors[firstKey] || getError(controlErrors[firstKey])
                this.setError(text);
            } else if (this.ref) {
                this.setError(null)
            }
        })
    }

    get control() {
        return this.controlDir.control;
    }

    setError(text: string) {
        if (!this.ref) {
            const factory = this.resolver.resolveComponentFactory(ControlErrorComponent);
            this.ref = this.container.createComponent(factory);
        }

        this.ref.instance.text = text;
    }

    ngOnDestroy() {

    }
}
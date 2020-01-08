import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from "@angular/core";

@Component({
    templateUrl: './control-error.component.html',
    styleUrls: ['./control-error.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ControlErrorComponent implements OnInit {
    _text;
    _hide = true;

    @Input() set text(value) {
        if (value !== this._text) {
            this._text = value;
            this._hide = !value;
            this.cdr.detectChanges();
        }
    }

    constructor(private cdr: ChangeDetectorRef) { }

    ngOnInit() {

    }
}
import { OnInit, Component, ElementRef, Input, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'sprk-stepper-step',
  template: `
    <ng-template #stepTemplate>
      <li
        [ngClass]="getClasses()"
        [attr.data-id]="idString"
        [attr.data-analytics]="analyticsString"
        data-sprk-stepper="step"
      >
        <div
          [ngClass]="{
            'sprk-c-Stepper__step-content': true,
            'sprk-c-Stepper__step-content--has-description':
            hasDescription === true
          }"
        >
          <a
            class="sprk-c-Stepper__step-header sprk-b-Link sprk-b-Link--plain"
            [attr.aria-controls]="componentID"
            role="tab"
            [attr.id]="componentAriaLabelID"
            href="#"
            [attr.aria-selected]="isSelected"
          >
            <span class="sprk-c-Stepper__step-icon"></span>
            <h3 class="sprk-c-Stepper__step-heading" data-sprk-stepper="heading">
              {{ heading }}
            </h3>
          </a>

          <div
            *ngIf="hasDescription === true"
            [ngClass]="{
              'sprk-c-Stepper__step-description': true,
              'sprk-u-HideWhenJs': !isSelected
            }"
            id="{{ componentID }}"
            data-sprk-stepper="description"
            [attr.aria-labelledby]="componentAriaLabelID"
            tabindex="0"
            role="tabpanel"
          >
            <p class="sprk-b-TypeBodyTwo">
              <ng-content></ng-content>
            </p>
          </div>
        </div>
      </li>
    </ng-template>
  `
})
export class SprkStepperStepComponent implements OnInit, AfterViewInit {
  @Input()
  additionalClasses: string;
  @Input()
  idString: string;
  @Input()
  variant: string;
  @Input()
  isDefaultActive: boolean;
  @Input()
  heading: string;
  @Input()
  analyticsString: string;

  // Coming from AfterContentInit of Stepper
  @Input()
  hasDescription: boolean;

  componentID = _.uniqueId('step-');
  componentAriaLabelID = _.uniqueId('step-aria-');
  activeClass = 'sprk-c-Stepper__step--selected';
  isSelected = false;

  @ViewChild('stepTemplate') template: SprkStepperStepComponent;

  constructor(public ref: ElementRef) { }

  getClasses(): string {
    const classArray: string[] = ['sprk-c-Stepper__step'];

    if (this.additionalClasses) {
      this.additionalClasses.split(' ').forEach(className => {
        classArray.push(className);
      });
    }

    if (this.isDefaultActive) {
      classArray.push(this.activeClass);
    }

    return classArray.join(' ');
  }

  ngOnInit(): void {
    if (this.isDefaultActive) {
      this.isSelected = true;
    }
  }

  ngAfterViewInit(): void {
  }
}

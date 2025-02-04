import { Component, Input } from '@angular/core';

@Component({
  selector: 'sprk-ordered-list',
  template: `
    <ol [ngClass]="getClasses()" [attr.data-id]="idString">
      <ng-content></ng-content>
    </ol>
  `
})
export class SprkOrderedListComponent {
  @Input()
  listType: string;
  @Input()
  additionalClasses: string;
  @Input()
  idString: string;

  getClasses(): string {
    const classArray: string[] = ['sprk-b-List'];

    switch (this.listType) {
      case 'indented':
        classArray.push('sprk-b-List--indented');
        break;
      case 'bare':
        classArray.push('sprk-b-List--bare');
        break;
      default:
        break;
    }

    if (this.additionalClasses) {
      this.additionalClasses.split(' ').forEach(className => {
        classArray.push(className);
      });
    }

    return classArray.join(' ');
  }
  constructor() {}
}

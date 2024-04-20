import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]',
})
export class CustomLabelDirective implements OnInit {
  private htmlElement?: ElementRef<HTMLElement>;

  private _color: string = 'red';
  private _errors?: ValidationErrors | null;

  @Input() set color(value: string) {
    //console.log(value);
    this._color = value;
    this.setStyle();
  }
  @Input() set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    console.log(value);
    this.setErrorsMessage();
  }

  constructor(private el: ElementRef<HTMLElement>) {
    this.htmlElement = el;
    //console.log(el);
  }
  ngOnInit(): void {
    //console.log('ngOnInit de la directiva');
  }
  setStyle() {
    if (!this.htmlElement) return;
    this.htmlElement.nativeElement.style.color = this._color;
  }

  setErrorsMessage() {
    if (!this.htmlElement) return;
    if (!this._errors) {
      this.htmlElement.nativeElement.innerText = 'No hay errores';
    }

    const errors = Object.keys(this._errors || {});
    if (errors.length > 0) {
      for (let error of errors) {
        switch (error) {
          case 'required': 
            this.htmlElement.nativeElement.innerText = 'Es requerido';
            break;
          case 'minlength':
            this.htmlElement.nativeElement.innerText = 'Falta caracteres';
            break;
          case 'email':
            this.htmlElement.nativeElement.innerText = 'Revisa si es un email';
            break;
        }
      }
    }
    console.log(errors);
  }
}

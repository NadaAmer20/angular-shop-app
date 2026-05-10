import { Directive, ElementRef, HostListener, Input, input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlightCard]',
  standalone: true
})
export class HighlightCard  implements OnChanges{
 @Input() externalColor:string ='black'
 @Input('appHighlightCard') defaultColor:string = 'red'
constructor(private ele: ElementRef) {
  }
  ngOnChanges() {
    this.ele.nativeElement.style.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter') over() {
    this.ele.nativeElement.style.backgroundColor = this.externalColor;
  }

 @HostListener('mouseleave') out() {
    this.ele.nativeElement.style.backgroundColor = this.defaultColor;
  }
}

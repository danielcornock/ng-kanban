import { Directive, ElementRef, OnInit, HostListener } from '@angular/core';

@Directive({
  selector: '[appTextAreaAutoSize]'
})
export class TextAreaAutoSizeDirective implements OnInit {
  private _scrollHeight: number;
  private _clientHeight: number;
  private _element: any;

  @HostListener('keyup') onMouseLeave() {
    if (this._checkForHeightChange()) {
      this._setNewClientHeight();
    }
  }

  constructor(el: ElementRef) {
    this._element = el.nativeElement;
  }

  public ngOnInit(): void {
    this._setInitialHeights();
    if (this._isScrolling()) {
      this._setNewClientHeight();
    }
  }

  private _setInitialHeights(): void {
    this._clientHeight = this._element.clientHeight;
    this._scrollHeight = this._element.scrollHeight;
  }

  private _isScrolling(): boolean {
    return this._scrollHeight > this._clientHeight;
  }

  private _checkForHeightChange(): boolean {
    if (this._scrollHeight !== this._element.scrollHeight) {
      this._scrollHeight = this._element.scrollHeight;
      return true;
    }

    return false;
  }

  private _setNewClientHeight(): void {
    this._element.style.height = this._element.scrollHeight + 'px';
  }
}

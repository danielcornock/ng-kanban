import { TextAreaAutoSizeDirective } from './text-area-auto-size.directive';
import { ElementRef } from '@angular/core';

describe('TextAreaAutoSizeDirective', () => {
  let directive: TextAreaAutoSizeDirective, elementRef: ElementRef;

  describe('when the scroll height is bigger than the client height', () => {
    beforeEach(() => {
      elementRef = {
        nativeElement: {
          clientHeight: 400,
          scrollHeight: 600,
          style: {
            height: '200px'
          }
        }
      };

      directive = new TextAreaAutoSizeDirective(elementRef);
    });

    it('should set the styled height to match the scroll height', () => {
      expect(elementRef.nativeElement.style.height).toBe('600px');
    });

    describe('when the user types and the height has changed', () => {
      beforeEach(() => {
        elementRef.nativeElement.scrollHeight = 700;
        directive.onKeyup();
      });

      it('should update the height of the text area', () => {
        expect(elementRef.nativeElement.style.height).toBe('700px');
      });
    });

    describe('when the user types and the height has not changed', () => {
      beforeEach(() => {
        directive.onKeyup();
      });

      it('should not alter the size of the textarea', () => {
        expect(elementRef.nativeElement.style.height).toBe('600px');
      });
    });
  });

  describe('when the scroll height is not bigger than the client height', () => {
    beforeEach(() => {
      elementRef = {
        nativeElement: {
          clientHeight: 600,
          scrollHeight: 600,
          style: {
            height: '200px'
          }
        }
      };

      directive = new TextAreaAutoSizeDirective(elementRef);
    });

    it('should not set the styled height of the input', () => {
      expect(elementRef.nativeElement.style.height).toBe('200px');
    });
  });
});

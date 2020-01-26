import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

export class GetElement<T> {
  constructor(
    private readonly _fixture: ComponentFixture<T>,
    private readonly _componentCssPrefix: string
  ) {}

  public byCss(selector: string) {
    return this._fixture.debugElement.query(
      By.css(`.${this._componentCssPrefix}-${selector}`)
    );
  }

  public byDirective(directive: any) {
    return this._fixture.debugElement.query(By.directive(directive));
  }
}

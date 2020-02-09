import { Subject } from "rxjs";

export class ModalServiceStub {
  public openModal = jasmine.createSpy("openModal");
}

export const modalServiceReturn = (subject: Subject<any>) => {
  return {
    afterClosed: jasmine
      .createSpy("afterClosed")
      .and.returnValue(subject.asObservable())
  };
};

import { ModalDialog } from "./modal-dialog";
import { MatDialogRefStub } from "./mat-dialog-ref.stub";
import { MatDialogRef } from "@angular/material";
import { BoardCreateComponent } from "src/app/boards/components/board-create/board-create.component";

class TestModal extends ModalDialog<BoardCreateComponent> {
  constructor(matDialogRef: MatDialogRef<BoardCreateComponent>) {
    super(matDialogRef);
  }

  public accessFormatData(data): void {
    this._formatData(data);
  }
}
describe("ModalDialogComponent", () => {
  let component: TestModal, matDialogRef: MatDialogRef<any>;

  beforeEach(() => {
    matDialogRef = (new MatDialogRefStub() as Partial<
      MatDialogRef<any>
    >) as MatDialogRef<any>;
    component = new TestModal(matDialogRef);
  });

  describe("when closing the modal", () => {
    beforeEach(() => {
      component.closeModal();
    });

    it("should close the dialog", () => {
      expect(matDialogRef.close).toHaveBeenCalledWith();
    });
  });

  describe("when formatting the data", () => {
    beforeEach(() => {
      component.accessFormatData({
        data: {
          test: "test"
        }
      });
    });

    it("should set the dialog data to the pure data", () => {
      expect(component.dialogData).toEqual({ test: "test" });
    });
  });
});

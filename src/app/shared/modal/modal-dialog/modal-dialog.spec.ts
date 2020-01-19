import { ModalDialog } from "./modal-dialog";
import { MatDialogRefStub } from "./mat-dialog-ref.stub";
import { MatDialogRef } from "@angular/material";
import { BoardCreateComponent } from "src/app/boards/components/board-create/board-create.component";

class TestModal extends ModalDialog<BoardCreateComponent> {
  constructor(matDialogRef: MatDialogRef<BoardCreateComponent>, mockData) {
    super(matDialogRef, mockData);
  }
}
describe("ModalDialogComponent", () => {
  let component: TestModal, matDialogRef: MatDialogRef<any>;

  beforeEach(() => {
    matDialogRef = (new MatDialogRefStub() as Partial<
      MatDialogRef<any>
    >) as MatDialogRef<any>;

    const mockData = { data: { test: "test" } };
    component = new TestModal(matDialogRef, mockData);
  });

  it("should set the dialog data to the pure data", () => {
    expect(component.dialogData).toEqual({ test: "test" });
  });

  describe("when closing the modal", () => {
    beforeEach(() => {
      component.closeModal();
    });

    it("should close the dialog", () => {
      expect(matDialogRef.close).toHaveBeenCalledWith(undefined);
    });
  });
});

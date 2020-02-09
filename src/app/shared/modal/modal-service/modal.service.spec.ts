import { ModalService } from "./modal.service";
import { MatDialog } from "@angular/material";
import { EditStoryModalComponent } from "src/app/stories/components/edit-story-modal/edit-story-modal.component";
import { MatDialogStub } from "../modal-dialog/mat-dialog.stub";

describe("ModalService", () => {
  let service: ModalService, dependencies: { matDialog: MatDialog };

  beforeEach(() => {
    dependencies = {
      matDialog: (new MatDialogStub() as Partial<MatDialog>) as MatDialog
    };

    service = new ModalService(dependencies.matDialog);
  });

  describe("when opening a modal", () => {
    let result: any;

    beforeEach(() => {
      (dependencies.matDialog.open as jasmine.Spy).and.returnValue("modalRef");
      result = service.openModal(EditStoryModalComponent, { id: "test" });
    });

    it("should open the modal service with the provided config", () => {
      expect(dependencies.matDialog.open).toHaveBeenCalledWith(
        EditStoryModalComponent,
        {
          data: { data: { id: "test" } }
        }
      );
    });

    it("should return the modal reference", () => {
      expect(result.toBe("modalRef"));
    });
  });
});

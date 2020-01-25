import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FeatherModule } from "angular-feather";
import { Github } from "angular-feather/icons";
import { IconComponent } from "./icon/icon.component";

const icons = { Github };
@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule, IconComponent],
  declarations: [IconComponent]
})
export class IconsModule {}

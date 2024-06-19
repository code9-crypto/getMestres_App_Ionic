import { NgModule }  from "@angular/core"
import { TruncatePipe } from "./truncate/truncate.pipe";

@NgModule({
    imports: [TruncatePipe],
    exports: [TruncatePipe]
})

export class PipesModule{
    
}
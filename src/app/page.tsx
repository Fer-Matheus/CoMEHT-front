"use client"
import Choise from "@/components/choise";
import CommitMessage from "@/components/commitMessage";
import DiffContainer from "@/components/diffContainer";
import {DiffViewer} from "@/components/diffViewer";
import NavBar from "@/components/navbar";
import { Base } from "@/components/page/base";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { aspects, Aspects } from "@/models/aspect";
import { parsePatch } from "diff";

const rawDiff = ': "diff --git a/libsrc/ffdec_lib/src/com/jpexs/decompiler/flash/types/BUTTONCONDACTION.java b/libsrc/ffdec_lib/src/com/jpexs/decompiler/flash/types/BUTTONCONDACTION.java\nindex 7f890411a..a4cddf8b3 100644\n--- a/libsrc/ffdec_lib/src/com/jpexs/decompiler/flash/types/BUTTONCONDACTION.java\n+++ b/libsrc/ffdec_lib/src/com/jpexs/decompiler/flash/types/BUTTONCONDACTION.java\n@@ -27,6 +27,7 @@ import com.jpexs.decompiler.flash.helpers.GraphTextWriter;\n import com.jpexs.decompiler.flash.tags.Tag;\n import com.jpexs.decompiler.flash.tags.base.ASMSource;\n import com.jpexs.decompiler.flash.types.annotations.Conditional;\n+import com.jpexs.decompiler.flash.types.annotations.HideInRawEdit;\n import com.jpexs.decompiler.flash.types.annotations.Internal;\n import com.jpexs.decompiler.flash.types.annotations.SWFType;\n import com.jpexs.helpers.ByteArrayRange;\n@@ -154,7 +155,7 @@ public class BUTTONCONDACTION implements ASMSource, Serializable {\n     /**\n      * Actions to perform in byte array\n      */\n-    @Internal\n+    @HideInRawEdit\n     public ByteArrayRange actionBytes;\n \n     /**\ndiff --git a/src/com/jpexs/decompiler/flash/gui/PreviewPanel.java b/src/com/jpexs/decompiler/flash/gui/PreviewPanel.java\nindex 60171d41b..642b1c874 100644\n--- a/src/com/jpexs/decompiler/flash/gui/PreviewPanel.java\n+++ b/src/com/jpexs/decompiler/flash/gui/PreviewPanel.java\n@@ -1211,7 +1211,7 @@ public class PreviewPanel extends JPersistentSplitPane implements TagEditorPanel\n         tag.getTimelined().resetTimeline();\n         swf.assignClassesToSymbols();\n         swf.assignExportNamesToSymbols();\n-        mainPanel.repaintTree();\n+        mainPanel.refreshTree(swf);\n         mainPanel.setTagTreeSelectedNode(tag);\n         genericEditButton.setVisible(true);\n         genericSaveButton.setVisible(false);",'

export default function Home() {

  const d = parsePatch(rawDiff)

  const createCarouselItem = (aspect: Aspects) => {
    return (
      <CarouselItem className="">
        <Choise aspect={aspect.title} description={aspect.description} />
      </CarouselItem>
    );
  }
  return (
    <div>
      <Base>
        <NavBar link="github.com/Fer-Matheus" />
        <DiffContainer >
          <DiffViewer diffs={d}/>
          {/* <DiffViewer diff={d} /> */}
        </DiffContainer>

        <div className="mt-2 w-[80rem] h-[12rem] flex items-center">
          <CommitMessage
            title={"Commit message A"}
            message={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error aperiam praesentium sequi natus vitae! Quos facilis, cumque accusamus tempora architecto sunt laborum! Maxime aperiam consequatur omnis repudiandae? Odit, eveniet eaque!"} />
          <CommitMessage
            title={"Commit message B"}
            message={"Algo bem menor"} />
        </div>

        <div className="mt-2 w-[80rem] h-[12rem] flex items-center">
          <Carousel className="mt-2 w-[80rem] h-[12rem] ">
            <CarouselContent >
              {aspects.map(createCarouselItem)}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <footer className="mt-14 w-[20rem] h-[2rem] text-textColor flex items-end justify-around">
          <a href="">GESAD</a>
          <a href="">Almeida's paper</a>
        </footer>
      </Base>
    </div>
  );
}

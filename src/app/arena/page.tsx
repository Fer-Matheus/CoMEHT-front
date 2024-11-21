'use client'
import OkayHand from "@/assets/ok";
import { MoreInfo } from "@/components/choise";
import CommitMessage from "@/components/commitMessage";
import DiffContainer from "@/components/diffContainer";
import { DiffViewer } from "@/components/diffViewer";
import NavBar from "@/components/navbar";
import { Base } from "@/components/page/base";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { aspects, Aspects } from "@/models/aspect";
import { Options } from "@/models/result";
import { GetDuel } from "@/services/duel";
import { ParsedDiff, parsePatch } from "diff";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const rawDiff = ": \"diff --git a/src/main/java/com/google/devtools/build/lib/runtime/CommandEnvironment.java b/src/main/java/com/google/devtools/build/lib/runtime/CommandEnvironment.java\nindex 73c00d3fa2..1208995695 100644\n--- a/src/main/java/com/google/devtools/build/lib/runtime/CommandEnvironment.java\n+++ b/src/main/java/com/google/devtools/build/lib/runtime/CommandEnvironment.java\n@@ -166,10 +166,10 @@ public final class CommandEnvironment {\n   }\n \n   /**\n-   * Return an ordered version of the client environment restricted to those variables\n-   * whitelisted by the command-line options to be inheritable by actions.\n+   * Return an ordered version of the client environment restricted to those variables whitelisted\n+   * by the command-line options to be inheritable by actions.\n    */\n-  private Map<String, String> getCommandlineWhitelistedClientEnv() {\n+  public Map<String, String> getWhitelistedClientEnv() {\n     Map<String, String> visibleEnv = new TreeMap<>();\n     for (String var : visibleClientEnv) {\n       String value = clientEnv.get(var);\n@@ -426,7 +426,7 @@ public final class CommandEnvironment {\n         getCommandId(),\n         // TODO(bazel-team): this optimization disallows rule-specified additional dependencies\n         // on the client environment!\n-        getCommandlineWhitelistedClientEnv(),\n+        getWhitelistedClientEnv(),\n         timestampGranularityMonitor);\n   }\n \ndiff --git a/src/main/java/com/google/devtools/build/lib/runtime/commands/InfoCommand.java b/src/main/java/com/google/devtools/build/lib/runtime/commands/InfoCommand.java\nindex 0d7fb6abab..b5e596fb88 100644\n--- a/src/main/java/com/google/devtools/build/lib/runtime/commands/InfoCommand.java\n+++ b/src/main/java/com/google/devtools/build/lib/runtime/commands/InfoCommand.java\n@@ -193,29 +193,31 @@ public class InfoCommand implements BlazeCommand {\n \n   static Map<String, InfoItem> getHardwiredInfoItemMap(OptionsProvider commandOptions,\n       String productName) {\n-    List<InfoItem> hardwiredInfoItems = ImmutableList.<InfoItem>of(\n-        new InfoItem.WorkspaceInfoItem(),\n-        new InfoItem.InstallBaseInfoItem(),\n-        new InfoItem.OutputBaseInfoItem(productName),\n-        new InfoItem.ExecutionRootInfoItem(),\n-        new InfoItem.OutputPathInfoItem(),\n-        new InfoItem.BlazeBinInfoItem(productName),\n-        new InfoItem.BlazeGenfilesInfoItem(productName),\n-        new InfoItem.BlazeTestlogsInfoItem(productName),\n-        new InfoItem.CommandLogInfoItem(),\n-        new InfoItem.MessageLogInfoItem(),\n-        new InfoItem.ReleaseInfoItem(productName),\n-        new InfoItem.ServerPidInfoItem(productName),\n-        new InfoItem.PackagePathInfoItem(commandOptions),\n-        new InfoItem.UsedHeapSizeInfoItem(),\n-        new InfoItem.UsedHeapSizeAfterGcInfoItem(),\n-        new InfoItem.CommitedHeapSizeInfoItem(),\n-        new InfoItem.MaxHeapSizeInfoItem(),\n-        new InfoItem.GcTimeInfoItem(),\n-        new InfoItem.GcCountInfoItem(),\n-        new InfoItem.DefaultsPackageInfoItem(),\n-        new InfoItem.BuildLanguageInfoItem(),\n-        new InfoItem.DefaultPackagePathInfoItem(commandOptions));\n+    List<InfoItem> hardwiredInfoItems =\n+        ImmutableList.<InfoItem>of(\n+            new InfoItem.WorkspaceInfoItem(),\n+            new InfoItem.InstallBaseInfoItem(),\n+            new InfoItem.OutputBaseInfoItem(productName),\n+            new InfoItem.ExecutionRootInfoItem(),\n+            new InfoItem.OutputPathInfoItem(),\n+            new InfoItem.ClientEnv(),\n+            new InfoItem.BlazeBinInfoItem(productName),\n+            new InfoItem.BlazeGenfilesInfoItem(productName),\n+            new InfoItem.BlazeTestlogsInfoItem(productName),\n+            new InfoItem.CommandLogInfoItem(),\n+            new InfoItem.MessageLogInfoItem(),\n+            new InfoItem.ReleaseInfoItem(productName),\n+            new InfoItem.ServerPidInfoItem(productName),\n+            new InfoItem.PackagePathInfoItem(commandOptions),\n+            new InfoItem.UsedHeapSizeInfoItem(),\n+            new InfoItem.UsedHeapSizeAfterGcInfoItem(),\n+            new InfoItem.CommitedHeapSizeInfoItem(),\n+            new InfoItem.MaxHeapSizeInfoItem(),\n+            new InfoItem.GcTimeInfoItem(),\n+            new InfoItem.GcCountInfoItem(),\n+            new InfoItem.DefaultsPackageInfoItem(),\n+            new InfoItem.BuildLanguageInfoItem(),\n+            new InfoItem.DefaultPackagePathInfoItem(commandOptions));\n     ImmutableMap.Builder<String, InfoItem> result = new ImmutableMap.Builder<>();\n     for (InfoItem item : hardwiredInfoItems) {\n       result.put(item.getName(), item);\ndiff --git a/src/main/java/com/google/devtools/build/lib/runtime/commands/InfoItem.java b/src/main/java/com/google/devtools/build/lib/runtime/commands/InfoItem.java\nindex e8dc77f352..e8836e554f 100644\n--- a/src/main/java/com/google/devtools/build/lib/runtime/commands/InfoItem.java\n+++ b/src/main/java/com/google/devtools/build/lib/runtime/commands/InfoItem.java\n@@ -46,6 +46,7 @@ import java.lang.management.ManagementFactory;\n import java.lang.management.MemoryMXBean;\n import java.lang.management.MemoryUsage;\n import java.util.Collection;\n+import java.util.Map;\n \n /**\n  * An item that is returned by <code>blaze info</code>.\n@@ -482,6 +483,29 @@ public abstract class InfoItem {\n     }\n   }\n \n+  /** Info item for the effective current client environment. */\n+  public static final class ClientEnv extends InfoItem {\n+    public ClientEnv() {\n+      super(\n+          \"client-env\",\n+          \"The specifications that need to be added to the project-specific rc file to freeze the\"\n+              + \" current client environment\",\n+          true);\n+    }\n+\n+    @Override\n+    public byte[] get(Supplier<BuildConfiguration> configurationSupplier, CommandEnvironment env)\n+        throws AbruptExitException {\n+      String result = \"\";\n+      for (Map.Entry<String, String> entry : env.getWhitelistedClientEnv().entrySet()) {\n+        // TODO(bazel-team): as the syntax of our rc-files does not support to express new-lines in\n+        // values, we produce syntax errors if the value of the entry contains a newline character.\n+        result += \"common --action_env=\" + entry.getKey() + \"=\" + entry.getValue() + \"\\n\";\n+      }\n+      return print(result);\n+    }\n+  }\n+\n   /**\n    * Info item for the default package. It is deprecated, it still works, when\n    * explicitly requested, but are not shown by default. It prints multi-line messages and thus\ndiff --git a/src/test/shell/integration/action_env_test.sh b/src/test/shell/integration/action_env_test.sh\nindex 017aa892d3..80976ed34b 100755\n--- a/src/test/shell/integration/action_env_test.sh\n+++ b/src/test/shell/integration/action_env_test.sh\n@@ -121,4 +121,26 @@ function test_latest_wins_env() {\n   expect_not_log \"FOO=foo\"\n }\n \n+function test_env_freezing() {\n+  cat > .${PRODUCT_NAME}rc <<EOF\n+common --action_env=FREEZE_TEST_FOO\n+common --action_env=FREEZE_TEST_BAR=is_fixed\n+common --action_env=FREEZE_TEST_BAZ=will_be_overridden\n+build --action_env=FREEZE_TEST_BUILD\n+EOF\n+\n+  export FREEZE_TEST_FOO=client_foo\n+  export FREEZE_TEST_BAR=client_bar\n+  export FREEZE_TEST_BAZ=client_baz\n+  export FREEZE_TEST_BUILD=client_build\n+\n+  $bazel info --action_env=FREEZE_TEST_BAZ client-env > $TEST_log\n+  expect_log \"common --action_env=FREEZE_TEST_FOO=client_foo\"\n+  expect_not_log \"FREEZE_TEST_BAR\"\n+  expect_log \"common --action_env=FREEZE_TEST_BAZ=client_baz\"\n+  expect_log \"common --action_env=FREEZE_TEST_BUILD=client_build\"\n+\n+  rm -f .${PRODUCT_NAME}rc\n+}\n+\n run_suite \"Tests for bazel's handling of environment variables in actions\"\","

export default function Home() {

  const router = useRouter()

  const [duel_id, setDuelId] = useState(0)
  const [messageA, setMessageA] = useState("")
  const [messageB, setMessageB] = useState("")
  const [index, setIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [options, setOptions] = useState<Options[]>([])
  const [currentAspect, setCurrentAspect] = useState<Aspects>(aspects[index])
  const [diffs, setDiffs] = useState<ParsedDiff[]>([])


  useEffect(() => {
    const getOneDuel = async () => {

      const duelReceived = await GetDuel();

      console.log("Duel received: ", duelReceived)
      console.log("Diff received: ", duelReceived.diff_content)

      const incommingDiffs = parsePatch(rawDiff)

      setDuelId(duelReceived.duel_id)
      setDiffs(incommingDiffs)
      setMessageA(duelReceived.commit_message_a)
      setMessageB(duelReceived.commit_message_b)
    }
    getOneDuel()
  }, [])

  const handleSendClick = async () => {
    // const response = await SendResults({ duel_id, options })
    router.refresh()
  }

  const handleCancelClick = async () => {
    options.forEach(_ => {
      options.pop()
    })
    setOptions(options)
    router.refresh()
  }

  const handlerClick = (option: string, initialTimer: number) => {

    const endTimer = new Date().getTime();
    const totalTimer = (endTimer - initialTimer) / (1000)
    console.log("Choice: ", option)
    console.log("timer: ", totalTimer)
    console.log("aspect: ", currentAspect.title)
    console.log("index: ", index)

    const currentOption: Options = {
      aspect: currentAspect.title,
      choise_time: totalTimer,
      chosen_option: option
    }

    options.push(currentOption)

    setOptions(options)

    console.log(options)

    const newIndex = index + 1

    if (index < 4) {
      setIndex(newIndex)
      setCurrentAspect(aspects[newIndex])
    }
    else {
      setIsModalOpen(true)
    }
  }

  function showOptions(option: Options) {
    return (
      <div className="w-[24rem] h-[2rem] flex items-center text-textColor border border-borderItems p-2">
        <div className="flex w-[30rem] h-[1rem]">
          <p className="w-[25rem]">Aspect: {option.aspect}</p>
          <p className="w-[25rem]">Your Choise: {option.chosen_option}</p>
        </div>
      </div>
    )
  }

  function createCarouselItem() {

    const initialTimer = new Date().getTime();

    return (
      <div className="w-full flex flex-col items-center">
        <div className="mt-5 w-[40rem] h-[5rem] flex items-center justify-center">
          <div className="w-1/2 h-[5rem] flex items-center justify-start">
            <p className="text-auto text-textColor">
              Choose the message that most looks like:
            </p>
          </div>
          <div className="w-1/2 h-[5rem] flex">
            <div className="w-[70%] m-3 ml-[1rem] rounded-md flex items-center justify-center text-white text-xl border-2 border-borderItems bg-[#3A506B]">
              {currentAspect.title}
            </div>
            <MoreInfo description={currentAspect.description} />
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <div className="mt-5 w-[40rem] h-[5rem] flex justify-between">
            <div className="ml-[4rem]">
              <div className="w-[15em] h-[3rem] flex text-textColor text-xl">
                <button className="flex items-center justify-center w-[80%] h-full rounded-md border-2 border-borderItems bg-itemsBackgroud transition-transform hover:scale-110 focus:outline-none"
                  onClick={() => handlerClick("A", initialTimer)}
                >
                  <p className="text-2xl mr-5">
                    {"A"} is more
                  </p>
                  <OkayHand />
                </button>
              </div>
            </div>
            <div className="-ml-[55px] ">
              <div className="w-[15em] h-[3rem] flex text-textColor text-xl">
                <button className="flex items-center justify-center w-[80%] h-full rounded-md border-2 border-borderItems bg-itemsBackgroud transition-transform hover:scale-110 focus:outline-none"
                  onClick={() => handlerClick("B", initialTimer)}
                >
                  <p className="text-2xl mr-5">
                    {"B"} is more
                  </p>
                  <OkayHand />
                </button>
              </div>
            </div>
          </div>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="bg-itemsBackgroud border-2 border-borderItems">
            <DialogHeader>
              <DialogTitle className="text-3xl">Confirm:</DialogTitle>
              <DialogDescription className="text-md text-textColor">
                <div>
                  {options.map(showOptions)}
                  <div className="mt-5 flex justify-around text-2xl">
                    <button className="bg-[#3A506B] w-[10rem] h-[2.5rem] rounded-xl" onClick={handleSendClick}>Confirm</button>
                    <button className="bg-[#3A506B] w-[10rem] h-[2.5rem] rounded-xl" onClick={handleCancelClick}>Cancel</button>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
  return (
    <div>
      <Base>
        <NavBar link="https://github.com/Fer-Matheus" />
        <DiffContainer >
          <DiffViewer diffs={diffs} />
        </DiffContainer>
        <div className="mt-2 w-[80rem] h-[12rem] flex items-center">
          <CommitMessage
            title={"Commit message A"}
            message={messageA} />
          <CommitMessage
            title={"Commit message B"}
            message={messageB} />
        </div>
        <div className="mt-2 w-[80rem] h-[12rem] flex items-center">
          {createCarouselItem()}
        </div>
        <footer className="mt-14 w-[20rem] h-[2rem] text-textColor flex items-end justify-around">
          <a href="https://gesaduece.com.br/">GESAD</a>
          <a href="">Paper</a>
        </footer>
      </Base>
    </div>
  );
}

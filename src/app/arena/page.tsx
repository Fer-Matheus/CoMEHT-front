'use client'
import OkayHand from "@/assets/ok";
import { MoreInfo } from "@/components/choice";
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

  const handleSendClick = () => {
    // const response = await SendResults({ duel_id, options })
    console.log("Função chamada <handleSendClick>")
    setIndex(0)
    setOptions([])
    setIsModalOpen(false)
    router.push("/arena")
  }

  const handleCancelClick = () => {
    setIndex(0)
    setOptions([])
    setIsModalOpen(false)
    router.push("/arena")
  }

  useEffect(() => {
    const getOneDuel = async () => {

      const duelReceived = await GetDuel();

      console.log("Duel received: ", duelReceived)
      console.log("Diff received: ", duelReceived.diff_content)

      const incommingDiffs = parsePatch(duelReceived.diff_content)

      setDuelId(duelReceived.duel_id)
      setDiffs(incommingDiffs)
      setMessageA(duelReceived.commit_message_a)
      setMessageB(duelReceived.commit_message_b)
    }
    getOneDuel()
  }, [])

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
              Which of the two messages do you think best fits with the aspect next to it?:
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
              {options.map(showOptions)}
              <div className="mt-5 flex justify-around text-2xl">
                <button className="bg-[#3A506B] w-[10rem] h-[2.5rem] rounded-xl" onClick={handleSendClick}>Confirm</button>
                <button className="bg-[#3A506B] w-[10rem] h-[2.5rem] rounded-xl" onClick={handleCancelClick}>Cancel</button>
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

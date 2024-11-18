"use client"
import OkayHand from "@/assets/ok";
import Choise, { MoreInfo } from "@/components/choise";
import CommitMessage from "@/components/commitMessage";
import DiffContainer from "@/components/diffContainer";
import { DiffViewer } from "@/components/diffViewer";
import NavBar from "@/components/navbar";
import { Base } from "@/components/page/base";
import { aspects, Aspects } from "@/models/aspect";
import { api } from "@/services/api";
import { Login } from "@/services/authentification";
import { GetDuel } from "@/services/duel";
import { setCookie } from "cookies-next";
import { ParsedDiff, parsePatch } from "diff";
import { useEffect, useState } from "react";


export default function Home() {

  const [messageA, setMessageA] = useState("")
  const [messageB, setMessageB] = useState("")
  const [index, setIndex] = useState(0)
  const [currentAspect, setCurrentAspect] = useState<Aspects>(aspects[index])
  const [diffs, setDiffs] = useState<ParsedDiff[]>()

  useEffect(() => {
    const login = async () => {
      const authorization = await Login({
        username: "Matheus",
        password: "uga"
      })

      if (authorization) {
        api.defaults.headers.common["Authorization"] = `Bearer ${authorization}`
      }

      setCookie("Authorization", authorization)
    }
    login()
  }, [])

  useEffect(() => {
    const getOneMatch = async () => {

      const duelReceived = await GetDuel();

      const incommingDiff = parsePatch(duelReceived.diff_content)
      setDiffs(incommingDiff)
      setMessageA(duelReceived.commit_message_a)
      setMessageB(duelReceived.commit_message_b)
    }
    getOneMatch()
  }, [])



  const handlerClick = (option: string, aspectTitle: string, initialTimer: number, index: number) => {

    const endTimer = new Date().getTime();
    const totalTimer = (endTimer - initialTimer) / (1000)
    console.log("Choice: ", option)
    console.log("timer: ", totalTimer)
    console.log("aspect: ", aspectTitle)
    console.log("index: ", index)
    const newIndex = index + 1

    if (newIndex > 4) {
      console.log("Seended!")
      setIndex(0)
      setCurrentAspect(aspects[0])
      return
    }

    setIndex(newIndex)
    setCurrentAspect(aspects[newIndex])
  }

  const createCarouselItem = (aspect: Aspects, index: number) => {

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
              {aspect.title}
            </div>
            <MoreInfo description={aspect.description} />
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <div className="mt-5 w-[40rem] h-[5rem] flex justify-between">
            <div className="ml-[4rem]">
              <div className="w-[15em] h-[3rem] flex text-textColor text-xl">
                <button className="flex items-center justify-center w-[80%] h-full rounded-md border-2 border-borderItems bg-itemsBackgroud transition-transform hover:scale-110 focus:outline-none"
                  onClick={() => handlerClick("A", aspect.title, initialTimer, index)}
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
                  onClick={() => handlerClick("B", aspect.title, initialTimer, index)}
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
          {createCarouselItem(currentAspect, index)}
        </div>
        <footer className="mt-14 w-[20rem] h-[2rem] text-textColor flex items-end justify-around">
          <a href="https://gesaduece.com.br/">GESAD</a>
          <a href="">Paper</a>
        </footer>
      </Base>
    </div>
  );
}

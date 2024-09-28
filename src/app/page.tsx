import Choise from "@/components/choise";
import CommitMessage from "@/components/commitMessage";
import DiffContainer from "@/components/diffContainer";
import NavBar from "@/components/navbar";
import { Base } from "@/components/page/base";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { aspects, Aspects } from "@/models/aspect";

export default function Home() {
  const createCarouselItem = (aspect: Aspects) => {
    return (
      <CarouselItem className="pl-[320px] ">
        <Choise aspect={aspect.title} description={aspect.description} />
      </CarouselItem>
    );
  }
  return (
    <div>
      <Base>

        <NavBar link="github.com/Fer-Matheus" />

        <DiffContainer>
          <div>

          </div>
        </DiffContainer>

        <div className="mt-2 w-[80rem] h-[12rem] flex items-center ">
          <CommitMessage
            title={"Commit message A"}
            message={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error aperiam praesentium sequi natus vitae! Quos facilis, cumque accusamus tempora architecto sunt laborum! Maxime aperiam consequatur omnis repudiandae? Odit, eveniet eaque!"} />
          <CommitMessage
            title={"Commit message B"}
            message={"Algo bem menor"} />
        </div>

        <div className="mt-2 w-[80rem] h-[12rem] flex items-center ">
          <Carousel>
            <CarouselContent className="mt-2 w-[80rem] h-[12rem] basis-3">
              {aspects.map(createCarouselItem)}
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
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

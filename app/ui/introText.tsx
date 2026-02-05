import "@/app/globals.css";
import VantaBackground from "./VantaBg";

export default function IntroText() {
  return (
    <div className={"font-gabarito flex flex-col justify-center w-full my-5 md:my-10 "}>
      <h1
        className="text-[18px] xs:text-[34px] mb-3 sm:text-[40px] md:text-[60px] lg:text-[80px] mx-auto w-fit text-center font-extrabold tracking-[0em] leading-[1.2] text-transparent "
        style={{
          background:
            "linear-gradient(to right, #238E8E 0%, #FFFFFF 30%, #FFFFFF 70%, #238E8E 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
      >
        Your Ultimate Guide to <br /> Ethiopian Orthodox Books
      </h1>
      <p className={"text-[10px] xs:text-[15px] sm:text-[20px] text-center "}>
        Explore books from the Ethiopian Orthodox Tewahedo Church <br /> by{" "}
        <span className="font-bold font-handlee text-[#238E8E]">theme</span>,{" "}
        <span className="font-bold font-handlee text-[#238E8E]">topic</span>, or{" "}
        <span className="font-bold font-handlee text-[#238E8E]">traditional genre</span>.
      </p>
    </div>
  );
}

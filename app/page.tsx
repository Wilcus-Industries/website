"use client";

import HeroBackground from "@/app/components/HeroBackground";
import WaitlistForm from "@/app/components/WaitlistForm";
import {FaArrowDown} from "react-icons/fa6";

function AppTitle({ name, url }: {
    name: string,
    url: string
}) {
    return (
        <div className={`hover:bg-foreground hover:text-background rounded px-2
                         transition-colors duration-300 cursor-pointer w-fit`}
             onClick={() => open(url)}>
            <h1 className={"xl:text-6xl md:text-4xl text-3xl font-thin"}>{name}</h1>
        </div>
    )
}

export default function Home() {
    return (
        <main className={"relative min-h-screen flex flex-col"}>
            <div className={"relative flex flex-col h-screen border-b-[0.5px] "}>
                <HeroBackground />
                <div className={"relative z-10 flex flex-col md:flex-row p-5 gap-3"}>
                    <div className={"flex flex-col items-start shrink-0"}>
                        <small className={"md:text-sm text-xs"}>
                            A partnership between <b><a target={"_blank"} href={"https://lucasmarta.com"}>Lucas Marta</a></b> and <b>
                            <a target={"_blank"} href={"https://www.williamchastain.com"}>William Chastain</a></b>
                        </small>
                        <h1 className={"xl:text-6xl md:text-4xl text-3xl font-bold font-sans"}>WILCUS INDUSTRIES</h1>
                        {/*<SocialLink icon={<FaGithub />} />*/}
                    </div>
                    <div className={"flex items-end flex-1 flex-row-reverse"}>
                        <div className={"flex flex-col items-end gap-2"}>
                            <AppTitle name={"THE COLLECTIVE"}
                                      url={"https://github.com/Wilcus-Industries/test-for-swe"} />
                            <AppTitle name={"LIMINAL"}
                                      url={"https://github.com/Wilcus-Industries/liminal"} />
                            <AppTitle name={"SONDERFI"}
                                      url={"https://sonderfi.net"} />
                        </div>
                    </div>
                </div>
                <div className={"relative z-50 flex-1 flex justify-center items-center flex-col gap-5"}>
                    <h1 className={"xl:text-8xl md:text-6xl text-4xl font-thin font-playfair text-center md:w-200 sm:w-100 w-90 h-fit py-5"}>
                        Smart tools and agentic solutions.
                    </h1>
                    <div className={"bg-foreground text-background w-75 h-20 flex items-center justify-center flex-col gap-2"}>
                        <h1 className={"text-4xl font-mono"}>
                            LEARN MORE
                        </h1>
                        <FaArrowDown />
                    </div>
                </div>
            </div>
            <div className={"h-screen flex flex-col"}>
                <div className={"flex xl:flex-row flex-col gap-5 border-b-[0.5px]"}>
                    <div className={"md:w-150 xl:ml-5"}>
                        <small className={"font-mono"}>HOME OF THE WORLDS FIRST</small>
                        <h1 className={"text-5xl font-bold"}>FULLY-AGENTIC SOFTWARE ENGINEERING TEAM.</h1>
                    </div>
                    <div className={"flex-1 flex flex-row items-center"}>
                        <h1 className={"font-thin font-mono xl:text-9xl text-[11vw] whitespace-nowrap leading-none"}>THE COLLECTIVE.</h1>
                    </div>
                </div>
                <div className={"relative flex-1 overflow-hidden"}>
                    <div className={"relative z-50 bg-background w-100 min-h-140 mx-auto my-5 text-xl p-3 flex flex-col gap-2"}>
                        <div className={"border-b-[0.5px] py-2"}>
                            <p className={"text-base text-center"}><b>The Collective</b> is a fully-agentic SWE team ready for anything you throw at it. Through research and special orchestration techniques, Wilcus Industries guarantees high-quality work.</p>
                        </div>
                        <div className={"flex-1"}>
                            <WaitlistForm />
                        </div>
                    </div>
                    <video
                        className={"absolute inset-0 w-full h-full object-cover"}
                        src={"/collective.mp4"}
                        ref={(el) => { if (el) el.playbackRate = 0.8; }}
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                </div>

            </div>
        </main>
    );
}

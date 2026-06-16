"use client";

import HeroBackground from "@/app/components/HeroBackground";
import WaitlistForm from "@/app/components/WaitlistForm";
import {FaArrowDown} from "react-icons/fa6";
import {useEffect, useRef} from "react";

function AppTitle({ name, url }: {
    name: string,
    url: string
}) {
    return (
        <a href={url} target={"_blank"} rel={"noopener noreferrer"}
           className={`hover:bg-foreground hover:text-background rounded px-2
                         transition-colors duration-300 cursor-pointer w-fit block`}>
            <h2 className={"xl:text-6xl md:text-4xl text-3xl font-thin"}>{name}</h2>
        </a>
    )
}

export default function Home() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.playbackRate = 1;

        // The clip is a below-the-fold decorative background. Defer its load + playback until
        // it scrolls into view so it never competes with the hero for bandwidth / LCP. With
        // preload="none" the first play() is also what triggers the download.
        const io = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        void video.play().catch(() => {});
                    } else {
                        video.pause();
                    }
                }
            },
            { threshold: 0.1 },
        );
        io.observe(video);
        return () => io.disconnect();
    }, []);

    return (
        <main className={"relative min-h-screen flex flex-col"}>
            <div className={"relative flex flex-col h-screen border-b-[0.5px] "}>
                <HeroBackground />
                <div className={"relative z-10 flex flex-col md:flex-row p-5 gap-3"}>
                    <div className={"flex flex-col items-start shrink-0"}>
                        <small className={"md:text-sm text-xs"}>
                            A partnership between <b><a target={"_blank"} rel={"noopener noreferrer"} href={"https://lucasmarta.com"}>Lucas Marta</a></b> and <b>
                            <a target={"_blank"} rel={"noopener noreferrer"} href={"https://www.williamchastain.com"}>William Chastain</a></b>
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
                    <h2 className={"xl:text-8xl md:text-6xl text-4xl font-thin font-playfair text-center md:w-200 sm:w-100 w-90 h-fit py-5"}>
                        Smart tools and agentic solutions.
                    </h2>
                    <div className={"bg-foreground text-background w-75 h-20 flex items-center justify-center flex-col gap-2"}>
                        <span className={"text-4xl font-mono"}>
                            LEARN MORE
                        </span>
                        <FaArrowDown />
                    </div>
                </div>
            </div>
            <div className={"h-screen flex flex-col"}>
                <div className={"flex xl:flex-row flex-col gap-5 border-b-[0.5px]"}>
                    <div className={"md:w-150 xl:ml-5"}>
                        <small className={"font-mono"}>HOME OF THE WORLDS FIRST</small>
                        <h2 className={"text-5xl font-bold"}>FULLY-AGENTIC SOFTWARE ENGINEERING TEAM.</h2>
                    </div>
                    <div className={"flex-1 flex flex-row items-center"}>
                        <span aria-hidden={"true"} className={"font-thin font-mono xl:text-9xl text-[11vw] whitespace-nowrap leading-none"}>THE COLLECTIVE.</span>
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
                        ref={videoRef}
                        className={"absolute inset-0 w-full h-full object-cover"}
                        src={"/collective.mp4"}
                        poster={"/collective-poster.jpg"}
                        preload={"none"}
                        aria-hidden={"true"}
                        loop
                        muted
                        playsInline
                    />
                </div>

            </div>
        </main>
    );
}

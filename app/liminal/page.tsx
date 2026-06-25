import type { Metadata } from "next";
import Image from "next/image";
import React from "react";
import {FaArrowDown, FaGithub} from "react-icons/fa6";

const liminalUrl = "https://liminal.wilcus.com";

export const metadata: Metadata = {
    metadataBase: new URL(liminalUrl),
    alternates: { canonical: liminalUrl },
};

function LinkButton({link, children} : {
    link: string,
    children: React.ReactNode,
}) {
    return (
        <a href={link}>
            <div className={`bg-foreground text-background px-3 py-1 
                             hover:bg-background hover:text-foreground
                             transition-colors duration-200 border-foreground
                             border-[0.5px]`}>
                {children}
            </div>
        </a>
    );
}

export default function Liminal() {
    return (
        <main className={"flex flex-col min-h-screen relative"}>
            <div className={"flex flex-1 flex-col justify-start items-center absolute bottom-100 w-full"}>
                <div className={"text-center flex flex-col items-center gap-5"}>
                    <Image
                        src={"/liminal_icon_dark.png"}
                        alt={"Liminal"}
                        width={512}
                        height={512}
                        priority
                        className={"lg:w-40 md:w-32 w-28 h-auto"}
                    />
                    <h1 className={"font-redaction-35 lg:text-9xl md:text-8xl text-7xl"}>
                        LIMINAL
                    </h1>
                    <small className={"font-redaction-35 lg:text-xl md:text-lg text-xs"}>
                        The game engine for agents.
                    </small>
                </div>
                <div className={"flex flex-row gap-5 mt-5"}>
                    <LinkButton link={""}>
                        <div className={"flex flex-row gap-1 items-center"}>
                            <FaArrowDown />
                            <h1 className={"font-redaction-70 font-bold"}>
                                Download
                            </h1>
                        </div>
                    </LinkButton>

                    <LinkButton link={""}>
                        <div className={"flex flex-row gap-1 items-center"}>
                            <FaGithub />
                            <h1 className={"font-redaction-70 font-bold"}>
                                GitHub
                            </h1>
                        </div>
                    </LinkButton>
                </div>
            </div>
            <div className={"absolute bottom-0 w-full flex justify-center translate-y-1/2 z-10"}>
                <Image
                    src={"/liminal_app.png"}
                    alt={"liminal"}
                    width={460}
                    height={300}
                    sizes={"(min-width: 1024px) 960px, (min-width: 768px) 720px, 480px"}
                    className={"w-120 md:w-180 lg:w-240 h-auto"}
                />
            </div>
        </main>
    )
}
import { useRef } from "react";
import { gsap, SplitText, ScrollTrigger } from "./gsap";
import SectionTitle from "./SectionTitle";
import TechnologyStack from "./TechnologyStack";
import useLayoutEffect from "./use-isomorpphic-layout-effect"

const About = () => {
    let el = useRef(null);
    let q = gsap.utils.selector(el);

    useLayoutEffect(() => {
        document.fonts.ready.then(function () {
            const split = new SplitText(q(".about-text"), {type:"lines,words", linesClass:"split-line"});

            const anim = gsap.from(split.lines,  {
                duration: 0.6,
                autoAlpha: 0,
                translateY: '100%',
                ease: 'circ.out',
                stagger: 0.05,
                paused: true
            });
    
            ScrollTrigger.create({
                trigger: '.about-text',
                start: 'top 80%',
                onEnter: () => anim.play(),
            }); 
        });
    }, [])

    return (
        <div ref={el} id="about" className="pb-40 w-full relative px-[10vw] 2xl:px-[12.5vw] bg-slate-100">
            <SectionTitle title="关于本项目"/>
            <p className="about-text text-neutral-900 text-[clamp(1.4rem,2vw,1.75rem)] text-center font-silka leading-[1.8] will-change-transform">本项目是一款基于 AIGC 的区块链游戏，玩家们可以沉浸在区块链和 AIGC 的奇妙体验中，通过小猫养成型游戏，感受它们的魅力。除此之外，为了帮助传统互联网开发者顺利过渡到 Web3.0 开发，我们精心准备了详尽的开发教程，让开发者们能够快速掌握全栈开发技能。</p>
            <TechnologyStack />
        </div>
    )
}

export default About;
import { useEffect, useRef } from "react";
import { MENULINKS, ARTICLES } from "../../constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ArticleTile from "./ArticleTile/ArticleTile";

const Articles = ({ isDesktop, clientHeight }) => {
  const sectionRef = useRef(null);
  const sectionTitleRef = useRef(null);

  useEffect(() => {
    let scrollTriggerInstance;
    let scrollTimeline;

    if (isDesktop) {
      [scrollTimeline, scrollTriggerInstance] = getArticlesScrollTrigger();
    } else {
      const wrapper = sectionRef.current.querySelector(".article-wrapper");
      wrapper.style.width = "calc(100vw - 1rem)";
      wrapper.style.overflowX = "scroll";
    }

    const [revealTimeline, revealTrigger] = getRevealScrollTrigger();

    return () => {
      scrollTriggerInstance?.kill();
      scrollTimeline?.kill();
      revealTrigger?.kill();
      revealTimeline?.progress(1);
    };
  }, [sectionRef, sectionTitleRef, isDesktop]);

  const getRevealScrollTrigger = () => {
    const revealTl = gsap.timeline({ defaults: { ease: "none" } });

    revealTl.from(
      sectionRef.current.querySelectorAll(".staggered-reveal"),
      { opacity: 0, duration: 0.5, stagger: 0.5 },
      "<"
    );

    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom bottom",
      scrub: 0,
      animation: revealTl,
    });

    return [revealTl, scrollTrigger];
  };

  const getArticlesScrollTrigger = () => {
    const timeline = gsap.timeline({ defaults: { ease: "none" } });
    const sidePadding =
      document.body.clientWidth -
      sectionRef.current.querySelector(".inner-container").clientWidth;
    const elementWidth =
      sidePadding +
      sectionRef.current.querySelector(".article-wrapper").clientWidth;
    sectionRef.current.style.width = `${elementWidth}px`;
    const width = window.innerWidth - elementWidth;
    const duration = `${(elementWidth / window.innerHeight) * 100}%`;

    timeline
      .to(sectionRef.current, { x: width })
      .to(sectionTitleRef.current, { x: -width }, "<");

    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: duration,
      scrub: 0,
      pin: true,
      animation: timeline,
      pinSpacing: "margin",
    });

    return [timeline, scrollTrigger];
  };

  return (
    <section
      ref={sectionRef}
      id={MENULINKS[2].ref}
      className={`${
        isDesktop && "min-h-screen"
      } w-full relative select-none section-container transform-gpu`}
    >
      <div className="flex flex-col justify-center h-full">
        <div
          className="flex flex-col inner-container transform-gpu"
          ref={sectionTitleRef}
        >
          <p className="uppercase tracking-widest text-gray-light-1 staggered-reveal">
            ARTICLES
          </p>
          <h1 className="text-6xl mt-2 font-medium text-gradient w-fit staggered-reveal">
            My Articles
          </h1>
          <h2 className="text-[1.65rem] font-medium md:max-w-lg max-w-sm mt-2 staggered-reveal">
            A few things I’ve written with passion, clarity, and curiosity.
          </h2>
        </div>
        <div
          className={`${
            clientHeight > 650 ? "mt-12" : "mt-8"
          } flex article-wrapper no-scrollbar w-fit staggered-reveal`}
        >
          {ARTICLES.map((article, index) => (
            <ArticleTile
              classes={
                index === ARTICLES.length - 1 ? "" : "mr-10 xs:mr-12 sm:mr-16"
              }
              article={article}
              key={article.title}
              isDesktop={isDesktop}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Articles; //Articles

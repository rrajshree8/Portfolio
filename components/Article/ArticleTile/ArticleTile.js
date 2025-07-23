import { useEffect, useRef } from "react";
import Image from "next/image";
import VanillaTilt from "vanilla-tilt";
import styles from './ArticleTile.module.scss'

const ArticleTile = ({ article, classes, isDesktop }) => {
  const { name, title, image, blurImage, description, gradient, url, tech } = article;
  
  // Use title as fallback for name (for API data)
  const displayName = name || title || "Article";

  const cardRef = useRef(null);

  const additionalClasses = classes || "";

  const options = {
    max: 10,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
    gyroscope: false,
  };

  useEffect(() => {
    if (cardRef.current) {
      VanillaTilt.init(cardRef.current, options);
    }
  }, []);

  return (
    <a
      href={url}
      className={`overflow-hidden rounded-3xl ${additionalClasses}`}
      ref={cardRef}
      target="_blank"
      rel="noreferrer"
      style={{
        maxWidth: isDesktop ? "calc(100vw - 2rem)" : "calc(100vw - 4rem)",
        flex: "1 0 auto",
        WebkitMaskImage: "-webkit-radial-gradient(white, black)",
      }}
    >
      <div
        className={`h-[25rem] w-[38rem] bg-black ${styles.ProjectTile} rounded-3xl relative p-6 flex flex-col justify-between max-w-full`}
        style={{
          background: `linear-gradient(90deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`,
        }}
      >
        <img
          src="/project-bg.svg"
          alt="project"
          className="absolute w-full h-full top-0 left-0 object-cover opacity-30"
        />
        <Image
          src={image}
          alt={displayName}
          fill
          placeholder="blur"
          blurDataURL={blurImage}
          className={`${styles.projectImage} z-0`}
        />
        <div
          className="absolute top-0 left-0 w-full h-20"
          style={{
            background: `linear-gradient(180deg, ${gradient[0]} 0%, rgba(0,0,0,0) 100%)`,
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-full h-32"
          style={{
            background: `linear-gradient(0deg, ${gradient[0]} 10%, rgba(0,0,0,0) 100%)`,
          }}
        />
        <h1
          className="font-medium text-3xl sm:text-4xl z-10 pl-2 transform-gpu"
          style={{ transform: "translateZ(3rem)" }}
        >
          {displayName}
        </h1>
        <div
          className={`
            ${styles.techIcons} w-1/2 h-full absolute left-24 top-0 sm:flex items-center hidden
          `}
        >
          <div className="flex flex-col pb-8">
            {tech.map((el, i) => (
              <img
                className={`${i % 2 === 0 ? "ml-16" : ""} mb-4`}
                src={`/projects/tech/${el}.svg`}
                alt={el}
                height={45}
                width={45}
                key={el}
              />
            ))}
          </div>
        </div>
        <h2
          className="text-lg z-10 tracking-wide font-medium text-white transform-gpu"
          style={{ transform: "translateZ(0.8rem)" }}
        >
          {description}
        </h2>
      </div>
    </a>
  );
};

export default ArticleTile;

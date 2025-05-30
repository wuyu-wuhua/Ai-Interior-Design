/* eslint-disable @next/next/no-img-element */
import React, { useMemo } from "react";
import { cn } from "../lib/utils";
import { Marquee } from "./magicui/marquee";

// 补充更多不重复图片，确保数量充足
const images = [
  "https://images.unsplash.com/photo-1729731321933-ff3057be4562?auto=format&fit=crop&w=400&q=75",
  "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=400&q=75",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=400&q=75",
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=400&q=75",
  "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=400&q=75",
  "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=400&q=75",
  "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=400&q=75",
  "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=400&q=75",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=75",
  "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?auto=format&fit=crop&w=400&q=75",
  "https://images.unsplash.com/photo-1740021838495-591f6a2d97fa?auto=format&fit=crop&w=400&q=75",
  "https://images.unsplash.com/photo-1576056377266-1513fa1bc0b1?auto=format&fit=crop&w=400&q=75",
  "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=400&q=75",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=75",
  "https://images.unsplash.com/photo-1616047677310-9d63fed273a1?auto=format&fit=crop&w=400&q=75",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=75",
  "https://images.unsplash.com/photo-1615875605825-5eb9bb5d52ac?auto=format&fit=crop&w=400&q=75",
  "https://images.unsplash.com/photo-1595446757331-795d866924a9?auto=format&fit=crop&w=400&q=75",
  "https://images.unsplash.com/photo-1737103515455-ce1751de5868?auto=format&fit=crop&w=400&q=75",
  "https://images.unsplash.com/photo-1514894780887-121968d00567?auto=format&fit=crop&w=400&q=75",
  "https://images.unsplash.com/photo-1738168362059-44a0b8a80b39?auto=format&fit=crop&w=400&q=75",
  "https://images.unsplash.com/photo-1738168246881-40f35f8aba0a?auto=format&fit=crop&w=400&q=75",
  "https://images.unsplash.com/photo-1742898958003-63577fe8776e?auto=format&fit=crop&w=400&q=75",
  "https://images.unsplash.com/photo-1741880893442-66f56ad8f3a4?auto=format&fit=crop&w=400&q=75",
  "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=75",
  "https://images.unsplash.com/photo-1566836610733-9e85b39215e9?auto=format&fit=crop&w=400&q=75",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=75",
  "https://images.unsplash.com/photo-1494203484021-3c454daf695d?auto=format&fit=crop&w=400&q=75",
  "https://images.unsplash.com/photo-1503174971373-b1f69850bded?auto=format&fit=crop&w=400&q=75",
  "https://images.unsplash.com/photo-1741482529173-c65a71df3a7b?auto=format&fit=crop&w=400&q=75"
];

// 响应式列数和图片尺寸
function useResponsiveColumns() {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile ? 4 : 8;
}

const ImageCard = ({ imgSrc, className }: { imgSrc: string; className?: string }) => (
  <div className={cn(
    "relative overflow-hidden bg-black flex items-center justify-center m-0 p-0",
    "h-48 w-40 sm:h-56 sm:w-48", // 电脑端更大
    className
  )}>
    <img className="h-full w-full object-cover m-0 p-0" alt="bg-marquee" src={imgSrc} loading="lazy" />
  </div>
);

export function AnimatedImageBackground() {
  const numColumns = useResponsiveColumns();
  // 每次渲染都重新打乱，避免每列完全一样
  const columnImages = useMemo(() => Array.from({ length: numColumns }, () => {
    let shuffled = images.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }), [numColumns]);

  return (
    <div className="fixed inset-0 -z-10 flex w-screen h-screen items-stretch justify-center overflow-hidden bg-black">
      <div
        className="flex flex-row w-full h-full gap-x-[1px] gap-y-2"
        style={{
          transform: "skewX(-25deg)",
        }}
      >
        {columnImages.map((colImgs, idx) => (
          <Marquee
            key={idx}
            vertical
            reverse={idx % 2 === 1}
            pauseOnHover={true}
            className={cn(
              "flex-1",
              "[--duration:100s]",
              "gap-y-2 gap-x-[1px]"
            )}
          >
            {colImgs.map((imgSrc, i) => (
              <ImageCard key={`${idx}-${i}`} imgSrc={imgSrc} />
            ))}
          </Marquee>
        ))}
      </div>
      <div 
        className="pointer-events-none absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.8) 15%, rgba(0,0,0,0.80) 50%, rgba(0,0,0,0.95) 100%, rgba(0,0,0,0.6) 110%, rgba(0,0,0,1) 130%)"
        }}
      ></div>
    </div>
  );
} 
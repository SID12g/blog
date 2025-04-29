"use client";

import { useState, useEffect } from "react";
import styles from "@/components/background/background.module.css";
import Image from "next/image";
import techBackground from "@/../public/backgrounds/tech_background.webp";
import articleBackground from "@/../public/backgrounds/article_background.webp";

interface TimeLeft {
  days: number;
}

export default function Background({ location }: { location: string }) {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date("2025-11-13") - +new Date();
    let timeLeft: TimeLeft = { days: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.background}>
      <Image
        className={styles.background_image}
        src={location === "tech" ? techBackground : articleBackground}
        width={1100}
        height={400}
        alt="background"
        placeholder="blur"
      />
      <div className={styles.message_wrap}>
        <p className={styles.message}>저 넓은 세상에서 큰 꿈을 펼쳐라</p>
        <p className={styles.message_author}>D-{timeLeft.days + 1}</p>
      </div>
    </div>
  );
}

// import styles from "@/components/background/background.module.css";
// import Image from "next/image";
// import techBackground from "@/../public/backgrounds/tech_background.jpg";
// import articleBackground from "@/../public/backgrounds/article_background.jpg";

// export default function Background({ location }: { location: string }) {
//   return (
//     <div className={styles.background}>
//       <Image
//         className={styles.background_image}
//         src={location === "tech" ? techBackground : articleBackground}
//         width={1100}
//         height={400}
//         alt="background"
//       />
//       <div className={styles.message_wrap}>
//         <p className={styles.message}>기록 증명</p>
//         <p className={styles.message_author}>sid12g</p>
//       </div>
//     </div>
//   );
// }

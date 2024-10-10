import styles from "@/components/background/background.module.css";
import Image from "next/image";
import techBackground from "@/../public/backgrounds/tech_background.jpg";
import articleBackground from "@/../public/backgrounds/article_background.jpg";

export default function Background({ location }: { location: string }) {
  return (
    <div className={styles.background}>
      <Image
        className={styles.background_image}
        src={location === "tech" ? techBackground : articleBackground}
        width={1100}
        height={400}
        alt="background"
      />
      <div className={styles.message_wrap}>
        <p className={styles.message}>기록 증명</p>
        <p className={styles.message_author}>sid12g</p>
      </div>
    </div>
  );
}

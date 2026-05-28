import { getBlurDataUrl } from "next-image-blur";
import Image from "next/image";
import Link from "next/link";

export default async function HeroSection() {
  const blurDataURL = await getBlurDataUrl("/background.webp");
  return (
    <Link href="https://www.youtube.com/watch?v=fYbEaJP2sBM" target="_blank">
      <Image
        src="/background.webp"
        alt="Background"
        placeholder="blur"
        blurDataURL={blurDataURL}
        width={544}
        height={240}
        quality={95}
        priority
        className="w-full h-auto"
      />
    </Link>
  );
}

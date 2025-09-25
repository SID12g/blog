import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <Link
      href="https://www.youtube.com/watch?v=DXvjwv_9yHU&list=LL&index=4"
      target="_blank"
    >
      <Image
        src="/background.png"
        alt="Background"
        width={544}
        height={240}
        quality={95}
        priority
        className="w-full h-auto"
      />
    </Link>
  );
}

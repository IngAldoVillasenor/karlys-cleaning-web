import Image from "next/image";
import styles from "./BrandLogo.module.css";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  decorative?: boolean;
  sizes?: string;
};

export default function BrandLogo({
  className = "",
  priority = false,
  decorative = false,
  sizes = "200px",
}: BrandLogoProps) {
  return (
    <span className={`${styles.logo} ${className}`}>
      <Image
        src="/5 Background Removed.png"
        alt={decorative ? "" : "Karly's Cleaning Services"}
        fill
        sizes={sizes}
        priority={priority}
      />
    </span>
  );
}

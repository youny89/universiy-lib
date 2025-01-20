import { cn } from "@/lib/utils";
import Image from "next/image";
import BookCoverSvg from "./book-cover-svg";

type BookCoverVariant = "extraSmall" | "small" | "medium" | "default" | "wide";

const variantStyles: Record<BookCoverVariant, string> = {
  extraSmall: "w-[30px] h-10",
  small: "w-[55px] h-[76px]",
  medium: "w-[144px] h-[200px]",
  default: "w-[114px] h-[170px] xs:w-[174px] xs:h-[240px]",
  wide: "w-[256px] h-[354px] xs:w-[300px] xs:h-[400px]",
};

interface Props {
  className?: string;
  variant?: BookCoverVariant;
  coverColor: string;
  coverImage: string;
}

const BookCover: React.FC<Props> = ({
  className,
  variant = "default",
  coverColor = "#012b48",
  coverImage = "https://placehold.co/400x600.png",
}) => {
  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        variantStyles[variant],
        className
      )}
    >
      <BookCoverSvg coverColor={coverColor} />
      <div
        className="absolute z-10"
        style={{ left: "12%", width: "87.5%", height: "88%" }}
      >
        <Image
          src={coverImage}
          alt="bookcover"
          fill
          className="rounded-sm object-fill"
        />
      </div>
    </div>
  );
};

export default BookCover;

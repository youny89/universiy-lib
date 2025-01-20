import { Book } from "@/types";
import Link from "next/link";
import BookCover from "./book-cover";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";

const BookCard: React.FC<Book> = ({
  id,
  title,
  genre,
  color,
  cover,
  isLoanedBooked,
}) => {
  return (
    <li className={cn(isLoanedBooked && "xs:w-52 w-full")}>
      <Link
        href={`/books/${id}`}
        className={cn(isLoanedBooked && "w-full flex flex-col items-center")}
      >
        <BookCover coverColor={color} coverImage={cover} />

        <div className={cn("mt-4", !isLoanedBooked && "max-w-28 xs:max-w-40")}>
          <p className=" mt-2 line-clamp-1 text-base font-semibold text-white xs:text-xl">
            {title}
          </p>
          <p className="mt-1 line-clamp-1 text-sm italic text-light-100 xs:text-base">
            {genre}
          </p>
        </div>

        {isLoanedBooked && (
          <div className="mt-3 w-full">
            <div className="flex items-center gap-x-1">
              <Image
                src={"/icons/calendar.svg"}
                alt="caleandar"
                width={18}
                height={18}
                className="object-cover"
              />
              <p className="text-light-100">11 dasy left to return</p>
            </div>
            <Button>Download receipt</Button>
          </div>
        )}
      </Link>
    </li>
  );
};

export default BookCard;

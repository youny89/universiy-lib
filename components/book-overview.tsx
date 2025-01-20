import { Book } from "@/types";
import Image from "next/image";
import { Button } from "./ui/button";
import BookCover from "./book-cover";

const BookOverview: React.FC<Book> = ({
  title,
  author,
  rating,
  total_copies,
  available_copies,
  description,
  color,
  cover,
  genre,
  id,
  summary,
  video,
  isLoanedBooked,
}) => {
  return (
    <section className="flex flex-col items-center gap-x-12 sm:gap-32 xl:flex-row xl:gap-8">
      <div className="flex flex-1 flex-col gap-5">
        <h1 className="text-5xl font-semibold text-white md:text-7xl">
          {title}{" "}
        </h1>

        <div className="mt-7 flex flex-row flex-wrap gap-4 text-xl text-light-100">
          <p>
            by <span className="font-semibold text-light-200">{author}</span>
          </p>
          <p>
            Category{" "}
            <span className="font-semibold text-light-200">{genre}</span>
          </p>
          <div className="flex flex-row gap-1">
            <Image src={"/icons/star.svg"} alt="star" width={22} height={22} />
            <p>{rating}</p>
          </div>
        </div>

        <div className="flex flex-row flex-wrap gap-4 mt-1">
          <p className="text-xl text-light-100">
            Total Books:{" "}
            <span className="ml-2 font-semibold text-primary">
              {total_copies}
            </span>
          </p>
          <p className="text-xl text-light-100">
            Available Books:{" "}
            <span className="ml-2 font-semibold text-primary">
              {available_copies}
            </span>
          </p>
        </div>

        <p className="mt-2 text-justify text-xl text-light-100">
          {description}
        </p>

        <Button className="mt-4 min-h-14 w-fit bg-primary text-dark-100 hover:bg-primary/90 max-md:w-full">
          <Image src={"/icons/book.svg"} alt="book" width={20} height={20} />
          <p className="font-bebas-neue">Borrow Book</p>
        </Button>
      </div>
      <div className="relative flex flex-1 jjustify-center ">
        <div className="relative">
          <BookCover
            variant="wide"
            className="z-10"
            coverColor={color}
            coverImage={cover}
          />
          <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
            <BookCover
              variant="wide"
              className="z-10"
              coverColor={color}
              coverImage={cover}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookOverview;

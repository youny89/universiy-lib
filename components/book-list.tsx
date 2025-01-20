import { Book } from "@/types";
import BookCard from "./book-card";

interface Props {
  title: string;
  books: Book[];
  containerClassName?: string;
}
const BookList: React.FC<Props> = ({ title, books, containerClassName }) => {
  return (
    <div className={containerClassName}>
      <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>
      <ul className="mt-10 flex flex-wrap gap-5 max-xs:justify-between xs:gap-10">
        {books.map((book) => (
          <BookCard key={book.title} {...book} />
        ))}
      </ul>
    </div>
  );
};

export default BookList;

import BookList from "@/components/book-list";
import BookOverview from "@/components/book-overview";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import { users } from "@/database/shcema";

const Home = async () => {
  const results = await db.select().from(users);
  console.log(JSON.stringify(results));
  return (
    <>
      <BookOverview {...sampleBooks[0]} />
      <BookList
        title="Latest Books"
        books={sampleBooks}
        containerClassName="mt-20"
      />
    </>
  );
};

export default Home;

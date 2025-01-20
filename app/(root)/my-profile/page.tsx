/**
 * Keep this page server rendered using server form.
 */

import { signOut } from "@/auth";
import BookList from "@/components/book-list";
import { Button } from "@/components/ui/button";
import { sampleBooks } from "@/constants";

const MyPage = () => {
  return (
    <>
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <Button>로그아웃</Button>
      </form>
      <BookList
        title="Borrowed Books"
        books={sampleBooks}
        containerClassName="mt-12"
      />
    </>
  );
};

export default MyPage;

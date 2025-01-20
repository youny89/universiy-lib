import React from "react";

const TooFastPage = () => {
  return (
    <main className="min-h-screen flex flex-col flex-1 bg-pattern bg-cover bg-dark-100 px-5 xs:px-10 md:px-16 items-center justify-center">
      <h1 className="font-bebas-neue text-5xl font-bold text-light-100">
        잠시만 기다려 주세요!
      </h1>
      <p className="mt-3 max-w-xl text-center text-light-400">
        너무 많은 요청이 발생했어요. 잠시 후 다시 시도해 주세요.
      </p>
    </main>
  );
};

export default TooFastPage;

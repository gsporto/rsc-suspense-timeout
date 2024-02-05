import { Suspense } from "react";

function fetchUsername() {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("Hello World!");
    }, 500);
  });
}

function race(promise: Promise<string>) {
  return Promise.any([
    promise,
    new Promise((resolve) => {
      setTimeout(() => {
        resolve("Hello World!");
      }, 1000);
    }),
  ]);
}

async function ComponentBase({ promise }: { promise: Promise<string> }) {
  const username = await promise;
  return <p>{username}</p>;
}

export default async function Home() {
  const promise = fetchUsername();
  await race(promise);
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ComponentBase promise={promise} />
    </Suspense>
  );
}

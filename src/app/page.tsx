import { Suspense } from "react";

function fetchUsername() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Hello World!");
    }, 500);
  });
}

function race(promise: Promise<unknown>) {
  return Promise.any([
    promise,
    new Promise((resolve) => {
      setTimeout(() => {
        resolve("Hello World!");
      }, 1000);
    }),
  ]);
}

function ComponentBase({ username }: { username: any }) {
  return <p>{username}</p>;
}

function SuspenseComponent({ username }: { username: any }) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ComponentBase username={username} />
    </Suspense>
  );
}

export default async function Home() {
  const username = fetchUsername();
  await race(username);
  return <SuspenseComponent username={username}/>;
}

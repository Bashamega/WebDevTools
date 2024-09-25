import Head from "next/head";
import Converter from "../components/Converter";

export default function Home() {
  return (
    <div>
      <Head>
        <title>JavaScript to TypeScript Converter</title>
        <meta
          name="description"
          content="Convert JavaScript code to TypeScript easily"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <Converter />
      </main>
    </div>
  );
}

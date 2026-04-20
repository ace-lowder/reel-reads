export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-dark text-white">
      <div className="mx-auto flex flex-col justify-center h-full w-full max-w-5xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-110 select-none">
          <div className="absolute top-0 w-full h-32 bg-[linear-gradient(0deg,#1a1d2000_0%,#1a1d20BB_50%,#1a1d20FF_100%)] z-10" />
          <div className="absolute w-32 h-full bg-[linear-gradient(-90deg,#1a1d2000_0%,#1a1d20CC_70%,#1a1d20FF_100%)] z-10" />
          <div className="absolute right-0 w-32 translate-x-px h-full bg-[linear-gradient(90deg,#1a1d2000_0%,#1a1d20CC_50%,#1a1d20FF_100%)] z-10" />
          <div className="absolute bottom-0 w-full h-32 bg-[linear-gradient(180deg,#1a1d2000_0%,#1a1d20CC_60%,#1a1d20FF_100%)] z-10" />
          <img
            src="https://cloudfront-us-east-1.images.arcpublishing.com/gray/AKAMLJABWRAB5EDEFJ55WMWMIA.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-top"
          />
        </div>
        {/* <div className="relative h-full left-1/2 -translate-x-1/2 top-0 w-[130vw] max-w-[1500px] bg-red-200" /> */}
        {/* <div className="absolute inset-x-0 bottom-0 h-[200px] bg-gradient-to-t from-dark to-transparent" /> */}

        <header className="z-10 flex items-center justify-between pt-2 px-4 lg:px-0">
          <a
            href="https://www.goodreads.com/user/show/200353032-ace"
            target="_blank"
            rel="noreferrer"
            className="flex cursor-pointer items-center gap-4 px-4 -translate-x-4 group"
          >
            <img
              src="/reelreads.svg"
              alt=""
              aria-hidden="true"
              className="h-14 w-14"
            />
            <span className="font-literata relative bottom-1 text-xl font-extrabold tracking-tight group-hover:pl-0.5 transition-all">
              <span className="text-primary">reel</span>reads
            </span>
          </a>

          <a
            href="https://www.google.com/maps/place/Irvine,+CA"
            target="_blank"
            rel="noreferrer"
            className="group uppercase text-sm font-bold text-ink py-4 px-4 translate-x-4"
          >
            a book club in{" "}
            <span className="transition-colors duration-150 group-hover:text-primary group-hover:underline">
              irvine
            </span>
          </a>
        </header>

        <div className="flex flex-col items-center justify-end mt-75 mb-16 text-center z-10">
          <div className="max-w-3xl">
            <h1 className="font-literata text-5xl font-extrabold tracking-tight">
              <span className="text-primary">reel</span>reads
            </h1>
            <p className="mt-3 text-base text-ink">
              Read the book. Watch the movie. Talk about it.
            </p>

            <form className="flex justify-center w-full mt-10 gap-3 h-12">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="enter your email"
                className="h-full w-full rounded-l-md bg-white/5 border border-white/15 px-4 placeholder:text-white/45 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="h-full rounded-r-md bg-primary px-5 text-xs font-extrabold uppercase cursor-pointer hover:opacity-80"
              >
                join
              </button>
            </form>
          </div>
        </div>

        <ul className="flex mx-auto px-4 w-fit max-w-screen flex-nowrap gap-3 overflow-x-scroll">
          {cards.map((card) => (
            <li key={card.title} className="w-37 shrink-0">
              <a
                href={card.href ?? "#"}
                target={card.href ? "_blank" : undefined}
                rel={card.href ? "noreferrer" : undefined}
                className="group block w-full"
              >
                <div className="relative aspect-2/3 rounded-md">
                  <img
                    src={card.poster}
                    alt={card.title}
                    className="absolute inset-0 h-full w-full object-cover transition-opacity duration-150 group-hover:opacity-0 rounded-md"
                  />
                  <img
                    src={card.book}
                    alt={`${card.title} book cover`}
                    className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-150 group-hover:opacity-100 rounded-md"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-md border border-ink/70 transition-all group-hover:border-3 group-hover:border-primary" />
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

const cards = [
  {
    title: "Wuthering Heights",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMGFlMTVkMDktZGMzMC00Yjk4LWFmNzEtNTFmMzM2YzM3MWFkXkEyXkFqcGc@._V1_FMjpg_UX1086_.jpg",
    book: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1478641029i/32929156.jpg",
    href: "https://www.goodreads.com/book/show/32929156-wuthering-heights",
  },
  {
    title: "Project Hail Mary",
    poster:
      "https://m.media-amazon.com/images/M/MV5BNTkwNzJiYTctNzI3NC00NjE1LTlhYjktY2Q5MTdmMWFmNzcxXkEyXkFqcGc@._V1_FMjpg_UY4096_.jpg",
    book: "https://m.media-amazon.com/images/I/51-1T3EnODL._SY445_SX342_FMwebp_.jpg",
    href: "https://www.goodreads.com/book/show/54493401-project-hail-mary",
  },
  {
    title: "Devil Wears Prada 2",
    poster:
      "https://m.media-amazon.com/images/M/MV5BZmM3ZDU3ODItZmY5Yi00OTQ2LWE5OTctZTA5NDBhMWJkOGY3XkEyXkFqcGc@._V1_FMjpg_UX1086_.jpg",
    book: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1440180884i/16130307.jpg",
    href: "https://www.goodreads.com/en/book/show/16130307-revenge-wears-prada",
  },
  {
    title: "Three Bags Full",
    poster:
      "https://m.media-amazon.com/images/M/MV5BZmI3NTc2N2MtOWMzMi00ZWQ4LTlhODQtZGVmMGNmN2IzNDZlXkEyXkFqcGc@._V1_FMjpg_UX1086_.jpg",
    book: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1320392670i/779463.jpg",
    href: "https://www.goodreads.com/book/show/779463.Three_Bags_Full",
  },
  {
    title: "The Odyssey",
    poster:
      "https://m.media-amazon.com/images/M/MV5BN2MyYjk2MWMtODMyZS00MDUyLWE0OGQtOTQ3MGY0MDE0ZjVmXkEyXkFqcGc@._V1_FMjpg_UX1086_.jpg",
    book: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1711957706i/1381.jpg",
    href: "https://www.goodreads.com/book/show/1381.The_Odyssey",
  },
  {
    title: "Sunrise on the Reaping",
    poster:
      "https://m.media-amazon.com/images/M/MV5BNGRkYmM2MjUtZTY4Yi00YTNhLTk1MDEtYTQ3YjFiOTljM2Y1XkEyXkFqcGc@._V1_FMjpg_UX1086_.jpg",
    book: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1729085500i/214331246.jpg",
    href: "http://goodreads.com/book/show/214331246-sunrise-on-the-reaping",
  },
];

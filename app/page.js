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

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-dark text-ink">
      <section className="mx-auto flex h-210 w-full max-w-5xl flex-col overflow-hidden px-4 py-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="/reelreads.svg"
              alt=""
              aria-hidden="true"
              className="h-14 w-14"
            />
            <span className="font-literata relative bottom-1 text-xl font-extrabold tracking-wide">
              <span className="text-primary">reel</span>reads
            </span>
          </div>
          <p className="uppercase font-bold text-sm text-[#778899]">
            a book club in irvine
          </p>
        </header>

        <div className="flex flex-1 flex-col items-center justify-end pb-12 text-center sm:pt-18 lg:pt-20">
          <div className="max-w-3xl">
            <h1 className="font-literata text-5xl font-extrabold tracking-tight">
              <span className="text-primary">reel</span>reads
            </h1>
            <p className="mt-3 text-base text-[#778899]">
              Read the book. Watch the movie. Talk about it.
            </p>

            <form className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="enter your email"
                className="h-12 w-full rounded-l-md border border-white/15 bg-dark px-4 text-sm text-ink placeholder:text-ink/45 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="h-12 rounded-r-md border-2 border-dark bg-primary px-5 text-xs font-extrabold uppercase text-dark cursor-pointer hover:opacity-80"
              >
                join
              </button>
            </form>
          </div>
        </div>

        <section className="relative left-1/2 w-screen -translate-x-1/2 pb-6 pt-10 sm:pt-12 lg:left-auto lg:w-full lg:translate-x-0">
          <ul className="flex w-full flex-nowrap gap-2 overflow-hidden lg:justify-between">
            {cards.map((card) => (
              <li key={card.title} className="w-37 shrink-0">
                <a
                  href={card.href ?? "#"}
                  target={card.href ? "_blank" : undefined}
                  rel={card.href ? "noreferrer" : undefined}
                  className="group block w-full"
                >
                  <div className="relative aspect-2/3 w-full overflow-hidden rounded-md bg-[#161b20]">
                    <img
                      src={card.poster}
                      alt={card.title}
                      className="absolute inset-0 h-full w-full object-cover transition-opacity duration-150 group-hover:opacity-0"
                    />
                    <img
                      src={card.book}
                      alt={`${card.title} book cover`}
                      className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-md border border-[#778899]/70 transition-[border-width,border-color] duration-300 group-hover:border-3 group-hover:border-primary" />
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}

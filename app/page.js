const cards = [
  { title: "Card 1", poster: "Poster 1", book: "Book 1" },
  { title: "Card 2", poster: "Poster 2", book: "Book 2" },
  { title: "Card 3", poster: "Poster 3", book: "Book 3" },
  { title: "Card 4", poster: "Poster 4", book: "Book 4" },
  { title: "Card 5", poster: "Poster 5", book: "Book 5" },
  { title: "Card 6", poster: "Poster 6", book: "Book 6" },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#1a1d20] text-white">
      <section className="mx-auto flex h-210 w-full max-w-5xl flex-col overflow-hidden px-4 py-4 sm:px-6 lg:px-8">
        {/* Navbar */}
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="/reelreads.svg"
              alt=""
              aria-hidden="true"
              className="h-16 w-16"
            />
            <span className="font-['Literata',_serif] text-2xl font-extrabold tracking-wide relative bottom-1">
              <span className="text-[#EFA950]">reel</span>reads
            </span>
          </div>
          <p className="uppercase font-bold text-sm text-[#778899]">
            a book club in irvine
          </p>
        </header>

        {/* Hero */}
        <div className="flex flex-1 flex-col items-center justify-end px-0 text-center sm:pt-18 lg:pt-20 pb-12">
          <div className="max-w-3xl">
            <h1 className="font-['Literata',_serif] text-5xl font-extrabold tracking-tight">
              <span className="text-[#EFA950]">reel</span>reads
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
                className="h-12 w-full rounded-l-md border border-white/15 bg-[#111418] px-4 text-sm text-white placeholder:text-white/45 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="h-12 rounded-r-md bg-[#EFA950] uppercase font-extrabold px-5 text-xs text-[#1a1d20] cursor-pointer hover:opacity-80 border-[#1a1d20] border-2"
              >
                join
              </button>
            </form>
          </div>
        </div>

        {/* Books */}
        <section className="relative left-1/2 w-screen -translate-x-1/2 pb-6 pt-10 sm:pt-12 lg:left-auto lg:w-full lg:translate-x-0">
          <ul className="flex w-full flex-nowrap gap-2 overflow-hidden lg:justify-between">
            {cards.map((card) => (
              <li key={card.title} className="flex w-35 shrink-0">
                <article className="group relative w-full overflow-hidden border border-white/12 bg-[#161b20]">
                  <div className="aspect-2/3 w-full bg-zinc-700 p-2 text-left text-[10px] font-medium text-white/85 transition-opacity duration-150 group-hover:opacity-0">
                    <div className="flex h-full items-end">{card.poster}</div>
                  </div>
                  <div className="absolute inset-0 flex aspect-2/3 w-full items-end bg-emerald-900 p-2 text-left text-[10px] font-medium text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                    <div>{card.book}</div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}

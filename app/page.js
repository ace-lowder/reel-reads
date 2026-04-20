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
    <main className="min-h-screen overflow-hidden bg-[#111418] text-white">
      <section className="mx-auto flex h-210 w-full max-w-5xl flex-col overflow-hidden px-4 py-4 sm:px-6 lg:px-8">
        {/* Navbar */}
        <header className="flex items-center gap-3">
          <div className="h-12 w-12 bg-white" aria-hidden="true" />
          <span className="text-sm font-medium tracking-wide">
            Reel Reads Club
          </span>
        </header>

        {/* Hero */}
        <div className="flex flex-1 flex-col items-center justify-end px-0 text-center sm:pt-18 lg:pt-20 pb-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Reel Reads Club
            </h1>
            <p className="mt-4 text-base text-white/70">
              Read the book. Watch the movie. Talk about it.
            </p>

            <form className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="h-12 w-full rounded-none border border-white/15 bg-[#111418] px-4 text-sm text-white placeholder:text-white/45 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="h-12 rounded-none bg-white px-5 text-sm font-medium text-[#111418]"
              >
                Join
              </button>
            </form>

            <p className="mt-4 text-sm text-white/55">
              Monthly meetups in Irvine for people in their 20s-30s
            </p>
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

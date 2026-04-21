"use client";

import { useEffect, useState } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Home() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [cardsLoaded, setCardsLoaded] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [submitting, setSubmitting] = useState(false);
  const [resultLocked, setResultLocked] = useState(false);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const heroImage = new Image();
    heroImage.onload = () => {
      if (!cancelled) {
        setHeroLoaded(true);
      }
    };
    heroImage.src =
      "https://a.ltrbxd.com/resized/sm/upload/6o/d7/gp/q6/5qzLJcwua0ETNYgGRIXu40i4lKK-1200-1200-675-675-crop-000000.jpg";

    const sources = cards.flatMap((card) => [card.poster, card.book]);
    let loaded = 0;

    const images = sources.map((src) => {
      const image = new Image();
      image.onload = () => {
        loaded += 1;
        if (!cancelled && loaded === sources.length) {
          setCardsLoaded(true);
        }
      };
      image.src = src;
      return image;
    });

    return () => {
      cancelled = true;
      images.forEach((image) => {
        image.onload = null;
      });
      heroImage.onload = null;
    };
  }, []);

  useEffect(() => {
    if (!cardsLoaded) {
      setRevealedCount(0);
      return;
    }

    let timerId;
    let index = 0;

    const revealNext = () => {
      index += 1;
      setRevealedCount(index);
      if (index < cards.length) {
        timerId = window.setTimeout(revealNext, index === 1 ? 60 : 120);
      }
    };

    timerId = window.setTimeout(revealNext, 0);

    return () => {
      if (timerId) {
        window.clearTimeout(timerId);
      }
    };
  }, [cardsLoaded]);

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!emailRegex.test(trimmedEmail)) {
      setSubmitStatus("error");
      setMessage("something went wrong. try again.");
      return;
    }

    setSubmitting(true);
    setMessage("");
    setIsModalOpen(false);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: trimmedEmail,
          website,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || "request_failed");
      }

      setSubmitStatus("success");
      setResultLocked(false);
      setMessage("check your email for the welcome note");
      setEmail("");
      setWebsite("");
    } catch {
      setSubmitStatus("error");
      setResultLocked(false);
      setMessage("something went wrong. try again.");
      setIsModalOpen(true);
    } finally {
      setSubmitting(false);
    }
  }

  const buttonDisabled = submitting || (submitStatus !== "idle" && !resultLocked);
  const buttonLabel =
    submitting ? (
      <span
        aria-hidden="true"
        className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-transparent"
      />
    ) : submitStatus === "success" ? (
      "✓"
    ) : submitStatus === "error" ? (
      "×"
    ) : (
      "join"
    );
  const buttonStyles =
    submitStatus === "success"
      ? "bg-emerald-500 hover:opacity-90"
      : submitStatus === "error"
        ? "bg-red-500 hover:opacity-90"
        : "bg-primary hover:opacity-80";
  return (
    <main className="min-h-screen overflow-hidden bg-dark text-white relative">
      <div className="mx-auto flex flex-col justify-center h-full w-full max-w-5xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-110 select-none">
          <div className="absolute top-0 w-full h-32 bg-[linear-gradient(0deg,#1a1d2000_0%,#1a1d20BB_50%,#1a1d20FF_100%)] z-10" />
          <div className="absolute w-32 h-full bg-[linear-gradient(-90deg,#1a1d2000_0%,#1a1d20CC_70%,#1a1d20FF_100%)] z-10" />
          <div className="absolute right-0 w-32 translate-x-px h-full bg-[linear-gradient(90deg,#1a1d2000_0%,#1a1d20CC_50%,#1a1d20FF_100%)] z-10" />
          <div className="absolute bottom-0 w-full h-32 bg-[linear-gradient(180deg,#1a1d2000_0%,#1a1d20CC_60%,#1a1d20FF_100%)] z-10" />
          <p className="absolute right-2 top-3/5 -rotate-90 z-10 text-ink/50">
            Project Hail Mary
          </p>
          <img
            src="https://cloudfront-us-east-1.images.arcpublishing.com/gray/AKAMLJABWRAB5EDEFJ55WMWMIA.jpg"
            alt=""
            aria-hidden="true"
            loading="eager"
            onLoad={() => setHeroLoaded(true)}
            className={`w-full h-full object-cover object-top transition-opacity duration-700 ${
              heroLoaded ? "opacity-100" : "opacity-0"
            }`}
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

        <div className="flex flex-col items-center justify-end mt-[300px] mb-16 text-center z-10">
          <div className="max-w-3xl">
            <h1 className="font-literata text-5xl font-extrabold tracking-tight">
              <span className="text-primary">reel</span>reads
            </h1>
            <p className="mt-3 text-base text-ink">
              Read the book. Watch the movie. Talk about it.
            </p>

            <form
              className="flex justify-center w-full mt-10 gap-3 h-12"
              onSubmit={handleSubmit}
            >
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="enter your email"
                className="h-full w-full rounded-l-md bg-white/5 border border-white/15 px-4 placeholder:text-white/45 focus:outline-none"
                autoComplete="email"
                value={email}
                disabled={submitting}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (submitStatus !== "idle") {
                    setSubmitStatus("idle");
                    setResultLocked(true);
                    setMessage("");
                    setIsModalOpen(false);
                  }
                }}
                required
              />
              <input
                aria-hidden="true"
                tabIndex={-1}
                autoComplete="off"
                className="absolute left-[-9999px] h-px w-px opacity-0"
                name="website"
                type="text"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
              />
              <button
                type="submit"
                disabled={buttonDisabled}
                className={`h-full rounded-r-md px-5 text-xs font-extrabold uppercase cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 transition-all ${buttonStyles}`}
              >
                {buttonLabel}
              </button>
            </form>
            <p
              className={`mt-3 text-sm min-h-5 ${
                submitStatus === "success" ? "text-primary" : "text-ink"
              }`}
              role={message ? "status" : undefined}
              aria-live="polite"
            >
              {message}
            </p>
          </div>
        </div>

        <ul className="flex mx-auto px-4 w-fit max-w-screen flex-nowrap gap-3 overflow-x-scroll">
          {cardsLoaded &&
            cards.map((card, index) => (
              <li
                key={card.title}
                className={`w-37 shrink-0 transition-all duration-500 ${
                  revealedCount > index
                    ? "translate-x-0 opacity-100"
                    : "translate-x-4 opacity-0"
                }`}
              >
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
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-opacity duration-150 group-hover:opacity-0 rounded-md"
                    />
                    <img
                      src={card.book}
                      alt={`${card.title} book cover`}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-150 group-hover:opacity-100 rounded-md"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-md border border-ink/70 transition-all group-hover:border-3 group-hover:border-primary" />
                  </div>
                </a>
              </li>
            ))}
        </ul>
      </div>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 transition-all duration-200 ${
          isModalOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsModalOpen(false)}
        aria-hidden={!isModalOpen}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="signup-error-title"
          className={`relative w-full max-w-md rounded-xl border border-white/10 bg-dark p-6 text-white shadow-2xl transition-all duration-200 ${
            isModalOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-2"
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            aria-label="Close dialog"
            className="absolute right-3 top-3 rounded-full p-2 text-ink transition-colors hover:text-white"
          >
            ×
          </button>
          <h2 id="signup-error-title" className="font-literata text-2xl font-extrabold text-white">
            something went wrong
          </h2>
          <p className="mt-3 text-sm leading-6 text-ink">
            Please email hello@reelreads.club if the sign up continues to fail
          </p>
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="mt-6 w-full rounded-md bg-primary px-4 py-3 text-sm font-extrabold uppercase text-dark transition-opacity hover:opacity-90"
          >
            Okay
          </button>
        </div>
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

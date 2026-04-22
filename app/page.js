"use client";

import { useEffect, useRef, useState } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Home() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [cardsLoaded, setCardsLoaded] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [submitting, setSubmitting] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const cardRailRef = useRef(null);

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

    const staggerMs = 120;
    const timers = cards.map((_, index) =>
      window.setTimeout(() => {
        setRevealedCount(index + 1);
      }, index * staggerMs),
    );

    return () => {
      timers.forEach((timerId) => window.clearTimeout(timerId));
    };
  }, [cardsLoaded]);

  useEffect(() => {
    const isTouchDevice = window.matchMedia(
      "(hover: none) and (pointer: coarse)",
    ).matches;

    if (!isTouchDevice) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!cardRailRef.current?.contains(event.target)) {
        setSelectedCardIndex(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  function handleCardClick(event, index, href) {
    const isTouchDevice = window.matchMedia(
      "(hover: none) and (pointer: coarse)",
    ).matches;

    if (!isTouchDevice || !href) {
      return;
    }

    if (selectedCardIndex !== index) {
      event.preventDefault();
      setSelectedCardIndex(index);
      return;
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!emailRegex.test(trimmedEmail)) {
      setSubmitStatus("idle");
      setModalType("error");
      setIsModalVisible(true);
      return;
    }

    setSubmitting(true);
    setModalType(null);
    setIsModalVisible(false);

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

      if (data?.result === "duplicate") {
        setSubmitStatus("idle");
        setModalType("duplicate");
        setIsModalVisible(true);
        return;
      }

      setSubmitStatus("success");
      setWebsite("");
    } catch {
      setSubmitStatus("idle");
      setModalType("error");
      setIsModalVisible(true);
    } finally {
      setSubmitting(false);
    }
  }

  function closeModal() {
    setIsModalVisible(false);
  }

  const buttonDisabled = submitting || submitStatus !== "idle";
  const buttonContent = submitting ? (
    <span
      aria-hidden="true"
      className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
    />
  ) : submitStatus === "success" ? (
    <span
      aria-hidden="true"
      className="inline-flex justify-center relative -left-px leading-none"
    >
      ✓
    </span>
  ) : (
    "join"
  );
  const buttonStyles =
    submitStatus === "success"
      ? "bg-emerald-500 hover:opacity-90"
      : "bg-primary hover:opacity-80";
  const buttonText = submitStatus === "success" ? "Check your email!" : "";
  return (
    <main className="min-h-screen overflow-hidden bg-dark text-white relative">
      <div className="mx-auto flex flex-col justify-center h-full w-full max-w-5xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-110 select-none">
          <div className="absolute top-0 w-full h-32 bg-[linear-gradient(0deg,#1a1d2000_0%,#1a1d20BB_50%,#1a1d20FF_100%)] z-10" />
          <div className="absolute w-32 h-full bg-[linear-gradient(-90deg,#1a1d2000_0%,#1a1d20CC_70%,#1a1d20FF_100%)] z-10" />
          <div className="absolute right-0 w-32 translate-x-px h-full bg-[linear-gradient(90deg,#1a1d2000_0%,#1a1d20CC_50%,#1a1d20FF_100%)] z-10" />
          <div className="absolute bottom-0 w-full h-32 bg-[linear-gradient(180deg,#1a1d2000_0%,#1a1d20CC_60%,#1a1d20FF_100%)] z-10" />
          <p className="absolute -right-4 top-1/2 sm:top-3/5 -rotate-90 z-10 text-ink/50 select-text">
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

        <header className="z-10 flex items-center justify-between pt-4 px-6">
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
            className="group uppercase text-sm font-bold text-ink py-2 px-4 translate-x-0 text-right"
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

            <div className="relative mt-10">
              <form
                className="flex justify-center w-full gap-3 h-12"
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
                      setIsModalVisible(false);
                    }
                  }}
                  required
                />
                <input
                  aria-hidden="true"
                  tabIndex={-1}
                  autoComplete="off"
                  className="absolute -left-2500 h-px w-px opacity-0"
                  name="website"
                  type="text"
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                />
                <button
                  type="submit"
                  disabled={buttonDisabled}
                  className={`h-full w-16 shrink-0 rounded-r-md px-4 text-xs font-extrabold uppercase cursor-pointer transition-all disabled:cursor-not-allowed disabled:opacity-70 ${buttonStyles}`}
                >
                  <span className="flex w-full items-center justify-center">
                    {buttonContent}
                  </span>
                </button>
              </form>
              <p
                className={`absolute left-1/2 top-full mt-3 -translate-x-1/2 text-sm text-primary transition-all duration-200 ${
                  buttonText
                    ? "translate-y-0 opacity-100"
                    : "translate-y-1 opacity-0"
                }`}
                role="status"
                aria-live="polite"
              >
                {buttonText || " "}
              </p>
            </div>
          </div>
        </div>

        <ul
          ref={cardRailRef}
          className="flex mx-auto px-4 w-fit max-w-screen flex-nowrap gap-3 overflow-x-scroll"
        >
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
                  onClick={(event) => handleCardClick(event, index, card.href)}
                >
                  <div className="relative aspect-2/3 rounded-md">
                    <img
                      src={card.poster}
                      alt={card.title}
                      loading="lazy"
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-150 rounded-md ${
                        selectedCardIndex === index
                          ? "opacity-0 group-hover:opacity-0"
                          : "opacity-100 group-hover:opacity-0"
                      }`}
                    />
                    <img
                      src={card.book}
                      alt={`${card.title} book cover`}
                      loading="lazy"
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-150 rounded-md ${
                        selectedCardIndex === index
                          ? "opacity-100 group-hover:opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    />
                    <div
                      className={`pointer-events-none absolute inset-0 rounded-md border transition-all ${
                        selectedCardIndex === index
                          ? "border-3 border-primary"
                          : "border border-ink/70 group-hover:border-3 group-hover:border-primary"
                      }`}
                    />
                  </div>
                </a>
              </li>
            ))}
        </ul>
      </div>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 transition-all duration-200 ${
          modalType && isModalVisible
            ? "opacity-100 pointer-events-auto"
            : modalType
              ? "opacity-0 pointer-events-auto"
              : "opacity-0 pointer-events-none"
        }`}
        onClick={closeModal}
        onTransitionEnd={(event) => {
          if (event.target !== event.currentTarget) {
            return;
          }

          if (!isModalVisible) {
            setModalType(null);
          }
        }}
        aria-hidden={!modalType}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="signup-error-title"
          className={`text-center relative w-full max-w-sm rounded-xl border border-white/10 bg-dark p-5 text-white shadow-2xl transition-all duration-200 ${
            modalType && isModalVisible
              ? "scale-100 translate-y-0"
              : "scale-95 translate-y-2"
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          {modalType === "duplicate" ? (
            <>
              <h2
                id="signup-error-title"
                className="font-literata text-xl font-extrabold text-white"
              >
                Having Trouble?
              </h2>
              <p className="mt-3 text-sm leading-6 text-ink">
                Looks like you already signed up. Check your spam or junk for
                the welcome email, or message us directly at{" "}
                <a
                  href="mailto:hello@reelreads.club"
                  className="text-blue-400! hover:underline!"
                >
                  hello@reelreads.club
                </a>
              </p>
            </>
          ) : modalType === "error" ? (
            <>
              <h2
                id="signup-error-title"
                className="font-literata text-xl font-extrabold text-white"
              >
                Something went wrong
              </h2>
              <p className="mt-3 text-sm leading-6 text-ink">
                An unexpected error has occurred. Please try again. Email me at{" "}
                <a
                  href="mailto:hello@reelreads.club"
                  className="text-blue-400! hover:underline!"
                >
                  hello@reelreads.club
                </a>{" "}
                if you see this again.
              </p>
            </>
          ) : null}
          <button
            type="button"
            onClick={closeModal}
            className="mt-6 w-full rounded-md bg-primary px-4 py-3 text-sm font-extrabold uppercase text-dark transition-all hover:bg-primary/70 hover:cursor-pointer"
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

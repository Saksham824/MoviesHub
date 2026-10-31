const contactEmail = "help@moviedownloader.com";

const topics = [
  "Movie or series suggestion",
  "Feedback",
  "Technical issue",
  "Something else",
];

const focusStyles =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

export default function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const topic = formData.get("topic");
    const message = formData.get("message");
    const subject = `${topic} — MovieHub`;
    const body = `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`;

    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main className="relative isolate overflow-hidden bg-slate-950 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_12%_12%,rgba(219,39,119,0.17),transparent_35%),radial-gradient(ellipse_at_88%_38%,rgba(99,102,241,0.14),transparent_34%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-linear-to-r from-transparent via-pink-300/40 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-8 sm:pb-24 sm:pt-16 lg:px-10 lg:pb-28 lg:pt-20">
        <header className="mx-auto mb-11 max-w-3xl text-center sm:mb-14">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-pink-300/15 bg-pink-300/6 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-pink-200 sm:text-xs">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-pink-300 shadow-[0_0_12px_rgba(249,168,212,0.9)]"
            />
            A note to the MovieHub team
          </div>
          <h1 className="text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="block">Every great story</span>
            <span className="mt-2 block bg-linear-to-r from-pink-300 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
              starts with a conversation.
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:mt-6 sm:text-base sm:leading-8">
            Have a recommendation, a question, or a thought about MovieHub?
            We’re listening. Tell us what’s on your mind.
          </p>
        </header>

        <div className="grid items-stretch gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:gap-7">
          <aside className="relative flex flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8 lg:p-9">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-fuchsia-500/10 blur-3xl"
            />

            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-300">
                Good things start here
              </p>
              <h2 className="mt-3 max-w-sm text-3xl font-bold leading-tight tracking-tight sm:text-[2.1rem]">
                What’s on your watchlist?
              </h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-slate-400 sm:text-base">
                The best movie nights start with a great recommendation. Share
                yours, help us improve, or just say hello.
              </p>

              <div className="relative mt-8 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/75 p-5 sm:mt-9 sm:p-6">
                <div
                  aria-hidden="true"
                  className="absolute -right-7 -top-10 size-40 rounded-full border border-pink-200/10"
                />
                <div
                  aria-hidden="true"
                  className="absolute -right-1 -top-4 size-28 rounded-full border border-indigo-200/10"
                />
                <div className="relative flex min-h-32 items-center gap-4 sm:min-h-36 sm:gap-5">
                  <div className="grid size-16 shrink-0 place-items-center rounded-2xl border border-pink-300/20 bg-linear-to-br from-pink-400/15 to-indigo-400/10 text-pink-200 shadow-[0_12px_40px_-18px_rgba(236,72,153,0.7)] sm:size-18">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 32 32"
                      fill="none"
                      className="size-8 sm:size-9"
                    >
                      <rect
                        x="5"
                        y="7"
                        width="22"
                        height="18"
                        rx="3"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                      <path
                        d="m5.5 11 5.2-3.7m2.8 3.7 5.2-3.7m2.8 3.7 5.2-3.7M5.5 21l5.2 3.7m2.8-3.7 5.2 3.7m2.8-3.7 5.2 3.7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path d="m14 13 6 3-6 3v-6Z" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="relative min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      For the love of movies
                    </p>
                    <p className="mt-2 text-lg font-semibold leading-snug text-white sm:text-xl">
                      Your next favorite could come from you.
                    </p>
                  </div>
                </div>
                <div className="relative mt-4 flex flex-wrap gap-2">
                  {["Recommendations", "Feedback", "Support"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-xs font-medium text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <a
              href={`mailto:${contactEmail}`}
              className={`group relative mt-5 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition duration-200 hover:border-pink-300/30 hover:bg-pink-300/5 motion-reduce:transition-none sm:mt-6 sm:p-5 ${focusStyles}`}
            >
              <span
                aria-hidden="true"
                className="grid size-11 shrink-0 place-items-center rounded-xl bg-pink-400/10 text-lg text-pink-200 ring-1 ring-inset ring-pink-300/15"
              >
                @
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-medium text-slate-400">
                  Prefer email?
                </span>
                <span className="mt-1 block break-all text-sm font-semibold text-white sm:text-base">
                  {contactEmail}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="text-lg text-slate-500 transition group-hover:translate-x-1 group-hover:text-pink-300 motion-reduce:transition-none"
              >
                →
              </span>
            </a>

            <p className="relative mt-auto pt-6 text-xs leading-5 text-slate-500">
              Made for movie lovers, by the MovieHub team.
            </p>
          </aside>

          <section className="rounded-[1.75rem] border border-white/10 bg-slate-900/65 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8 lg:p-9">
            <div className="mb-7 flex items-start justify-between gap-4 sm:mb-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-300">
                  Your turn
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                  Send us a message
                </h2>
                <p className="mt-2 max-w-lg text-sm leading-6 text-slate-400">
                  Fill in the details and your email app will open with everything
                  ready to send.
                </p>
              </div>
              <span
                aria-hidden="true"
                className="hidden size-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/4 text-lg text-indigo-200 sm:grid"
              >
                ✦
              </span>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. Alex Morgan"
                    className={`w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-white/20 focus:border-pink-300/50 focus:ring-4 focus:ring-pink-300/10 motion-reduce:transition-none ${focusStyles}`}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Email address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={`w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-white/20 focus:border-pink-300/50 focus:ring-4 focus:ring-pink-300/10 motion-reduce:transition-none ${focusStyles}`}
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-topic"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  What’s this about?
                </label>
                <select
                  id="contact-topic"
                  name="topic"
                  defaultValue=""
                  className={`w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3.5 text-sm text-white outline-none transition hover:border-white/20 focus:border-pink-300/50 focus:ring-4 focus:ring-pink-300/10 motion-reduce:transition-none ${focusStyles}`}
                  required
                >
                  <option value="" disabled>
                    Select a topic
                  </option>
                  {topics.map((topic) => (
                    <option key={topic}>{topic}</option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Your message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  placeholder="Tell us a little more..."
                  className={`w-full resize-y rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3.5 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 hover:border-white/20 focus:border-pink-300/50 focus:ring-4 focus:ring-pink-300/10 motion-reduce:transition-none ${focusStyles}`}
                  required
                />
              </div>

              <button
                type="submit"
                className={`group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-linear-to-r from-pink-500 via-fuchsia-500 to-indigo-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-950/30 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-fuchsia-950/40 motion-reduce:transition-none ${focusStyles}`}
              >
                Open your email app
                <span
                  aria-hidden="true"
                  className="transition group-hover:translate-x-1 motion-reduce:transition-none"
                >
                  →
                </span>
              </button>
              <p className="text-center text-xs leading-5 text-slate-500">
                Your email app will open. Nothing is sent until you review and
                confirm your message.
              </p>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}

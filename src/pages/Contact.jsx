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

    window.location.href = `mailto:help@moviedownloader.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main className="relative isolate overflow-hidden bg-slate-950 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_12%_8%,rgba(219,39,119,0.16),transparent_34%),radial-gradient(ellipse_at_88%_28%,rgba(99,102,241,0.16),transparent_32%)]"
      />

      <div className="mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:px-10 lg:pb-28 lg:pt-24">
        <header className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-pink-300/20 bg-pink-300/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-pink-200">
            <span aria-hidden="true" className="size-2 rounded-full bg-pink-300 shadow-[0_0_12px_rgba(249,168,212,0.9)]" />
            The MovieHub team
          </div>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            <span className="block">Every great story</span>
            <span className="mt-2 block bg-linear-to-r from-pink-300 via-fuchsia-300 to-blue-300 bg-clip-text text-transparent">
              starts with a conversation.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
            A movie recommendation, a bit of feedback, or a question about the site?
            We’re all ears. Send us a note and let’s make MovieHub even better.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
          <aside className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/75 p-7 shadow-2xl shadow-black/20 backdrop-blur sm:p-9">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-fuchsia-500/10 blur-3xl"
            />
            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-pink-300">
                Get in touch
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                We’d love to hear your take.
              </h2>
              <p className="mt-4 leading-7 text-slate-400">
                Tell us what’s on your mind. Pick the option that works best for
                you, or drop us a message using the form.
              </p>

              <div className="mt-9 space-y-4">
                <a
                  href="mailto:help@moviedownloader.com"
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition duration-200 hover:border-pink-300/30 hover:bg-pink-300/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-300"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-pink-400/10 text-xl text-pink-200 ring-1 ring-inset ring-pink-300/15" aria-hidden="true">
                    @
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm text-slate-400">Email us</span>
                    <span className="mt-1 block break-all font-semibold text-white">
                      help@moviedownloader.com
                    </span>
                  </span>
                  <span className="text-xl text-slate-500 transition group-hover:translate-x-1 group-hover:text-pink-300" aria-hidden="true">
                    →
                  </span>
                </a>

                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-indigo-400/10 text-xl text-indigo-200 ring-1 ring-inset ring-indigo-300/15" aria-hidden="true">
                    ✦
                  </span>
                  <span>
                    <span className="block text-sm text-slate-400">Have a movie pick?</span>
                    <span className="mt-1 block font-semibold text-white">
                      Send us your next favorite
                    </span>
                  </span>
                </div>
              </div>

              <div className="mt-9 border-t border-white/10 pt-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  A few things you can send our way
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Movie suggestions", "Feedback", "Site support"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-slate-950/50 px-3 py-1.5 text-xs font-medium text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <section className="rounded-3xl border border-white/10 bg-white/6 p-6 shadow-2xl shadow-black/20 backdrop-blur sm:p-9 lg:p-10">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-300">
                Drop us a line
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                Send a message
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Fill in the details below and your email app will open with your
                message ready to send.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-slate-200">
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. Alex Morgan"
                    className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 hover:border-white/20 focus:border-pink-300/60 focus:ring-4 focus:ring-pink-300/10"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-slate-200">
                    Email address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 hover:border-white/20 focus:border-pink-300/60 focus:ring-4 focus:ring-pink-300/10"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-topic" className="mb-2 block text-sm font-medium text-slate-200">
                  What’s this about?
                </label>
                <select
                  id="contact-topic"
                  name="topic"
                  defaultValue=""
                  className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition hover:border-white/20 focus:border-pink-300/60 focus:ring-4 focus:ring-pink-300/10"
                  required
                >
                  <option value="" disabled>Select a topic</option>
                  <option>Movie or series suggestion</option>
                  <option>Feedback</option>
                  <option>Technical issue</option>
                  <option>Something else</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-slate-200">
                  Your message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  placeholder="Tell us a little more..."
                  className="w-full resize-y rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 hover:border-white/20 focus:border-pink-300/60 focus:ring-4 focus:ring-pink-300/10"
                  required
                />
              </div>

              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-pink-500 via-fuchsia-500 to-indigo-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-fuchsia-950/30 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-fuchsia-950/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-300"
              >
                Send your message
                <span className="transition group-hover:translate-x-1" aria-hidden="true">→</span>
              </button>
              <p className="text-center text-xs leading-5 text-slate-500">
                This opens your default email app. Your message won’t be sent until
                you confirm it there.
              </p>
            </form>
          </section>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { icon: "01", title: "Tell us what you think", text: "Your feedback helps shape a better MovieHub." },
            { icon: "02", title: "Recommend a favorite", text: "Point us toward a film or series we should know." },
            { icon: "03", title: "We’re listening", text: "Questions and ideas are always welcome." },
          ].map((item) => (
            <div key={item.icon} className="flex gap-4 rounded-2xl border border-white/8 bg-white/3 p-5">
              <span className="pt-0.5 text-xs font-bold tracking-widest text-pink-300">{item.icon}</span>
              <div>
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

type PagePlaceholderProps = {
  title: string;
  description: string;
};

function PagePlaceholder({
  title,
  description,
}: PagePlaceholderProps) {
  return (
    <section className="p-5 text-white md:p-8">

      <div className="rounded-[28px] border border-white/20 bg-white/10 p-8 backdrop-blur-xl">

        <p className="text-sm font-semibold tracking-widest text-orange-400">
          TRIPSYNC
        </p>

        <h1 className="mt-4 text-3xl font-bold md:text-4xl">
          {title}
        </h1>

        <p className="mt-4 max-w-2xl text-white/60">
          {description}
        </p>

        <div className="mt-8 rounded-2xl border border-dashed border-white/20 p-8 text-center text-white/50">
          This page layout will be developed next.
        </div>

      </div>

    </section>
  );
}

export default PagePlaceholder;
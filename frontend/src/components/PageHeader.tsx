type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

function PageHeader({
  eyebrow,
  title,
  description,
}: PageHeaderProps) {
  return (
    <header className="mb-8">

      <p className="text-xs font-semibold tracking-[0.2em] text-orange-400">
        {eyebrow}
      </p>

      <h1 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
        {title}
      </h1>

      <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">
        {description}
      </p>

    </header>
  );
}

export default PageHeader;
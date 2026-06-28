interface Props {
  title: string;
  subtitle?: string;
  bgColor?: string;
}
export default function Hero({ title, subtitle, bgColor = "#fdf8f5" }: Props) {
  return (
    <section style={{ background: bgColor }} className="py-16 px-4 text-center">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-[var(--font-vidaloka)] text-4xl text-[#9b6745] mb-4">{title}</h1>
        {subtitle && <p className="text-[#666] text-lg leading-relaxed">{subtitle}</p>}
      </div>
    </section>
  );
}

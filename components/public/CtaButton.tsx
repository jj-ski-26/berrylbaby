import Link from "next/link";
interface Props { href: string; children: React.ReactNode; outline?: boolean }
export default function CtaButton({ href, children, outline }: Props) {
  return (
    <Link href={href} className={`inline-block px-7 py-3 rounded-full text-sm font-semibold transition ${outline ? "border-2 border-[#9b6745] text-[#9b6745] hover:bg-[#f5ede7]" : "bg-[#9b6745] text-white hover:bg-[#7a5237]"}`}>
      {children}
    </Link>
  );
}

/**
 * Ilustração vetorial leve do hero (sem foto: o repositório não tem fotos
 * reais do serviço, e imagem ilustrativa não deve parecer portfólio).
 */
export function LpHeroArt({
  variant,
}: {
  variant: "blinds" | "curtains" | "repair";
}) {
  const slats = Array.from({ length: 11 }, (_, i) => i);

  return (
    <svg
      viewBox="0 0 400 420"
      role="img"
      aria-label={
        variant === "curtains"
          ? "Ilustração de janela com cortinas"
          : "Ilustração de janela com persiana"
      }
      className="h-auto w-full"
    >
      <defs>
        <linearGradient id="lp-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9eef8" />
          <stop offset="1" stopColor="#f3f9fc" />
        </linearGradient>
        <linearGradient id="lp-fabric" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#efe7da" />
          <stop offset="0.5" stopColor="#f8f3ea" />
          <stop offset="1" stopColor="#ebe2d3" />
        </linearGradient>
        <linearGradient id="lp-curtain" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#e6dccb" />
          <stop offset="0.25" stopColor="#f7f1e7" />
          <stop offset="0.5" stopColor="#e3d8c5" />
          <stop offset="0.75" stopColor="#f7f1e7" />
          <stop offset="1" stopColor="#e6dccb" />
        </linearGradient>
        <radialGradient id="lp-glow" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#3fbf86" stopOpacity="0.35" />
          <stop offset="1" stopColor="#3fbf86" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="200" cy="190" r="200" fill="url(#lp-glow)" />

      {/* Janela */}
      <rect x="62" y="40" width="276" height="330" rx="14" fill="#ffffff" opacity="0.14" />
      <rect x="78" y="56" width="244" height="298" rx="6" fill="url(#lp-sky)" />
      <line x1="200" y1="56" x2="200" y2="354" stroke="#ffffff" strokeWidth="6" opacity="0.9" />
      <line x1="78" y1="205" x2="322" y2="205" stroke="#ffffff" strokeWidth="6" opacity="0.9" />

      {variant === "curtains" ? (
        <g>
          <rect x="56" y="34" width="288" height="8" rx="4" fill="#c9a77c" />
          <path
            d="M70 42 C 80 160, 66 260, 92 392 L 150 392 C 140 300, 150 170, 146 42 Z"
            fill="url(#lp-curtain)"
          />
          <path
            d="M330 42 C 320 160, 334 260, 308 392 L 250 392 C 260 300, 250 170, 254 42 Z"
            fill="url(#lp-curtain)"
          />
          <path d="M98 50 C 104 180, 98 280, 112 386" stroke="#d8cbb4" strokeWidth="3" fill="none" />
          <path d="M124 50 C 128 180, 124 290, 132 386" stroke="#d8cbb4" strokeWidth="3" fill="none" />
          <path d="M302 50 C 296 180, 302 280, 288 386" stroke="#d8cbb4" strokeWidth="3" fill="none" />
          <path d="M276 50 C 272 180, 276 290, 268 386" stroke="#d8cbb4" strokeWidth="3" fill="none" />
        </g>
      ) : (
        <g>
          <rect x="66" y="40" width="268" height="16" rx="8" fill="#e9dfcf" />
          {slats.map((i) => (
            <g key={i}>
              <rect
                x="80"
                y={60 + i * 20}
                width="240"
                height="16"
                rx="3"
                fill="url(#lp-fabric)"
              />
              <rect x="80" y={73 + i * 20} width="240" height="3" fill="#d9ccb7" opacity="0.7" />
            </g>
          ))}
          <rect x="86" y="282" width="228" height="8" rx="4" fill="#c9b79c" />
          <line x1="306" y1="56" x2="306" y2="330" stroke="#b8a68a" strokeWidth="2" strokeDasharray="2 4" />
          <circle cx="306" cy="334" r="5" fill="#b8a68a" />
        </g>
      )}

      {variant === "repair" ? (
        <g transform="translate(250 290)">
          <circle r="52" fill="#0f7a4a" />
          <circle r="52" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2" />
          <path
            d="M14.7 -18.7a14 14 0 0 0-18.9 17.4L-21 15.5a5 5 0 0 0 7 7L2.8 5.7a14 14 0 0 0 17.4-18.9l-8.8 8.8-6.7-1.6-1.6-6.7z"
            fill="#ffffff"
            transform="scale(1.35)"
          />
        </g>
      ) : (
        <g fill="#ffffff">
          <path d="M318 70 l5 13 13 5 -13 5 -5 13 -5 -13 -13 -5 13 -5z" opacity="0.95" />
          <path d="M92 300 l3.5 9 9 3.5 -9 3.5 -3.5 9 -3.5 -9 -9 -3.5 9 -3.5z" opacity="0.85" />
          <path d="M340 230 l2.5 6.5 6.5 2.5 -6.5 2.5 -2.5 6.5 -2.5 -6.5 -6.5 -2.5 6.5 -2.5z" opacity="0.8" />
          <g transform="translate(250 300)">
            <circle r="46" fill="#0f7a4a" />
            <path
              d="M-16 1 l10 10 22 -22"
              stroke="#ffffff"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </g>
        </g>
      )}
    </svg>
  );
}

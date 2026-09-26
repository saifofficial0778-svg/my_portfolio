/**
 * Lucide-react doesn't ship a LeetCode icon, so this is a small hand-drawn
 * mark in the same stroke style (rounded, 2px) as the rest of the icon set.
 */
export default function LeetCodeIcon({ size = 18, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M14 3 7 10.5a2.2 2.2 0 0 0 0 3l4.5 4.5a2.2 2.2 0 0 0 3 0L17 15.5" />
      <path d="M9 12.5h8" />
      <path d="M10 18.5 8.5 20" />
    </svg>
  )
}

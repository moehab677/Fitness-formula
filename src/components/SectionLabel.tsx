// Section eyebrow from the design: accent chip "02 — My story" followed by a fading rule.
// It is a paragraph, never a heading.
export function SectionLabel({ index, label, tag }: { index: number; label: string; tag?: string }) {
  return (
    <div className="reveal mb-[28px] flex items-center gap-[16px]">
      <p className="chip text-label-sm label-caps">
        {String(index).padStart(2, '0')} — {label}
      </p>
      <span aria-hidden="true" className="rule" />
      {tag && <span className="section-tag text-label-sm">{tag}</span>}
    </div>
  )
}

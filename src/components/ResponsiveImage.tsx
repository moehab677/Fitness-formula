import manifest from '../generated/image-manifest.json'

type ImageEntry = {
  width: number
  height: number
  sources?: Record<string, string[]>
  variants?: { mobile: ImageEntry; desktop: ImageEntry }
}
export function ResponsiveImage({
  assetKey,
  alt,
  sizes,
  priority = false,
  variant,
  className = 'h-auto w-full object-cover',
}: {
  assetKey: string
  alt: string
  sizes: string
  priority?: boolean
  variant?: 'mobile' | 'desktop'
  className?: string
}) {
  const entry = (manifest as Record<string, ImageEntry>)[assetKey]
  if (!entry) return null
  const mobile = entry.variants?.mobile ?? entry
  const desktop = entry.variants?.desktop ?? entry
  const selected = variant ? (entry.variants?.[variant] ?? entry) : desktop
  const srcSet = (image: ImageEntry, type: string) =>
    image.sources?.[type]
      ?.map((src) => `${src} ${src.match(/-(\d+)\.(?:avif|webp|jpeg|png)$/)?.[1] ?? image.width}w`)
      .join(', ')
  return (
    <picture>
      {entry.variants && (
        <>
          <source
            media="(max-width: 1199px)"
            type="image/avif"
            srcSet={srcSet(mobile, 'avif')}
            sizes={sizes}
          />
          <source
            media="(max-width: 1199px)"
            type="image/webp"
            srcSet={srcSet(mobile, 'webp')}
            sizes={sizes}
          />
        </>
      )}
      <source type="image/avif" srcSet={srcSet(desktop, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(desktop, 'webp')} sizes={sizes} />
      <img
        src={selected.sources?.jpeg?.at(-1) ?? selected.sources?.png?.[0]}
        alt={alt}
        width={selected.width}
        height={selected.height}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={className}
      />
    </picture>
  )
}

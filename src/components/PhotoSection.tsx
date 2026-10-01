import type { ReactNode } from 'react'
import { ResponsiveImage } from './ResponsiveImage'

// Photography rule (constitution v3.0.0):
// - The photo keeps its gradient-bordered frame from 721px and sits beside the text (hero:
//   text 7 / photo 5; story: photo 5 / text 7). Below 721px it becomes a full-bleed
//   background anchored to the top of the section and the copy starts below its clear upper
//   part (.photo-panel in globals.css). One image element serves both layouts, so the photo
//   is downloaded once. Text is always first in the DOM so the heading is read before the
//   photo; placement is logical, so RTL mirrors.
export function PhotoSection({
  id,
  photo,
  alt,
  order,
  aspect = 'portrait',
  className = 'section',
  eyebrow,
  photoOverlay,
  below,
  photoReflect = true,
  children,
}: {
  id: string
  photo: 'hero' | 'story'
  alt: string
  order: 'text-first' | 'photo-first'
  aspect?: 'portrait' | 'tall'
  className?: string
  /** Section label spanning both columns from 1200px; below it, it follows the photo. */
  eyebrow?: ReactNode
  photoOverlay?: ReactNode
  below?: ReactNode
  photoReflect?: boolean
  children: ReactNode
}) {
  const textFirst = order === 'text-first'
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={className}>
      <div className="container-canvas relative">
        <div
          data-photo-panel=""
          className={`photo-panel flex flex-col gap-y-[56px] lg:grid lg:items-center lg:gap-y-0 ${
            textFirst
              ? 'lg:grid-cols-[7fr_5fr] lg:gap-x-[64px]'
              : 'lg:grid-cols-[5fr_7fr] lg:gap-x-[80px]'
          }`}
        >
          {eyebrow && (
            <div
              className={`relative z-10 order-1 md:-mt-[40px] lg:order-first lg:col-span-full lg:mt-[0px] ${textFirst ? '' : 'lg:col-span-full'}`}
            >
              {eyebrow}
            </div>
          )}
          <div
            data-photo-copy=""
            className={`relative z-10 ${textFirst ? '' : 'order-3'} lg:mt-[0px] ${eyebrow ? '' : 'md:-mt-[40px]'} ${
              textFirst ? '' : 'lg:order-last'
            }`}
          >
            {children}
          </div>
          <div
            data-photo=""
            className={`photo-wrap photo-bleed photo-frame mobile-section-background ${photoReflect ? '' : 'no-reflect'} ${textFirst ? 'order-last' : 'order-2'} ${
              textFirst ? 'lg:order-last' : 'lg:order-first'
            }`}
          >
            <div
              className={`photo-inner relative h-full ${
                aspect === 'tall' ? 'aspect-[3/4]' : 'aspect-[4/5]'
              }`}
            >
              <div className="photo-placeholder">
                <ResponsiveImage
                  assetKey={photo}
                  alt={alt}
                  sizes="(min-width: 1200px) 40vw, 100vw"
                  priority={photo === 'hero'}
                  className="photo-image"
                />
                <span className="scanline" aria-hidden="true" />
              </div>
            </div>
            {photoOverlay}
          </div>
        </div>
        {below}
      </div>
    </section>
  )
}

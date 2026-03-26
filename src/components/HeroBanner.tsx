import { Rating } from '@/components/Rating'

type HeroBannerProps = {
  title?: string
  bgImage?: string
  year: string
  rating?: number
  genres?: string[]
  type?: 'movie' | 'series'
}

export const HeroBanner = ({
  title,
  bgImage = '',
  year,
  rating = 0.0,
  genres = [],
  type = 'movie',
}: HeroBannerProps) => {
  const typeLabel = type === 'movie' ? 'Movie' : 'Series'
  return (
    <div
      className="relative flex h-[80vh] w-full items-end overflow-hidden bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${bgImage})`,
      }}
    >
      {/* Overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-t from-black/80 via-black/50 to-black/10" />

      <div className="relative z-10 flex h-full w-2/5 flex-col justify-end gap-3 p-8">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-yellow-500">{typeLabel}</span>
          <Rating value={rating} />
        </div>
        <h1 className="font-title text-4xl leading-none font-bold text-balance text-white/80 uppercase md:text-5xl">
          {title}
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-white/70">{year}</span>
          {genres.length > 0 && (
            <div className="text-sm text-white/60">{genres.join(' / ')}</div>
          )}
        </div>
      </div>
    </div>
  )
}

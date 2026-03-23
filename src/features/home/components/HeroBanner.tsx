import { Rating } from '@/components/Rating'

type HeroBannerProps = {
  title?: string
  description?: string
  bgImage?: string
  rating?: number
  type: 'movie' | 'series'
}

export const HeroBanner = ({
  title,
  description,
  bgImage = '',
  rating = 0.0,
  type,
}: HeroBannerProps) => {
  const handleAddToList = () => {
    console.log(type, rating)
  }
  return (
    <div
      className="relative flex h-[80vh] w-full items-end overflow-hidden bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${bgImage})`,
      }}
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-t from-black/80 via-black/50 to-black/10" />
      <div className="relative z-10 flex h-full w-2/5 flex-col justify-end gap-4 p-8">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-yellow-500">Now Playing</span>
          <Rating value={rating} />
        </div>

        <h1 className="text-4xl font-bold text-white">{title}</h1>
        <p className="text-md text-white/80">{description}</p>
        <div className="flex gap-4">
          <button>Watch Trailer</button>
          <button onClick={() => handleAddToList()}>Add to List</button>
        </div>
      </div>
    </div>
  )
}

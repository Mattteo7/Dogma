import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import '../styles/style.css'
import slide1 from '../assets/images/slide-1.jpg'
import slide2 from '../assets/images/slide-2.webp'
import slide3 from '../assets/images/slide-3.jpg'
import slide4 from '../assets/images/slide-4.png'
import arrowLeft from '../assets/images/icons/arrow-left.svg'

export default function Hero() {
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null)
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const swiperRef = useRef<SwiperType | null>(null)

  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      const nav = swiperRef.current.params.navigation
      if (nav && typeof nav !== 'boolean') {
        nav.prevEl = prevRef.current
        nav.nextEl = nextRef.current
        swiperRef.current.navigation.destroy()
        swiperRef.current.navigation.init()
        swiperRef.current.navigation.update()
      }
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const width = rect.width
    if (x < width * 0.45) {
      setHoveredSide('left')
    } else if (x > width * 0.55) {
      setHoveredSide('right')
    } else {
      setHoveredSide(null)
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredSide(null)}
    >
      {/* Freccia sinistra */}
      <button
        ref={prevRef}
        className={`absolute p-0 appearance-none top-1/2 left-0 z-30 hidden -translate-y-1/2 cursor-pointer transition-transform duration-300 hover:scale-125 md:flex ${
          hoveredSide === 'left'
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      >
        <img src={arrowLeft} alt="" className="h-10 w-10" />
      </button>

      {/* Freccia destra */}
      <button
        ref={nextRef}
        className={`absolute top-1/2 right-0 z-30 hidden -translate-y-1/2 cursor-pointer transition-transform duration-300 hover:scale-125 md:flex ${
          hoveredSide === 'right'
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      >
        <img src={arrowLeft} alt="" className="h-10 w-10 rotate-180" />
      </button>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        modules={[Pagination, Navigation, Autoplay]}
      >
        <SwiperSlide>
          <Link to="/Home">
            <img
              src={slide1}
              alt="slide 1"
              className="block aspect-video w-full object-cover"
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/#">
            <img
              src={slide2}
              alt="slide 2"
              className="block aspect-video w-full object-cover"
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/#">
            <img
              src={slide3}
              alt="slide 3"
              className="block aspect-video w-full object-cover"
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/#">
            <img
              src={slide4}
              alt="slide 4"
              className="block aspect-video w-full object-cover object-top"
            />
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

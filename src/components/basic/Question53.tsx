import { useState, useEffect, useRef } from 'react'

type LazyImageProps = {
  src: string
  alt: string
}

function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true)
      }
    }, options)

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [options])

  return { ref, isIntersecting }
}

function LazyImage({ src, alt }: LazyImageProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
  })

  return (
    <div ref={ref} style={{ minHeight: '200px', background: '#f0f0f0' }}>
      {isIntersecting ? (
        <img src={src} alt={alt} style={{ width: '100%' }} />
      ) : (
        <p>Scroll to load image...</p>
      )}
    </div>
  )
}

export const Question53 = () => {
  return (
    <div>
      <h2>Lazy Loading Images</h2>
      <div style={{ height: '150vh' }}>
        <p>Scroll down to see images load</p>
      </div>
      <LazyImage src="https://picsum.photos/400/200?random=1" alt="Image 1" />
      <div style={{ height: '50vh' }} />
      <LazyImage src="https://picsum.photos/400/200?random=2" alt="Image 2" />
      <div style={{ height: '50vh' }} />
      <LazyImage src="https://picsum.photos/400/200?random=3" alt="Image 3" />
    </div>
  )
}

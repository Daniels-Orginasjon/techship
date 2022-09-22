import * as React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Image from 'next/image';

export default function SlideShow() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 5000);
        }
        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on('dragStarted', clearNextTimeout);
        slider.on('animationEnded', nextTimeout);
        slider.on('updated', nextTimeout);
      },
    ],
  );

  return (
    <>
      <div ref={sliderRef} className="keen-slider flex h-52 max-h-screen">
        <div className="keen-slider__slide">
          <Image src="/slideshow.png" alt="product" width={2550} height={210} />
        </div>
        <div className="keen-slider__slide">
          {' '}
          <Image
            src="/Slideshow2.png"
            alt="product"
            width={2550}
            height={210}
          />
        </div>
        <div className="keen-slider__slide">
          {' '}
          <Image
            src="/Slideshow3.png"
            alt="product"
            width={2550}
            height={210}
          />
        </div>
      </div>
    </>
  );
}

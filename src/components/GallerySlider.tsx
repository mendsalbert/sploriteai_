'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { variants } from '@/utils/animationVariants';
import Link from 'next/link';
import { Route } from '@/routers/types';
import YouTube from 'react-youtube';
export interface GallerySliderProps {
  className?: string;
  ratioClass?: string;
  uniqueID: string;
  href?: Route<string>;
  imageClass?: string;
  galleryClass?: string;
  navigation?: boolean;
  src?: any;
}

export default function GallerySlider({
  className = '',
  imageClass = '',
  ratioClass = '',
  uniqueID = 'uniqueID',
  galleryClass = 'rounded-xl',
  href = '/listing-stay-detail',
  navigation = true,
  src,
}: GallerySliderProps) {
  const [loaded, setLoaded] = useState(false);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const opts = {
    width: '100%',
    height: '400',
    playerVars: {
      autoplay: 0,
    },
  };
  return (
    <MotionConfig
      transition={{
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div className={`group/cardGallerySlider group relative ${className}`}>
        {/* Main image */}
        <div className={`w-full overflow-hidden ${galleryClass}`}>
          <Link href={href} className={`relative flex items-center justify-center ${ratioClass}`}>
            <AnimatePresence initial={false} custom={direction}>
              <motion.div key={index} custom={direction} variants={variants(200, 1)} initial='enter' animate='center' exit='exit' className='absolute inset-0'>
                {/* <Image
                  src={src || ""}
                  fill
                  alt="listing card gallery"
                  className={`object-cover ${imageClass}`}
                  onLoadingComplete={() => setLoaded(true)}
                  sizes="(max-width: 1025px) 100vw, 300px"
                /> */}
                <YouTube videoId={src} opts={opts} />
              </motion.div>
            </AnimatePresence>
          </Link>
        </div>

        {/* Buttons + bottom nav bar */}
      </div>
    </MotionConfig>
  );
}

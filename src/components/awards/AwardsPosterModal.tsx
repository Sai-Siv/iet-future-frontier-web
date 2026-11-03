import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ExternalLink, X } from 'lucide-react';

const POSTER_SRC = '/achievement_awards_2026.jpg';

interface AwardsPosterModalProps {
  open: boolean;
  onClose: () => void;
}

const AwardsPosterModal: React.FC<AwardsPosterModalProps> = ({ open, onClose }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    // Stop the page scrolling behind the poster, keeping the scrollbar's space so nothing shifts.
    // The lock goes on html because base.css sets overflow there, so body overflow would not stop the page.
    const html = document.documentElement;
    const { overflowY } = html.style;
    const { paddingRight } = document.body.style;
    const scrollbarWidth = window.innerWidth - html.clientWidth;
    html.style.overflowY = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      html.style.overflowY = overflowY;
      document.body.style.paddingRight = paddingRight;
    };
  }, [open, onClose]);

  // Rendered on the body because the page transition's transform would otherwise offset a fixed overlay.
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Achievement Awards 2026 poster"
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-[#a046b4]/40 bg-[#0a0a0a] shadow-[0_20px_60px_rgba(160,70,180,0.35)]"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close poster"
              className="absolute right-3 top-3 z-10 rounded-full bg-black/70 p-2 text-white transition-colors hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="h-5 w-5" />
            </button>

            <img
              src={POSTER_SRC}
              alt="IET Hyderabad Local Network Achievement Awards 2026. Student and Professional categories. Registration deadline 20 November 2026. Awards ceremony 5 December 2026 at VIT-AP University, Amaravati."
              width={1536}
              height={1024}
              className="block h-auto max-h-[calc(100dvh-7.5rem)] w-full bg-white object-contain"
            />

            <div className="flex flex-wrap items-center justify-center gap-3 p-3 sm:justify-between sm:px-5">
              <a
                href={POSTER_SRC}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-300 transition-colors hover:text-white"
              >
                <ExternalLink className="h-4 w-4" />
                View full size
              </a>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-700"
              >
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default AwardsPosterModal;

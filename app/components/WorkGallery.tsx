"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, MoveHorizontal, X, Expand } from "lucide-react";
import styles from "./WorkGallery.module.css";

const pairs = [
  {
    name: "Bathroom sink",
    before: "/gallery/before-1.jpeg",
    after: "/gallery/after-1.jpeg",
  },
  {
    name: "Shower",
    before: "/gallery/before-2.jpeg",
    after: "/gallery/after-2.jpeg",
  },
  {
    name: "Refrigerator",
    before: "/gallery/Fridge Before.jpeg",
    after: "/gallery/Fridge After.jpeg",
  },
];
const photos = [
  {
    src: "/gallery/Kitchen 2.jpeg",
    title: "Room to enjoy your home",
    category: "KITCHEN CARE",
    alt: "Clean kitchen counters and a wooden kitchen island",
  },
  {
    src: "/gallery/Tower 2.jpeg",
    title: "The finishing touches",
    category: "ATTENTION TO DETAIL",
    alt: "Clean built-in ovens with neatly arranged towels",
  },
  {
    src: "/gallery/Bathroom 7.jpeg",
    title: "A fresh start to your day",
    category: "BATHROOM CARE",
    alt: "Clean bathroom vanity, mirror, and sink",
  },
];
export default function WorkGallery() {
  const [pairIndex, setPairIndex] = useState(0);
  const [position, setPosition] = useState(50);
  const [photoIndex, setPhotoIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const pair = pairs[pairIndex];
  function movePhoto(direction: number) {
    setPhotoIndex(
      (index) => (index + direction + photos.length) % photos.length,
    );
  }
  return (
    <>
      <div className={styles.comparison}>
        <div className={styles.comparePhoto}>
          <Image
            src={pair.after}
            alt={pair.name + " after cleaning"}
            fill
            sizes="(max-width: 760px) 100vw, 55vw"
          />
          <div
            className={styles.beforeLayer}
            style={{ clipPath: "inset(0 " + (100 - position) + "% 0 0)" }}
          >
            <Image
              src={pair.before}
              alt={pair.name + " before cleaning"}
              fill
              sizes="(max-width: 760px) 100vw, 55vw"
            />
          </div>
          <span className={styles.beforeLabel}>Before</span>
          <span className={styles.afterLabel}>After</span>
          <div className={styles.divider} style={{ left: position + "%" }}>
            <span>
              <MoveHorizontal size={20} aria-hidden="true" />
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={position}
            onChange={(event) => setPosition(Number(event.target.value))}
            className={styles.slider}
            aria-label={
              "Compare " +
              pair.name.toLowerCase() +
              " before and after cleaning"
            }
            aria-valuetext={
              position + "% before, " + (100 - position) + "% after"
            }
          />
        </div>
        <div className={styles.compareCopy}>
          <span className="eyebrow">See it for yourself</span>
          <h3>
            A little attention.
            <br />A visible difference.
          </h3>
          <p>
            Explore a few before-and-after moments from our work. Same space, a
            fresh feeling.
          </p>
          <div
            className={styles.pairButtons}
            aria-label="Choose a cleaning comparison"
          >
            {pairs.map((item, index) => (
              <button
                key={item.name}
                type="button"
                aria-pressed={pairIndex === index}
                onClick={() => {
                  setPairIndex(index);
                  setPosition(50);
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
          <span className={styles.dragHint}>
            <MoveHorizontal size={16} aria-hidden="true" /> Slide to compare ·
            Arrow keys work too
          </span>
        </div>
      </div>
      <div className={styles.photos}>
        {photos.map((photo, index) => (
          <button
            type="button"
            key={photo.src}
            className={styles.photo}
            aria-label={"Enlarge photo: " + photo.title}
            onClick={() => {
              setPhotoIndex(index);
              dialog.current?.showModal();
            }}
          >
            <span className={styles.photoImage}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 760px) 100vw, 33vw"
              />
              <span className={styles.expand}>
                <Expand size={15} aria-hidden="true" />
              </span>
            </span>
            <span className={styles.photoCategory}>{photo.category}</span>
            <span className={styles.photoTitle}>{photo.title}</span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-label="Cleaning project photo"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            movePhoto(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            movePhoto(-1);
          }
        }}
      >
        <div className={styles.dialogInner}>
          <button
            type="button"
            className={styles.close}
            onClick={() => dialog.current?.close()}
            aria-label="Close photo"
          >
            <X size={24} />
          </button>
          <div className={styles.largeImage}>
            <Image
              src={photos[photoIndex].src}
              alt={photos[photoIndex].alt}
              fill
              sizes="90vw"
            />
          </div>
          <div className={styles.dialogCaption}>
            <button
              type="button"
              onClick={() => movePhoto(-1)}
              aria-label="Previous photo"
            >
              <ArrowLeft size={20} />
            </button>
            <span>
              {photos[photoIndex].title}
              <small>
                {photoIndex + 1} / {photos.length}
              </small>
            </span>
            <button
              type="button"
              onClick={() => movePhoto(1)}
              aria-label="Next photo"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

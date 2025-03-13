"use client";

import React, { useState } from 'react';
import styles from './slideshow.module.css'; // Import the CSS file

const Slideshow = () => {
    const images = [
        "./features1.gif",
        "./prototype.gif",
        "./features.jpg",
        "./features2.jpg",
        "./features3.jpg"
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + images.length) % images.length
        );
    };

    return (
        <div className={styles['slideshow-container']}>
            <img
                className={styles['slideshow-image']}
                src={images[currentIndex]}
                alt={`Slideshow image ${currentIndex + 1}`}
            />
            <div className={styles['navigation-buttons']}>
                <button onClick={prevImage}>Previous</button>
                <button onClick={nextImage}>Next</button>
            </div>
        </div>
    );
};

export default Slideshow;



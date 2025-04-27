'use client'

import Image from "next/image";
import loadingGif from "../../public/images/logos/loading.gif"

const Loading = () => {
    return (
        <div
            className="position-fixed top-0 start-0 w-100 vh-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 fade show"
            style={{ backdropFilter: 'blur(5px)', zIndex: '9999' }}
        >
            <Image
                src={loadingGif}
                alt="Loading..."
                width={100}
                height={100}
                className="img-fluid"
            />
        </div>
    );
};

export default Loading;

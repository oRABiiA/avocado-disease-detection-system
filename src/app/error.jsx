"use client";

import { useEffect } from "react";
import Link from "next/link";

const Error = ({ error, reset }) => {
  useEffect(() => {
    console.error("Error: ", error);
  }, [error]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light p-4">
      <h1 className="display-4 text-danger mb-3">Oops! Something went wrong.</h1>
      <p className="lead text-muted text-center mb-4">
        {error?.message || "An unexpected error occurred."}
      </p>
      <div className="d-flex gap-3">
        {/* Uncomment this if you want a Try Again button */}
        {/* 
        <button className="btn btn-warning" onClick={() => reset()}>
          Try Again
        </button> 
        */}
        <Link href="/" className="btn btn-primary">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Error;

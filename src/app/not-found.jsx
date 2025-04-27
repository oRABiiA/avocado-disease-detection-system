import Link from "next/link";
import Image from "next/image";

const NotFound = () => {
    return (
        <div className="container text-center mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <Image
                        src="/images/logos/not-found.png"
                        alt="Not Found"
                        width={500}  // 👈 You must specify width
                        height={300} // 👈 And height
                        className="img-fluid mb-4"
                    />
                    <h2 className="display-4 text-danger">Oops! Page Not Found</h2>
                    <p className="lead text-muted">
                        Sorry, the page you are looking for does not exist.
                    </p>
                    <Link href="/" className="btn btn-primary btn-lg">
                        Back Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;

import AppIcon from "public/images/logos/AppIcon.png";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" legacyBehavior>
      <a className="d-flex align-items-center gap-2 fs-4 fw-semibold text-dark mb-4 text-decoration-none">
        <Image src={AppIcon} alt="logo" className="img-fluid" style={{ width: '50px', height: '50px' }} />
        AvoTech
      </a>
    </Link>
  );
};

export default Logo;

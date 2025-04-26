import Image from "next/image";
import AppIcon from "public/images/logos/AppIcon.png";

const Logo = ({ text }) => {
  return (
    <div className="d-flex align-items-center mb-4">
      <Image
        src={AppIcon}
        alt="logo"
        width={50}
        height={50}
        className="me-3"
      />
      <h3 className="mb-0">{text}</h3>
    </div>
  );
};

export default Logo;

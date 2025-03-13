import Image from "next/image";

const ShowImage = (props) => {

    const {imgPath, imgAlt, imgWidth, imgHeight} = props;

    return(
        <Image src={imgPath} alt={imgAlt} width={imgWidth} height={imgHeight}/>
    );
}

export default ShowImage
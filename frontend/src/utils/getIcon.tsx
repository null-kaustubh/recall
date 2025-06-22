import {
  AiFillBehanceCircle,
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillMediumCircle,
  AiFillPinterest,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { RxFileText } from "react-icons/rx";

export default function getIcon(url: string) {
  try {
    const domain = new URL(url).hostname.toLowerCase();

    if (domain.includes("twitter.com") || domain.includes("x.com"))
      return <AiOutlineTwitter />;
    if (domain.includes("youtube.com") || domain.includes("youtu.be"))
      return <AiFillYoutube />;
    if (domain.includes("instagram.com")) return <AiFillInstagram />;
    if (domain.includes("pinterest.com")) return <AiFillPinterest />;
    if (domain.includes("linkedin.com")) return <AiFillLinkedin />;
    if (domain.includes("behance.net")) return <AiFillBehanceCircle />;
    if (domain.includes("github.com")) return <AiFillGithub />;
    if (domain.includes("medium.com")) return <AiFillMediumCircle />;

    // Default fallback icon
    return <RxFileText />;
  } catch (err) {
    console.log(err);
    return <RxFileText />; // In case of invalid URL
  }
}

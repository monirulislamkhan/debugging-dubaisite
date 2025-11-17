import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import Link from "next/link";

export default function SocialLinks({ staticInfo }) {
  return <>
    <div className="flex gap-3 my-3 text-3xl">
      <Link href={staticInfo.facebook_link} className="hover:scale-125 transition-transform text-facebook" target="_blank"><FontAwesomeIcon icon={faFacebook} /> <span className='sr-only'>Follow us on Facebook</span></Link>
      <Link href={staticInfo.linked_link} className="hover:scale-125 transition-transform text-linkedin" target="_blank"><FontAwesomeIcon icon={faLinkedin} /><span className='sr-only'>Follow us on Linkedin</span></Link>

      <Link href={staticInfo.twitter} className="hover:scale-125 transition-transform text-black" target="_blank"><FontAwesomeIcon icon={faXTwitter} /><span className='sr-only'>Follow us on Twitter</span></Link>

      <Link href={staticInfo.youtube} className="hover:scale-125 transition-transform text-red-600" target="_blank"><FontAwesomeIcon icon={faYoutube} /><span className='sr-only'>Follow us on Youtube</span></Link>

      <Link href={staticInfo.insta} className="hover:scale-125 transition-transform text-instagram" target="_blank"><FontAwesomeIcon icon={faInstagram} /><span className='sr-only'>Follow us on Instagram</span></Link>
    </div>
  </>

}
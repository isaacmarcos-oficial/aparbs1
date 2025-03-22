import Link from 'next/link'
import { IconType } from 'react-icons'
import { FaPhoneAlt, FaWhatsapp, FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa'

type LinkIconsProps = {
  theme: 'bgRed' | 'bgBlack' | 'bgWhite'
}

export const Links = [
  {
    actionLink: "tel:+553832208767",
    actionDescription: "Telefone para a APARBS",
    icon: FaPhoneAlt
  },
  {
    actionLink: "https://api.whatsapp.com/send?phone=553832208767&text=Ol%C3%A1%2C%20estou%20no%20site%20da%20APARBS.%20Gostaria%20de%20receber%20atendimento",
    actionDescription: "WhatsApp da APARBS",
    icon: FaWhatsapp
  },
  {
    actionLink: "https://www.instagram.com/aparbs.oficial",
    actionDescription: "Instagram da APARBS",
    icon: FaInstagram
  },
  {
    actionLink: "https://www.facebook.com/aparbs.oficial",
    actionDescription: "Facebook da APARBS",
    icon: FaFacebook
  },
  {
    actionLink: "https://www.linkedin.com/company/aparbs",
    actionDescription: "LinkedIn da APARBS",
    icon: FaLinkedin
  }
]

export function LinkIcons({ theme }: LinkIconsProps) {

  return (
    <div className="flex gap-4">
      {Links.map((link) => {
        const Icon: IconType = link.icon
        return (
          <Link
            key={link.actionLink}
            href={link.actionLink}
            aria-label={link.actionDescription}
            target="_blank"
          >
            <Icon size={24}
              className={`${theme === 'bgRed' ? 'text-white hover:text-black' :
              theme === "bgBlack" ? 'text-white hover:text-[#d90000]' : 'text-black hover:text-white'} transition-all`} />
          </Link>
        )
      })}
    </div>
  )
}
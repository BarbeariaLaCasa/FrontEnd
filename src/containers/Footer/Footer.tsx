import React, { FunctionComponent } from "react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FooterRoot, Iframe, SocialLinkItem, SocialLinks } from "./FooterStyle";

const Footer: FunctionComponent = () => {
  const socialLinks = [
    {
      icon: <FaFacebook />,
      url: "https://www.facebook.com/seufacebook",
      label: "Facebook",
    },
    {
      icon: <FaInstagram />,
      url: "https://www.instagram.com/seuinstagram",
      label: "Instagram",
    },
    {
      icon: <FaWhatsapp />,
      url: "https://wa.me/seunumerodewhatsapp",
      label: "WhatsApp",
    },
  ];
  return (
    <FooterRoot>
      <div>
        <SocialLinks>
          {socialLinks.map((link, index) => (
            <SocialLinkItem key={index}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.icon} {link.label}
              </a>
            </SocialLinkItem>
          ))}
        </SocialLinks>
        <Iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d863.4551621066521!2d-51.12851417012705!3d-30.042002882081327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95197628edbd1ebb%3A0xc35c862fb0c8c825!2sAc.%20Vinte%20e%20Um%2C%20103%20-%20Morro%20Santana%2C%20Porto%20Alegre%20-%20RS%2C%2091450-271!5e0!3m2!1spt-BR!2sbr!4v1693761233896!5m2!1spt-BR!2sbr"></Iframe>
      </div>
    </FooterRoot>
  );
};

export default Footer;

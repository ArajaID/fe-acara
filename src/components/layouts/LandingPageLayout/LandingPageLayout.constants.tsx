import { FaFacebook, FaInstagram, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa6";

const NAV_ITEMS = [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/event" },
];

const BUTTON_ITEMS = [
    { label: "Register", href: "/auth/register", variant: "bordered" },
    { label: "Login", href: "/auth/login", variant: "solid" },
];

const SOCIAL_ITEMS = [
    { label: "Facebook", href: "https://facebook.com", icon: <FaFacebook/> },
    { label: "Twitter", href: "https://twitter.com", icon: <FaTwitter/> },
    { label: "Instagram", href: "https://instagram.com", icon: <FaInstagram/> },
    { label: "Youtube", href: "https://youtube.com", icon: <FaYoutube/> },
    { label: "Tiktok", href: "https://tiktok.com", icon: <FaTiktok/> },
]

export { NAV_ITEMS, BUTTON_ITEMS, SOCIAL_ITEMS };
import { cn } from "@/utils/cn";
import { Avatar, Button, Divider, Listbox, ListboxItem } from "@heroui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { CiLogout } from "react-icons/ci";
import { JSX } from "react";
import Link from "next/link";
import useLandingPageLayoutNavbar from "../../LandingPageLayout/LandingPageLayoutNavbar/useLandingPageLayoutNavbar";

interface SidebarItem {
    key: string;
    label: string;
    href: string;
    icon: JSX.Element;
}

interface PropTypes {
    sidebarItems: SidebarItem[];
    isOpen: boolean;
}

const DashboardLayoutSidebar = (props: PropTypes) => {
    const { sidebarItems, isOpen } = props;
    const router = useRouter();
    const {dataProfile} = useLandingPageLayoutNavbar();

    return (
        <div className={cn("fixed lg:relative z-50 flex h-screen w-full max-w-[300px] -translate-x-full flex-col justify-between border-r-1 border-default-200 bg-white px-4 py-6 transition-all lg:translate-x-0", 
                {"translate-x-0" : isOpen}
        )}>
            <div>
                <div className="flex justify-center w-full flex-col items-center mb-2">
                    <Image 
                    src="/images/general/logo.svg" 
                    alt="logo" 
                    width={180} 
                    height={60} className="mb-3 w-32" 
                    onClick={() => router.push("/")} />

                    <Avatar src={dataProfile?.profilePicture} 
                        className="cursor-pointer w-12 h-12 mb-2"
                        showFallback 
                        name={dataProfile?.fullName} 
                    />

                    <h2 className="text-md font-semibold text-foreground-600">Halo, {dataProfile?.fullName}</h2>
                    <p className="text-md italic text-foreground-600 capitalize">({`${dataProfile?.role}`})</p>
                </div>

                <Divider className="mb-2" />

                <Listbox 
                    items={sidebarItems} 
                    variant="solid" 
                    aria-label="Dashboard Menu"
                    >

                    {(item) => (
                        <ListboxItem key={item.key} className={cn("my-1 h-12 text-2xl", {
                            "bg-danger-500 text-white": router.pathname.startsWith(item.href),
                        })} 
                        startContent={item.icon}
                        textValue={item.label}
                        aria-labelledby={item.label}
                        aria-describedby={item.label}
                        as={Link}
                        href={item.href}
                        >
                            <p className="text-small">{item.label}</p>
                        </ListboxItem>
                    )}
                </Listbox>
            </div>
            <div className="flex items-center p-1 ">
                <Button color="danger" fullWidth variant="light" className="flex justify-start rounded-lg px-2 py-1.5" size="lg" onClick={() => signOut()}><CiLogout /> Logout</Button>
            </div>
        </div>
    )
}

export default DashboardLayoutSidebar;
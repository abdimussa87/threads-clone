"use client";

import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

function BottomBar() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="fixed bottom-0 z-10 w-full p-4 rounded-t-3xl bg-glassmorphism backdrop-blur-lg xs:px-7 md:hidden">
      <div className="flex items-center justify-between gap-3 xs:gap-5">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              key={link.label}
              href={link.route}
              className={`flex flex-col items-center gap-2 rounded-lg p-2 sm:flex-1 sm:px-2 sm:py-2.5 ${
                isActive && "bg-primary-500"
              }`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-white text-subtle-medium max-sm:hidden">
                {link.label.split(" ")[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default BottomBar;

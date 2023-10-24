"use client";

import { sidebarLinks } from "@/constants";
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

function LeftSidebar() {
  const { userId } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  return (
    <section className="sticky top-0 left-0 z-20 flex flex-col justify-between h-screen pb-5 overflow-auto border-r pt-28 custom-scrollbar w-fit border-r-dark-4 bg-dark-2 max-md:hidden">
      <div className="flex flex-col w-full gap-6 px-6 ">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          if (link.label == "Profile") {
            link.route = `/profile/${userId}`;
          }
          return (
            <Link
              key={link.label}
              href={link.route}
              className={`relative flex gap-4 p-4 rounded-lg ${
                isActive && "bg-primary-500"
              }`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-white max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
      <div className="px-6">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className="flex gap-4 p-4 cursor-pointer">
              <Image
                src="/assets/logout.svg"
                alt="logout"
                width={24}
                height={24}
              />
              <p className="text-white max-lg:hidden">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
}

export default LeftSidebar;

import Image from "next/image";
import Link from "next/link";
import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

function TopBar() {
  return (
    <nav className="fixed top-0 z-30 flex items-center justify-between w-full px-6 py-3 bg-dark-2">
      <Link href="/" className="flex gap-4">
        <Image src="/assets/logo.svg" alt="logo" width={28} height={28} />
        <p className="text-white max-xs:hidden text-heading3-bold"> Threads</p>
      </Link>
      <div className="flex items-center gap-1">
        {/* visible on small devices */}
        <div className="md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="cursor-pointer">
                <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-1 px-4",
            },
          }}
        />
      </div>
    </nav>
  );
}

export default TopBar;

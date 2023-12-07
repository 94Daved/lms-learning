import Image from "next/image";
import Link from "next/link";

import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="cursor-pointer">
      <Image height={130} width={130} alt="logo" src="/logo.svg" />
    </Link>
  );
};

export default Logo;

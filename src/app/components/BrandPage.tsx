import Image from "next/image";

function BrandPage() {
  return (
    <div className="h-full col-span-14 flex justify-center items-center">
      <Image
        className="text-green-500"
        height={500}
        width={500}
        src="https://framerusercontent.com/images/ywGyuWgLKzqyB4QJ1sw5Nk1mckU.svg?scale-down-to=512"
        alt="brand_logo"
      />
    </div>
  );
}

export default BrandPage;

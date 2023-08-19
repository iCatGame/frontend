import Image from "next/image";

export const ProfileCover = ({ profile }) => {

  return (
    <div className="relative z-0 bg-local bg-clip-border bg-transparent bg-gradient-to-br from-gray-300 to-gray-300/25 bg-origin-padding bg-top box-border text-black block font-sans h-250px opacity-80 w-[1706.67px] h-[250px] antialiased">
      {profile?.cover ? (
        <Image
          src={profile?.cover}
          alt=""
          layout="responsive"
          objectFit="cover"
          objectPosition="center"
          width={1706}
          height={133}
          priority={true}
          className="relative bg-cover "
        />
      ) : (
        <Image
          src={"/images/cover.png"}
          width={1706}
          height={133}
          className='relative bg-cover '
        />
      )}
    </div>
  );
};

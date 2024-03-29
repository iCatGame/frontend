import Image from "next/image";

export const ProfileCover = ({ profile }) => {

  // console.log(profile)

  return (
    <div className="relative z-0 bg-local bg-clip-border bg-transparent bg-gradient-to-br from-gray-300 to-gray-300/25 bg-origin-padding bg-top box-border text-black block font-sans h-250px opacity-80 lg:w-screen md:h-full  h-[250px] antialiased">
      {profile?.cover ? (
        <Image
          src={profile?.cover}
          alt=""
          width={1706}
          height={133}
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

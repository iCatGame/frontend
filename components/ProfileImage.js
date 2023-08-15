import Image from "next/image";

export const ProfileImage = ({ profile }) => {

  return (
    <div className="px-8 pt-8 relative z-10">
      {profile?.avator ? (
        <Image
          src={profile?.avator}
          alt=""
          layout="responsive"
          objectFit="cover"
          objectPosition="center"
          width={200}
          height={200}
          priority={true}
          className="relative rounded-xl overflow-auto max-h-[800px]"
        />
      ) : (
        <Image
          src={"/images/qr.png"}
          width={200}
          height={200}
          className='relative rounded-xl overflow-auto max-h-[800px]'
        />
      )}
    </div>
  );
};

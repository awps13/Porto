import Link from "next/link";
import Image from "next/image";

const aboutContacts = () => {
  return (
    <div>
      <div className="mt-3">
        <h1 className="underline font-semibold text-[2rem] sm:text-[1rem]">ABOUT ME</h1>
        <p className="text-justify mt-2 tracking-wide">
          I am an Informatics Engineering student at Universitas Negeri Malang
          with a strong interest in Frontend Development. I am experienced in
          developing website interfaces using React.js, Next.js, JavaScript, and
          Tailwind CSS. Beyond technical web development, I have experience as
          an Administrative & Data Entry Assistant and a Copy Writer &
          Proofreader, which has trained me to work with accuracy, organization,
          and effective communication. I believe that the combination of
          technical skills, attention to detail, and strong communication is key
          to creating high-quality digital solutions.
        </p>
      </div>
      <div className="mt-5">
        <h1 className="underline font-semibold text-[2rem] sm:text-[1rem]">CONTACTS</h1>
        <div className="flex mt-2 gap-3 items-center">
          <Link
            href="https://linkedin.com/in/ahmadwildanputrosantoso"
            target="blank"
          >
            <Image
              src="/contacts/linkedin.svg"
              alt="linkedin"
              width={32}
              height={32}
              className=""
            />
          </Link>
          <Link href="https://github.com/awps13" target="blank">
            <Image
              src="/contacts/github.svg"
              alt="github"
              width={32}
              height={32}
              className=""
            />
          </Link>
          <Link href="https://wa.me/6281216574510" target="blank">
            <Image
              src="/contacts/whatsapp.svg"
              alt="whatsapp"
              width={32}
              height={32}
              className=""
            />
          </Link>
          <Link href="https://instagram.com/awps13_" target="blank">
            <Image
              src="/contacts/instagram.svg"
              alt="instagram"
              width={32}
              height={32}
              className=""
            />
          </Link>
          <Link href="https://tiktok.com/awps13_" target="blank">
            <Image
              src="/contacts/tiktok.svg"
              alt="tiktok"
              width={32}
              height={32}
              className=""
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default aboutContacts;

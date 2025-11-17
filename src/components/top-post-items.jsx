import Image from "next/image";
import Link from "next/link";

export default function TopPostItems({ postItem }) {
  return <>
    {postItem.image && <Image src={postItem.image} width={408} height={462} className="w-full h-full object-cover object-center item-img" alt={postItem.alt} />}
    <figcaption className="py-3 absolute inset-0 px-4 h-full flex flex-col justify-end bg-linear-to-t from-black to-black/0">
      <h3 className="font-serif text-lg md:text-xl"><Link href={postItem.url} className="text-white after:inset-0 after:absolute after:z-2">{postItem.alt}</Link></h3>
      <div className="flex mb-3 mt-1">
        <Link href={postItem.blogcaturl} className="mt-3 border border-gray-400 rounded-full inline-block py-1.5 px-3 text-sm text-gray-400 hover:bg-gray-300 hover:text-black relative z-3">{postItem.blogcatname}</Link>
      </div>
    </figcaption>
  </>
}
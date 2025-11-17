export const revalidate = 5 * 60
import { notFound } from 'next/navigation';
import Footer from "@/components/footer";
import Header from "@/components/header";
import getHomeCompleteData from "@/api/getHomeCompleteData";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faSlashForward } from "@fortawesome/pro-regular-svg-icons";
import SideProjectAds from "@/components/side-project-ads";
import { adsSlides, blogData } from "../../../../data/data";
import ProgressBar from "@/components/progress-bar";
import { faFacebook, faInstagram, faInstagramSquare, faLinkedin, faTelegram, faWhatsapp, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import ShortClips from "@/components/short-clips";
import PostHashMenu from "@/components/post-hash-menu";
import PostItem from "@/components/post-item";
import BlogAuthor from "@/components/blog-author";
import TextComponent from "@/components/TextComponent";
import ShareBtns from '@/components/share-btns';

export default async function AskSingle({ params }) {
  const props = getHomeCompleteData();
  const result = await props;
  const pagedata = result.pagedata;
  const StaticPage = result.staticpagedata;
  // const mightAlso = blogData.slice(0, 4);


  const singleAsk = getSingleAskDetail(params.askurl);
  const askRes = await singleAsk;
  if (askRes.message != 'success') {
    notFound();
  }
  const askData = askRes.singleask;
  return <>
    <main>
      <title>{askData.seotitle}</title>
      <meta name="description" content={askData.seodesc} />
      <link rel="canonical" href={askData.url} />
      <meta property="og:image" content="/images/logo.jpg" />
      <meta property="og:image:alt" content="Dubai Housing" />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="og:image:width" content="182" />
      <meta property="og:image:height" content="80" />
      <meta name="twitter:image" content="/images/logo.jpg" />
      <meta name="twitter:image:type" content="image/jpg" />
      <meta name="twitter:image:width" content="182" />
      <meta name="twitter:image:height" content="80" />
      <ProgressBar />
      <Header headerObj={pagedata} />
      {/* Banner */}
      <section className='relative'>
        {askData.mobbannerimage && <Image src={askData.mobbannerimage} priority className="w-full block h-76 sm:hidden" width={360} height={304} alt={askData.name} />}
        {askData.bannerimage && <Image src={askData.bannerimage} className="w-full hidden sm:block sm:h-100 md:h-110 lg:h-140 " width={1500} height={600} alt={askData.name} />}
      </section>


      <section className='wrapper md:max-w-4xl relative -mt-20 lg:-mt-30'>
        <div className="bg-white text-center p-6 md:pt-16 md:pb-10  shadow-xl">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl lg:text-4xl mb-4 md:mb-8">{askData.name}</h1>
          </div>
          <ul className="flex divide-x justify-center flex-wrap mt-2  items-center">
            <li className='flex flex-nowrap gap-1 px-2'>
              By <BlogAuthor author={{
                authorname: askData.authorname,
              }} /></li>
            <li className=' px-2'><Link href={askData.blogcaturl} className="link">{askData.blogcatname}</Link></li>
            <li className=' px-2'>Post Date: {askData.updateddate}</li>
          </ul>
        </div>
      </section>

      <section className="wrapper md:text-center pt-8 md:py-16">
        {/* Project Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap gap-2 text-sm md:justify-center text-gray-500 mb-7">
            <li>
              <Link href={askData.homeurl} className="link">Dubai Housing</Link>
            </li>
            <li><FontAwesomeIcon icon={faSlashForward} /></li>
            <li>
              <Link href={askRes.askurl} className="link">People Also Ask
              </Link>
            </li>
            <li><FontAwesomeIcon icon={faSlashForward} /></li>
            <li aria-current="page">{askData.name}</li>
          </ol>
        </nav>
        <div className="max-w-6xl mx-auto">
          <p className="text-2xl text-gray-600">{askData.shortdesc}</p>
        </div>
      </section>

      {/* Left, Middle & Right slide */}
      <section className="wrapper grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-x-12 pb-16">
        <div className="md:col-span-3">
          {/* Table of Content */}
          <div className="mt-8 sticky md:top-12 mb-4">
            <div className="h2 text-2xl mb-3">Contents</div>
            <div className="border md:border-r flex flex-col *:text-sm">
              <a href={`#${askData.hashUrl}`} title={askData.name} className="p-3 ">{askData.name}</a>
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="col-span-1 md:col-span-9 blog-middle">
          <article id={`#${askData.hashUrl}`} className="pt-16 article -mt-10">
            {askData.fulldesc && <TextComponent className="text-editor" itemObj={askData.fulldesc} />}
          </article>

          {/* Social share */}
          <div className="my-6 py-6 border-b">
            <div className="h2 text-2xl mb-4">Share Our People Also Ask</div>
            <div className="flex flex-wrap gap-4 my-3 *:rounded-sm *:flex *:gap-x-3 *:items-center *:text-white! *:no-underline! *:py-2 *:px-3">
              <ShareBtns shareUrl={askData.url} />
            </div>
          </div>
          {/* Pagination */}
          <div className="flex justify-between">
            {askData.prevurl &&
              <Link href={askData.prevurl} className="flex gap-x-0.5 items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 no-underline!">
                <FontAwesomeIcon icon={faChevronLeft} /> Previous
              </Link>
            }

            {askData.nexturl &&
              <Link href={askData.nexturl} className="flex gap-x-0.5 items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 no-underline!">
                Next <FontAwesomeIcon icon={faChevronRight} />
              </Link>
            }
          </div>
        </div>
      </section>

      {/* You might also like */}
      <section className="pb-16 pt-10">
        <div className="wrapper">
          <div className="h2 text-4xl mb-10">You might also like</div>
          <div className="flex gap-5 *:min-w-72 md:*:w-1/4 overflow-x-auto">
            {askRes.relatedpost.slice(0, 4).map(item => <div key={item.id}> <PostItem postItem={item} />{item.short_description = false}</div>)}
          </div>
        </div>
      </section>
    </main>
    <Footer whatsappMessage={askData.name} footerProject={result.footerproject} footerComm={result.footercomm} pageData={pagedata} staticInfo={result.staticpagedata} />
  </>
}
async function getSingleAskDetail(askurl) {
  const formData = new URLSearchParams();
  formData.append('askurl', askurl);
  formData.append('token1', process.env.token1);
  formData.append('token2', process.env.token2);
  const finalresult = await fetch(process.env.API_URL + 'ask-peoples/askInnerPage/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  });
  return finalresult.json();
}
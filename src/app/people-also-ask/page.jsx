import { Suspense } from 'react';
import Footer from "@/components/footer";
import Header from "@/components/header";
import getHomeCompleteData from "@/api/getHomeCompleteData";
import AskSearch from "@/components/AskSearch";
import PostSlides from "@/components/post-slides";
import AskListing from "@/components/AskListing";
import TextComponent from "@/components/TextComponent";
import LoadingCustom from '@/components/loading-custom';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SocialLinks from '@/components/social-links';
import { faArrowRightLong } from '@fortawesome/pro-regular-svg-icons';
import SideProjectAds from '@/components/side-project-ads';

export default async function AllPost() {
  const props = getHomeCompleteData();
  const result = await props;
  const pagedata = result.pagedata;

  const StaticPage = result.staticpagedata;

  const blogs = getPeopleAlsoAkkDetails();
  const resblog = await blogs;

  return <>
    <Header headerObj={pagedata} />
    <title>{pagedata.askseotitle}</title>
    <meta name="description" content={pagedata.askseodesc} />
    <link rel="canonical" href={pagedata.peoplealsoask} />
    <section className="relative">
      <div className="border-t pb-16">
        {/* <h2 className="text-2xl lg:text-3xl py-4 mb-5 px-6 text-center"><TextComponent itemObj={StaticPage.blog_slide_h3} /></h2> */}
        <div className="wrapper  py-8">
          <h1 className="text-3xl lg:text-[4vw] leading-tight text-center"><TextComponent itemObj={StaticPage.ask_h1.replace("classname", "className")} /></h1>
          <div className="mt-8 md:mb-6 flex justify-center relative z-10 md:max-w-3xl md:mx-auto">
            <AskSearch parentClass="mx-0 text-left" />
          </div>
        </div>
        <PostSlides postItemSlide={resblog.commonads} />
      </div>
    </section>

    <section className="wrapper border-t pb-16">
      <h3 className="text-2xl lg:text-[3vw] leading-tight py-6"><TextComponent itemObj={StaticPage.ask_listingheading} /></h3>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="col-span-1 md:col-span-9">
          <Suspense fallback={<LoadingCustom />}>
            <AskListing />
          </Suspense>
        </div>
        <div className="col-span-1 md:col-span-3">
          <h3 className="text-2xl">About Dubai Housing</h3>
          {StaticPage.aboutus && <p className='text-lg py-4 text-justify'>{StaticPage.aboutus}</p>}
          <Link href={pagedata.abouturl} className="">Read More <FontAwesomeIcon icon={faArrowRightLong} /> </Link>
          <div className="border-t py-6 mt-6">
            <div className="text-2xl">Follow Us</div>
            <SocialLinks staticInfo={result.staticpagedata} />
          </div>
          {/* Side Ads */}
          {resblog.commonadsforside.length>0 &&
            <div className="sticky top-10">
              <SideProjectAds slideObj={resblog.commonadsforside} />
            </div>
          }
        </div>
      </div>
    </section>
    <Footer footerProject={result.footerproject} footerComm={result.footercomm} pageData={pagedata} staticInfo={result.staticpagedata} />
  </>
}

async function getPeopleAlsoAkkDetails() {
  const formData = new URLSearchParams();
  formData.append('token1', process.env.token1);
  formData.append('token2', process.env.token2);
  const finalresult = await fetch(process.env.API_URL + 'ask-peoples/firstTenPropelask/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  });
  return finalresult.json();
}
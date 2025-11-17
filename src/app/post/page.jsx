import { Suspense } from 'react'
import Footer from "@/components/footer";
import Header from "@/components/header";
import getHomeCompleteData from "@/api/getHomeCompleteData";
import BlogSearch from "@/components/BlogSearch";
import PostSlides from "@/components/post-slides";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BlogListing from "@/components/BlogListing";
import TextComponent from "@/components/TextComponent";
import LoadingCustom from '@/components/loading-custom';
import Link from 'next/link';
import { faArrowRightLong } from '@fortawesome/pro-regular-svg-icons';
import SocialLinks from '@/components/social-links';
import SideProjectAds from '@/components/side-project-ads';

export default async function AllPost() {
  const props = getHomeCompleteData();
  const result = await props;
  const pagedata = result.pagedata;
  const StaticPage = result.staticpagedata;
  const blogs = getBlogDetails();
  const resblog = await blogs;

  return <>
    <Header headerObj={pagedata} />
    <title>{pagedata.blogseotitle}</title>
    <meta name="description" content={pagedata.blogseodesc} />
    <link rel="canonical" href={pagedata.posturl} />
    <section className="relative">
      <div className="border-t pb-16">
        <div className="wrapper  py-8">
          <h1 className="text-3xl lg:text-[4vw] leading-tight text-center"><TextComponent itemObj={StaticPage.blog_h1.replace("classname", "className")} /></h1>
          <div className="mt-8 md:mb-6 flex justify-center relative z-10 md:max-w-3xl md:mx-auto">
            <BlogSearch parentClass="mx-0 text-left" />
          </div>
        </div>
        <PostSlides postItemSlide={resblog.commonads} />
      </div>
    </section>

    <section className="wrapper border-t pb-16 ">
      <h4 className="text-2xl lg:text-[3vw] leading-tight py-6">
        <TextComponent itemObj={StaticPage.blog_listingheading} />
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
        <div className="col-span-1 md:col-span-9">
          <Suspense fallback={<LoadingCustom />}>
            <BlogListing />
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

async function getBlogDetails() {
  const formData = new URLSearchParams();
  formData.append('token1', process.env.token1);
  formData.append('token2', process.env.token2);
  const finalresult = await fetch(process.env.API_URL + 'blogs/firstTenblogs/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  });
  return finalresult.json();
}
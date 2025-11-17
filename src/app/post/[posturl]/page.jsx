export const revalidate = 5 * 60;
import getHomeCompleteData from '@/api/getHomeCompleteData';
import BarchartDynamic from '@/components/barchart-dynamic';
import BlogAuthor from '@/components/blog-author';
import FaqSchema from '@/components/FaqSchema';
import Footer from '@/components/footer';
import Header from '@/components/header';
import LinechartDynamic from '@/components/linechart-dynamic';
import PieChartsDynamic from '@/components/piechart-dynamic';
import PostHashMenu from '@/components/post-hash-menu';
import PostItem from '@/components/post-item';
import ProgressBar from '@/components/progress-bar';
import ShareBtns from '@/components/share-btns';
import TextComponent from '@/components/TextComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';

export default async function PostSingle({ params }) {
  const formData = new URLSearchParams();
  formData.append('token1', process.env.token1);
  formData.append('token2', process.env.token2);
  formData.append('type', 'post');
  formData.append('url', params.posturl);
  const redirectUrl = await fetch(process.env.API_URL + 'users/redirection/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  });
  const resultRedirect = await redirectUrl.json();

  if (resultRedirect.message == 'success') {
    redirect(resultRedirect.new_url);
  }

  const props = getHomeCompleteData();
  const result = await props;
  const pagedata = result.pagedata;
  const StaticPage = result.staticpagedata;

  const singleBlog = getSingleBlogDetail(params.posturl);
  const blogRes = await singleBlog;
  if (blogRes.message != 'success') {
    notFound();
  }
  const blogData = blogRes.singlepost;
  const lineChartData = blogRes.bloglinechart;
  const blogsinglebarchart = blogRes.blogsinglebarchart;
  const blogdoublebarchart = blogRes.blogdoublebarchart;
  const blogPaiechart = blogRes.blogPaiechart;
  return (
    <>
      <main>
        <title>{blogData.seotitle}</title>
        <meta name="description" content={blogData.seodesc} />
        <link rel="canonical" href={blogData.url} />
        {/* <meta property="og:image" content={blogData.bannerimage} />
      <meta property="og:image:alt" content={blogData.name} />
      <meta property="og:image:width" content="182" />
      <meta property="og:image:height" content="80" />
      <meta name="twitter:image" content={blogData.bannerimage} />
      <meta name="twitter:image:width" content="182" />
      <meta name="twitter:image:height" content="80" /> */}
        <meta name="twitter:image" content={blogData.bannerimage} />
        <meta name="twitter:site" content="Dubai Housing" />
        <meta name="twitter:card" content={blogData.seotitle} />
        <meta name="twitter:title" content={blogData.seotitle} />
        <meta name="twitter:description" content={blogData.seodesc} />
        <meta property="og:image" content={blogData.bannerimage} />
        <meta property="og:image:alt" content={blogData.name} />
        <meta property="og:site_name" content="Dubai Housing" />
        <meta property="og:type" content="image/webp" />
        <meta property="og:title" content={blogData.seotitle} />
        <meta property="og:url" content={blogData.url} />
        <meta property="og:description" content={blogData.seodesc} />
        <ProgressBar />
        {/* Top Ads */}
        <Header headerObj={pagedata} />
        {/* Banner */}
        <section className="relative">
          {blogData.mobbannerimage && (
            <Image
              src={blogData.mobbannerimage}
              priority
              className="w-full block h-76 sm:hidden"
              width={360}
              height={304}
              alt={blogData.name}
            />
          )}
          {blogData.bannerimage && (
            <Image
              src={blogData.bannerimage}
              property
              className="w-full hidden sm:block sm:h-100 md:h-110 lg:h-140 object-cover"
              width={1500}
              height={600}
              alt={blogData.name}
            />
          )}
        </section>

        <section className="wrapper md:max-w-4xl relative -mt-20 lg:-mt-30">
          <div className="bg-white text-center p-5 md:pt-16 md:pb-10  shadow-xl">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl lg:text-4xl mb-4 md:mb-8">{blogData.name}</h1>
            </div>
            <ul className="flex divide-x justify-center flex-wrap mt-2 items-center">
              <li className="flex flex-nowrap gap-1 px-2">
                By{' '}
                <BlogAuthor
                  author={{
                    authorname: blogData.authorname,
                  }}
                />
              </li>
              <li className="px-2">
                <Link href={blogData.blogcaturl} className="link">
                  {blogData.blogcatname}
                </Link>
              </li>
              <li className=" px-2">Post Date: {blogData.updateddate}</li>
            </ul>
          </div>
        </section>

        <section className="wrapper md:text-center pt-8 md:py-16">
          <div className="max-w-6xl mx-auto">
            {/* Project Breadcrumb */}
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap gap-2 text-sm md:justify-center text-gray-500 mb-7">
                <li>
                  <Link href={blogData.homeurl} className="link">
                    Dubai Housing
                  </Link>
                </li>
                <li>
                  <FontAwesomeIcon icon={faSlashForward} />
                </li>
                <li>
                  <Link href={blogRes.blogurl} className="link">
                    Posts
                  </Link>
                </li>
                <li>
                  <FontAwesomeIcon icon={faSlashForward} />
                </li>
                <li aria-current="page">{blogData.name}</li>
              </ol>
            </nav>
            <p className="text-lg md:text-2xl text-gray-600">{blogData.shortdesc}</p>
          </div>
        </section>

        {/* Left, Middle & Right slide */}
        <section className="wrapper grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-x-12 pb-16">
          <div className="md:col-span-3">
            {/* Table of Content */}
            <div className="mt-8 sticky md:top-12 mb-4">
              <div className="h2 text-2xl mb-3">Contents</div>
              <div className="border md:border-r flex flex-col *:text-sm">
                <PostHashMenu navLink={blogRes.singlepostdesc} />
              </div>
            </div>
          </div>

          {/* Middle Section */}
          <div className="md:col-span-9 blog-middle">
            {/* Top First Description */}
            {blogData.fulldesc && <TextComponent className="text-editor" itemObj={blogData.fulldesc} />}
            {/* Article Section */}
            {blogRes.singlepostdesc.map((articleItem, index) => (
              <article key={articleItem.id} id={articleItem.hashUrl} className="pt-8 text-editor">
                <h2>{articleItem.shortdesc}</h2>
                {articleItem.headingBanner && (
                  <figure className="mb-4">
                    <Image
                      src={articleItem.headingBanner}
                      alt={articleItem.shortdesc}
                      title={articleItem.shortdesc}
                      className="w-full md:h-96 rounded-lg"
                      width={700}
                      height={400}
                    />
                  </figure>
                )}
                {articleItem.fulldesc && <TextComponent className="text-editor" itemObj={articleItem.fulldesc} />}
                {index + 1 === lineChartData.position && blogData.line && (
                  <div className="mt-10 text-xs mb-10">
                    <div className="text-xl font-serif font-semibold pb-2 mb-1">{blogData.line}</div>
                    <LinechartDynamic chartData={lineChartData} className="border p-3 pl-0" />
                  </div>
                )}

                {index + 1 === blogdoublebarchart.position && blogData.double && (
                  <div className="mt-10 text-xs mb-10">
                    <div className="text-xl font-serif font-semibold pb-2 mb-1">{blogData.double}</div>
                    <BarchartDynamic chartData={blogdoublebarchart} className="border p-3 pl-0" />
                  </div>
                )}

                {/* Create chart section */}
                {index + 1 === blogsinglebarchart.position && blogData.single && (
                  <div className="mt-10 text-xs mb-10">
                    <div className="text-xl font-serif font-semibold pb-2 mb-1">{blogData.single}</div>
                    <BarchartDynamic chartData={blogsinglebarchart} className="border p-3 pl-0" />
                  </div>
                )}

                {index + 1 === blogPaiechart.position && blogData.pie && (
                  <div className="mt-10 text-xs mb-10">
                    <div className="text-xl font-serif font-semibold pb-2 mb-1">{blogData.pie}</div>
                    <PieChartsDynamic chartData={blogPaiechart} className="h-auto! border p-3 pl-0" />
                  </div>
                )}
              </article>
            ))}

            {/* Social share */}
            <div className="my-6 py-6 border-b">
              <div className="h2 text-2xl mb-4">Share Our Post</div>
              <div className="flex flex-wrap gap-4 my-3 *:rounded-sm *:flex *:gap-x-3 *:items-center *:text-white! *:no-underline! *:py-2 *:px-3">
                <ShareBtns shareUrl={blogData.url} />
              </div>
            </div>

            {blogRes.postfaq && blogRes.postfaq.length > 0 && (
              <div className="faqs pt-10">
                <FaqSchema faqList={blogRes.postfaq} />
                <h2 className="text-2xl text-primary">Frequently Asked Questions (FAQs)</h2>
                {/* FAQs List */}
                <div className="flex flex-col divide-y">
                  {blogRes.postfaq.map((faq) => (
                    <div className="py-5" key={faq.id}>
                      <div className="question font-semibold before:content-['Q.'] flex gap-x-2 mb-1">
                        {faq.question}
                      </div>
                      <div className="answer before:content-['A.'] flex gap-x-2">
                        {faq.answer && <TextComponent itemObj={faq.answer} />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between">
              {blogData.prevurl && (
                <Link
                  href={blogData.prevurl}
                  className="flex gap-x-0.5 items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 no-underline!"
                >
                  <FontAwesomeIcon icon={faChevronLeft} /> Previous
                </Link>
              )}

              {blogData.nexturl && (
                <Link
                  href={blogData.nexturl}
                  className="flex gap-x-0.5 items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 no-underline!"
                >
                  Next <FontAwesomeIcon icon={faChevronRight} />
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* You might also like */}
        {blogRes.relatedpost.length > 0 && (
          <section className="pb-16 pt-10">
            <div className="wrapper">
              <div className="h2 text-4xl mb-10">You might also like</div>
              <div className="flex gap-5 *:min-w-72 md:*:w-1/4 overflow-x-auto">
                {blogRes.relatedpost.slice(0, 4).map((item) => (
                  <div key={item.id}>
                    {' '}
                    <PostItem postItem={item} />
                    {(item.short_description = false)}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer
        whatsappMessage={blogData.name}
        footerProject={result.footerproject}
        footerComm={result.footercomm}
        pageData={pagedata}
        staticInfo={result.staticpagedata}
      />
    </>
  );
}
async function getSingleBlogDetail(posturl) {
  const formData = new URLSearchParams();
  formData.append('blogurl', posturl);
  formData.append('token1', process.env.token1);
  formData.append('token2', process.env.token2);
  const finalresult = await fetch(process.env.API_URL + 'blogs/blogInnerPage/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  });
  return finalresult.json();
}

import getHomeCompleteData from '@/api/getHomeCompleteData';
import Breadcrumb from '@/components/Breadcrumb';
import FaqAccordionList from '@/components/FaqAccordionList';
import FaqSchema from '@/components/FaqSchema';
import MediaWrapper from '@/components/MediaWrapper';
import Modal from '@/components/Modal';
import ProjectHighLightSlide from '@/components/ProjectHighLightSlide';
import TextComponent from '@/components/TextComponent';
import Footer from '@/components/footer';
import FormCommon from '@/components/form-common';
import Four04ReadOnly from '@/components/four04-read-only';
import Header from '@/components/header';
import UaeDirhamIcon from '@/components/icons/UaeDirhamIcon';
import Overview from '@/components/overview';
import ProjectFloorPlan from '@/components/project-floor-plan';
import ProjectSticky from '@/components/project-sticky';
import ProjectTopBanners from '@/components/project-top-banners';
import SimilarProjects from '@/components/similar-projects';
import { far, fas } from '@awesome.me/kit-d4fc302733/icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRulerCombined, faSlashForward } from '@fortawesome/pro-light-svg-icons';
import { faBedFront, faKey, faLocationDot } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { paymentPlanSteps } from '../../../../data/data';
library.add(fas, far);

export default async function ProjectPage({ params }) {
  const formData = new URLSearchParams();
  formData.append('token1', process.env.token1);
  formData.append('token2', process.env.token2);
  formData.append('type', 'project');
  formData.append('url', params.projecturl);
  const redirectUrl = await fetch(process.env.API_URL + 'users/redirection/', {
    next: { revalidate: 60 },
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
  const properties = getProjectDetails(params.projecturl);
  const resultProp = await properties;

  if (resultProp.message === 'record not found') {
    notFound();
  }
  const prop = resultProp.prop;
  const props = getHomeCompleteData();
  const result = await props;
  const pagedata = result.pagedata;
  const floorPlanData = resultProp.floorplan;
  const is404 = prop.is404;

  const proCallnumber = prop.propcallnumber ? prop.propcallnumber : result.staticpagedata.callnumberstatic;
  const footerStaticInfo = { phone: { callnumberstatic: proCallnumber } };
  result.staticpagedata = {
    ...result.staticpagedata,
    ...footerStaticInfo.phone,
  };

  const proWhatsnumber = prop.propwhatsapp ? prop.propwhatsapp : pagedata.whatsnumber;
  const footerWhats = { whatsapp: { whatsnumber: proWhatsnumber } };
  const allPagedata = { ...pagedata, ...footerWhats.whatsapp };
  const fourBanner = [...resultProp.gallery.slice(0, 4)];
  const restGalleryItem = resultProp.gallery.slice(4);
  return (
    <>
      {is404 === 'yes' && <Four04ReadOnly />}
      {/* Header */}
      <MediaWrapper>
        <Header headerObj={pagedata} />
      </MediaWrapper>
      <title>{prop.seotitle}</title>
      <meta name="description" content={prop.seodesc} />
      <link rel="canonical" href={prop.canonical} />
      {/* Banner and Congiuration section */}
      <section id="banner-config-section" className="md:bg-linear-45 from-red-100/70 to-primary-100/70">
        <div className="relative grid">
          <ProjectTopBanners
            firstBanner={prop.mainbannerimage}
            mobileBanner={prop.mobilebannerimage}
            fourBanner={fourBanner}
            mainBannerAlt={prop.mainbanneralt}
            imageLength={resultProp.gallery.length + 1}
            restGalleryItem={restGalleryItem}
          />

          {/* Project Information */}
          <div className="relative md:row-start-1 wrapper flex flex-col md:justify-between md:flex-row w-full py-3">
            {/* Mobile view Round Start */}
            <div className="block md:hidden bg-white absolute -top-6 left-0 w-full h-6 rounded-t-3xl"></div>

            {/* Logo, H1, Community */}
            <div className="max-md:-mt-3 md:order-1 md:flex md:items-center">
              <Image
                src={prop.logo}
                priority
                quality={100}
                width={160}
                height={55}
                className="w-auto h-15 md:h-10 max-w-40 mx-auto max-md:mb-4"
                alt={prop.logoalt}
              />
            </div>
            <div className="text-center md:text-left md:py-2">
              {/* <TextComponent as="h1" itemObj={prop.h1} /> */}
              <div className="flex flex-wrap">
                <h1 className="text-2xl md:text-3xl flex flex-wrap max-md:justify-center">
                  <span className="grow w-full">{prop.h1} </span>
                  <span className="flex flex-col md:flex-row md:gap-x-2 md:items-end">
                    <Link
                      href={`/our-communities/${prop.proplocationurl}`}
                      className="max-md:my-2 link underline underline-offset-2 hover:no-underline text-base font-normal font-sans"
                    >
                      <FontAwesomeIcon icon={faLocationDot} className="me-1" />
                      <span className="sr-only">at </span>
                      {prop.proplocation}
                    </Link>{' '}
                    <span className="mt-1 text-base font-normal font-sans">
                      {prop.propbed && <span>{prop.propbed} BR </span>}
                      {prop.propertytypename && <span>{prop.propertytypename}</span>}
                    </span>
                  </span>
                </h1>
              </div>
              {/* Community */}
            </div>
          </div>

          {/* Project Configuration */}
          <div className="md:my-8 xl:max-w-6xl xl:mx-auto mx-5 xl:w-full gap-4 bg-white md:p-3 rounded-lg flex">
            <div className="grow flex flex-wrap md:flex-nowrap gap-y-3 divide-zinc-300 divide-x">
              {/* Price */}
              {prop.proprice && prop.proprice !== 'On Request' && (
                <div className="flex max-md:text-center gap-3 items-center grow justify-center max-sm:px-3">
                  <div className="hidden md:flex justify-center items-center">
                    <UaeDirhamIcon className="text-zinc-400 size-6 " />
                  </div>
                  <div className="text-xs md:text-sm text-gray-400">
                    Price (AED)
                    <span className="block text-xl font-serif text-gray-600">
                      {prop.proprice}
                      {prop.proprice !== 'On Request' && <small className="text-sm font-sans ml-0.5">M*</small>}
                    </span>
                  </div>
                </div>
              )}

              {/* Bed */}
              {prop.propbed && (
                <div className="hidden sm:flex max-md:text-center gap-3 items-center grow justify-center max-sm:px-3">
                  <div className="hidden md:flex justify-center items-center">
                    <FontAwesomeIcon icon={faBedFront} className="text-zinc-400 text-2xl" />
                  </div>
                  <div className="text-xs md:text-sm text-gray-400">
                    Unit (BR)
                    <span className="block text-xl font-serif text-gray-600">{prop.propbed} BR</span>
                  </div>
                </div>
              )}

              {/* Size */}
              {prop.propsize && (
                <div className="flex max-md:text-center gap-3 items-center grow justify-center max-sm:px-3">
                  <div className="hidden md:flex justify-center items-center">
                    <FontAwesomeIcon icon={faRulerCombined} className="text-zinc-400 text-2xl" />
                  </div>
                  <div className="text-xs md:text-sm text-gray-400">
                    Sizes (Sq. Ft.)
                    <span className="block text-xl font-serif text-gray-600">{prop.propsize}</span>
                  </div>
                </div>
              )}

              {/* Booking Amt. */}
              {prop.bookingamount && prop.bookingamount !== 'On Request' && (
                <div className="hidden md:flex max-md:text-center gap-3 items-center grow justify-center max-sm:px-3">
                  <div className="hidden md:flex justify-center items-center">
                    <UaeDirhamIcon className="text-zinc-400 size-6 " />
                  </div>
                  <div className="text-xs md:text-sm text-gray-400">
                    Booking Amt.
                    <span className="block text-xl font-serif text-gray-600">{prop.bookingamount}</span>
                  </div>
                </div>
              )}

              {/* Possession */}
              {prop.possession && (
                <div className="flex max-md:text-center gap-3 items-center grow justify-center max-sm:px-3">
                  <div className="hidden md:flex justify-center items-center">
                    <FontAwesomeIcon icon={faKey} className="text-zinc-400 text-2xl" />
                  </div>
                  <div className="text-xs md:text-sm text-gray-400">
                    Possession
                    <span className="block text-xl font-serif text-gray-600">{prop.possession}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Project info */}
      <ProjectSticky prop={prop} />

      {/* Project Middle Section */}
      <section className="wrapper grid grid-cols-1 lg:grid-cols-12 lg:gap-20 gap-14 max-md:mt-6 pt-6 max-md:border-t-7 md:pt-18">
        {/* Left Side Content */}
        <div className="lg:col-span-8">
          {/* Project Breadcrumb */}
          <nav className="py-3 max-md:sr-only" aria-label="Breadcrumb">
            <ol className="flex flex-wrap gap-x-2 text-xs md:text-sm text-gray-500">
              <li>
                <Link href={prop.homeurl} className="link">
                  Dubai Housing
                </Link>
              </li>
              <Breadcrumb />
              <li>
                <FontAwesomeIcon icon={faSlashForward} />
              </li>
              <li aria-current="page">{prop.propname}</li>
            </ol>
          </nav>

          {/* Highligts Section */}
          {resultProp.highlights.length > 0 && (
            <div className="max-w-full overflow-x-hidden">
              <h3 className="text-xl md:text-2xl mb-2">
                <small className="small-heading">Highlights of </small> {prop.propname}
              </h3>
              <ProjectHighLightSlide className="mt-14" highlights={resultProp.highlights} />
            </div>
          )}

          {/* Project Overview */}
          <div className={`${resultProp.highlights.length > 0 && 'border-top-separator'}`}>
            <small className="small-heading">Overview</small>
            {prop.h2 && <h2 className="text-xl md:text-2xl">{prop.h2}</h2>}
            {prop.overhead && <p className="font-semibold block mb-3 text-primary">{prop.overhead}</p>}
            <Overview overviewshortObj={prop.overshortdesc} overviewDesc={prop.overdesc} />
          </div>

          {/* Payment Plan */}
          <div className="border-top-separator">
            <h3 className="text-xl md:text-2xl mb-6">
              <small className="small-heading">Payment Plan of </small>
              {prop.pplanhead}
            </h3>
            {paymentPlanSteps.length > 0 ? (
              <div className="relative">
                <div className="absolute top-6 left-5 md:left-6 w-2  sm:w-[calc(100%-5rem)] h-[calc(100%-2rem)] md:h-2 bg-gray-200 rounded-full -z-1"></div>
                <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-8">
                  {/* Step structure */}
                  {paymentPlanSteps.map((step) => (
                    <div
                      key={step.id}
                      className="not-last:grow  text-xl md:text-3xl last:bg-white flex md:flex-col gap-4"
                    >
                      <div className="bg-green-200 size-12 md:size-16 rounded-full flex justify-center items-center">
                        <FontAwesomeIcon icon={`fa-regular ${step.icon}`} />
                      </div>
                      <div className="">
                        <div className="h2">{step.percentage}</div>
                        <div className="text-sm">{step.step_name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <TextComponent
                itemObj={prop.pplandesc}
                className="payment flex flex-wrap gap-6 *:grow relative *:bg-primary/10 *:p-6 *:border-b-2 *:border-primary/60 *:text-2xl md:*:text-5xl/8"
              />
            )}
          </div>

          {/* Amenities Section */}
          <div className="border-top-separator">
            <small className="small-heading">Amenities of</small>
            {prop.amenityhead && <h3 className="text-xl md:text-2xl mb-4">{prop.amenityhead}</h3>}
            {prop.amenitydesc && <TextComponent itemObj={prop.amenitydesc} className="mb-5" />}
            <div className="flex flex-wrap gap-6">
              {resultProp.amenities.map((amenity, index) => (
                <div key={index} className="w-[calc(50%-1rem)] flex gap-x-2 md:gap-x-3 items-center ">
                  <div className="w-7 md:w-9">
                    <FontAwesomeIcon icon={`fa-regular ${amenity.iconId}`} className="text-xl md:text-2xl" />
                  </div>
                  <span className="max-md:text-sm line-clamp-1">{amenity.heading}</span>
                </div>
              ))}
            </div>

            {/* More Amenities
            <div className="mt-6">
              <ModalOthers btnText="See More Amenities">
                <div className="text-xl py-4">More Amenities</div>
                {resultProp.amenities.map((amenity, index) => (
                  <div className="flex border-t" key={index}>
                    <div className="py-5 flex gap-4 items-center">
                      <FontAwesomeIcon icon={`fa-regular ${amenity.iconId}`} className="text-2xl text-gray-700" />
                      {amenity.heading}
                    </div>
                  </div>
                ))}
              </ModalOthers>
            </div>
            */}
          </div>

          {/* Location Section */}
          <div className="border-top-separator">
            {prop.locationhead && (
              <h4 className="text-xl md:text-2xl mb-2">
                <small className="small-heading">Location of </small>
                {prop.locationhead}
              </h4>
            )}
            {prop.locationdesc && <TextComponent itemObj={prop.locationdesc} className="mb-5" />}
            {/* grid gap-8 sm:grid-flow-row sm:grid-cols-2 md:grid-cols-2 grid-flow-col max-sm:overflow-auto pb-2 */}
            <ul className="grid gap-8 sm:grid-flow-row sm:grid-cols-2 pb-2">
              {/* <li className="border p-4 pl-14 text-sm rounded-lg text-gray-700" key={location.id}>
                <FontAwesomeIcon icon={location.iconId} className="text-xl md:text-2xl -ml-10 float-left mt-2" />
                <span className="block md:text-xl font-semibold text-nowrap">{location.heading}</span>{' '}
                <span className="  text-nowrap">{location.description}</span>
              </li> */}
              {resultProp.localities.map((location) => (
                <li className="pl-14 text-sm text-gray-700" key={location.id}>
                  <div className="bg-gray-200 w-11 h-11 -ml-14 float-left sm:mt-1 flex justify-center items-center rounded-full">
                    <FontAwesomeIcon icon={location.iconId} className="text-lg text-gray-600" />
                  </div>
                  <span className="block md:text-xl font-semibold text-nowrap">{location.heading}</span>{' '}
                  <span className="  text-nowrap">{location.description}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Floor Plan Section */}
          {floorPlanData.length > 0 && (
            <>
              <div className="border-top-separator">
                <div className="mb-6">
                  {prop.floorhead && (
                    <h4 className="text-xl md:text-2xl mb-3 font-serif">
                      <small className=" small-heading block">Floor Plans of </small>
                      {prop.floorhead}
                    </h4>
                  )}
                  {prop.floordesc && <TextComponent itemObj={prop.floordesc} />}
                </div>

                <ProjectFloorPlan floorPlanList={floorPlanData} />
              </div>
              {/* <FloorPlan floorPlanObj={floorPlanData} projectName={prop.propname} /> */}
            </>
          )}

          {/* FAQ Section */}
          {resultProp.faq.length > 0 && (
            <div className="border-top-separator">
              <FaqSchema faqList={resultProp.faq} />
              <div className="h2 text-xl md:text-2xl">Have a question?</div>
              <p className="mb-4 mt-2">We will tell you everything you need to know about {prop.propname}</p>

              <div className="flex flex-col gap-6">
                <FaqAccordionList faqList={resultProp.faq} />
              </div>
            </div>
          )}
        </div>

        {/* Right Side */}
        <div className="lg:col-span-4 max-md:pb-8">
          {/* Form */}
          <div className="p-8 border border-gray-200 rounded-2xl shadow-xl lg:sticky lg:top-20">
            <div className="text-center text-2xl mb-3 font-serif">
              Contact Our Experts
              <small className="block text-sm font-sans">(Please share your contact details)</small>
            </div>
            <FormCommon />
          </div>
        </div>
      </section>

      {/* Sechdule Section */}
      {/* <section className="wrapper">
        <div className="border">
          <div className="overflow-hidden md:max-h-[550px] flex flex-col md:flex-row gap-10 items-center">
            <div className="relative max-md:-mt-[55vw] md:-ml-[15vw] before:absolute before:top-0 before:-right-6 before:w-full before:h-full before:bg-primary/[.5] before:rounded-full">
              <Image
                src={prop.mobilebannerimage}
                width={500}
                height={600}
                alt={prop.mainbanneralt}
                className="relative object-cover rounded-full md:max-h-[600px] md:w-[45vw]"
              />
            </div>
            <div className="px-6 pb-6 md:p-6 md:ml-32">
              <small className=" small-heading">Arrange Property Viewing today</small>
              <div className="font-serif text-2xl md:text-4xl">Don&apos;t Miss The Property Tour</div>
              <div className="py-4">Click below to Schedule</div>
              <Modal btnClasses="rounded-full py-1.5" projectName={prop.propname}>
                Schedule Now
              </Modal>
            </div>
          </div>
        </div>
      </section> */}

      {/* Ask Anything Section */}
      <section className="wrapper pb-8 md:pb-16 lg:pt-20">
        <div className="bg-primary/80 p-8 md:p-16 rounded-3xl flex flex-col gap-8 md:flex-row md:items-center">
          <div className="text-white">
            <div className="h2 text-xl md:text-2xl mb-3 text-primary-50">Ask Anything Anytime</div>
            <div className="text-primary-200">
              With a simple chat conversation, we resolve every query of yours- Enjoy Instant Support to grab Asset
            </div>
          </div>
          <div className="md:order-first ">
            <Modal btnClasses="rounded-full text-nowrap" projectName={prop.propname}>
              Ask Any Question
            </Modal>
          </div>
        </div>
      </section>
      {/* Similar Properties */}
      {prop.relatedProjects.length > 0 && (
        <section className="wrapper pb-8 md:py-16 overflow-hidden">
          <div className="h2 text-2xl">Similar Properties</div>
          <SimilarProjects similarObj={prop.relatedProjects} />
        </section>
      )}
      {/* <NoWhatComponent
        whatContent={prop.not_what}
        whatImage={prop.FooterImage}
        whatUrl={prop.projectsurl}
        buttonText="View All Properties"
      /> */}
      <Footer
        footerProject={result.footerproject}
        footerComm={result.footercomm}
        pageData={allPagedata}
        staticInfo={result.staticpagedata}
        prop={prop}
        whatsappMessage={prop.propname}
      />
    </>
  );
}
async function getProjectDetails(projectid) {
  const formData = new URLSearchParams();
  formData.append('propurl', projectid);
  formData.append('token1', process.env.token1);
  formData.append('token2', process.env.token2);
  const finalresult = await fetch(process.env.API_URL + 'properties/promotionpage/', {
    next: { revalidate: 60 },
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  });
  return finalresult.json();
}

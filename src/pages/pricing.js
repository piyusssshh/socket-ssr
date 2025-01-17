import FAQSection from '@/components/faqSection/faqSection';
import { getDbdashData } from './api';
import { useState } from 'react';
import React from 'react';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import Link from 'next/link';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import { getFaqData, getFooterData, getMetaData, getNavData, getPricingBetterChoice } from '@/utils/getData';
import {
    FAQS_FIELDS,
    FOOTER_FIELDS,
    METADATA_FIELDS,
    NAVIGATION_FIELDS,
    PRICINGBETTERCHOICE_FIELDS,
} from '@/const/fields';

export default function pricing({ navData, footerData, faqData, betterChoice, metaData }) {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [isToggled, setIsToggled] = useState(false);

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/pricing'} />
            <div className=" cont py-10 lg:gap-24 gap-6">
                <div className="cont container ">
                    <Navbar navData={navData} utm={'/pricing'} borderClass={'border-b-0'} />
                    <div className="">
                        <div className=" flex flex-col justify-center gap-6  ">
                            <div className="border border-black gradient-background">
                                <div className="h-28 "></div>
                                <div className="grid grid-cols-1 lg:grid-cols-2">
                                    <div className=" flex flex-col gap-8 md:p-12 p-6 justify-center ">
                                        <h1 className="h1">Simple Pricing for Powerful Automation</h1>

                                        <h2 className="sub__h1">
                                            Enjoy a 30-Day Free Trial.
                                            <br />
                                            No credit card required.
                                        </h2>

                                        <label className="cursor-pointer flex flex-row gap-3 items-center p-4 border border-black w-fit hover:bg-slate-50 transition-all duration-300">
                                            <span className="font-semibold text-md  ">BILLED YEARLY </span>
                                            <input
                                                type="checkbox"
                                                className="toggle"
                                                checked={isToggled}
                                                onChange={() => setIsToggled(!isToggled)}
                                            />
                                        </label>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 bg-white ">
                                        <div className="flex flex-col gap-y-2 border border-l-0 min-[1003px]:border-l border-r-0 min-[768px]:border-r border-b-0 border-black font-normal ">
                                            <div className="subheading font-semibold text-md  justify-around mt-12 mx-6">
                                                {'Starter'.toUpperCase()}
                                            </div>
                                            <div className="flex flex-col gap-8 my-12 px-6">
                                                <div classNames="flex flex-col gap-2">
                                                    <p className="text-4xl md:text-6xl font-family-times-now">
                                                        ${isToggled ? 30 * 10 : 30}
                                                    </p>
                                                    <p className="font-normal tracking-wide overflow-hidden">
                                                        {isToggled ? 'YEAR' : 'MONTH'}/WORKSPACE
                                                    </p>
                                                </div>
                                                <div className="flex flex-col font-normal text-normal">
                                                    <div>Invocations: 10,000/Month</div>
                                                    <div>Execution Time Limit: 30 Seconds</div>
                                                    <div>Min. Polling time: 1 Min</div>
                                                    <div>Unlimited Active Workflows</div>
                                                </div>
                                                <div>For individuals who need higher limits.</div>
                                            </div>
                                            <a
                                                href={`/signup?utm_source=pricing&plan=starter&duration=${isToggled ? 'yearly' : 'monthly'}`}
                                                className="flex flex-col items-center mt-auto border-t border-black"
                                            >
                                                <div className="flex justify-center">
                                                    <button className="inline-block text-center p-4 font-semibold text-md ">
                                                        {'Start Free Trial'.toUpperCase()}
                                                    </button>
                                                </div>
                                            </a>
                                        </div>

                                        <div className="flex flex-col gap-y-2 border-t border-black font-normal">
                                            <div className="subheading font-semibold text-md  justify-around mt-12 mx-6">
                                                {'Team'.toUpperCase()}
                                            </div>
                                            <div className="flex flex-col gap-8 my-12 px-6">
                                                <div className="flex flex-col gap-2">
                                                    <div className="text-4xl md:text-6xl font-family-times-now">
                                                        ${isToggled ? 60 * 10 : 60}
                                                    </div>
                                                    <div className="font-normal tracking-wide overflow-hidden">
                                                        {isToggled ? 'YEAR' : 'MONTH'}/WORKSPACE
                                                    </div>
                                                </div>
                                                <div className="flex flex-col font-normal text-normal">
                                                    <div>Invocations: 10,000/Month</div>
                                                    <div>Execution Time Limit: 60 Seconds</div>
                                                    <div>Min. Polling time: 1 Min</div>
                                                    <div>Unlimited Active Workflows</div>
                                                </div>
                                                <div>For teams who want to collaborate on work.</div>
                                            </div>
                                            <a
                                                href={`/signup?utm_source=pricing&plan=team&duration=${isToggled ? 'yearly' : 'monthly'}`}
                                                className="flex justify-center items-center border-t  mt-auto border-black bg-black text-white"
                                            >
                                                <button className="inline-block text-center p-4 font-semibold text-md ">
                                                    {' '}
                                                    {'Start Free Trial'.toUpperCase()}
                                                </button>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>{' '}
                </div>
                <div className="container cont lg:gap-24 gap-6">
                    <div className="border border-black p-6 md:p-12 flex flex-col gap-6">
                        <h2 className="h1 lg:w-1/2">Explore Hundreds of Features, Available on Every Plan</h2>
                        <p className="sub-h1">
                            Get unrestricted access to all features, no matter your choice of plan.
                        </p>
                        <div className="flex justify-start">
                            <Link href={'/features'}>
                                <button className="btn btn-accent">See All Features</button>
                            </Link>
                        </div>
                    </div>
                    {betterChoice?.length > 0 && (
                        <div className=" flex flex-col justify-center">
                            <h2 className="h1 p-6 md:p-12 ">
                                What makes <br /> <span className="text-red-700 italic">viaSocket</span> a better choice
                                ?
                            </h2>

                            <div className="flex flex-col lg:flex-row border border-black">
                                <div className="flex flex-col w-full lg:w-1/2 py-12 md:py-24 px-6 md:px-12 text-base md:text-xl gap-4">
                                    {betterChoice.map((choice, index) => (
                                        <div
                                            key={index}
                                            className={`border-b md:border-b py-3 cursor-pointer ${index === selectedIndex ? 'border-red-300' : ''}`}
                                            onClick={() => setSelectedIndex(index)}
                                        >
                                            <div>{choice.name}</div>

                                            {selectedIndex === index && (
                                                <div
                                                    className="lg:hidden mt-2 text-base md:text-lg text-gray-700"
                                                    style={{
                                                        backgroundImage: `url('/assets/img/pricing.png')`,
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center',
                                                    }}
                                                >
                                                    <div className=" md:p-8 mx-4 md:mx-24">
                                                        <p className="text-base md:text-lg text-white  p-4">
                                                            {choice.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div
                                    className="lg:flex hidden w-full lg:w-1/2 md:py-12 px-6 md:px-12 bg-opacity-200 "
                                    style={{
                                        backgroundImage: `url('/assets/img/pricing.png')`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                >
                                    <div className="p-12 h-full flex items-center justify-center">
                                        <p className="text-base md:text-lg text-white">
                                            {betterChoice[selectedIndex]?.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className=" flex flex-col justify-center py-48">
                        <div className=" border border-t-0 border-black">
                            <div className="flex items-center justify-center sm:-mt-5 md:-mt-5 lg:-mt-8">
                                <div className="border-t border-black flex-grow" />
                                <h2 className="h1 px-4">Free Services for Impactful Organizations</h2>
                                <div className="border-t border-black flex-grow" />
                            </div>

                            <div className="flex flex-col gap-4 md:gap-8 items-center text-center py-8 border-black">
                                <div className="sub__h2 text-center">
                                    We support organizations driving change with free access to our automation solutions
                                </div>
                                <div className="flex justify-center">
                                    <a href="/free-access-programs" target="_blank" className="btn btn-accent">
                                        Get Free Access
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-col border-black border border-b-0 p-6 md:p-12">
                            {faqData && faqData.length > 0 && <FAQSection faqData={faqData} faqName={`/pricing`} />}
                        </div>
                        <Footer footerData={footerData} />
                    </div>
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps() {
    const metaData = await getMetaData(METADATA_FIELDS, `filter=name='/pricing'`);
    const navData = await getNavData(NAVIGATION_FIELDS);
    const footerData = await getFooterData(FOOTER_FIELDS);
    const faqData = await getFaqData(FAQS_FIELDS, `filter=page='/pricing'`);
    const betterChoice = await getPricingBetterChoice(PRICINGBETTERCHOICE_FIELDS);
    return {
        props: {
            betterChoice: betterChoice || [],
            metaData: metaData[0] || {},
            navData: navData || [],
            footerData: footerData || [],
            faqData: faqData || [],
        },
    };
}

import { getDbdashData } from './api';
import GetStarted from '@/components/getStarted/getStarted';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import Image from 'next/image';
import { MdArrowForward, MdClose } from 'react-icons/md';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useEffect, useState } from 'react';
import { FeaturesGrid } from '@/components/featureGrid/featureGrid';
import ComboGrid from '@/components/comboGrid/comboGrid';
import Multiselect from 'multiselect-react-dropdown';
import Industries from '@/assets/data/categories.json';

export async function getServerSideProps() {
    const IDs = ['tblsaw4zp', 'tblvgm05y', 'tblmsw3ci', 'tblvo36my', 'tbl2bk656'];

    const dataPromises = IDs.map((id) => getDbdashData(id));
    const results = await Promise.all(dataPromises);

    const apiHeaders = {
        headers: {
            'auth-key': process.env.NEXT_PUBLIC_INTEGRATION_KEY,
        },
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?limit=200`, apiHeaders);
    const apps = await response.json();

    return {
        props: {
            trustedBy: results[0].data.rows,
            getStartedData: results[1].data.rows,
            productData: results[2].data.rows,
            features: results[3].data.rows,
            metaData: results[4].data.rows,
            apps,
        },
    };
}

const Flow = ({ trustedBy, getStartedData, productData, features, pathArray, metaData, apps }) => {
    let pageData = productData.find((page) => page?.name?.toLowerCase() === 'newflow');
    const [slectedApps, setSelectedApps] = useState([]);
    const [slectedIndus, setSelectedIndus] = useState([]);
    const [comboData, setComboData] = useState();
    const [loading, setLoading] = useState(false);
    const [showNoData, setShowNoData] = useState(false);
    const handleOnSelect = (item) => {
        setShowNoData(false);
        if (!slectedApps.some((app) => app?.rowid === item?.rowid)) {
            setSelectedApps((prevSelectedApps) => [...prevSelectedApps, item]);
        }
    };
    const handleIndusSelect = (item) => {
        setShowNoData(false);
        if (!slectedIndus.some((indus) => indus?.id === item?.id)) {
            setSelectedIndus((prevSelectedIndus) => [...prevSelectedIndus, item]);
        }
    };

    const handleGeneration = async () => {
        setLoading(true);
        setShowNoData(true);
        const serviceParams = slectedApps.map((app) => app?.appslugname);

        const appQureyString = serviceParams.map((service) => `service=${service}`).join('&');
        let indusQureyString = '';
        if (slectedIndus.length > 0) {
            indusQureyString = slectedIndus[0].map((indus) => `industry=${indus?.name?.toLowerCase()}`).join('&');
        }

        const queryString = `${appQureyString}${appQureyString && indusQureyString && '&'}${indusQureyString}`;

        const response = await fetch(`${process.env.NEXT_PUBLIC_INTEGRATION_URL}/recommend/services?${queryString}`, {
            headers: {
                'Content-Type': 'application/json',
                'auth-key': process.env.NEXT_PUBLIC_INTEGRATION_KEY,
            },
        });

        const data = await response.json();
        if (data?.data) {
            setComboData(data?.data);
        }
        setLoading(false);
    };
    const removeAppFromArray = (indexToRemove) => {
        if (indexToRemove >= 0 && indexToRemove < slectedApps.length) {
            const newSelectedApps = slectedApps.filter((_, index) => index !== indexToRemove);
            setSelectedApps(newSelectedApps);
        }
    };

    const formattedIndustries = Industries.industries.map((name, id) => ({ name: name, id: id + 1 }));

    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/flow'} pathArray={pathArray} />
            <div>
                <div className="py-container container flex flex-col gap-14">
                    <div className="gap-4 flex flex-col md:w-2/3">
                        <h1 className="md:text-6xl text-4xl font-bold ">
                            Ask AI to find out all the <span className="text-link"> automation </span>use cases tailored
                            for your business
                        </h1>
                        {/* {pageData?.h1 && <h1 className="md:text-6xl text-4xl font-medium ">{pageData?.h1}</h1>}
                        {pageData?.h2 && <h2 className="text-2xl">{pageData?.h2}</h2>} */}
                    </div>

                    <div className=" flex flex-col gap-6">
                        <h2 className="text-3xl font-semibold flex flex-col sm:flex-row  sm:items-center items-start gap-2">
                            Lets find top automations
                            <MdArrowForward fontSize={28} />{' '}
                        </h2>
                        <div className="flex flex-wrap gap-4">
                            {slectedApps.map((app, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 bg-white w-fit p-3 rounded cursor-pointer "
                                    >
                                        <Image src={app?.iconurl} width={24} height={24} alt="ico" />
                                        <span>{app?.name}</span>
                                        <MdClose
                                            className="text-gray-300 hover:text-gray-950"
                                            onClick={() => {
                                                removeAppFromArray(index);
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <ReactSearchAutocomplete
                            placeholder="Search apps"
                            items={apps}
                            className="lg:w-1/3 sm:w-2/3 w-full jiMOeR"
                            onSelect={handleOnSelect}
                            autoFocus
                        />
                        <Multiselect
                            options={formattedIndustries}
                            onSelect={handleIndusSelect}
                            displayValue="name"
                            placeholder="Select industry"
                        />
                        <button
                            className="btn btn-accent w-fit btn-md  rounded"
                            onClick={handleGeneration}
                            disabled={slectedApps.length === 0}
                        >
                            {loading ? 'Loading...' : 'Ask AI'}
                        </button>
                    </div>
                    <ComboGrid combos={comboData} loading={loading} showNoData={showNoData} />
                </div>
            </div>
            {features && <FeaturesGrid features={features} page={pathArray[1]} />}
            <div className="container my-24">
                {getStartedData && <GetStarted data={getStartedData} isHero={'false'} />}
            </div>
        </>
    );
};
export default Flow;

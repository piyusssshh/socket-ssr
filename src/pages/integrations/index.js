import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import IntegrationSearch from '@/components/integrations/integrationApps';
import GetStarted from '@/components/getStarted/getStarted';
import { getDbdashData } from '../api';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import FAQSection from '@/components/faqSection/faqSection';
import fi from 'date-fns/locale/fi/index';
import { limits, datasetsize } from '../../utils/constant.js';
import axios from 'axios';

const IntegrationSlugPage = ({ getStartedData, responseData, pathArray, metaData, faqData }) => {
    const [apps, setApps] = useState(responseData);
    const [filteredData, setFilteredData] = useState([]);
    const [visibleItems, setVisibleItems] = useState(25);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [loading, setLoading] = useState();
    const [visibleCategories, setVisibleCategories] = useState(10);
    const router = useRouter();
    const { currentcategory } = router.query;
    const [offset, setOffset] = useState(0);
    const [error, seterror] = useState(null);
    const limit = limits;
    const datasize = datasetsize;
    useEffect(() => {
        if (!currentcategory) {
            router.push('/integrations?currentcategory=All');
            return;
        }

        router.push(`/integrations?currentcategory=${currentcategory}`);
    }, []);
    useEffect(() => {
        const fetchPosts = async () => {
            const tag = 'via-socket';
            const defaultTag = 'integrations';
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/fetch-posts?tag=${tag}&defaultTag=${defaultTag}`
            );
            const posts = await res.data;
            setPosts(posts);
        };
        fetchPosts();
    }, []);
    const getdata = async () => {
        try {
            const fetchUrl =
                currentcategory && currentcategory !== 'All'
                    ? `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?category=${
                          currentcategory && currentcategory === 'Other' ? null : currentcategory
                      }` // Update offset for next batch
                    : `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?limit=${limit}&offset=${offset + limit}`;

            const apiHeaders = {
                headers: {
                    'auth-key': process.env.NEXT_PUBLIC_INTEGRATION_KEY,
                },
            };
            const response = await fetch(fetchUrl, apiHeaders);
            if (!response.ok) {
                throw new Error('Failed to load more data');
            }
            const newData = await response.json();
            setApps((prevdata) => [...prevdata, ...newData]);
        } catch (error) {
            seterror(error);
        }
    };
    //fetch apps

    useEffect(() => {
        setApps(responseData);
        setLoading(false);
        setSelectedCategory(currentcategory);
    }, [currentcategory, visibleItems]);

    useEffect(() => {
        setVisibleItems(25);
    }, [selectedCategory]);

    const handleLoadMore = () => {
        setVisibleItems(visibleItems + 25);
        if (visibleItems > datasize) {
            getdata();
            setOffset((offset) => offset + limit);
        }
    };

    const applyFilters = () => {
        if (apps?.length > 0) {
            let filteredItems = apps.filter((item) => {
                const nameMatches = item?.name?.toLowerCase().includes(searchTerm.toLowerCase());
                const categoryMatches =
                    selectedCategory === 'All' || item.category === selectedCategory || !item.category;
                return nameMatches && categoryMatches;
            });

            setFilteredData(filteredItems);
        }
    };
    const applyFiltersOnCategory = () => {
        let tempdata = apps;
        if (tempdata?.length > 0) {
            let filteredItems = tempdata.filter((item) => {
                const nameMatches = item?.name?.toLowerCase().includes(searchTerm.toLowerCase());
                const categoryMatches = item.category.includes(selectedCategory);
                return nameMatches && categoryMatches;
            });
            setFilteredData(filteredItems);
        }
    };
    useEffect(() => {
        if (selectedCategory == 'All') {
            applyFilters();
            return;
        }
        applyFiltersOnCategory();
    }, [apps, searchTerm, currentcategory]);

    const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
    const handleCategoryClick = () => {
        setCategoryDropdownOpen(!isCategoryDropdownOpen);
    };

    const uniqueCategories = [
        'All',
        'Engineering',
        'Productivity',
        'Marketing',
        'IT',
        'Support',
        'Website Builders',
        'Databases',
        'Social Media Accounts',
        'Communication',
        'Accounting',
        'Ads & Conversion',
        'AI Tools',
        'Analytics',
        'App Builder',
        'App Families',
        'Bookmark Managers',
        'Business Intelligence',
        'Calendar',
        'Call Tracking',
        'Website & App Building',
        'Commerce',
        'Communication',
        'Contact Management',
        'Content & Files',
        'CRM (Customer Relationship Management)',
        'Customer Appreciation',
        'Customer Support',
        'Dashboards',
        'Developer Tools',
        'Devices',
        'Documents',
        'Drip Emails',
        'eCommerce',
        'Education',
        'Email',
        'Email Newsletters',
        'Event Management',
        'Fax',
        'File Management & Storage',
        'Filters',
        'Fitness',
        'Forms & Surveys',
        'Fundraising',
        'Gaming',
        'Human Resources',
        'HR Talent & Recruitment',
        'Images & Design',
        'Internet of Things',
        'Proposal & Invoice Management',
        'IT Operations',
        'Online Courses',
        'Lifestyle & Entertainment',
        'Marketing Automation',
        'News & Lifestyle',
        'Notes',
        'Notifications',
        'Payment Processing',
        'Phone & SMS',
        'Printing',
        'Product Management',
        'Productivity',
        'Project Management',
        'Reviews',
        'Sales & CRM',
        'Scheduling & Booking',
        'Security & Identity Tools',
        'Server Monitoring',
        'Signatures',
        'Social Media Marketing',
        'Spreadsheets',
        'Support',
        'Taxes',
        'Team Chat',
        'Team Collaboration',
        'Time Tracking Software',
        'Task Management',
        'Transactional Email',
        'Transcription',
        'URL Shortener',
        'Video & Audio',
        'Video Conferencing',
        'Webinars',
    ];

    const renderFilterOptions = () => {
        return uniqueCategories.slice(0, visibleCategories).map((category, index) => (
            <Link href={`/integrations?currentcategory=${category}`} aria-label="select category" key={index}>
                <h6
                    onClick={() => {
                        setSelectedCategory(category);
                        category !== selectedCategory ? setLoading(true) : '';
                    }}
                    className={`lg:text-[20px] text-base cursor-pointer ${
                        selectedCategory === category ? 'font-bold' : 'font-normal'
                    }`}
                >
                    {category === 'Null' ? 'Other' : category}
                </h6>
            </Link>
        ));
    };

    const handleCategoryLoadMore = () => {
        setVisibleCategories(visibleCategories + 10);
    };

    const handleCategoryItemClick = (category) => {
        setSelectedCategory(category);
        setCategoryDropdownOpen(false);
    };

    const handleLocalStore = (appName) => {
        localStorage.setItem('selectedAppName', appName);
    };

    return (
        <>
            <MetaHeadComp
                metaData={metaData}
                page={'/integrations'}
                pathArray={pathArray}
                plugin={[combos?.plugins?.[pathArray[2]]]}
            />

            <div className="bg-white py-20 ">
                {faqData && faqData.length > 0 && (
                    <div className="container">
                        <FAQSection faqData={faqData} faqName={'/integrations'} />
                    </div>
                )}
            </div>
            <div className="container py-20">
                {getStartedData && <GetStarted data={getStartedData} isHero={'false'} />}
            </div>
        </>
    );
};

export default IntegrationSlugPage;

export async function getServerSideProps(context) {
    const pathSlugs = [];
    const combos = await fetchCombos(pathSlugs);
    const usecase = await getUseCases();

    const IDs = ['tbl2bk656', 'tblvgm05y', 'tblnoi7ng'];

    const dataPromises = IDs.map((id) => getDbdashData(id));
    const results = await Promise.all(dataPromises);

    const tag = 'via-socket';
    const defaultTag = 'integrations';
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/fetch-posts?tag=${tag}&defaulttag=${defaultTag}`
    );
    const posts = await res?.data;

    return {
        props: {
            combos,
            pathSlugs,
            metaData: results[0].data.rows,
            getStartedData: results[1].data.rows,
            faqData: results[2].data.rows,
            usecase: usecase ?? [],
            posts,
        },
    };
}

async function fetchCombos(pathArray) {
    const apiHeaders = {
        headers: {
            'auth-key': process.env.NEXT_PUBLIC_INTEGRATION_KEY,
        },
    };
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/recommend/integrations?service=${pathArray[0]}`,
        apiHeaders
    );
    const responseData = await response.json();
    return responseData;
}

import {
    AGENCIES,
    ALLFEATURES,
    CASESTUDY,
    CATEGORY,
    EXPERTBLOGS,
    FAQS,
    GETSTARTED,
    INDEXFEATURES,
    PAGE,
    PRICINGBETTERCHOICE,
    PROGRAMS,
    TESTIMONIALS,
} from '@/const/tables';
import { FOOTER, METADATA, NAVIGATION } from '@/const/tables';
import getDataFromTable from './getDataFromTable';

const handleData = (data) => {
    return data?.data?.rows;
};

const handleFieldsFilter = (fields, filter) => {
    let queryString = '';

    if (fields?.length > 0) {
        queryString += '?fields=' + fields.join('&fields=');
    }
    if (filter) {
        queryString += (queryString ? '&' : '?') + filter;
    }
    return queryString || null;
};

export async function getNavData() {
    const data = await getDataFromTable(NAVIGATION);
    return handleData(data);
}

export async function getFooterData() {
    const data = await getDataFromTable(FOOTER);
    return handleData(data);
}

export async function getMetaData(fields, filter) {
    const data = await getDataFromTable(METADATA, handleFieldsFilter(fields, filter));
    return handleData(data);
}

export async function getAllFeatures(fields, filter) {
    const data = await getDataFromTable(ALLFEATURES, handleFieldsFilter(fields, filter));
    return handleData(data);
}

export async function getFeatureData(fields, filter) {
    const data = await getDataFromTable(ALLFEATURES, handleFieldsFilter(fields, filter));
    return handleData(data);
}
export async function getFaqData(fields, filter) {
    const data = await getDataFromTable(FAQS, handleFieldsFilter(fields, filter));
    return handleData(data);
}
export async function getCategoryData(fields, filter) {
    const data = await getDataFromTable(CATEGORY, handleFieldsFilter(fields, filter));
    return handleData(data);
}

export async function getTestimonialData(fields, filter) {
    const data = await getDataFromTable(TESTIMONIALS, handleFieldsFilter(fields, filter));
    return handleData(data);
}

export async function getCaseStudyData(fields, filter) {
    const data = await getDataFromTable(CASESTUDY, handleFieldsFilter(fields, filter));
    return handleData(data);
}

export async function getGetStartedData(fields, filter) {
    const data = await getDataFromTable(GETSTARTED, handleFieldsFilter(fields, filter));
    return handleData(data);
}

export async function getIndexFeatures(fields, filter) {
    const data = await getDataFromTable(INDEXFEATURES, handleFieldsFilter(fields, filter));
    return handleData(data);
}

export async function getPageData(fields, filter) {
    const data = await getDataFromTable(PAGE, handleFieldsFilter(fields, filter));
    return handleData(data);
}

export async function getAgencies(fields, filter) {
    const data = await getDataFromTable(AGENCIES, handleFieldsFilter(fields, filter));
    return handleData(data);
}

export async function getExpertBlogs(fields, filter) {
    const data = await getDataFromTable(EXPERTBLOGS, handleFieldsFilter(fields, filter));
    return handleData(data);
}

export async function getPricingBetterChoice(fields, filter) {
    const data = await getDataFromTable(PRICINGBETTERCHOICE, handleFieldsFilter(fields, filter));
    return handleData(data);
}

export async function getProgramsData(fields, filter) {
    const data = await getDataFromTable(PROGRAMS, handleFieldsFilter(fields, filter));
    return handleData(data);
}

export async function getBlogData() {
    const tag = 'via-socket';
    const defaultTag = 'integrations';
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/fetch-posts?tag=${tag}&defaulttag=${defaultTag}`
        );
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const posts = await res.json();
        return posts;
    } catch (error) {
        console.error('Error fetching blog data:', error);
        return [];
    }
}

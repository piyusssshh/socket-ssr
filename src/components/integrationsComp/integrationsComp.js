import IntegrationsHero from './integrationsHero/integrationsHero';
import IntegrationsApps from './integrationsApps/integrationsApps';
import FAQSection from '../faqSection/faqSection';
import IntegrationsAbout from './integrationsAbout/integrationsAbout';
import BlogGrid from '../blogGrid/blogGrid';
import UseCase from '../useCases/useCases';
import IntegrationEvents from './integrationEvents/integrationEvents';
import GetStarted from '../getStarted/getStarted';
import IntegrationFooter from './integrationsFooter/integrationsFooter';
import Footer from '../footer/footer';

export default function IntegrationsComp({
    apps,
    posts,
    combinationData,
    pluginData,
    type,
    faqData,
    faqName,
    usecases,
    getStartedData,
    pathSlugs,
    hideApps,
    showCategories,
    query,
    utm,
}) {
    return (
        <>
            <IntegrationsHero combinationData={combinationData} pluginData={pluginData} utm={utm} />

            {type !== 'doubleApp' && !hideApps && (
                <IntegrationsApps apps={apps} pluginData={pluginData} showCategories={showCategories} query={query} />
            )}

            {pluginData?.length && <IntegrationEvents plugins={pluginData} pathSlugs={pathSlugs} />}

            {usecases?.length > 0 && (
                <div className="container mx-auto py-24">
                    <UseCase usecases={usecases} />
                </div>
            )}

            {posts?.length > 0 && (
                <div className="container my-24">
                    {' '}
                    <BlogGrid posts={posts} />
                </div>
            )}

            {faqData && faqName && (
                <div className="container my-24">
                    {' '}
                    <FAQSection faqData={faqData} faqName={faqName} />
                </div>
            )}

            {pluginData?.length && <IntegrationsAbout plugins={pluginData} />}

            <IntegrationFooter getStartedData={getStartedData} />
        </>
    );
}

import React from 'react';
import Link from 'next/link';
import { MdOutlineArrowForward } from 'react-icons/md';
import { LinkButton } from '../uiComponents/buttons';
const BlogGrid = ({ posts }) => {
    return (
        <>
            <div className="flex flex-col gap-9">
                <h2 className="md:text-6xl text-4xl font-medium">
                    Know More About <br />
                    Viasocket Integrations
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
                    {posts.map((post, index) => (
                        <CardComponent key={index} card={post} />
                    ))}
                </div>
                <div className="flex justify-center ">
                    <Link href="/blog" target="_blank" className="btn btn-accent">
                        Read More Blogs
                    </Link>
                </div>
            </div>
        </>
    );
};

const CardComponent = ({ card }) => {
    return (
        <div className="card card-compact bg-white-100 w-70  hover:shadow-2xl bg-neutral">
            <figure className="h-60">
                <img src={card?.thumbnail} alt={card?.title} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{card?.title}</h2>
                <p className="text-base">{card?.description}</p>
                <div className="card-actions justify-start">
                    <LinkButton href={`/blog/${card?.slug}`} title="Read more" />
                </div>
            </div>
        </div>
    );
};
export default BlogGrid;

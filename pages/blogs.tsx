import BlogCard from '@/components/BlogCard';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { useEffect, useState } from 'react';

interface PostApiResponce{
    postInfo: {
        title: string;
        slug: string;
        meta: string;
    }[];
}

export const getStaticProps : GetStaticProps = async () => {
    const {postInfo} : PostApiResponce = await fetch('http://localhost:3000/api/posts').then(data=> data.json());

    return {
        props: {posts: postInfo},
    }
};

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Blogs : NextPage<Props> = ({posts}) => {

    return (
        <div className='max-w-3xl mx-auto p-5 space-y-5'>
        {posts.map((post: {
            slug: string; title: string; desc: string; meta: string; }) => (
        // eslint-disable-next-line react/jsx-key
        <BlogCard key={post.slug } title={post.title} desc={post.meta} slug={post.slug}/>
        ))}
        </div>
    )
};
export default Blogs;
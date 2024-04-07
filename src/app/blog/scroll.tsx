'use client'
import { useIntersection } from '@mantine/hooks';
import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query'


const posts = [
    { id: 1, title: 'Post 1' },
    { id: 2, title: 'Post 2' },
    { id: 3, title: 'Post 3' },
    { id: 4, title: 'Post 4' },
    { id: 5, title: 'Post 5' },
    { id: 6, title: 'Post 6' },
    { id: 7, title: 'Post 7' },
    { id: 8, title: 'Post 8' },
    { id: 9, title: 'Post 9' },
    { id: 10, title: 'Post 10' },
]
const fetchPost = async (page: number) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return posts.slice((page-1)*2, page*2);
}

const Pagination = () => {
    const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
        ['query'],
        async ({ pageParam = 1 }) => {
            const response = await fetchPost(pageParam);
            return response;
        },
        {
            getNextPageParam: (lastPage: any, allPages: any) => {
                return allPages.length + 1;
            },
            initialData: {
                pages: [posts.slice(0, 2)],
                pageParams: [1],
            },
        }
    );

    const lastPostRef = useRef<HTMLElement>(null);
    const {ref, entry} = useIntersection({
        root: lastPostRef.current,
        threshold: 1
    });

    useEffect(() => {
        if(entry?.isIntersecting){
            fetchNextPage();
        }
    }, [entry]);

    const _posts = data?.pages.flatMap((page) => page);

    return(
        <div>
            posts:
            {_posts?.map((post, index) => {
                if(index === _posts.length - 1){
                    return <div className="h-80 bg-yellow text-black" key={post.id} ref={ref}></div>
                }
                return <div className="h-80 bg-yellow text-black" key={post.id}>{post.title}</div>
            })}
            <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                {isFetchingNextPage 
                ? 'Loading...' 
                : ((data?.pages.length ?? 0) < 3 
                ? 'Load More' 
                : 'Nothing more to load')}
            </button>
        </div>
    )
}
export default Pagination;
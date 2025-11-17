"use client";
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import PostItem from "@/components/post-item";
import Pagination from "@/components/pagination";
import LoadingCustom from '@/components/loading-custom';

export default function BlogListing() {
  const searchParams = useSearchParams()
  const page = searchParams.get('page') ? searchParams.get('page') : "1";
  const currentpage = searchParams.get('page') ? searchParams.get('page') : "1";
  const [blogData, setBlogs] = useState([]);
  const [message, setMessage] = useState('');
  const [totalrecords, setTotalrecords] = useState('');
  const [perpagerecord, setPerpagerecord] = useState('');
  const [number_of_page, setNumberofpage] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const formData = new URLSearchParams();
    formData.append('token1', process.env.token1);
    formData.append('token2', process.env.token2);
    formData.append('page', page);
    fetch(process.env.API_URL + 'blogs/', {
      method: 'POST',
      cache: 'force-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        setBlogs(result.blogdata);
        setMessage(result.message);
        setTotalrecords(result.totalrecords);
        setPerpagerecord(result.perpagerecord);
        setNumberofpage(Math.ceil(result.totalrecords / result.perpagerecord))
        setLoading(false)
      })
  }, [page]);

  const pageName = 'post';

  return (
    <>
      {loading ? (
        <LoadingCustom />
      ) : (
        <>
          <div className="gap-8 md:gap-16 columns-1 sm:columns-2">
            {blogData.map((item) => (
              <div key={item.id} className='others-item mb-14 break-inside-avoid'>
                <PostItem postItem={item} className="" />
              </div>
            ))}
          </div>
          {totalrecords > perpagerecord && (
            <div className="border-t mt-12 pt-4">
              <Pagination
                totalrecord={totalrecords}
                pagename={pageName}
                currentpage={page}
                numberofpage={number_of_page}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}
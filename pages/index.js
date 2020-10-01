import React, { useState, useEffect } from 'react';

const client = require('contentful').createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
})

const HomePage = () => {
  async function fetchEntries() {
    const entries = await client.getEntries();
    if (!entries.items) {
      //console.log("error getting entries for ${contentType.name")
    }
    return entries.items;
  }

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const allPosts = await fetchEntries();
      sestPosts([...allPosts]);
    }
    getPosts();
  }, []);
  var mappedPosts = posts.map(p => (
    <Post alt={p.fields.alt}
      date={p.fields.date}
      key={p.fields.title}
      image={p.fields.image}
      title={p.fields.title}
      url={p.fields.url}
    />
  ));

  var renderedPosts = posts.length > 0 ? mappedPosts : null;
  return (
    <>
      <Head>
        <title>NextJS + Contentful + Vercel</title>
        <link rel="stylesheet" href="https://css.zeit.sh/v1.css" type="text/css" />
      </Head>

      {renderedPosts}
    </>
  )
}

export default HomePage;
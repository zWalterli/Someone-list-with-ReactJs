import "./styles.css";
import { useCallback, useEffect, useState } from "react";
import { Posts } from "../../components/Posts";
import { LoadPosts } from "../../utils/LoadPosts";
import { Button } from "../../components/Buton/index";
import { TextInput } from "../../components/TextInput";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  const noMorePostNext = page * postsPerPage >= allPosts.length;
  const noMorePostPrevius = page === 1;

  const filteredPosts = !searchValue
    ? posts
    : allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      });

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const previusPosts = () => {
    let nextPage = page - 1;
    let indexForSlice = (nextPage - 1) * postsPerPage;
    const nextPosts = allPosts.slice(
      indexForSlice,
      indexForSlice + postsPerPage
    );

    setPosts(nextPosts);
    setPage(nextPage);
  };

  const nextPosts = () => {
    let nextPage = page + 1;
    let indexForSlice = (nextPage - 1) * postsPerPage;

    const nextPosts = allPosts.slice(
      indexForSlice,
      indexForSlice + postsPerPage
    );

    setPosts(nextPosts);
    setPage(nextPage);
  };

  const handleLoadPosts = useCallback(async () => {
    const postAndPhotos = await LoadPosts();

    setPosts(postAndPhotos.slice((page - 1) * postsPerPage, postsPerPage));
    setAllPosts(postAndPhotos);
  }, []);

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && <h1>Search Value: {searchValue} </h1>}

        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>
      <Posts posts={filteredPosts} />

      <div className="button-container">
        {!searchValue && (
          <>
            <Button
              onClick={previusPosts}
              disabled={noMorePostPrevius}
              text="Previus"
            ></Button>
            <Button
              onClick={nextPosts}
              disabled={noMorePostNext}
              text="Next"
            ></Button>
          </>
        )}
      </div>
    </section>
  );
};

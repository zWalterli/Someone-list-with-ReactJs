import "./styles.css";
import { Component } from "react";
import { Posts } from "../../components/Posts";
import { LoadPosts } from "../../utils/LoadPosts";
import { Button } from "../../components/Buton/index";
import { TextInput } from "../../components/TextInput";

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 1,
    postsPerPage: 10,
    searchValue: "",
  };

  componentDidMount = async () => {
    await this.loadPosts();
  };

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postAndPhotos = await LoadPosts();

    this.setState({
      posts: postAndPhotos.slice((page - 1) * postsPerPage, postsPerPage),
      allPosts: postAndPhotos,
    });
  };

  previusPosts = () => {
    const { allPosts, page, postsPerPage } = this.state;

    let nextPage = page - 1;
    let indexForSlice = (nextPage - 1) * postsPerPage;
    const nextPosts = allPosts.slice(
      indexForSlice,
      indexForSlice + postsPerPage
    );

    this.setState({
      posts: nextPosts,
      page: nextPage,
    });
  };

  nextPosts = () => {
    const { allPosts, page, postsPerPage } = this.state;

    let nextPage = page + 1;
    let indexForSlice = (nextPage - 1) * postsPerPage;

    const nextPosts = allPosts.slice(
      indexForSlice,
      indexForSlice + postsPerPage
    );

    this.setState({
      posts: nextPosts,
      page: nextPage,
    });
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  };

  render() {
    const { posts, page, allPosts, postsPerPage, searchValue } = this.state;

    const noMorePostNext = page * postsPerPage >= allPosts.length;
    const noMorePostPrevius = page === 1;

    const filteredPosts = !searchValue
      ? posts
      : allPosts.filter((post) => {
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
        });

    return (
      <section className="container">
        <div className="search-container">
          {!!searchValue && <h1>Search Value: {searchValue} </h1>}

          <TextInput
            searchValue={searchValue}
            handleChange={this.handleChange}
          />
        </div>
        <Posts posts={filteredPosts} />

        <div className="button-container">
          {!searchValue && (
            <>
              <Button
                onClick={this.previusPosts}
                disabled={noMorePostPrevius}
                text="Previus"
              ></Button>
              <Button
                onClick={this.nextPosts}
                disabled={noMorePostNext}
                text="Next"
              ></Button>
            </>
          )}
        </div>
      </section>
    );
  }
}

export default Home;

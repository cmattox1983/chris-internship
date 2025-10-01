import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const [author, setAuthor] = useState({
    authorImage: AuthorImage,
    authorName: "",
    tag: "",
    address: "",
    followers: 0,
    nftCollection: [],
  });
  const [loading, setLoading] = useState(true);
  const { authorId } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);

  async function fetchAuthor(authorId) {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
      );
      setAuthor(data);
      setIsFollowing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAuthor(authorId);
  }, [authorId]);

  const followerCount = author.followers + (isFollowing ? 1 : 0);
  const updateFollowerCount = (e) => {
    e.preventDefault();
    setIsFollowing(!isFollowing);
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              {loading ? (
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton
                          width="150px"
                          height="150px"
                          borderRadius="100%"
                        />
                        <div className="profile_name">
                          <h4>
                            <div>
                              <Skeleton height="31px" width="200px" />
                            </div>
                            <div>
                              <Skeleton height="31px" width="100px" />
                            </div>
                            <div>
                              <Skeleton height="31px" width="200px" />
                            </div>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          <Skeleton height="26px" width="102px" />
                        </div>
                        <Skeleton
                          width="123px"
                          height="42px"
                          borderRadius="6px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={author.authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {author.authorName}
                            <span className="profile_username">
                              @{author.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {author.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {followerCount} followers
                        </div>
                        <Link
                          to="#"
                          className="btn-main"
                          onClick={updateFollowerCount}
                        >
                          {isFollowing ? "Unfollow" : "Follow"}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems loading={loading} author={author} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;

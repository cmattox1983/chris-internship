import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchTopSellers() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      );
      setTopSellers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTopSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            <div className="col-md-12" data-aos="fade-in">
              <ol className="author_list">
                {new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Skeleton
                        width="50px"
                        height="50px"
                        borderRadius="100%"
                      />
                    </div>
                    <div className="author_list_info">
                      <Skeleton width="50%" height="16px" />
                      <span>
                        <Skeleton width="25%" height="16px" />
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ) : (
            <div className="col-md-12" data-aos="fade-in">
              <ol className="author_list">
                {topSellers.map((item) => (
                  <li key={item.id}>
                    <div className="author_list_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img
                          className="pp-author"
                          src={item.authorImage}
                          alt=""
                          loading="lazy"
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${item.authorId}`}>
                        {item.authorName}
                      </Link>
                      <span>{item.price} ETH</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopSellers;

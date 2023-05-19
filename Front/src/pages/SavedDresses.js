import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { Container } from "../components/Container";
import { MetaData } from "../components/MetaData";
import ClipLoader from "react-spinners/ClipLoader";

export const SavedDresses = () => {
  const base_url = process.env.REACT_APP_BASE_URL;
  const [cookie, setCookie] = useCookies(["refreshToken"]);
  let [loading, setLoading] = useState(true);
  const [dresslist, setdresslist] = useState([]);

  useEffect(() => {
    const postURL = `${base_url}/user-request/savedDress`;
    fetch(postURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: cookie.refreshToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setdresslist(data.data);
        setLoading(false);
      })
      .catch((err) => toast.error("fetch failed"));
  }, []);
  return (
    <>
      {loading ? (
        <Container
          class1={
            "cart-wrapper home-wrapper-2 d-flex position-fixed top-50 start-50 translate-middle"
          }>
          <ClipLoader
            color={"orange"}
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </Container>
      ) : (
        <>
          <MetaData title="Saved Dress" />
          {dresslist ? (
            <Container class1={"login-wrapper home-wrapper-2 py-5"}>
              <div className="d-flex  justify-content-between flex-wrap gap-4">
                {dresslist.map((element, index) => {
                  return (
                    <div className="card flex-fill" key={index}>
                      <div className="card-body row">
                        <div className="col-8">
                          <p>Category: {element.category}</p>
                          <p>Dress Type: {element.dressType}</p>
                          <p>Color: {element.dressColor}</p>
                        </div>
                        <div className="col-4">
                          <div className="d-flex flex-wrap gap-4">
                            <div className="card">
                              <div className="card-body p-2">
                                <img
                                  src={element.dressImage.url}
                                  // className="img-fluid"
                                  alt="dress"
                                  width="100"
                                  height="100"
                                />
                              </div>
                            </div>
                            <div className="card">
                              <div className="card-body p-2">
                                <img
                                  src={element.accImage.url}
                                  // className="img-fluid"
                                  alt="dress"
                                  width="100"
                                  height="100"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Container>
          ) : (
            <Container
              class1={
                "login-wrapper home-wrapper-2 py-5 emptySaved"
              }></Container>
          )}
        </>
      )}
    </>
  );
};

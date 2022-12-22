import React, { useEffect } from "react";
import { trackURL } from "../trackURL";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthorized = useSelector(state => state.isAuthorized);
  const currentURL = window.location.href;

  const name = useSelector(state => state.name);
  useEffect(() => {
    trackURL(currentURL, dispatch, isAuthorized);
  }, [currentURL]);

  return (
    <div style={{ marginTop: "15%" }}>
      <h1>
        Welcome, <span style={{ color: "#1976d2" }}>{name ? name : 'Jasper'}</span> <br /> To the
        Mason Application!
      </h1>
    </div>
  );
};

export default Main;

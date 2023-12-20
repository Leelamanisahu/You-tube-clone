import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../Components/Card";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/${type}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [type]);

  return (
    <Container>
      {videos.map((videos) => {
        return <Card key={videos._id} video={videos} />;
      })}
    </Container>
  );
};

export default Home;

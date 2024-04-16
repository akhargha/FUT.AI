import * as React from "react";
import FixtureBox from "./Components/FixtureBox";
import NavBar from "./Components/NavBar";
import { supabase } from '../src/supabase_client';

const Blog = () => {
  console.log(supabase);
  return (
    <div>
      <NavBar />
      <FixtureBox />
      <h1>ABS</h1>
    </div>
  );
};

export default Blog;

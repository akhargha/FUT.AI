import * as React from "react";
import FixtureBox from "./Components/FixtureBox";
import NavBar from "./Components/NavBar";
import Modal from '@mui/joy/Modal';
import Button from '@mui/joy/Button';
import ModalClose from '@mui/joy/ModalClose';
import { supabase } from '../src/supabase_client';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardCover from '@mui/joy/CardCover';

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

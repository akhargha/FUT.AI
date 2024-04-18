import React, { useState, useEffect } from 'react';
import FixtureBox from './Components/FixtureBox';
import NavBar from './Components/NavBar';
import Modal from '@mui/joy/Modal';
import Card from '@mui/joy/Card';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { supabase } from '../src/supabase_client';
import { Grid } from '@mui/joy';

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [favouriteTeams, setFavouriteTeams] = useState([]);
  const [openModalId, setOpenModalId] = useState(null);

  useEffect(() => {
    const fetchFavouriteTeams = async () => {
      const { data, error } = await supabase.from('favourite_team').select('team_name');
      if (error) {
        console.log('Error fetching favourite teams', error);
      } else {
        setFavouriteTeams(data.map(team => team.team_name));
      }
    };

    const fetchArticles = async () => {
      const { data, error } = await supabase.from('articles').select('home_team, away_team, article_data');
      if (error) {
        console.log('Error fetching articles', error);
      } else {
        // Filter articles where home_team or away_team is in favouriteTeams
        setArticles(data.filter(article =>
          favouriteTeams.includes(article.home_team) || favouriteTeams.includes(article.away_team)
        ));
      }
    };

    fetchFavouriteTeams().then(fetchArticles);
  }, [favouriteTeams.length]);

  const handleOpenModal = (id) => {
    setOpenModalId(id);
  };

  const handleCloseModal = () => {
    setOpenModalId(null);
  };

  return (
    <div>
      <NavBar />
      <React.Fragment>
      <Grid container spacing={2} sx={{ padding: '20px'}}>
        {articles.map((article, index) => (
          <>
            {/* Conditionally render cards and modals for home_team and away_team if they match a favourite team */}
            {[article.home_team, article.away_team].map((team, idx) => 
              favouriteTeams.includes(team) && (
                <React.Fragment key={`${team}-${index}`}>
                  <Grid item xs={3} key={index}>
                  <Card
                    variant="outlined"
                    onClick={() => handleOpenModal(`${team}-${index}`)}
                    sx={{
                      width: 300,
                      height: 300,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                      borderRadius: 'md',
                      boxShadow: 'lg',
                      bgcolor: "success",
                      "&:hover": {
                        bgcolor: "success.200",
                      },
                    }}
                  >
                    <Typography level="h4" component="div">
                      {team}
                    </Typography>
                  </Card>

                  <Modal
                    open={openModalId === `${team}-${index}`}
                    onClose={handleCloseModal}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Sheet
                      variant="outlined"
                      sx={{
                        maxWidth: 500,
                        borderRadius: 'md',
                        p: 3,
                        boxShadow: 'lg',
                      }}
                    >
                      <ModalClose variant="plain" sx={{ m: 1 }} />
                      <Typography textColor="text.tertiary">
                        {article.article_data}
                      </Typography>
                    </Sheet>
                  </Modal>
                  </Grid>
                </React.Fragment>
              )
            )}
          </>
        ))}
        </Grid>
      </React.Fragment>
    </div>
  );
};

export default Blog;

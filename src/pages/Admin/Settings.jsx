import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import Header from '../../components/Header';

export default () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header title="Admin Settings" onBackClick={() => navigate(-1)} />

      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/tags">
            <ListItemText primary="Tags" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/ingredients">
            <ListItemText primary="Ingredients" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/authors">
            <ListItemText primary="Authors" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/recipes">
            <ListItemText primary="Recipes" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/recipes/add">
            <ListItemText primary="Create Recipe" />
          </ListItemButton>
        </ListItem>
      </List>
    </Container>
  );
};

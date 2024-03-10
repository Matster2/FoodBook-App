import { Container, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Header from 'src/components/Header';

export default () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header title="Admin" onBackClick={() => navigate(-1)} />

      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/ingredients">
            <ListItemText primary="Ingredients" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/equipment">
            <ListItemText primary="Equipment" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/recipes">
            <ListItemText primary="Recipes" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/authors">
            <ListItemText primary="Authors" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/tags">
            <ListItemText primary="Tags" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/collections">
            <ListItemText primary="Collections" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/support-tickets">
            <ListItemText primary="Support Tickets" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/logs">
            <ListItemText primary="Logs" />
          </ListItemButton>
        </ListItem>
      </List>
    </Container>
  );
};

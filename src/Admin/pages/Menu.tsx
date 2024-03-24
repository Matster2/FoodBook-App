import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import PageLayout from 'src/layouts/PageLayout';

const Menu = () => {
  return (
    <PageLayout
      breadcrumbs={[
        <Link to="/admin">Admin</Link>,
      ]}
      title="Admin"
    >

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
    </PageLayout>
  );
};

export default Menu;
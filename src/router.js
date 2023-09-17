import { createBrowserRouter, useParams } from 'react-router-dom';

import AdminRoute from 'routings/AdminRoute';
import AuthRoute from 'routings/AuthRoute';
import MaintenanceRoute from 'routings/MaintenanceRoute';
import UnAuthRoute from 'routings/UnAuthRoute';

import AccountSettings from 'pages/Account/AccountSettings';
import ChangeEmail from 'pages/Account/ChangeEmail';
import ChangePassword from 'pages/Account/ChangePassword';
import AdminAddAuthor from 'pages/Admin/AddAuthor';
import AdminAuthors from 'pages/Admin/Authors';
import AdminEquipment from 'pages/Admin/Equipment';
import AdminEquipments from 'pages/Admin/Equipments';
import AdminIngredient from 'pages/Admin/Ingredient';
import AdminIngredients from 'pages/Admin/Ingredients';
import AdminLogs from 'pages/Admin/Logs';
import AdminRecipe from 'pages/Admin/Recipe';
import AdminRecipes from 'pages/Admin/Recipes';
import AdminSettings from 'pages/Admin/Settings';
import AdminSupportTickets from 'pages/Admin/SupportTickets';
import AdminTag from 'pages/Admin/Tag';
import AdminTags from 'pages/Admin/Tags';
import Author from 'pages/Author';
import ContactUs from 'pages/ContactUs';
import Favourites from 'pages/Favourites';
import ForgottenPassword from 'pages/ForgottenPassword';
import Homepage from 'pages/Homepage';
import IngredientList from 'pages/IngredientList';
import NotFound from 'pages/NotFound';
import Personal from 'pages/Personal';
import PersonalRecipe from 'pages/PersonalRecipe';
import Planner from 'pages/Planner';
import PrivacyPolicy from 'pages/PrivacyPolicy';
import _Recipe from 'pages/Recipe';
import Recipes from 'pages/Recipes';
import Register from 'pages/Register';
import ResetPassword from 'pages/ResetPassword';
import Settings from 'pages/Settings';
import SignIn from 'pages/SignIn';
import TermsOfService from 'pages/TermsOfService';
import Version from 'pages/Version';

import MainLayout from 'layouts/MainLayout';

const ErrorBoundary = () => {
  // let error = useRouteError();
  return <NotFound />;
} 

const Recipe = () => {
  const { id } = useParams();

  return <_Recipe key={id} />
}

export default createBrowserRouter([
  {
    element: (
      <MaintenanceRoute>
        <MainLayout />  
      </MaintenanceRoute>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        element: <Homepage />,
      },
      {
        path: '/home',
        element: <Homepage />,
      },
      {
        path: '/recipes',
        element: <Recipes />,
      },
      {
        path: '/favourites',
        element: <Favourites />,
      },
      {
        path: '/personal',
        element: <Personal />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '/account',
        element: (
          <AuthRoute>
            <AccountSettings />
          </AuthRoute>
        ),
      },
      {
        path: '/change-email',
        element: (
          <AuthRoute>
            <ChangeEmail />
          </AuthRoute>
        ),
      },
      {
        path: '/change-password',
        element: (
          <AuthRoute>
            <ChangePassword />
          </AuthRoute>
        ),
      },
      {
        path: '/contact-us',
        element: <ContactUs />,
      },
      {
        path: '/recipes/:id/edit',
        element: (
          <AuthRoute>
            <PersonalRecipe />
          </AuthRoute>
        ),
      },
      {
        path: '/recipes/create',
        element: (
          <AuthRoute>
            <PersonalRecipe />
          </AuthRoute>
        ),
      },
      {
        path: '/planner',
        element: <Planner />,
      },
      {
        path: '/ingredient-list',
        element: (
          <AuthRoute>
            <IngredientList />
          </AuthRoute>
        ),
      },
      {
        path: '/authors/:id',
        element: <Author />,
      },
      {
        path: '/admin/settings',
        element: (
          <AdminRoute>
            <AdminSettings />
          </AdminRoute>
        ),
      },
      {
        path: '/admin/tags',
        element: (
          <AdminRoute>
            <AdminTags />
          </AdminRoute>
        ),
      },
      {
        path: '/admin/tags/add',
        element: (
          <AdminRoute>
            <AdminTag />
          </AdminRoute>
        ),
      },
      {
        path: '/admin/tags/:id',
        element: (
          <AdminRoute>
            <AdminTag />
          </AdminRoute>
        ),
      },
      {
        path: '/admin/ingredients',
        element: (
          <AdminRoute>
            <AdminIngredients />
          </AdminRoute>
        ),
      },
      {
        path: '/admin/ingredients/add',
        element: (
          <AdminRoute>
            <AdminIngredient />
          </AdminRoute>
        ),
      },
      {
        path: '/admin/ingredients/:id',
        element: (
          <AdminRoute>
            <AdminIngredient />
          </AdminRoute>
        ),
      },
      {
        path: '/admin/equipment',
        element: (
          <AdminRoute>
            <AdminEquipments />
          </AdminRoute>
        ),
      },
      {
        path: '/admin/equipment/add',
        element: (
          <AdminRoute>
            <AdminEquipment />
          </AdminRoute>
        ),
      },
      {
        path: '/admin/equipment/:id',
        element: (
          <AdminRoute>
            <AdminEquipment />
          </AdminRoute>
        ),
      },
      {
        path: '/admin/authors',
        element: (
          <AdminRoute>
            <AdminAuthors />
          </AdminRoute>
        ),
      },
      {
        path: '/admin/authors/add',
        element: (
          <AdminRoute>
            <AdminAddAuthor />
          </AdminRoute>
        ),
      },
      {
        path: '/admin/recipes',
        element: (
          <AdminRoute>
            <AdminRecipes />
          </AdminRoute>
        ),
      },
      {
        path: '/admin/recipes/add',
        element: (
          <AdminRoute>
            <AdminRecipe />
          </AdminRoute>
        ),
      },
      {
        path: '/admin/recipes/:id',
        element: (
          <AdminRoute>
            <AdminRecipe />
          </AdminRoute>
        ),
      },
      {
        path: '/admin/support-tickets',
        element: (
          <AdminRoute>
            <AdminSupportTickets />
          </AdminRoute>
        ),
      },
      {
        path: '/admin/logs',
        element: (
          <AdminRoute>
            <AdminLogs />
          </AdminRoute>
        ),
      },
    ]
  },
  {    
    element: (
      <MaintenanceRoute>
        <MainLayout />  
      </MaintenanceRoute>
    ), // Change when hidable
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/sign-in',
        element: (
          <UnAuthRoute>
            <SignIn />
          </UnAuthRoute>
        ),
      },
      {
        path: '/forgotten-password',
        element: (
          <UnAuthRoute>
            <ForgottenPassword />
          </UnAuthRoute>
        ),
      },
      {
        path: '/register',
        element: (
          <UnAuthRoute>
            <Register />
          </UnAuthRoute>
        ),
      },
      {
        path: '/reset-password',
        element: <ResetPassword />
      },
      {
        path: '/recipes/:id',
        element: <Recipe />
      },
      {
        path: '/privacy-policy',
        element: <PrivacyPolicy />,
      },
      {
        path: '/terms-of-service',
        element: <TermsOfService />,
      },
    ],
  },
  {
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: 'version',
        element: <Version />
      },
      {
        path: '*',
        element: (
          <MaintenanceRoute>          
            <NotFound />
          </MaintenanceRoute>
        ),
      },
    ]
  }
]);

import { createBrowserRouter, useParams } from 'react-router-dom';

import AdminRoute from 'src/routings/AdminRoute';
import AuthRoute from 'src/routings/AuthRoute';
import MaintenanceRoute from 'src/routings/MaintenanceRoute';
import UnAuthRoute from 'src/routings/UnAuthRoute';

import AccountSettings from 'src/pages/account/AccountSettings';
import ChangeEmail from 'src/pages/account/ChangeEmail';
import ChangePassword from 'src/pages/account/ChangePassword';
import AdminAuthor from 'src/Admin/pages/Author';
import AdminAuthors from 'src/Admin/pages/Authors';
import AdminCollection from 'src/Admin/pages/Collection';
import AdminCollections from 'src/Admin/pages/Collections';
import AdminEquipment from 'src/Admin/pages/Equipment';
import AdminEquipments from 'src/Admin/pages/Equipments';
import AdminIngredient from 'src/Admin/pages/Ingredient';
import AdminIngredients from 'src/Admin/pages/Ingredients';
import AdminLogs from 'src/Admin/pages/Logs';
import AdminRecipe from 'src/Admin/pages/Recipe';
import AdminRecipes from 'src/Admin/pages/Recipes';
import AdminMenu from 'src/Admin/pages/Menu';
import AdminSupportTickets from 'src/Admin/pages/SupportTickets';
import AdminTag from 'src/Admin/pages/Tag';
import AdminTags from 'src/Admin/pages/Tags';
import Author from 'src/pages/Author';
import ContactUs from 'src/pages/ContactUs';
import Favourites from 'src/pages/Favourites';
import ForgottenPassword from 'src/pages/ForgottenPassword';
import Homepage from 'src/pages/Homepage';
import IngredientList from 'src/pages/IngredientList';
import NotFound from 'src/pages/NotFound';
import Personal from 'src/pages/Personal';
import PersonalRecipe from 'src/pages/PersonalRecipe';
import Planner from 'src/pages/Planner';
import PrivacyPolicy from 'src/pages/legal/PrivacyPolicy';
import _Recipe from 'src/pages/Recipe';
import Recipes from 'src/pages/Recipes';
import Register from 'src/pages/Register';
import ResetPassword from 'src/pages/ResetPassword';
import Settings from 'src/pages/Settings';
import SignIn from 'src/pages/SignIn';
import TermsOfService from 'src/pages/legal/TermsOfService';
import Version from 'src/pages/Version';

import MainLayout from 'src/layouts/MainLayout';

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
            <AdminMenu />
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
            <AdminAuthor />
          </AdminRoute>
        ),
      },
      {
        path: '/admin/authors/:id',
        element: (
          <AdminRoute>
            <AdminAuthor />
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
        path: '/admin/collections',
        element: (
          <AdminRoute>
            <AdminCollections />
          </AdminRoute>
        ),
      },
      {
        path: '/admin/collections/add',
        element: (
          <AdminRoute>
            <AdminCollection />
          </AdminRoute>
        ),
      },
      {
        path: '/admin/collections/:id',
        element: (
          <AdminRoute>
            <AdminCollection />
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

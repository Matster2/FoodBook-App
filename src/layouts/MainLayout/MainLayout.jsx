import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import classnames from 'classnames';
import { useTranslation } from "react-i18next";
import { Link, Outlet, matchPath, useLocation } from 'react-router-dom';

import AuthenticationModal from 'modals/AuthenticationModal';

import { ReactComponent as SettingsIcon } from 'assets/icons/cog.svg';
import { ReactComponent as CookbookIcon } from 'assets/icons/cookbook.svg';
import { ReactComponent as DiscoverIcon } from 'assets/icons/discover.svg';
import { ReactComponent as HomeIcon } from 'assets/icons/home.svg';
import { ReactComponent as PlannerIcon } from 'assets/icons/planner.svg';

import styles from './MainLayout.module.css';

export default () => {
    const { t } = useTranslation();
    const { pathname } = useLocation();
  
    const isHomeActive = () => {
      if (matchPath('/home', pathname)) {
        return true;
      }
  
      if (matchPath('/', pathname)) {
        return true;
      }
  
      if (matchPath('', pathname)) {
        return true;
      }
  
      return false;
    };
  
    const isDiscoverActive = () => {
      if (matchPath('/recipes/*', pathname) && !(pathname.includes("create") || pathname.includes("edit"))) {
        return true;
      }
  
      return false;
    };
  
    const isPlannerActive = () => {
      if (matchPath('/planner/*', pathname)) {
        return true;
      }
      return false;
    };
  
    const isCookBookActive = () => {
      if (matchPath('/favourites/*', pathname)) {
        return true;
      }
      if (matchPath('/personal/*', pathname)) {
        return true;
      }
      if (matchPath('/recipes/create', pathname)) {
        return true;
      }
      if (matchPath('/recipes/*/edit', pathname)) {
        return true;
      }
      return false;
    };
  
    const isSettingsActive = () => {
      if (matchPath('/settings/*', pathname)) {
        return true;
      }
  
      if (matchPath('/contact-us/*', pathname)) {
        return true;
      }
  
      return false;
    };
  
    return (
      <Box sx={{ pb: 4 }}>
        <AuthenticationModal id="authentication-modal" />
  
        <Outlet />
  
        <BottomNavigation showLabels className={styles.bottomNav} sx={{ position: 'fixed', bottom: 0, zIndex: 999 }} elevation={3}>
          <BottomNavigationAction
            className={classnames(styles.navOption, isHomeActive() ? styles.navOptionSelected : '')}
            component={Link}
            to="/"
            label={t("pages.home.title")}
            icon={<HomeIcon className={classnames(styles.navOptionIcon, isHomeActive() ? styles.navOptionSelected : '')} />}
          />
          <BottomNavigationAction
            className={classnames(styles.navOption, isDiscoverActive() ? styles.navOptionSelected : '')}
            component={Link}
            to="/recipes"
            label={t("components.bottomNavBar.discover")}
            icon={
              <DiscoverIcon className={classnames(styles.navOptionIcon, isDiscoverActive() ? styles.navOptionSelected : '')} />
            }
          />
          <BottomNavigationAction
            className={classnames(styles.navOption, isPlannerActive() ? styles.navOptionSelected : '')}
            component={Link}
            to="/planner"
            label={t("pages.planner.title")}
            icon={
              <PlannerIcon className={classnames(styles.navOptionIcon, styles.planner, isPlannerActive() ? styles.navOptionSelected : '')} />
            }
          />
          <BottomNavigationAction
            className={classnames(styles.navOption, isCookBookActive() ? styles.navOptionSelected : '')}
            component={Link}
            to="/favourites"
            label={t("pages.cookbook.title")}
            icon={
              <CookbookIcon className={classnames(styles.navOptionIcon, isCookBookActive() ? styles.navOptionSelected : '')} />
            }
          />
          <BottomNavigationAction
            className={classnames(styles.navOption, isSettingsActive() ? styles.navOptionSelected : '')}
            component={Link}
            to="/settings"
            label={t("pages.settings.title")}
            icon={
              <SettingsIcon className={classnames(styles.navOptionIcon, isSettingsActive() ? styles.navOptionSelected : '')} />
            }
          />
        </BottomNavigation>
      </Box>
    );
};
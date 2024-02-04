import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import classnames from 'classnames';
import { useTranslation } from "react-i18next";
import { Link, Outlet, matchPath, useLocation } from 'react-router-dom';
import SettingsIcon from 'src/assets/icons/cog.svg?react';
import CookbookIcon from 'src/assets/icons/cookbook.svg?react';
import DiscoverIcon from 'src/assets/icons/discover.svg?react';
import HomeIcon from 'src/assets/icons/home.svg?react';
import PlannerIcon from 'src/assets/icons/planner.svg?react';
import AuthenticationModal from 'src/modals/AuthenticationModal';
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
  
        <Outlet style={{ marginBottom: 40 }} />

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
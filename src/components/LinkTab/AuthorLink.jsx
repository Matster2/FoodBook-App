import { Icon } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import socialIcons from 'config/socialIcons';

import styles from './AuthorLink.module.css';

const AuthorLink = ({ link }) => {
  const [icon, setIcon] = useState(socialIcons.default);

  const getLinkIcon = (url) => {
    if (url.includes("facebook.com")) {
      return socialIcons.facebook;
    }

    if (url.includes("instagram.com")) {
      return socialIcons.instagram;
    }

    if (url.includes("linkedin.com")) {
      return socialIcons.linkedin;
    }

    if (url.includes("telegram.com")) {
      return socialIcons.telegram;
    }

    if (url.includes("twitter.com")) {
      return socialIcons.twitter;
    }

    if (url.includes("vk.com")) {
      return socialIcons.vk;
    }

    if (url.includes("whatsapp.com")) {
      return socialIcons.whatsapp;
    }

    if (url.includes("youtube.com")) {
      return socialIcons.youtube;
    }

    return socialIcons.default;
  }

  useEffect(() => {
    setIcon(getLinkIcon(link.url))
  }, [link]);

  return (
    <Link to={link.url} target="_blank" rel="noopener noreferrer" >
      <Icon>
        <img className={styles.icon} alt={link.name} src={icon} />
      </Icon>
    </Link>
  )
}

AuthorLink.propTypes = {
  link: PropTypes.shape({
    url: PropTypes.string.isRequired,
    name: PropTypes.string,
    description: PropTypes.number
  }).isRequired,
};

AuthorLink.defaultProps = {
  onClick: () => { },
};

export default AuthorLink;

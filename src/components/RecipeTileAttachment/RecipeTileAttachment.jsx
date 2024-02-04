import {
    Box
} from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import HeartIcon from 'src/assets/icons/heart.svg?react';
import PersonalIcon from 'src/assets/icons/personal.svg?react';
import { isUndefined } from 'src/utils/utils';
import styles from './RecipeTileAttachment.module.css';

const RecipeTileAttachment = ({ type, ...props }) => {
  const variants = [
    { type: "favourite", icon: <HeartIcon />, backgroundColor: '#F46273' },
    { type: "personal", icon: <PersonalIcon />, backgroundColor: '#259fd5' }
  ];
  
  const [variant] = useState(() => {
    var x = variants.find(x => x.type === type);

    if (!isUndefined(x)) {
      return x
    }

    return variants.find(x => x.type === "default");
  })

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"      
      {...props}
      className={styles.box}
      sx={{ 
        background: `${variant.backgroundColor}`,
        stroke: `${variant.backgroundColor}`
      }}
    >
      {variant.icon}
    </Box>
  );
};

RecipeTileAttachment.propTypes = {
  type: PropTypes.oneOf(["favourite", "personal"])
};

RecipeTileAttachment.defaultProps = {
  width: 30,
  disabled: false,
  favourited: false,
  onClick: () => {},
};

export default RecipeTileAttachment;

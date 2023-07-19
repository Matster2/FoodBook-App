import {
  Box
} from '@mui/material';
import { ReactComponent as HeartIcon } from 'assets/icons/heart.svg';
import { ReactComponent as PersonalIcon } from 'assets/icons/personal.svg';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { isUndefined } from 'utils/utils';
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

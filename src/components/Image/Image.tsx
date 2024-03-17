import { Box, SxProps } from '@mui/material';
import classnames from 'classnames';
import { MouseEvent, MouseEventHandler, SyntheticEvent, useState } from 'react';
import styles from './styles.module.css';

interface ImageProps {
  sx?: SxProps;
  alt?: string;
  src?: string;
  defaultSrc?: string;
  className?: string;
  onError?: (event: SyntheticEvent<HTMLImageElement>) => void;
  onClick?: MouseEventHandler<HTMLImageElement>;
}

const Image = ({
  sx,
  src,
  defaultSrc,
  className,
  alt,
  onError = () => { },
  onClick = () => { },
  ...props
}: ImageProps) => {
  const [errored, setErrored] = useState(false);

  /* Handlers */
  const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
    setErrored(true);
    onError(event);
  }

  const handleClick = (event: MouseEvent<HTMLImageElement>) => {
    onClick(event);
  }

  const useDefaultSrc = !src || errored;

  return (
    <Box
      className={classnames(styles.container, className)}
      sx={{ ...sx }}
    >
      <img
        className={styles.image}
        src={
          useDefaultSrc
            ? defaultSrc
            : src}
        alt={alt}
        onError={handleError}
        onClick={handleClick}
        {...props}
      />
    </Box>
  )
};

export default Image;
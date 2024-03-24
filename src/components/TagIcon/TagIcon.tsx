import { Icon } from '@mui/material';
import { useMemo } from 'react';
import tagIcons from 'src/config/tagIcons';
import { isNullOrEmpty, isUndefined } from 'src/utils/utils';
import styles from './styles.module.css';

interface TagIconProps {
  icon: string;
  alt: string;
}

const TagIcon = ({
  icon,
  alt
}: TagIconProps) => {
  const src = useMemo(() => {
    const normalized = icon.toLowerCase();

    if (!isUndefined(tagIcons[normalized]) && !isNullOrEmpty(tagIcons[normalized])) {
      return tagIcons[normalized];
    }

    return tagIcons.default;
  }, [icon])

  return (
    <Icon>
      <img className={styles.icon} alt={alt} src={src} />
    </Icon>
  )
}

export default TagIcon;

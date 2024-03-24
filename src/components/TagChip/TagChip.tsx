import { Chip, SxProps } from '@mui/material';
import TagIcon from 'src/components/TagIcon/TagIcon';
import styles from './styles.module.css';

interface TagChipProps {
  sx?: SxProps;
  tag: {
    id: string;
    name: string;
    icon: string;
  };
  onClick: (id: string) => void;
}

const TagChip = ({
  sx,
  tag,
  onClick,
  ...props
}: TagChipProps) => {
  const handleClick = () => {
    onClick(tag.id);
  };

  return (
    <Chip
      sx={{ ...sx }}
      className={styles.chip}
      label={tag.name}
      color="primary"
      icon={
        <TagIcon
          icon={tag.icon}
          alt={tag.name}
        />
      }
      onClick={handleClick}
      {...props}
    />
  );
};

export default TagChip;

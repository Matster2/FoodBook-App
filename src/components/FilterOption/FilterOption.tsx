import { Box, Typography } from '@mui/material';
import classnames from 'classnames';
import styles from './styles.module.css';

interface FilterOptionProps {
  label: string;
  value: string;
  onClick?: (value: string) => void;
  active?: boolean;
}

const FilterOption = ({
  label,
  value,
  onClick = () => { },
  active = false
}: FilterOptionProps) => {

  const handleClick = () => {
    onClick(value);
  };

  return (
    <Box
      className={classnames(styles.component, active && styles.active)}
      onClick={handleClick}
    >
      <Typography>{label}</Typography>
    </Box>
  );
};

export default FilterOption;

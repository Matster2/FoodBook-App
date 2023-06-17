import React, { useState } from 'react';
import ISO6391 from 'iso-639-1';
import {
  Select,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';
import styles from './LanguageDropdown.module.css';

import { ReactComponent as EnglishFlag } from '../../assets/icons/flags/circular/england.svg';
import { ReactComponent as FrenchFlag } from '../../assets/icons/flags/circular/france.svg';
import { ReactComponent as GermanFlag } from '../../assets/icons/flags/circular/germany.svg';
import { ReactComponent as ItalianFlag } from '../../assets/icons/flags/circular/italy.svg';
import { ReactComponent as RussianFlag } from '../../assets/icons/flags/circular/russian-federation.svg';
import { ReactComponent as SpanishFlag } from '../../assets/icons/flags/circular/spain.svg';
import { ReactComponent as TurkishFlag } from '../../assets/icons/flags/circular/turkey.svg';
import { ReactComponent as UkrainianFlag } from '../../assets/icons/flags/circular/ukraine.svg';
import { ReactComponent as DefaultFlag } from '../../assets/icons/flags/circular/default.svg';

const flagMappings = {
  "en": EnglishFlag,
  "fr": FrenchFlag,
  "de": GermanFlag,
  "it": ItalianFlag,
  "ru": RussianFlag,
  "es": SpanishFlag,
  "tr": TurkishFlag,
  "uk": UkrainianFlag,
}

const LanguageDropdown = ({ languages, value, onChange, ...props }) => {
  const getFlag = (language) => {
    if (language in flagMappings) {
      return flagMappings[language]
    }

    return DefaultFlag;
  }


  const handleChange = (e) => {
    onChange(e.target.value)
  }

  const renderOption = (code) => {
    var Flag = getFlag(code);

    return (
      <MenuItem value={code}>
        <Stack direction="row" display="flex" alignItems="center" justifyContent="center">
          <Flag className={styles.flag} />
          <Typography>{ISO6391.getNativeName(code)}</Typography>
        </Stack>
      </MenuItem>
    )
  }

  return (
    <Select
      {...props}
      value={value}
      onChange={handleChange}
    >
      {languages.map((code) => renderOption(code))}
    </Select>
  );
};

LanguageDropdown.propTypes = {
};

LanguageDropdown.defaultProps = {
};

export default LanguageDropdown;

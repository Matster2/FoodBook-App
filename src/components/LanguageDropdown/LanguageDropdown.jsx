import {
  MenuItem,
  Select,
  Stack,
  Typography
} from '@mui/material';
import BelarusFlag from 'src/assets/icons/flags/circular/belarus.svg?react';
import DefaultFlag from 'src/assets/icons/flags/circular/default.svg?react';
import EnglishFlag from 'src/assets/icons/flags/circular/england.svg?react';
import FrenchFlag from 'src/assets/icons/flags/circular/france.svg?react';
import GermanFlag from 'src/assets/icons/flags/circular/germany.svg?react';
import ItalianFlag from 'src/assets/icons/flags/circular/italy.svg?react';
import RussianFlag from 'src/assets/icons/flags/circular/russian-federation.svg?react';
import SpanishFlag from 'src/assets/icons/flags/circular/spain.svg?react';
import TurkishFlag from 'src/assets/icons/flags/circular/turkey.svg?react';
import UkrainianFlag from 'src/assets/icons/flags/circular/ukraine.svg?react';
import USAFlag from 'src/assets/icons/flags/circular/usa.svg?react';
import styles from './LanguageDropdown.module.css';

const flagMappings = {
  "en": EnglishFlag,
  "fr": FrenchFlag,
  "de": GermanFlag,
  "it": ItalianFlag,
  "ru": RussianFlag,
  "es": SpanishFlag,
  "tr": TurkishFlag,
  "uk": UkrainianFlag,
  "be": BelarusFlag,
  "en-us": USAFlag
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

  const renderOption = (language) => {
    var Flag = getFlag(language.iso639);

    return (
      <MenuItem key={language.iso639} value={language.iso639}>
        <Stack direction="row" display="flex" alignItems="center" justifyContent="center">
          <Flag className={styles.flag} />
          <Typography>{language.nativeName}</Typography>
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
      {languages
        .sort((a, b) => (a.iso639 > b.iso639) ? 1 : ((b.iso639 > a.iso639) ? -1 : 0))
        .map((language) => renderOption(language))}
    </Select>
  );
};

LanguageDropdown.propTypes = {
};

LanguageDropdown.defaultProps = {
};

export default LanguageDropdown;

import {
  MenuItem,
  Select,
  Stack,
  Typography
} from '@mui/material';
import styles from './LanguageDropdown.module.css';

import { ReactComponent as BelarusFlag } from 'assets/icons/flags/circular/belarus.svg';
import { ReactComponent as DefaultFlag } from 'assets/icons/flags/circular/default.svg';
import { ReactComponent as EnglishFlag } from 'assets/icons/flags/circular/england.svg';
import { ReactComponent as FrenchFlag } from 'assets/icons/flags/circular/france.svg';
import { ReactComponent as GermanFlag } from 'assets/icons/flags/circular/germany.svg';
import { ReactComponent as ItalianFlag } from 'assets/icons/flags/circular/italy.svg';
import { ReactComponent as RussianFlag } from 'assets/icons/flags/circular/russian-federation.svg';
import { ReactComponent as SpanishFlag } from 'assets/icons/flags/circular/spain.svg';
import { ReactComponent as TurkishFlag } from 'assets/icons/flags/circular/turkey.svg';
import { ReactComponent as UkrainianFlag } from 'assets/icons/flags/circular/ukraine.svg';
import { ReactComponent as USAFlag } from 'assets/icons/flags/circular/usa.svg';

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
        .sort((a,b) => (a.iso639 > b.iso639) ? 1 : ((b.iso639 > a.iso639) ? -1 : 0))
        .map((language) => renderOption(language))}
    </Select>
  );
};

LanguageDropdown.propTypes = {
};

LanguageDropdown.defaultProps = {
};

export default LanguageDropdown;

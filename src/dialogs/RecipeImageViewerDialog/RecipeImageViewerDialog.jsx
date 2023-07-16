import {
  Dialog
} from '@mui/material';
import uuid from 'react-uuid';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import styles from './RecipeImageViewerDialog.module.css';

const RecipeImageViewerDialog = ({
  open,
  images,
  onClose,
}) => {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={() => { }}
      // TransitionComponent={Transition}
      PaperProps={{
        style: {
          backgroundColor: '#F6F6F6',
        },
      }}
    >
      <Swiper className={styles.swiper}>
        {images.map((image) => (
          <SwiperSlide key={uuid()} className={styles.swiperSlide} onDoubleClick={onClose}>
            <img className={styles.slideImage} src={image} alt="recipe" />
          </SwiperSlide>
        ))}
      </Swiper>
    </Dialog>
  )
}

export default RecipeImageViewerDialog;
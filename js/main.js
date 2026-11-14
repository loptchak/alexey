import { initLanguageSwitch } from './i18n.js';
import { initNavigation } from './navigation.js';
import { initReviews } from './reviews.js';
import { initReviewsSlider } from './reviews-slider.js';
import reviews from './generated/reviews.js';

initNavigation();

const slider = initReviewsSlider(reviews.length);
const reviewView = initReviews(reviews, slider);

initLanguageSwitch((language, messages) => {
  reviewView.render(language, messages);
});

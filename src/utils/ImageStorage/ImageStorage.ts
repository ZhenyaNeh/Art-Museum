import arrowRight from '../../assets/img/arrow-right.svg';
import bookmarkHeader from '../../assets/img/bookmark1.svg';
import bookmarkMainUnchecked from '../../assets/img/bookmark2.svg';
import bookmarkMainChecked from '../../assets/img/bookmark3.svg';
import home from '../../assets/img/home2.svg';
import logoModsen from '../../assets/img/logo modsen-02 2.png';
import logo from '../../assets/img/logo.svg';

type Images = {
  logo: string;
  logoModsen: string;
  bookmarkHeader: string;
  bookmarkMainUnchecked: string;
  bookmarkMainChecked: string;
  arrowRight: string;
  home: string;
};

const images: Images = {
  logo: logo,
  logoModsen: logoModsen,
  bookmarkHeader: bookmarkHeader,
  bookmarkMainUnchecked: bookmarkMainUnchecked,
  bookmarkMainChecked: bookmarkMainChecked,
  arrowRight: arrowRight,
  home: home,
};

export default images;

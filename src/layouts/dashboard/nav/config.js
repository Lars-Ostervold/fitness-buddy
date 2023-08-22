// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Workout Generator',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Fitness Buddy',
    path: '/dashboard/fitness-buddy',
    icon: icon('ic_cart'),
  },
  {
    title: 'Account',
    path: '/dashboard/account',
    icon: icon('ic_user'),
  },
  {
    title: 'Settings',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Support Us',
    path: '/dashboard/support',
    icon: icon('ic_disabled'),
  },
  {
    title: 'About Us',
    path: '/dashboard/about',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;

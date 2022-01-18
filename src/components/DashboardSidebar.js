import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import SettingsInputComponentOutlinedIcon from '@mui/icons-material/SettingsInputComponentOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import FeedbackIcon from '@mui/icons-material/Feedback';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import NavItem from './NavItem';

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const user = {
    avatar: '/static/images/avatars/avatar_6.png',
    jobTitle: 'Manager',
    name: localStorage.getItem('name')
  };

  let items;

  const adminItems = [
    {
      href: '/app/dashboard',
      icon: GridViewOutlinedIcon,
      title: 'Dashboard'
    },
    {
      href: '/app/employees',
      icon: GroupOutlinedIcon,
      title: 'Employees'
    },
    {
      href: '/app/locations',
      icon: FmdGoodOutlinedIcon,
      title: 'Locations'
    },
    {
      href: '/app/settings',
      icon: SettingsInputComponentOutlinedIcon,
      title: 'Settings'
    },
    {
      href: '',
      icon: ExitToAppOutlinedIcon,
      title: 'Logout'
    }
  ];

  const InnovigentItems = [
    {
      href: '/innovigent/dashboard',
      icon: GridViewOutlinedIcon,
      title: 'Dashboard'
    },
    {
      href: '/innovigent/companies',
      icon: LocationCityIcon,
      title: 'Companies'
    },
    {
      href: '/innovigent/feedbacks',
      icon: FeedbackIcon,
      title: 'Feedbacks'
    },
    {
      href: '',
      icon: ExitToAppOutlinedIcon,
      title: 'Logout'
    }
  ];

  localStorage.getItem('permission') === '101'
    ? (items = InnovigentItems)
    : (items = adminItems);

  console.log(items);

  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/app/dashboard"
        />
        <Typography color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              onClick={() => {
                if (item.title === 'Logout') {
                  localStorage.clear();
                  window.location.href = '/';
                }
              }}
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden xlDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default DashboardSidebar;

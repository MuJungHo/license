import React from "react";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from "./Button";
import Tooltip from '@material-ui/core/Tooltip';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  menu: {
    "& .MuiPaper-root": {
      boxShadow: theme.palette.boxShadow[1],
      backgroundColor: theme.palette.select.background,
      color: theme.palette.select.color,
      '& span': {
        color: theme.palette.select.color,
      }
    },
  },
  list: {
    padding: 5,
  },
  item: {
    height: 40,
    minWidth: 60,
    paddingLeft: theme.spacing(1),
    '& > *:not(:first-child)': {
      marginLeft: 20
    },
    '& svg': {
      // fill: theme.grey.medium
    }
  },
  button: {
    // background: theme.palette.action.background,
    // color: theme.palette.action.color,
    // boxShadow: theme.palette.boxShadow[0],
  }
}));
export default ({ actions = [], row = {} }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleActionClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleItemClick = (event, action) => {
    setAnchorEl(null)
    action.onClick(event, row)
  }
  if (actions.length === 0) {
    return '--'
  }

  if (actions.length === 1) {
    return <Tooltip title={actions[0].name}>
      <IconButton onClick={(event) => actions[0].onClick(event, row)}>
        {actions[0].icon}
      </IconButton>
    </Tooltip>
  }
  return (
    <div onClick={e => e.stopPropagation()}>
      <Button className={classes.button} size="small" color="default" onClick={handleActionClick} variant="outlined"><MoreHorizIcon /></Button>
      <Menu
        open={Boolean(anchorEl)}
        className={classes.menu}
        classes={{ list: classes.list }}
        anchorEl={anchorEl}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        {
          actions
            .map(action => {
              // console.log(action)
              return <MenuItem
                key={action.name}
                onClick={(event) => handleItemClick(event, action)}
                className={classes.item}
              >
                {action.icon}
                <Typography color="textSecondary" variant="caption">{action.name}</Typography>
              </MenuItem>
            })
        }
      </Menu>
    </div>
  );
};
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
//import DraftsIcon from '@material-ui/icons/Drafts';
//import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
//import StarBorder from '@material-ui/icons/StarBorder';


//import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import PermIdentitySharpIcon from '@material-ui/icons/PermIdentitySharp';


import Checkbox from '@material-ui/core/Checkbox';
//import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
//import IconButton from '@material-ui/core/IconButton';
//import CommentIcon from '@material-ui/icons/Comment';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(8),
  },
}));

export default function NestedList(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState([0]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);

    console.log("newChecked",newChecked);
    props.userFilter(newChecked);
  };


  return (
  <>    
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Pobranych wiadomiści: {props.lenPosts} 
        </ListSubheader>
      }
      className={classes.root}
    >
      <ListItem button onClick={props.getNewPost}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Pobierz wiadomość" />
      </ListItem>

      <ListItem button onClick={props.getNew10Post}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Pobierz 10 wiadomości" />
      </ListItem>

      {/* <ListItem button>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Otwórz wszystkie" />
      </ListItem> */}

      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <PeopleAltOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Użytkownicy" />
        {open ? <ExpandLess /> : <ExpandMore />} 
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        
        <List className={classes.root}>

            <ListItem key='0' role={undefined} dense button onClick={handleToggle(0)}>
                {/* <ListItemIcon> */}
                    <PeopleAltOutlinedIcon />
                {/* </ListItemIcon> */}
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={checked.indexOf(0) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': `checkbox-list-label-0` }}
                    />
                </ListItemIcon>
                <ListItemText id={{'aria-labelledby': `checkbox-list-label-0`}} primary={`Wszyscy`} />
            </ListItem>

            {/* {[1, 2, 3, 4].map(value => { */}
            {props.users.map(value => {
                const labelId = `checkbox-list-label-${value}`;

                return (
                <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
                    {/* <ListItemIcon> */}
                        <PermIdentitySharpIcon />
                    {/* </ListItemIcon> */}
                    <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                    />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={`Użytkownik ${value}`} />
                    {/* <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="comments">
                        <CommentIcon />
                    </IconButton>
                    </ListItemSecondaryAction> */}
                </ListItem>
                );
            })}
            </List>

        </Collapse>
    </List>
  </>
  );

}
import './index.css';
import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { ReactComponent as HomeIcon} from './icons/home.svg';
import { ReactComponent as AboutIcon} from './icons/about.svg';
import { ReactComponent as CaretIcon} from './icons/caret.svg';
import { ReactComponent as TutorialIcon} from './icons/tutorial.svg';
import { ReactComponent as SearchIcon} from './icons/search.svg';
import { ReactComponent as SettingIcon} from './icons/setting.svg';
import { ReactComponent as LogoutIcon} from './icons/logout.svg';
import { ReactComponent as ProfileIcon} from './icons/profile.svg';
import { ReactComponent as LeftArrow} from './icons/leftArrow.svg';
import { ReactComponent as RightArrow} from './icons/morethan.svg';
import { ReactComponent as PythonIcon} from './icons/python.svg';
import { ReactComponent as HtmlIcon} from './icons/html.svg';

const App = () =>{
  return (
    <NavBar>
      <NavItem icon={<HomeIcon />} title="Home"/>
      <NavItem icon={<SearchIcon />} title="Search"/>
      <NavItem icon={<CaretIcon />} > 
        <DropDownMenu></DropDownMenu>
        
      </NavItem>

    </NavBar>
  );
};

const NavBar = (props) => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
};

const NavItem = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" title={props.title} onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}

    </li>
  );
};

const DropDownMenu = () => {

  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);

  function calc_height(el){
    const height = el.offsetHeight;
    setMenuHeight(height);
  }
  
  const DropDownItem = (props) => {
    return (
      <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>

        <p>{props.children}</p>
        
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  };
  
  return (
    <div className="dropdown" style={{ height: menuHeight}}>
      <CSSTransition 
      in={activeMenu === 'main'} 
      unmountOnExit timeout={500} 
      classNames="menu-primary" 
      onEnter={calc_height}
      >
          <div className="menu">
            <DropDownItem 
            leftIcon={<SettingIcon/>}
            rightIcon={<RightArrow />}
            goToMenu='setting'>
              Setting
            </DropDownItem>
            <DropDownItem 
              leftIcon={<TutorialIcon />}
              rightIcon={<RightArrow />}
              goToMenu='tutorial'>
              Tutorial
            </DropDownItem>
            <DropDownItem leftIcon={<AboutIcon/>}>About</DropDownItem>
            <DropDownItem leftIcon={<LogoutIcon/>}>
              Keluar
            </DropDownItem>
          </div>
      </CSSTransition>

      <CSSTransition in={activeMenu === 'tutorial'} unmountOnExit timeout={500} classNames="menu-secondary" onEnter={calc_height}>
          <div className="menu">
            <DropDownItem leftIcon={<LeftArrow />} goToMenu='main'/>
            <DropDownItem leftIcon={<PythonIcon/>}>
              Python
            </DropDownItem>
            <DropDownItem leftIcon={<HtmlIcon/>}>
              HTML
            </DropDownItem>
          </div>
      </CSSTransition>
      
      <CSSTransition in={activeMenu === 'setting'} unmountOnExit timeout={500} classNames="menu-secondary" onEnter={calc_height}>
          <div className="menu">
            <DropDownItem leftIcon={<LeftArrow />} goToMenu='main'/>
            <DropDownItem leftIcon={<ProfileIcon/>}>
              Ubah Profile
            </DropDownItem>
          </div>
      </CSSTransition>
    </div>
  )
};

export default App;

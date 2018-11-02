import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Navbar,
  NavbarItem,
  NavbarItemMenu,
  Link,
  List,
  ListItem,
  Icon,
  DefaultThemeProps,
  Box
} from '@deity/falcon-ui';

import { toGridTemplate } from '../helpers';
import { ToggleMiniCartMutation, MiniCartIcon, MiniCartQuery } from '../MiniCart';
import { HeaderData, MenuItem } from './HeaderQuery';
import { ToggleMiniSignInMutation } from '../SignIn/MiniSignInMutation';

const bannerLayoutTheme: DefaultThemeProps = {
  bannerLayout: {
    display: 'flex',
    justifyContent: 'flex-end',
    bgFullWidth: 'primaryLight',
    m: 'none',
    p: 'none',
    css: {
      listStyle: 'none'
    }
  }
};

export const Banner: React.SFC<{ items: MenuItem[] }> = ({ items }) => (
  <List defaultTheme={bannerLayoutTheme}>
    {items.map(item => (
      <ListItem p="md" key={item.name}>
        <Link as={RouterLink} to={item.url}>
          {item.name}
        </Link>
      </ListItem>
    ))}
  </List>
);

export const Nav: React.SFC<{ items: MenuItem[] }> = ({ items }) => (
  <Navbar>
    {items.map(item => (
      <NavbarItem key={item.name}>
        <Link p="md" as={RouterLink} to={item.url}>
          {item.name}
        </Link>
        {item.children.length > 0 && (
          <NavbarItemMenu>
            <List>
              {item.children.map(subItem => (
                <ListItem key={subItem.name}>
                  <Link p="md" display="block" as={RouterLink} to={item.url}>
                    {subItem.name}
                  </Link>
                </ListItem>
              ))}
            </List>
          </NavbarItemMenu>
        )}
      </NavbarItem>
    ))}
  </Navbar>
);

export enum SearchBarArea {
  logo = 'logo',
  signIn = 'signIn',
  cart = 'cart',
  search = 'search'
}

const searchBarLayoutTheme: DefaultThemeProps = {
  searchbarLayout: {
    display: 'grid',
    py: 'md',
    gridGap: 'md',
    // prettier-ignore
    gridTemplate: toGridTemplate([
      [ "200px",             "1fr",                "auto",               "auto"             ],
      [SearchBarArea.logo, SearchBarArea.search, SearchBarArea.signIn,  SearchBarArea.cart],
    ]),
    css: {
      alignItems: 'center'
    }
  }
};

export const Searchbar = () => (
  <Box defaultTheme={searchBarLayoutTheme}>
    <Link as={RouterLink} gridArea={SearchBarArea.logo} to="/">
      <Icon src="logo" />
    </Link>
    <ToggleMiniSignInMutation>
      {toggle => (
        <Icon gridArea={SearchBarArea.signIn} src="user" onClick={() => toggle()} css={{ cursor: 'pointer' }} />
      )}
    </ToggleMiniSignInMutation>
    <ToggleMiniCartMutation>
      {toggle => (
        <MiniCartQuery>
          {(data: any) => <MiniCartIcon onClick={toggle} gridArea={SearchBarArea.cart} itemsQty={data.cart.itemsQty} />}
        </MiniCartQuery>
      )}
    </ToggleMiniCartMutation>
  </Box>
);

export const Header: React.SFC<HeaderData> = ({
  config: {
    menus: { header, banner }
  }
}) => (
  <header>
    <Banner items={banner} />
    <Searchbar />
    <nav>
      <Nav items={header} />
    </nav>
  </header>
);

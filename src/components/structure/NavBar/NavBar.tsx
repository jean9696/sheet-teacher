import * as React from 'react'
import { Link, NavLinkProps } from 'react-router-dom'

import {
  Icon,
  NavBar as NavBarContainer,
  NavBarItem,
  NavBarItemProps,
} from '@habx/ui-core'

import { Container } from './NavBar.style'
const NavBarLinkItem = NavBarItem as React.ForwardRefExoticComponent<
  NavBarItemProps & (NavLinkProps | React.HTMLProps<HTMLAnchorElement>)
>

const NavBar: React.FunctionComponent = ({ children }) => {
  return (
    <Container>
      <NavBarContainer>
        <NavBarLinkItem
          as={Link}
          label="Home"
          icon={<Icon icon="house-outline" />}
          to="/tpl"
        />
      </NavBarContainer>
      {children}
    </Container>
  )
}

export default NavBar

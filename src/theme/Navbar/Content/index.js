import React from 'react';
import {useThemeConfig, ErrorCauseBoundary} from '@docusaurus/theme-common';
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import SearchBar from '@theme/SearchBar';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarSearch from '@theme/Navbar/Search';
import isInternalUrl from '@docusaurus/isInternalUrl';
import Link from '@docusaurus/Link';

import styles from './styles.module.css';
function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items;
}
function RightNavbarItems({items}) {
  return items?.length && (
    <div className={`d-flex gap-16 align-items-center`}>
      {items.map((item, i) => (
        <ErrorCauseBoundary
          key={i}
          onError={(error) =>
            new Error(
              `A theme navbar item failed to render.
Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
${JSON.stringify(item, null, 2)}`,
              {cause: error},
            )
          }>
          <Link className={`link-base`} to={item.href} target={!isInternalUrl(item.href) ? "_blank" : 'null'} rel={!isInternalUrl(item.href) ? `noopener noreferrer` : null} aria-label={item.label}>
            {item.icon ? (
              <svg width={24} height={24}>
                <use xlinkHref={`#icon-${item.icon}-solid`} />
              </svg>
            ) : item.label}
          </Link>
        </ErrorCauseBoundary>
      ))}
    </div>
  );
}
function NavbarContentLayout({left, right}) {
  return (
    <div className="navbar__inner container">
      <div className="navbar__items">{left}</div>
      <div className="navbar__items navbar__items--right">{right}</div>
    </div>
  );
}
export default function NavbarContent() {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);
  const searchBarItem = items.find((item) => item.type === 'search');
  return (
    <NavbarContentLayout
      left={
        // TODO stop hardcoding items?
        <>
          {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
          <NavbarLogo />
        </>
      }
      right={
        // TODO stop hardcoding items?
        // Ask the user to add the respective navbar items => more flexible
        <div className={`d-flex gap-20 align-items-center`}>
          {!searchBarItem && (
            <NavbarSearch>
              <SearchBar />
            </NavbarSearch>
          )}
          <RightNavbarItems items={rightItems} />
          <NavbarColorModeToggle className={styles.colorModeToggle} />
        </div>
      }
    />
  );
}

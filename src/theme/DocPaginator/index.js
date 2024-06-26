import React from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import PaginatorNavLink from '@theme/PaginatorNavLink';
import clsx from "clsx";
export default function DocPaginator(props) {
  const {previous, next} = props;
  return (
    <nav
      className={clsx(`mt-64`, !previous && `justify-content-end`)}
      aria-label={translate({
        id: 'theme.docs.paginator.navAriaLabel',
        message: 'Docs pages',
        description: 'The ARIA label for the docs pagination',
      })}>
      <div className="row row-cols-1 row-cols-lg-2 g-24">
        {previous && (
          <div className={`col`}>
            <PaginatorNavLink
              {...previous}
              subLabel={
                <Translate
                  id="theme.docs.paginator.previous"
                  description="The label used to navigate to the previous doc">
                  Previous
                </Translate>
              }
            />
          </div>
        )}
        {next && (
          <div className={clsx(`col`, next && 'ms-lg-auto')}>
            <PaginatorNavLink
              {...next}
              subLabel={
                <Translate
                  id="theme.docs.paginator.next"
                  description="The label used to navigate to the next doc">
                  Next
                </Translate>
              }
              isNext
            />
          </div>
        )}
      </div>
    </nav>
  );
}

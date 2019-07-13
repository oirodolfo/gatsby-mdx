import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { createGlobalStyle } from 'styled-components';

import 'prismjs/themes/prism-okaidia.css';

import Link from './Link';
import { MDXLayoutComponents, MDXGlobalComponents } from './mdx';

const GlobalStyle = createGlobalStyle`
  /*
-----------------------------------------------
	vars – css custom-properties

	NOTE
	- some vars change inside media-queries!
	- under normal conditions, there's no need to touch these
-----------------------------------------------
*/
:root {
	--nav-h:       6rem;
	--top-offset:  6rem;
	--sidebar-w:  30rem;
	--sidebar-mid-w: 36rem;
	--sidebar-large-w: 48rem;
	--main-width: 80rem;
	--side-nav:  3.2rem;
	--side-page:   var(--side-nav);

	/* easings */
	--out-back:    cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@media screen and (min-width: 768px) {
	:root {
		--side-page:  14vw;
		--top-offset: 10rem;
		--side-nav: 4.8rem;
	}
}

/*	theme vars */
.theme-default {
	--back:       	#ffffff;
	--back-light: 	#f6fafd;
	--back-api: 		#eff8ff;
	--prime:      	#ff3e00;
	--second:     	#676778;
	--flash:      	#40b3ff;
	--heading:	var(--second);
	--text:      		#444;
	--sidebar-text: rgba(255, 255, 255, .75);
	--border-w:  		.3rem; /* border-width  */
	--border-r:  		.4rem; /* border-radius */
}

/*	typo vars */
.typo-default {
	--code-fs: 1.3rem;
	--h6:      1.4rem;
	--h5:      1.6rem;
	--h4:      1.8rem; /* default font-size */
	--h3:      2.6rem;
	--h2:        3rem;
	--h1:      3.2rem;
	--linemax:   42em; /* max line-length */
	--lh:  		 	  1.5; /* base line-height */
}

  
body {
	font: 300 var(--h4)/var(--lh) var(--font);
	background-color: var(--back);
	color: var(--text);

	/* default spacing of Overpass is a bit too airy */
	/* letter-spacing: -.013em; */
}

h1, h2, h3, h4, h5, h6, blockquote {
	position: relative;
	margin: 0;
	color: var(--heading);
}

/* h1, h2, h3, h4, h5, h6 { font-weight: 600 } */
h6 { font-size: var(--h6) }
h5 { font-size: var(--h5) }
h4 { font-size: var(--h4) }
h3 { font-size: var(--h3) }
h2 { font-size: var(--h2) }
h1 { font-size: var(--h1) }

h1, h2 {
	font-family: var(--font);
	line-height: 1.25;
}

h3 { font-weight: 300 }



  html, body {
    margin: 0;
    padding: 0;
  }

  ${() => {
    /* Override PrismJS Defaults */ return null;
  }}

  pre {
    background-color: #2f1e2e !important;
    border-radius: 4px;
    font-size: 14px;
  }

  .gatsby-highlight-code-line {
    background-color: #4f424c;
    display: block;
    margin-right: -1em;
    margin-left: -1em;
    padding-right: 1em;
    padding-left: 1em;
  }
`;

const NAVIGATION = [
  { to: '/', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: 'https://roadtoreact.com', label: 'Courses' },
];

export default ({ site, frontmatter = {}, children }) => {
  const {
    title,
    description: siteDescription,
    keywords: siteKeywords,
  } = site.siteMetadata;

  const {
    keywords: frontmatterKeywords,
    description: frontmatterDescription,
  } = frontmatter;

  const keywords = (frontmatterKeywords || siteKeywords).join(', ');
  const description = frontmatterDescription || siteDescription;

  return (
    <Fragment>
      <Helmet
        title={title}
        meta={[
          { name: 'description', content: description },
          { name: 'keywords', content: keywords },
        ]}
      >
        <html lang="en" />
      </Helmet>

      <GlobalStyle />

      <MDXProvider
        components={{
          ...MDXLayoutComponents,
          ...MDXGlobalComponents,
        }}
      >
        <Fragment>
          <ul>
            {NAVIGATION.map(navigation => (
              <li key={navigation.label}>
                <Link to={navigation.to}>{navigation.label}</Link>
              </li>
            ))}
          </ul>

          {children}
        </Fragment>
      </MDXProvider>
    </Fragment>
  );
};

export const pageQuery = graphql`
  fragment site on Site {
    siteMetadata {
      title
      description
      author
      keywords
    }
  }
`;

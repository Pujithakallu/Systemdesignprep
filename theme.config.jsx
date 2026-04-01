export default {
  logo: (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span style={{ fontWeight: 800, fontSize: '1.15rem' }}>
        System Design Prep
      </span>
    </div>
  ),
  project: {
    link: 'https://github.com/',
  },
  docsRepositoryBase: 'https://github.com/',
  primaryHue: 210,
  useNextSeoProps() {
    return {
      titleTemplate: '%s – System Design Prep'
    }
  },
  search: {
    placeholder: 'Search topics...'
  },
  sidebar: {
    defaultMenuCollapseLevel: 2,
    toggleButton: true
  },
  footer: {
    text: (
      <span>
        {new Date().getFullYear()} System Design Interview Prep Platform
      </span>
    )
  },
  toc: {
    float: true,
    title: 'On This Page'
  },
  navigation: {
    prev: true,
    next: true
  },
  darkMode: true,
  editLink: {
    text: null
  },
  feedback: {
    content: null
  }
}

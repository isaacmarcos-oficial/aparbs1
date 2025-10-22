export const GET_POSTS = `
  query {
    allPosts {
      id
      slug
      title
      banner {
        url
        alt
      }
      content
      _status
      _publishedAt
      _firstPublishedAt
    }
  }
`;

export const GET_POST_BY_ID = `
  query PostBySlug($slug: String!) {
    post(filter: {slug: {eq: $slug}}) {
      id
      slug
      title
      banner {
        url
        alt
      }
      content
      _status
      _publishedAt
      _firstPublishedAt
    }
  }
`;

export const GET_SERVICES = `
  query {
    allServices {
      id
      slug
      title
      icon
      shortdescription
      introduction
      whatis
      whatinvolves
      whydo
      whentodo
      howwedo
      whychooseus  
      faq
    }
  }
`;

export const GET_SERVICES_BY_SLUG = `
  query ServiceBySlug($slug: String!) {
    service(filter: {slug: {eq: $slug}}) {
      id
      slug
      title
      icon
      shortdescription
      introduction
      whatis
      whatinvolves
      whydo
      whentodo
      howwedo
      whychooseus  
      faq
    }
  }
`;

export const GET_PARTNERS = `
  query {
    allPartners {
      id
      business
      image {
        url
      }
    }
  }
`;
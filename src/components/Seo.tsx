import { Helmet } from 'react-helmet-async'

interface SeoProps {
  title: string
  description: string
  path: string
  noindex?: boolean
}

const SITE_NAME = 'RIM Trading & Indústria, Lda'
const SITE_URL = 'https://www.rimtrading.com'

export function Seo({ title, description, path, noindex = false }: SeoProps) {
  const fullTitle = `${title} | ${SITE_NAME}`
  const url = `${SITE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
    </Helmet>
  )
}
